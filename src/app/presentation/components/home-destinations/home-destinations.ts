import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { LucideAngularModule, LUCIDE_ICONS, LucideIconProvider, ExternalLink, Star, Heart } from 'lucide-angular';

@Component({
  selector: 'app-home-destinations',
  imports: [TranslateModule, LucideAngularModule],
  providers: [{
    provide: LUCIDE_ICONS,
    multi: true,
    useValue: new LucideIconProvider({ ExternalLink, Star, Heart })
  }],
  templateUrl: './home-destinations.html',
  styleUrl: './home-destinations.css',
})
export class HomeDestinations {}
