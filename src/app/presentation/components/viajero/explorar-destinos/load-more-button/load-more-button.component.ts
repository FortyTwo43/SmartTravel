import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-load-more-button',
  standalone: true,
  imports: [CommonModule],
  template: `<div class="load-more"><button (click)="click.emit()">Cargar más destinos</button></div>`,
  styles: [`.load-more{display:flex;justify-content:center;padding:1rem}.load-more button{padding:0.6rem 1rem;border-radius:0.5rem;border:1px solid var(--border-color);background:var(--bg-surface-alt)}`]
})
export class LoadMoreButtonComponent {
  @Output() click = new EventEmitter<void>();
}
