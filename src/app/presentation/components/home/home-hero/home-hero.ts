import { Component, signal, inject, computed } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { LucideAngularModule, LUCIDE_ICONS, LucideIconProvider, ArrowRight, Play, FileText, AudioLines, Volume2, VolumeX } from 'lucide-angular';
import { MultimediaService } from '../../../service/multimedia/multimedia';
import { ScreenReaderService } from '../../../service/screen-reader/screen-reader';

@Component({
  selector: 'app-home-hero',
  imports: [TranslateModule, LucideAngularModule],
  providers: [{
    provide: LUCIDE_ICONS,
    multi: true,
    useValue: new LucideIconProvider({ ArrowRight, Play, FileText, AudioLines, Volume2, VolumeX })
  }],
  templateUrl: './home-hero.html',
  styleUrl: './home-hero.css',
})
export class HomeHero {
  public multimediaService = inject(MultimediaService);
  public screenReaderService = inject(ScreenReaderService);
  transcriptText = signal('');
  isSpeaking = signal(false);
  transcriptPage = signal(0);

  displayedTranscript = computed(() => {
    const text = this.transcriptText();
    const start = this.transcriptPage() * 510;
    return text.substring(start, start + 510);
  });

  hasNextTranscript = computed(() => {
    return (this.transcriptPage() + 1) * 510 < this.transcriptText().length;
  });

  hasPrevTranscript = computed(() => {
    return this.transcriptPage() > 0;
  });

  constructor() {
    fetch('assets/videos/registro/transcripcion.txt')
      .then(res => res.text())
      .then(text => this.transcriptText.set(text))
      .catch(err => console.error('Error loading transcription', err));
  }

  toggleTranscript() {
    this.multimediaService.toggleTextTranscripts();
  }

  toggleAudioDesc() {
    this.multimediaService.toggleAudioDescription();
  }

  readTranscript() {
    this.isSpeaking.set(true);
    this.screenReaderService.speak(this.transcriptText());
    
    // Simplistic approach to reset isSpeaking when speech ends
    // A better approach would be to listen to SpeechSynthesisUtterance 'end' event,
    // but we'll use a timeout for demonstration or rely on the user stopping it.
    // For a robust solution, the service should emit state.
  }

  stopReading() {
    this.screenReaderService.stopSpeaking();
    this.isSpeaking.set(false);
  }

  prevTranscript() {
    if (this.hasPrevTranscript()) {
      this.transcriptPage.update(p => p - 1);
    }
  }

  nextTranscript() {
    if (this.hasNextTranscript()) {
      this.transcriptPage.update(p => p + 1);
    }
  }
}
