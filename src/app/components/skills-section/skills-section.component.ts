import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-skills-section',
  standalone: false,
  templateUrl: './skills-section.component.html',
  styleUrl: './skills-section.component.css'
})
export class SkillsSectionComponent {
  @Input({ required: true }) skills: string[] = [];
}
