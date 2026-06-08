import { Component, input } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { LucideAngularModule, LUCIDE_ICONS, LucideIconProvider, MapPin, Compass } from 'lucide-angular';
import { Destino } from '../../../../../domain/entities/Destino';

@Component({
  selector: 'app-destino-card',
  standalone: true,
  imports: [CommonModule, TranslateModule, LucideAngularModule, NgOptimizedImage],
  providers: [{
    provide: LUCIDE_ICONS,
    multi: true,
    useValue: new LucideIconProvider({ MapPin, Compass })
  }],
  templateUrl: './destino-card.html',
  styleUrls: ['./destino-card.css']
})
export class DestinoCardComponent {
  destino = input.required<Destino>();
}
