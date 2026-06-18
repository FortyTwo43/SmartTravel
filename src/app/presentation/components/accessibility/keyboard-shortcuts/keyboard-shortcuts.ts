import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-keyboard-shortcuts',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './keyboard-shortcuts.html',
  styleUrl: './keyboard-shortcuts.css',
})
export class KeyboardShortcuts {}
