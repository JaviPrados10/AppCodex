import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

import { ContactInfo } from '../../../../models/cv.model';

@Component({
  selector: 'app-cv-hero',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './cv-hero.component.html',
  styleUrl: './cv-hero.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CvHeroComponent {
  @Input({ required: true }) name = '';
  @Input({ required: true }) role = '';
  @Input({ required: true }) summary = '';
  @Input({ required: true }) contact!: ContactInfo;
}
