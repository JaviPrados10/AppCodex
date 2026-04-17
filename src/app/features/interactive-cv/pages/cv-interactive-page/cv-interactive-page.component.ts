import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';

import { CV_DATA } from '../../../../data/cv.data';
import { CvProfile } from '../../../../models/cv.model';
import { CvHeroComponent } from '../../components/cv-hero/cv-hero.component';
import { CvTopbarComponent, TopbarNavItem } from '../../components/cv-topbar/cv-topbar.component';
import { InteractiveExperienceListComponent } from '../../components/experience-list/experience-list.component';
import { SkillGroup, SkillsFilterComponent } from '../../components/skills-filter/skills-filter.component';
import { SectionCardComponent } from '../../components/shared/section-card/section-card.component';

@Component({
  selector: 'app-cv-interactive-page',
  standalone: true,
  imports: [CommonModule, CvTopbarComponent, CvHeroComponent, SkillsFilterComponent, InteractiveExperienceListComponent, SectionCardComponent],
  templateUrl: './cv-interactive-page.component.html',
  styleUrl: './cv-interactive-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CvInteractivePageComponent {
  readonly cvData: CvProfile = CV_DATA;
  readonly selectedSkill = signal<string | null>(null);
  readonly selectedExperienceIndex = signal<number | null>(0);

  readonly cvDownloadUrl = '/assets/cv/javier-prados-cv.pdf';
  readonly navItems: TopbarNavItem[] = [
    { id: 'experience', label: 'Experiencia' },
    { id: 'toolkit', label: 'Skills' },
    { id: 'learning', label: 'Formación', optionalOnMobile: true },
    { id: 'contact', label: 'Contacto' }
  ];

  readonly skillGroups: SkillGroup[] = [
    { title: 'Frontend', skills: ['Angular 4', 'JavaScript', 'jQuery', 'HTML5', 'CSS3', 'SCSS', 'Bootstrap'] },
    { title: 'Backend & Datos', skills: ['Java', 'Spring Boot', 'MySQL', 'Thymeleaf'] },
    { title: 'Colaboración y control', skills: ['Git', 'Subversion'] }
  ];

  readonly filteredExperiences = computed(() => {
    const selectedSkill = this.selectedSkill();

    if (!selectedSkill) {
      return this.cvData.experience;
    }

    return this.cvData.experience.filter((experience) => experience.stackHighlights.includes(selectedSkill));
  });

  onSkillSelected(skill: string | null): void {
    this.selectedSkill.set(skill);
    this.selectedExperienceIndex.set(this.filteredExperiences().length ? 0 : null);
  }

  onExperienceSelected(index: number | null): void {
    this.selectedExperienceIndex.set(index);
  }

}
