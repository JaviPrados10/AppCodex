import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostListener,
  NgZone,
  OnDestroy,
  computed,
  signal
} from '@angular/core';

import { CV_DATA } from '../../../../data/cv.data';
import { CvProfile } from '../../../../models/cv.model';
import { CvHeroComponent } from '../../components/cv-hero/cv-hero.component';
import { InteractiveExperienceListComponent } from '../../components/experience-list/experience-list.component';
import { SkillGroup, SkillsFilterComponent } from '../../components/skills-filter/skills-filter.component';
import { SectionCardComponent } from '../../components/shared/section-card/section-card.component';

interface TopbarNavItem {
  id: string;
  label: string;
}

@Component({
  selector: 'app-cv-interactive-page',
  standalone: true,
  imports: [CommonModule, CvHeroComponent, SkillsFilterComponent, InteractiveExperienceListComponent, SectionCardComponent],
  templateUrl: './cv-interactive-page.component.html',
  styleUrl: './cv-interactive-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CvInteractivePageComponent implements AfterViewInit, OnDestroy {
  readonly cvData: CvProfile = CV_DATA;
  readonly selectedSkill = signal<string | null>(null);
  readonly selectedExperienceIndex = signal<number | null>(0);
  readonly isStickyCompact = signal(false);
  readonly activeSection = signal('hero');
  readonly isPrintMode = signal(false);
  intersectionObserver: IntersectionObserver | null = null;
  private isPrinting = false;

  readonly navItems: TopbarNavItem[] = [
    { id: 'experience', label: 'Experiencia' },
    { id: 'toolkit', label: 'Skills' },
    { id: 'learning', label: 'Formación' },
    { id: 'contact', label: 'Contacto' }
  ];

  readonly skillGroups: SkillGroup[] = [
    { title: 'Frontend', skills: ['Angular 4', 'JavaScript', 'jQuery', 'HTML5', 'CSS3', 'SCSS', 'Bootstrap'] },
    { title: 'Backend & Datos', skills: ['Java', 'Spring Boot', 'MySQL', 'Thymeleaf'] },
    { title: 'Colaboración y control', skills: ['Git', 'Subversion'] }
  ];

  readonly filteredExperiences = computed(() => {
    if (this.isPrintMode()) {
      return this.cvData.experience;
    }

    const selectedSkill = this.selectedSkill();

    if (!selectedSkill) {
      return this.cvData.experience;
    }

    return this.cvData.experience.filter((experience) => experience.stackHighlights.includes(selectedSkill));
  });

  constructor(
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly ngZone: NgZone
  ) {}

  onSkillSelected(skill: string | null): void {
    this.selectedSkill.set(skill);
    this.selectedExperienceIndex.set(this.filteredExperiences().length ? 0 : null);
  }

  onExperienceSelected(index: number | null): void {
    this.selectedExperienceIndex.set(index);
  }

  onNavClick(event: Event, sectionId: string): void {
    event.preventDefault();
    this.scrollToSection(sectionId);
  }

  async onDownloadCv(event: Event): Promise<void> {
    event.preventDefault();

    if (this.isPrinting) {
      return;
    }

    this.isPrinting = true;
    this.selectedSkill.set(null);
    this.selectedExperienceIndex.set(0);
    this.isPrintMode.set(true);
    this.changeDetectorRef.detectChanges();

    await this.waitForPrintRender();
    window.print();
    setTimeout(() => this.onAfterPrint(), 1200);
  }

  ngAfterViewInit(): void {
    this.updateStickyState();
    this.observeSections();
    window.addEventListener('scroll', this.updateStickyState, { passive: true });
  }

  ngOnDestroy(): void {
    window.removeEventListener('scroll', this.updateStickyState);
    this.intersectionObserver?.disconnect();
    this.intersectionObserver = null;
  }

  @HostListener('window:afterprint')
  onAfterPrint(): void {
    if (!this.isPrinting && !this.isPrintMode()) {
      return;
    }

    this.isPrintMode.set(false);
    this.isPrinting = false;
    this.changeDetectorRef.detectChanges();
  }

  private scrollToSection(sectionId: string): void {
    const targetSection = document.getElementById(sectionId);

    if (!targetSection) {
      return;
    }

    const topbar = document.querySelector<HTMLElement>('.topbar-shell');
    const navOffset = (topbar?.offsetHeight ?? 96) + 16;
    const targetTop = window.scrollY + targetSection.getBoundingClientRect().top - navOffset;

    window.scrollTo({
      top: Math.max(0, targetTop),
      behavior: 'smooth'
    });

    this.activeSection.set(sectionId);
  }

  private readonly updateStickyState = (): void => {
    this.isStickyCompact.set(window.scrollY > 32);
  };

  private observeSections(): void {
    if (this.isPrintMode()) {
      return;
    }

    const sectionIds = this.navItems.map((item) => item.id);

    this.intersectionObserver = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((entryA, entryB) => entryB.intersectionRatio - entryA.intersectionRatio)[0];

        if (visibleEntry?.target.id) {
          this.activeSection.set(visibleEntry.target.id);
        }
      },
      {
        root: null,
        rootMargin: '-30% 0px -52% 0px',
        threshold: [0.25, 0.5, 0.75]
      }
    );

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        this.intersectionObserver?.observe(element);
      }
    });
  }

  private waitForPrintRender(): Promise<void> {
    return new Promise((resolve) => {
      this.ngZone.runOutsideAngular(() => {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setTimeout(() => resolve(), 160);
          });
        });
      });
    });
  }
}
