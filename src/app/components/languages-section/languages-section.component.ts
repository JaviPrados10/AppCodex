import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-languages-section',
  standalone: false,
  templateUrl: './languages-section.component.html',
  styleUrl: './languages-section.component.css'
})
export class LanguagesSectionComponent {
  @Input({ required: true }) languages: string[] = [];
}
