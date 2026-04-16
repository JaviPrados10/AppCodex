import { Component, Input } from '@angular/core';

import { Experience } from '../../models/cv.model';

@Component({
  selector: 'app-experience-list',
  standalone: false,
  templateUrl: './experience-list.component.html',
  styleUrl: './experience-list.component.css'
})
export class ExperienceListComponent {
  @Input({ required: true }) experiences: Experience[] = [];
}
