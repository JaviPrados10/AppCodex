import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

import { ContactInfo, CvProfile } from '../../../../models/cv.model';

@Component({
  selector: 'app-cv-contact-card',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './cv-contact-card.component.html',
  styleUrl: './cv-contact-card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CvContactCardComponent {
  @Input({ required: true }) contact!: ContactInfo;
  @Input({ required: true }) profile!: CvProfile;

  readonly githubUrl = 'https://github.com/';

  downloadCv(): void {
    const cvExport = this.buildCvExport();
    const blob = new Blob([cvExport], { type: 'text/plain;charset=utf-8' });
    const fileUrl = URL.createObjectURL(blob);
    const link = document.createElement('a');

    link.href = fileUrl;
    link.download = `CV-${this.profile.name.replace(/\s+/g, '-')}.txt`;
    link.click();

    URL.revokeObjectURL(fileUrl);
  }

  private buildCvExport(): string {
    const experienceText = this.profile.experience
      .map(
        (item) =>
          `- ${item.dateRange} | ${item.company} | ${item.role}\n` +
          `  Responsabilidades: ${item.responsibilities.join('; ')}\n` +
          `  Stack: ${item.stackHighlights.join(', ')}`
      )
      .join('\n\n');

    const educationText = this.profile.education.map((item) => `- ${item.degree} | ${item.institution} | ${item.date}`).join('\n');
    const coursesText = this.profile.courses
      .map((item) => `- ${item.title} (${item.hours ?? 'Sin especificar'}) - ${item.provider}`)
      .join('\n');

    return [
      `${this.profile.name}`,
      `${this.profile.mainRole}`,
      '',
      'RESUMEN PROFESIONAL',
      this.profile.professionalSummary,
      '',
      'CONTACTO',
      `Email: ${this.profile.contact.email}`,
      `Teléfono móvil: ${this.profile.contact.mobilePhone}`,
      `Teléfono fijo: ${this.profile.contact.landlinePhone}`,
      `Ubicación: ${this.profile.contact.address}`,
      `Nacionalidad: ${this.profile.contact.nationality}`,
      '',
      'EXPERIENCIA',
      experienceText,
      '',
      'SKILLS',
      this.profile.technicalSkills.join(', '),
      '',
      'FORMACIÓN',
      educationText,
      '',
      'IDIOMAS',
      this.profile.languages.join(', '),
      '',
      'CURSOS',
      coursesText,
      '',
      'OTROS DATOS',
      this.profile.otherDetails.join('\n')
    ].join('\n');
  }
}
