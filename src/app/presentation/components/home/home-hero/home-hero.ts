import { Component, signal, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { LucideAngularModule, LUCIDE_ICONS, LucideIconProvider, ArrowRight, Play, FileText, AudioLines, Volume2, VolumeX } from 'lucide-angular';
import { MultimediaService } from '../../../service/multimedia/multimedia';

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
  transcriptText = signal('');

  constructor() {
    fetch('assets/videos/transcripcion.txt')
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
}
