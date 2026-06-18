import { Component, signal } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { LucideAngularModule, LUCIDE_ICONS, LucideIconProvider, ArrowRight, Play, FileText, AudioLines } from 'lucide-angular';

@Component({
  selector: 'app-home-hero',
  imports: [TranslateModule, LucideAngularModule],
  providers: [{
    provide: LUCIDE_ICONS,
    multi: true,
    useValue: new LucideIconProvider({ ArrowRight, Play, FileText, AudioLines })
  }],
  templateUrl: './home-hero.html',
  styleUrl: './home-hero.css',
})
export class HomeHero {
  isTranscriptVisible = signal(false);
  isAudioDescActive = signal(false);
  transcriptText = signal('');

  constructor() {
    fetch('assets/videos/transcripcion.txt')
      .then(res => res.text())
      .then(text => this.transcriptText.set(text))
      .catch(err => console.error('Error loading transcription', err));
  }

  toggleTranscript() {
    this.isTranscriptVisible.update(v => !v);
  }

  toggleAudioDesc() {
    this.isAudioDescActive.update(v => !v);
  }
}
