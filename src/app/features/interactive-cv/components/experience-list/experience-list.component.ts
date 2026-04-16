import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatExpansionModule } from '@angular/material/expansion';

import { Experience } from '../../../../models/cv.model';

@Component({
  selector: 'app-interactive-experience-list',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatExpansionModule, MatChipsModule],
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

  clearSelection(): void {
    this.selectedIndexChange.emit(null);
  }

  trackByExperience(_: number, experience: Experience): string {
    return `${experience.company}-${experience.dateRange}`;
  }
}
