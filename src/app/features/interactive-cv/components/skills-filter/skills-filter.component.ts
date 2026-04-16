import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-skills-filter',
  standalone: true,
  imports: [CommonModule, MatChipsModule],
  templateUrl: './skills-filter.component.html',
  styleUrl: './skills-filter.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkillsFilterComponent {
  @Input({ required: true }) skills: string[] = [];
  @Input() selectedSkill: string | null = null;
  @Output() skillSelected = new EventEmitter<string | null>();

  selectSkill(skill: string | null): void {
    this.skillSelected.emit(skill);
  }
}
