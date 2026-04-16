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
  readonly cvDownloadUrl = 'assets/cv/javier-prados-cv.pdf';
}
