import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-animations-movement',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './animations-movement.html',
  styleUrl: './animations-movement.css',
})
export class AnimationsMovement {
  @Input() selectedAnimations!: {
    tooltipsMenus: boolean;
    pauseMotion: boolean;
    disableFlashing: boolean;
    shakeToRefresh: boolean;
  };
  @Output() animationsChanged = new EventEmitter<{key: string, value: boolean}>();

  onToggle(key: string, event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    this.animationsChanged.emit({ key, value: checked });
  }
}
