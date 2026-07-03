import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-screen-reader-options',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './screen-reader-options.html',
  styleUrl: './screen-reader-options.css',
})
export class ScreenReaderOptions {
  @Input() selectedScreenReader!: {
    readFocusedElement: boolean;
    readSelectedText: boolean;
  };
  @Output() screenReaderChanged = new EventEmitter<{key: string, value: boolean}>();

  onToggle(key: string, event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    this.screenReaderChanged.emit({ key, value: checked });
  }
}
