import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { LucideAngularModule, LUCIDE_ICONS, LucideIconProvider, LayoutDashboard, MapPin, Compass, Map, Heart, BookOpen, Settings, LogOut } from 'lucide-angular';
import { signal, computed } from '@angular/core';

interface NavItem {
  id: string;
  label: string;
  icon: string;
  route: string;
}

@Component({
  selector: 'app-traveler-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule, LucideAngularModule],
  providers: [
    {
      provide: LUCIDE_ICONS,
      multi: true,
      useValue: new LucideIconProvider({ LayoutDashboard, MapPin, Compass, Map, Heart, BookOpen, Settings, LogOut })
    }
  ],
  templateUrl: './traveler-sidebar.component.html',
  styleUrl: './traveler-sidebar.component.css'
}
)
export class TravelerSidebarComponent {
  private readonly router = inject(Router);

  currentRoute = signal('/traveler/dashboard');

  navItems: NavItem[] = [
    { id: 'dashboard', label: 'TRAVELER_SIDEBAR.DASHBOARD', icon: 'LayoutDashboard', route: '/traveler/dashboard' },
    { id: 'explore', label: 'TRAVELER_SIDEBAR.EXPLORE', icon: 'Compass', route: '/traveler/explore' },
    { id: 'trips', label: 'TRAVELER_SIDEBAR.MY_TRIPS', icon: 'MapPin', route: '/traveler/trips' },
    { id: 'itineraries', label: 'TRAVELER_SIDEBAR.ITINERARIES', icon: 'Map', route: '/traveler/itineraries' },
    { id: 'favorites', label: 'TRAVELER_SIDEBAR.FAVORITES', icon: 'Heart', route: '/traveler/favorites' },
    { id: 'profile', label: 'TRAVELER_SIDEBAR.PROFILE', icon: 'BookOpen', route: '/traveler/profile' },
  ];

  isActiveRoute = (route: string): boolean => {
    return this.currentRoute() === route;
  };

  navigate(route: string): void {
    this.currentRoute.set(route);
    this.router.navigate([route]);
  }

  logout(): void {
    // TODO: Implement logout
    this.router.navigate(['/login']);
  }
}
