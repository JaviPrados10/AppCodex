import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, Input, OnDestroy, signal } from '@angular/core';

export interface TopbarNavItem {
  id: string;
  label: string;
  optionalOnMobile?: boolean;
}

@Component({
  selector: 'app-cv-topbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cv-topbar.component.html',
  styleUrl: './cv-topbar.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CvTopbarComponent implements AfterViewInit, OnDestroy {
  @Input({ required: true }) navItems: TopbarNavItem[] = [];
  @Input({ required: true }) cvDownloadUrl = '';
  @Input() brandName = 'Javier Prados';
  @Input() brandRole = 'Angular Developer';

  readonly isStickyCompact = signal(false);
  readonly activeSection = signal('experience');

  private intersectionObserver?: IntersectionObserver;

  ngAfterViewInit(): void {
    this.observeSections();
    this.updateStickyState();
    window.addEventListener('scroll', this.updateStickyState, { passive: true });
  }

  ngOnDestroy(): void {
    this.intersectionObserver?.disconnect();
    window.removeEventListener('scroll', this.updateStickyState);
  }

  onNavClick(event: Event, sectionId: string): void {
    event.preventDefault();
    this.scrollToSection(sectionId);
  }

  onContactClick(event: Event): void {
    event.preventDefault();
    this.scrollToSection('contact');
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
}
