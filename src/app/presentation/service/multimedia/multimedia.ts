import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MultimediaService {
  // Cuando es true, el video reproduce sin audio (mutado). Cuando es false, reproduce con audio.
  readonly pauseAutoAudio = signal<boolean>(true);

  togglePauseAutoAudio(): void {
    this.pauseAutoAudio.update(v => !v);
  }
}
