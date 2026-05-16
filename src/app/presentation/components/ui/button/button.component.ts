import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ui-button',
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css'
})
export class ButtonComponent {
  type = input<'button' | 'submit' | 'reset'>('button');
  variant = input<'primary' | 'secondary' | 'outlined' | 'inverted'>('primary');
  disabled = input<boolean>(false);
  buttonClicked = output<MouseEvent>();

  variantClass(): string {
    return `btn-${this.variant()}`;
  }
}
