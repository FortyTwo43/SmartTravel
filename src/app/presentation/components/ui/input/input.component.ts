import { Component, input, signal, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, LUCIDE_ICONS, LucideIconProvider, Eye, EyeOff, Mail, Lock } from 'lucide-angular';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-ui-input',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, ReactiveFormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    },
    {
      provide: LUCIDE_ICONS,
      multi: true,
      useValue: new LucideIconProvider({ Eye, EyeOff, Mail, Lock })
    }
  ],
  templateUrl: './input.component.html',
  styleUrl: './input.component.css'
})
export class InputComponent implements ControlValueAccessor {
  private static generateSecureId(): string {
    const array = new Uint8Array(6);
    crypto.getRandomValues(array);
    return 'input-' + Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
  }

  id = input<string>(InputComponent.generateSecureId());
  label = input<string>('');
  type = input<'text' | 'password' | 'email'>('text');
  placeholder = input<string>('');
  icon = input<string | null>(null);

  value = signal<string>('');
  showPassword = signal(false);
  disabled = signal(false);

  onChange: any = () => {};
  onTouched: any = () => {};

  writeValue(value: string): void {
    this.value.set(value);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }

  handleInput(event: Event): void {
    const val = (event.target as HTMLInputElement).value;
    this.value.set(val);
    this.onChange(val);
  }

  currentType(): string {
    if (this.type() === 'password') {
      return this.showPassword() ? 'text' : 'password';
    }
    return this.type();
  }

  togglePassword() {
    this.showPassword.update(v => !v);
  }
}
