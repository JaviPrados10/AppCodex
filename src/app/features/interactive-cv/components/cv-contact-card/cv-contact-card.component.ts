import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

import { ContactInfo, CvProfile } from '../../../../models/cv.model';

@Component({
  selector: 'app-cv-contact-card',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './cv-contact-card.component.html',
  styleUrl: './cv-contact-card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CvContactCardComponent {
  @Input({ required: true }) contact!: ContactInfo;
  @Input({ required: true }) profile!: CvProfile;
  @Input() isPrintMode = false;
  @Output() printRequested = new EventEmitter<Event>();

  readonly githubUrl = 'https://github.com/';

  requestPrint(event: Event): void {
    this.printRequested.emit(event);
  }
}
