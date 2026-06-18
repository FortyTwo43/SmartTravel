import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-multimedia',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './multimedia.html',
  styleUrl: './multimedia.css',
})
export class Multimedia {
  @Input() selectedMultimedia!: {
    pauseAutoAudio: boolean;
    textTranscripts: boolean;
    syncCaptions: boolean;
    audioDescription: boolean;
    realtimeCaptions: boolean;
  };
  @Output() multimediaChanged = new EventEmitter<{key: string, value: boolean}>();

  onToggle(key: string, event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    this.multimediaChanged.emit({ key, value: checked });
  }
}
