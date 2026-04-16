import { Component } from '@angular/core';

import { CV_DATA } from '../../data/cv.data';
import { CvProfile } from '../../models/cv.model';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  readonly cvData: CvProfile = CV_DATA;
}
