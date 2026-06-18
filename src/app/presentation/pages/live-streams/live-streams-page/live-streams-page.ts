import { Component, OnDestroy, signal, ChangeDetectorRef, inject, PLATFORM_ID, effect } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { LucideAngularModule, LUCIDE_ICONS, LucideIconProvider, Mic, MicOff, Users, PlayCircle } from 'lucide-angular';
import { Navbar } from '../../../layouts/navbar/navbar';
import { Footer } from '../../../layouts/footer/footer';
import { MultimediaService } from '../../../service/multimedia/multimedia';
import { AccessibilityWidget } from '../../../components/accessibility/accessibility-widget/accessibility-widget';

@Component({
  selector: 'app-live-streams-page',
  standalone: true,
  imports: [CommonModule, TranslateModule, LucideAngularModule, Navbar, Footer, AccessibilityWidget],
  providers: [{
    provide: LUCIDE_ICONS,
    multi: true,
    useValue: new LucideIconProvider({ Mic, MicOff, Users, PlayCircle })
  }],
  templateUrl: './live-streams-page.html',
  styleUrls: ['./live-streams-page.css']
})
export class LiveStreamsPageComponent implements OnDestroy {
  subtitles = signal<string>('');
  isListening = signal<boolean>(false);
  errorMessage = signal<string>('');
  
  private recognition: any;
  private platformId = inject(PLATFORM_ID);
  public multimediaService = inject(MultimediaService);
  
  recommendedStreams = [
    { id: 1, titleKey: 'LIVE_STREAMS.SIMULATED_TITLE_1', viewers: 1205, img: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?w=800&q=80', alt: 'Paisaje montañoso en Suiza' },
    { id: 2, titleKey: 'LIVE_STREAMS.SIMULATED_TITLE_2', viewers: 842, img: 'https://images.unsplash.com/photo-1493770348161-369560ae357d?w=800&q=80', alt: 'Comida callejera en Japón' },
    { id: 3, titleKey: 'LIVE_STREAMS.SIMULATED_TITLE_3', viewers: 2310, img: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80', alt: 'Buceo en el océano' },
    { id: 4, titleKey: 'LIVE_STREAMS.SIMULATED_TITLE_4', viewers: 560, img: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=80', alt: 'Atardecer mediterráneo' }
  ];

  constructor(private cdr: ChangeDetectorRef) {
    this.initSpeechRecognition();
    
    // Sync with accessibility preferences
    effect(() => {
      const isRealtimeActive = this.multimediaService.realtimeCaptions();
      if (isRealtimeActive && !this.isListening()) {
        this.startListening();
      } else if (!isRealtimeActive && this.isListening()) {
        this.stopListening();
      }
    });
  }

  ngOnDestroy() {
    this.stopListening();
  }

  initSpeechRecognition() {
    if (isPlatformBrowser(this.platformId)) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      
      if (SpeechRecognition) {
        this.recognition = new SpeechRecognition();
        this.recognition.continuous = true;
        this.recognition.interimResults = true;
        this.recognition.lang = 'es-ES';

        this.recognition.onresult = (event: any) => {
          let currentTranscript = '';
          for (let i = event.resultIndex; i < event.results.length; ++i) {
            currentTranscript += event.results[i][0].transcript;
          }
          this.subtitles.set(currentTranscript);
          this.cdr.detectChanges();
        };

        this.recognition.onerror = (event: any) => {
          if (event.error === 'not-allowed') {
            this.errorMessage.set('LIVE_STREAMS.MIC_PERMISSION_ERROR');
            this.isListening.set(false);
          } else if (event.error === 'no-speech') {
            // Ignore no-speech, let it restart in onend
          } else {
            console.error('Speech recognition error', event.error);
            this.isListening.set(false);
          }
        };

        this.recognition.onend = () => {
          if (this.isListening()) {
            // Restart automatically if it stopped but it should be listening
            this.recognition.start();
          }
        };
      } else {
        this.errorMessage.set('LIVE_STREAMS.BROWSER_NOT_SUPPORTED');
      }
    }
  }

  toggleListening() {
    this.multimediaService.toggleRealtimeCaptions();
  }

  startListening() {
    if (this.recognition) {
      try {
        this.errorMessage.set('');
        this.subtitles.set('');
        this.recognition.start();
        this.isListening.set(true);
      } catch (e) {
        // Handle case where recognition is already started
        console.error(e);
      }
    }
  }

  stopListening() {
    if (this.recognition) {
      this.isListening.set(false);
      this.recognition.stop();
    }
  }
}
