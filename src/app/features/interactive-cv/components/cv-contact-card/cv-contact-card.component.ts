import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

import { ContactInfo } from '../../../../models/cv.model';

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
}
