import { Component, signal } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { LucideAngularModule, LUCIDE_ICONS, LucideIconProvider, Accessibility, ArrowLeft } from 'lucide-angular';
import { Navbar } from '../../layouts/navbar/navbar';
import { Footer } from '../../layouts/footer/footer';
import { HomeHero } from '../../components/home/home-hero/home-hero';
import { HomeFeatures } from '../../components/home/home-features/home-features';
import { HomeInfo } from '../../components/home/home-info/home-info';
import { HomeDestinations } from '../../components/home/home-destinations/home-destinations';
import { HomeCta } from '../../components/home/home-cta/home-cta';
import { AccessibilityComponent } from '../accessibility/accessibility.component';

@Component({
  selector: 'app-home',
  imports: [
    Navbar,
    Footer,
    HomeHero,
    HomeFeatures,
    HomeInfo,
    HomeDestinations,
    HomeCta,
    AccessibilityComponent,
    LucideAngularModule,
    TranslateModule
  ],
  providers: [{
    provide: LUCIDE_ICONS,
    multi: true,
    useValue: new LucideIconProvider({ Accessibility, ArrowLeft })
  }],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  readonly isAccessibilityMenuOpen = signal(false);

  toggleAccessibilityMenu(): void {
    this.isAccessibilityMenuOpen.update(v => !v);
  }
}
