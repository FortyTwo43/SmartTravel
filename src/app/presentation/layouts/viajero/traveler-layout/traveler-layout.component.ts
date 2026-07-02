import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { TravelerSidebarComponent } from '../traveler-sidebar/traveler-sidebar.component';
import { TravelerHeaderComponent } from '../traveler-header/traveler-header.component';
import { KeyboardShortcutsService } from '../../../../core/services/keyboard-shortcuts.service';
import { SearchService } from '../../../../core/services/search.service';

@Component({
  selector: 'app-traveler-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, TravelerSidebarComponent, TravelerHeaderComponent],
  templateUrl: './traveler-layout.component.html',
  styleUrl: './traveler-layout.component.css'
})
export class TravelerLayoutComponent {
  isSidebarOpen = signal(false);

  constructor(
    private keyboardShortcuts: KeyboardShortcutsService,
    private router: Router,
    private searchService: SearchService
  ) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      if (!event.urlAfterRedirects.includes('explorar-destinos')) {
        this.searchService.clearSearch();
        const searchInput = document.querySelector<HTMLInputElement>('[data-search-input]');
        if (searchInput) {
          searchInput.value = '';
        }
      }
    });
  }

  toggleSidebar() {
    this.isSidebarOpen.update(v => !v);
  }

  closeSidebar() {
    this.isSidebarOpen.set(false);
  }
}
