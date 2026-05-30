import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { LucideAngularModule, LUCIDE_ICONS, LucideIconProvider, Activity, Utensils, Landmark, Leaf, Umbrella, Mountain, BookOpen, Monitor, Coffee, Camera, Compass } from 'lucide-angular';

export interface Interest {
  id: string;
  label: string;
  icon: string;
}

@Component({
  selector: 'app-interests-selector',
  standalone: true,
  imports: [CommonModule, TranslateModule, LucideAngularModule],
  providers: [
    {
      provide: LUCIDE_ICONS,
      multi: true,
      useValue: new LucideIconProvider({ Activity, Utensils, Landmark, Leaf, Umbrella, Mountain, BookOpen, Monitor, Coffee, Camera, Compass })
    }
  ],
  templateUrl: './interests-selector.component.html',
  styleUrl: './interests-selector.component.css'
})
export class InterestsSelectorComponent {
  interests = input.required<Interest[]>();
  selectedInterests = input.required<string[]>();

  interestToggled = output<string>();

  isSelected(id: string): boolean {
    return this.selectedInterests().includes(id);
  }

  toggle(id: string): void {
    this.interestToggled.emit(id);
  }
}
