import { Component, Input } from '@angular/core';

import { ContactInfo } from '../../models/cv.model';

@Component({
  selector: 'app-cv-header',
  standalone: false,
  templateUrl: './cv-header.component.html',
  styleUrl: './cv-header.component.css'
})
export class CvHeaderComponent {
  @Input({ required: true }) name = '';
  @Input({ required: true }) mainRole = '';
  @Input({ required: true }) professionalSummary = '';
  @Input({ required: true }) contact!: ContactInfo;
}
