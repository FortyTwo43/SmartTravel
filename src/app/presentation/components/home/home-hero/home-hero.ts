import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { LucideAngularModule, LUCIDE_ICONS, LucideIconProvider, ArrowRight, Play } from 'lucide-angular';

@Component({
  selector: 'app-home-hero',
  imports: [TranslateModule, LucideAngularModule],
  providers: [{
    provide: LUCIDE_ICONS,
    multi: true,
    useValue: new LucideIconProvider({ ArrowRight, Play })
  }],
  templateUrl: './home-hero.html',
  styleUrl: './home-hero.css',
})
export class HomeHero {}
