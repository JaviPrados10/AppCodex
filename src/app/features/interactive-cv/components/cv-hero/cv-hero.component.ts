import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import { ContactInfo } from '../../../../models/cv.model';

@Component({
  selector: 'app-cv-hero',
  standalone: true,
  imports: [MatCardModule, MatIconModule],
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
