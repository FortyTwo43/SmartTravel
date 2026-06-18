import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { LucideAngularModule, LUCIDE_ICONS, LucideIconProvider, Star, Quote } from 'lucide-angular';

interface Testimonial {
  id: number;
  name: string;
  country: string;
  avatar: string;
  text: string;
  lang: string;
}

@Component({
  selector: 'app-home-testimonials',
  standalone: true,
  imports: [CommonModule, TranslateModule, LucideAngularModule],
  providers: [{
    provide: LUCIDE_ICONS,
    multi: true,
    useValue: new LucideIconProvider({ Star, Quote })
  }],
  templateUrl: './home-testimonials.html',
  styleUrls: ['./home-testimonials.css']
})
export class HomeTestimonials {
  testimonials: Testimonial[] = [
    {
      id: 1,
      name: 'Sarah Jenkins',
      country: 'USA',
      avatar: 'https://i.pravatar.cc/150?u=sarah',
      text: 'The personalized itineraries created by this AI are simply breathtaking. I explored hidden gems in Kyoto I would have never found otherwise!',
      lang: 'en'
    },
    {
      id: 2,
      name: 'Carlos Ruiz',
      country: 'España',
      avatar: 'https://i.pravatar.cc/150?u=carlos',
      text: 'Nunca pensé que una inteligencia artificial pudiera captar exactamente el tipo de viaje de aventura que buscaba. ¡Simplemente espectacular!',
      lang: 'es'
    },
    {
      id: 3,
      name: 'Marie Dubois',
      country: 'France',
      avatar: 'https://i.pravatar.cc/150?u=marie',
      text: "L'application m'a fait découvrir des restaurants incroyables à Bali. Une expérience culinaire que je n'oublierai jamais.",
      lang: 'fr'
    },
    {
      id: 4,
      name: 'Hans Müller',
      country: 'Deutschland',
      avatar: 'https://i.pravatar.cc/150?u=hans',
      text: 'Die automatische Buchungsfunktion hat mir so viel Stress erspart. Alles war perfekt organisiert.',
      lang: 'de'
    }
  ];
}

