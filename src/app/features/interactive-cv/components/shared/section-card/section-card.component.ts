import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-section-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './section-card.component.html',
  styleUrl: './section-card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SectionCardComponent {
  @Input() title = '';
  @Input() kicker = '';
  @Input() compact = false;
}
