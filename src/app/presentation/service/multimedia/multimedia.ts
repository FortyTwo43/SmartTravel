import { Injectable, signal, effect } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MultimediaService {
  private readonly STORAGE_PREFIX = 'smart-travel-multimedia-';

  // State signals
  readonly pauseAutoAudio = signal<boolean>(this.getInitialState('pause-audio', true));
  readonly textTranscripts = signal<boolean>(this.getInitialState('transcripts', false));
  readonly syncCaptions = signal<boolean>(this.getInitialState('captions', false));
  readonly audioDescription = signal<boolean>(this.getInitialState('audio-desc', false));
  readonly realtimeCaptions = signal<boolean>(this.getInitialState('realtime', false));

  // Toggles for real-time preview
  togglePauseAutoAudio(): void {
    this.pauseAutoAudio.update(v => !v);
  }
  toggleTextTranscripts(): void {
    this.textTranscripts.update(v => !v);
  }
  toggleSyncCaptions(): void {
    this.syncCaptions.update(v => !v);
  }
  toggleAudioDescription(): void {
    this.audioDescription.update(v => !v);
  }
  toggleRealtimeCaptions(): void {
    this.realtimeCaptions.update(v => !v);
  }

  // Setters for previewing specific values
  setPreferences(prefs: { pauseAutoAudio: boolean, textTranscripts: boolean, syncCaptions: boolean, audioDescription: boolean, realtimeCaptions: boolean }): void {
    this.pauseAutoAudio.set(prefs.pauseAutoAudio);
    this.textTranscripts.set(prefs.textTranscripts);
    this.syncCaptions.set(prefs.syncCaptions);
    this.audioDescription.set(prefs.audioDescription);
    this.realtimeCaptions.set(prefs.realtimeCaptions);
  }

  // Commit logic
  commitPreferences(prefs: { pauseAutoAudio: boolean, textTranscripts: boolean, syncCaptions: boolean, audioDescription: boolean, realtimeCaptions: boolean }): void {
    this.setPreferences(prefs);
    localStorage.setItem(`${this.STORAGE_PREFIX}pause-audio`, prefs.pauseAutoAudio.toString());
    localStorage.setItem(`${this.STORAGE_PREFIX}transcripts`, prefs.textTranscripts.toString());
    localStorage.setItem(`${this.STORAGE_PREFIX}captions`, prefs.syncCaptions.toString());
    localStorage.setItem(`${this.STORAGE_PREFIX}audio-desc`, prefs.audioDescription.toString());
    localStorage.setItem(`${this.STORAGE_PREFIX}realtime`, prefs.realtimeCaptions.toString());
  }

  private getInitialState(key: string, defaultValue: boolean): boolean {
    const saved = localStorage.getItem(`${this.STORAGE_PREFIX}${key}`);
    if (saved !== null) {
      return saved === 'true';
    }
    return defaultValue;
  }
}
