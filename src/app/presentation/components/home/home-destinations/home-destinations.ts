import { Component, OnInit, OnDestroy, signal, computed, ChangeDetectionStrategy, HostListener } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import {
  LucideAngularModule,
  LUCIDE_ICONS,
  LucideIconProvider,
  ExternalLink,
  Star,
  Heart,
  Pause,
  Play
} from 'lucide-angular';

interface Destination {
  key: string;
  descKey: string;
  imgSrc: string;
  rating: number;
  price: number;
  currency: string;
}

@Component({
  selector: 'app-home-destinations',
  imports: [TranslateModule, LucideAngularModule, DecimalPipe],
  providers: [{
    provide: LUCIDE_ICONS,
    multi: true,
    useValue: new LucideIconProvider({ ExternalLink, Star, Heart, Pause, Play })
  }],
  templateUrl: './home-destinations.html',
  styleUrl: './home-destinations.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeDestinations implements OnInit, OnDestroy {
  readonly destinations: Destination[] = [
    {
      key: 'HOME.DESTINATIONS.MALDIVES',
      descKey: 'HOME.DESTINATIONS.MALDIVES_DESC',
      imgSrc: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAxRmQD6Vk4BPcSgpgQG5ilc8uE52pOYPriZOyGdW16JvBEwiX-ivdSCeTPdVFSVuVfrrGkNI997Aa8BjC3OjxeUYOLfzo-kwkGvVW4ZO-vHN4m_auPUUlnaM8jbajvHzQ8IBSWTRu1kWVO2zFDkBcMiynwBfnxiFCZYDAd-qAjxGbxcc00PIAvtON1aCj-kXiA9MAvGFNQmHANpx5aQjRMIZq-T1ccSA55wduHSdzyQZviuDWNZ8g1FxSmS78RDoainInDIugTR7k',
      rating: 4.9,
      price: 1200,
      currency: 'USD'
    },
    {
      key: 'HOME.DESTINATIONS.KYOTO',
      descKey: 'HOME.DESTINATIONS.KYOTO_DESC',
      imgSrc: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDUXIUND8JUkmIOttzfzYHq2Y375eFVffN0rrvtN4_OhkaxkP9tHU3GC7eaddtqW9IwLIzD7PXwcWO-JQSUN-FZjv7FvtaYSUM55kQRLtAu6pI8kIBtJY0Fs_UswXvoDfN8VkxPPWbpA60pjZmYSycl2Cd8zzcULT4kXghQOwz_Cgj8oSLcQw0LDP626vq-x7gi5NIEpIleGs2u7OhZODhuDO4nQsSrj0eh0KNNn-DN0EXyYFo5gN574yRCgGA6b-wTOGgr6WueyHY',
      rating: 4.8,
      price: 950,
      currency: 'USD'
    },
    {
      key: 'HOME.DESTINATIONS.DUBAI',
      descKey: 'HOME.DESTINATIONS.DUBAI_DESC',
      imgSrc: 'https://lh3.googleusercontent.com/aida-public/AB6AXuARGUoQpZueF0rcvfMaIlfPxiBhDg2UIeRz_QLZoAxBFwJG8V-ElcEtW-UbT6U7UoeGg5x-OZVCommUvEcfK7IxEehQJ1j2Cc8v343Jp2PUH_13BOhcDO2X1mfToSLFYfWvcijChI62tyVVoMPnBfp-htBY5xSMqkTpWlYQEv-r6yITKxeNwrlBfvOonu6Pzx71RUgTNaxaVcVr56sY9uoSYIWTyw6r4yvsBs3Z89q7_CMJpZllHA0wGFDWeDVF_4vHSMPT9jwJLXs',
      rating: 5.0,
      price: 1500,
      currency: 'USD'
    },
    {
      key: 'HOME.DESTINATIONS.SANTORINI',
      descKey: 'HOME.DESTINATIONS.SANTORINI_DESC',
      imgSrc: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDK3w5ubb6jOSRZJMR9N6X46OGul2LuGG5cvbz9WfoKhZObguyMhc1SjFVSBEmp-DO5vcSyZ00UVHN_0oz2LYwuDuWKtE0FgPM3pMjbuM9aCROqind-a7lvg--V5CVZma6m7gbwJOQ6_dcSch1g2gsOcD4jWoAKvDtRksGtHbcjZeBBATGUoW6y82mn5V3aJ6hgDtabtyfZbYa-aANlp4RBYu_gD9r-xSxDS1qARNoiyFcN_dCfOL4v3ishOWRPIM1ZBL67FcAn8zk',
      rating: 4.7,
      price: 800,
      currency: 'USD'
    },
    {
      key: 'HOME.DESTINATIONS.PARIS',
      descKey: 'HOME.DESTINATIONS.PARIS_DESC',
      imgSrc: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34',
      rating: 4.9,
      price: 1100,
      currency: 'USD'
    },
    {
      key: 'HOME.DESTINATIONS.BALI',
      descKey: 'HOME.DESTINATIONS.BALI_DESC',
      imgSrc: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4',
      rating: 4.8,
      price: 900,
      currency: 'USD'
    },
    {
      key: 'HOME.DESTINATIONS.NEW_YORK',
      descKey: 'HOME.DESTINATIONS.NEW_YORK_DESC',
      imgSrc: 'https://images.unsplash.com/photo-1499092346589-b9b6be3e94b2',
      rating: 4.7,
      price: 1300,
      currency: 'USD'
    },
    {
      key: 'HOME.DESTINATIONS.MACHU_PICCHU',
      descKey: 'HOME.DESTINATIONS.MACHU_PICCHU_DESC',
      imgSrc: 'https://images.unsplash.com/photo-1526392060635-9d6019884377',
      rating: 5.0,
      price: 1400,
      currency: 'USD'
    }
  ];

  readonly currentIndex = signal(0);
  readonly isPaused = signal(false);
  readonly total = this.destinations.length;

  private getVisibleItems(): number {
    if (typeof window === 'undefined') return 4;
    const width = window.innerWidth;
    if (width >= 1024) return 4;
    if (width >= 640) return 2;
    return 1;
  }

  readonly visibleItems = signal(this.getVisibleItems());
  readonly maxIndex = computed(() => Math.max(0, this.total - this.visibleItems()));
  readonly dots = computed(() => Array.from({ length: this.maxIndex() + 1 }, (_, i) => i));

  @HostListener('window:resize')
  onResize() {
    this.visibleItems.set(this.getVisibleItems());
    if (this.currentIndex() > this.maxIndex()) {
      this.currentIndex.set(this.maxIndex());
    }
  }
  private intervalId: ReturnType<typeof setInterval> | null = null;
  private readonly intervalMs = 4000;

  ngOnInit(): void {
    this.startAutoplay();
  }

  ngOnDestroy(): void {
    this.stopAutoplay();
  }

  private startAutoplay(): void {
    this.intervalId = setInterval(() => {
      if (!this.isPaused()) {
        this.next();
      }
    }, this.intervalMs);
  }

  private stopAutoplay(): void {
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  next(): void {
    this.currentIndex.update(i => (i >= this.maxIndex() ? 0 : i + 1));
  }

  prev(): void {
    this.currentIndex.update(i => (i <= 0 ? this.maxIndex() : i - 1));
  }

  goTo(index: number): void {
    this.currentIndex.set(index);
  }

  togglePause(): void {
    this.isPaused.update(v => !v);
  }
}
