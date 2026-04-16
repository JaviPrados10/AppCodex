import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { Experience } from '../../../../models/cv.model';

@Component({
  selector: 'app-interactive-experience-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './experience-list.component.html',
  styleUrl: './experience-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InteractiveExperienceListComponent {
  @Input({ required: true }) experiences: Experience[] = [];
  @Input() selectedIndex: number | null = null;
  @Output() selectedIndexChange = new EventEmitter<number | null>();

  select(index: number): void {
    this.selectedIndexChange.emit(index);
  }

  trackByExperience(_: number, experience: Experience): string {
    return `${experience.company}-${experience.dateRange}`;
  }
}
