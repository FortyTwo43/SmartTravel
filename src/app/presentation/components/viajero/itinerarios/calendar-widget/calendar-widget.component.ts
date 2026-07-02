import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, LUCIDE_ICONS, LucideIconProvider, ChevronLeft, ChevronRight } from 'lucide-angular';

@Component({
  selector: 'app-calendar-widget',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  providers: [
    {
      provide: LUCIDE_ICONS,
      multi: true,
      useValue: new LucideIconProvider({ ChevronLeft, ChevronRight })
    }
  ],
  template: `
    <div class="calendar-card">
      <div class="flex justify-between items-center mb-6">
        <h3 class="calendar-month-title">{{ month() }}</h3>
        <div class="flex gap-2">
          <button class="p-1 text-gray-400 hover:text-gray-900 transition-colors">
            <lucide-icon name="chevron-left" size="20" aria-hidden="true"></lucide-icon>
          </button>
          <button class="p-1 text-gray-400 hover:text-gray-900 transition-colors">
            <lucide-icon name="chevron-right" size="20" aria-hidden="true"></lucide-icon>
          </button>
        </div>
      </div>
      
      <div class="calendar-header-row">
        <div>S</div>
        <div>M</div>
        <div>T</div>
        <div>W</div>
        <div>T</div>
        <div>F</div>
        <div>S</div>
      </div>
      
      <div class="calendar-grid text-sm font-semibold mb-2">
        <div class="text-gray-200">29</div>
        <div class="text-gray-200">30</div>
        <div class="text-gray-200">31</div>
        <div class="text-gray-700 py-2">1</div>
        <div class="text-gray-700 py-2">2</div>
        <div class="text-gray-700 py-2">3</div>
        
        <div class="text-blue-700 bg-blue-100 py-2 rounded-lg">4</div>
        <div class="text-white bg-blue-700 py-2 rounded-lg shadow-md font-bold">5</div>
        <div class="text-blue-700 bg-blue-100 py-2 rounded-lg">6</div>
        <div class="text-blue-700 bg-blue-100 py-2 rounded-lg">7</div>
        <div class="text-blue-700 bg-blue-100 py-2 rounded-lg">8</div>
        <div class="text-blue-700 bg-blue-100 py-2 rounded-lg">9</div>
        <div class="text-blue-700 bg-blue-100 py-2 rounded-lg">10</div>
        
        <div class="text-blue-700 bg-blue-100 py-2 rounded-lg">11</div>
        <div class="text-blue-700 bg-blue-100 py-2 rounded-lg">12</div>
        <div class="text-blue-700 bg-blue-100 py-2 rounded-lg">13</div>
        <div class="text-blue-700 bg-blue-100 py-2 rounded-lg">14</div>
        <div class="text-blue-700 bg-blue-100 py-2 rounded-lg">15</div>
        <div class="text-gray-700 py-2">16</div>
        <div class="text-gray-700 py-2">17</div>
        
        <div class="text-gray-700 py-2">18</div>
        <div class="text-gray-700 py-2">19</div>
        <div class="text-gray-700 py-2">20</div>
        <div class="text-gray-700 py-2">21</div>
        <div class="text-gray-700 py-2">22</div>
        <div class="text-gray-700 py-2">23</div>
        <div class="text-gray-700 py-2">24</div>
      </div>
    </div>
  `,
  styles: [`
    .calendar-card {
      background: #1e293b;
      border-radius: 12px;
      padding: 1.5rem 1.25rem 1.25rem;
    }
    .calendar-month-title {
      font-size: 1.1rem;
      font-weight: 700;
      color: #f1f5f9;
      margin: 0;
    }
    .calendar-grid {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      gap: 4px;
      text-align: center;
    }
    .calendar-header-row {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      gap: 4px;
      text-align: center;
      color: #64748b;
      font-size: 0.75rem;
      margin-bottom: 6px;
      margin-top: 8px;
    }
    lucide-icon {
      display: inline-flex !important;
      width: 16px !important;
      height: 16px !important;
    }
  `]
})
export class CalendarWidgetComponent {
  month = input<string>('');
  activeDay = input<number>(1);
}
