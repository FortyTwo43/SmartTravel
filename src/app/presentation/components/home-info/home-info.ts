import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { LucideAngularModule, LUCIDE_ICONS, LucideIconProvider, ArrowRight } from 'lucide-angular';

@Component({
  selector: 'app-home-info',
  imports: [TranslateModule, LucideAngularModule],
  providers: [{
    provide: LUCIDE_ICONS,
    multi: true,
    useValue: new LucideIconProvider({ ArrowRight })
  }],
  templateUrl: './home-info.html',
  styleUrl: './home-info.css',
})
export class HomeInfo {}
