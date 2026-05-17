import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { LucideAngularModule, LUCIDE_ICONS, LucideIconProvider, Brain, PiggyBank, Sparkles } from 'lucide-angular';

@Component({
  selector: 'app-home-features',
  imports: [TranslateModule, LucideAngularModule],
  providers: [{
    provide: LUCIDE_ICONS,
    multi: true,
    useValue: new LucideIconProvider({ Brain, PiggyBank, Sparkles })
  }],
  templateUrl: './home-features.html',
  styleUrl: './home-features.css',
})
export class HomeFeatures {}
