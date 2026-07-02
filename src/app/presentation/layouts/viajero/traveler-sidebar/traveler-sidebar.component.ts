import { Component, inject, input, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { LucideAngularModule, LUCIDE_ICONS, LucideIconProvider, LayoutDashboard, MapPin, Compass, Map, Heart, BookOpen, Settings, LogOut, ArrowRight } from 'lucide-angular';


interface NavItem {
  id: string;
  label: string;
  icon: string;
  route: string;
}

@Component({
  selector: 'app-traveler-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, TranslateModule, LucideAngularModule],
  providers: [
    {
      provide: LUCIDE_ICONS,
      multi: true,
      useValue: new LucideIconProvider({ LayoutDashboard, MapPin, Compass, Map, Heart, BookOpen, Settings, LogOut, ArrowRight })
    }
  ],
  templateUrl: './traveler-sidebar.component.html',
  styleUrl: './traveler-sidebar.component.css'
}
)
export class TravelerSidebarComponent {
  private readonly router = inject(Router);

  isOpen = input<boolean>(false);
  closeSidebar = output<void>();

  navItems: NavItem[] = [
    { id: 'dashboard', label: 'TRAVELER_SIDEBAR.DASHBOARD', icon: 'LayoutDashboard', route: '/traveler/dashboard' },
    { id: 'explore', label: 'TRAVELER_SIDEBAR.EXPLORE', icon: 'Compass', route: '/traveler/explorar-destinos' },
    { id: 'trips', label: 'TRAVELER_SIDEBAR.MY_TRIPS', icon: 'MapPin', route: '/traveler/mis-viajes' },
    { id: 'itineraries', label: 'TRAVELER_SIDEBAR.ITINERARIES', icon: 'Map', route: '/traveler/itinerarios' },
    { id: 'favorites', label: 'TRAVELER_SIDEBAR.FAVORITES', icon: 'Heart', route: '/traveler/favoritos' },
    { id: 'profile', label: 'TRAVELER_SIDEBAR.PROFILE', icon: 'BookOpen', route: '/traveler/perfil' },
  ];

  logout(): void {
    // TODO: Implement logout
    this.router.navigate(['/login']);
  }
}

