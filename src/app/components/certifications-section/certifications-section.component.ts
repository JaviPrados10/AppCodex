import { Component, Input } from '@angular/core';

import { CourseItem } from '../../models/cv.model';

@Component({
  selector: 'app-certifications-section',
  standalone: false,
  templateUrl: './certifications-section.component.html',
  styleUrl: './certifications-section.component.css'
})
export class CertificationsSectionComponent {
  @Input({ required: true }) courses: CourseItem[] = [];
  @Input() otherDetails: string[] = [];
}
