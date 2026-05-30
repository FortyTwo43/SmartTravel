import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

export interface TravelType {
  id: string;
  label: string;
}

@Component({
  selector: 'app-travel-preferences',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TranslateModule],
  templateUrl: './travel-preferences.component.html',
  styleUrl: './travel-preferences.component.css'
})
export class TravelPreferencesComponent {
  travelTypes = input.required<TravelType[]>();
  selectedTravelType = input.required<string>();
  form = input.required<FormGroup>();
  budgetFormatted = input.required<string>();

  travelTypeChanged = output<string>();

  select(id: string): void {
    this.travelTypeChanged.emit(id);
  }
}
