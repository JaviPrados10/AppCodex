import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { ContactInfo, CvProfile } from '../../../../models/cv.model';
import { CvContactCardComponent } from '../cv-contact-card/cv-contact-card.component';

@Component({
  selector: 'app-cv-hero',
  standalone: true,
  imports: [CvContactCardComponent],
  templateUrl: './cv-hero.component.html',
  styleUrl: './cv-hero.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CvHeroComponent {
  @Input({ required: true }) name = '';
  @Input({ required: true }) role = '';
  @Input({ required: true }) summary = '';
  @Input({ required: true }) contact!: ContactInfo;
  @Input({ required: true }) profile!: CvProfile;
}
