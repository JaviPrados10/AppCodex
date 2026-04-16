import { Component, Input } from '@angular/core';

import { EducationItem } from '../../models/cv.model';

@Component({
  selector: 'app-education-section',
  standalone: false,
  templateUrl: './education-section.component.html',
  styleUrl: './education-section.component.css'
})
export class EducationSectionComponent {
  @Input({ required: true }) educationItems: EducationItem[] = [];
}
