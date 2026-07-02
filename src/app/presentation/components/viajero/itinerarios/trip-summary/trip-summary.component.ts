import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-trip-summary',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="trip-summary-card">
      <h3 class="summary-title">Trip Summary</h3>

      <div class="summary-row">
        <span class="summary-label">Flights</span>
        <span class="summary-value">\${{ summary()?.flights | number:'1.2-2' }}</span>
      </div>
      <div class="summary-row">
        <span class="summary-label">Accommodation</span>
        <span class="summary-value">\${{ summary()?.accommodation | number:'1.2-2' }}</span>
      </div>
      <div class="summary-row">
        <span class="summary-label">Activities</span>
        <span class="summary-value">\${{ summary()?.activities | number:'1.2-2' }}</span>
      </div>

      <div class="summary-divider"></div>

      <div class="summary-row summary-total">
        <span class="summary-label">Total Budget</span>
        <span class="summary-value total-amount">\${{ summary()?.total | number:'1.2-2' }}</span>
      </div>

      <button class="btn-secondary-action btn-full-width">Manage Expenses</button>
    </div>
  `,
  styles: [`
    .trip-summary-card {
      background: #1e293b;
      border-radius: 12px;
      padding: 1.25rem;
    }
    .summary-title {
      font-size: 1rem;
      font-weight: 700;
      color: #f1f5f9;
      margin: 0 0 1rem;
    }
    .summary-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.45rem 0;
      border-bottom: 1px solid #1e3a5220;
    }
    .summary-row:last-of-type {
      border-bottom: none;
    }
    .summary-label {
      font-size: 0.85rem;
      color: #94a3b8;
    }
    .summary-value {
      font-size: 0.85rem;
      color: #f1f5f9;
      font-weight: 500;
    }
    .summary-divider {
      height: 1px;
      background: #334155;
      margin: 0.6rem 0;
    }
    .summary-total {
      padding-top: 0.5rem;
      border-bottom: none !important;
    }
    .total-amount {
      color: #0ea5e9;
      font-size: 1rem;
      font-weight: 700;
    }
    .btn-manage {
      width: 100%;
      margin-top: 1rem;
      padding: 0.5rem;
      background: #0f172a;
      border: 1px solid #334155;
      color: #94a3b8;
      border-radius: 8px;
      cursor: pointer;
      font-size: 0.85rem;
      transition: border-color 0.2s, color 0.2s;
    }
    .btn-manage:hover {
      border-color: #0ea5e9;
      color: #0ea5e9;
    }
  `]
})
export class TripSummaryComponent {
  summary = input<any>(null);
}
