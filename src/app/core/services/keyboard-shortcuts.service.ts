import { Injectable, HostListener, signal } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class KeyboardShortcutsService {
  shortcutsEnabled = signal<boolean>(
    localStorage.getItem('smarttravel_shortcuts_enabled') !== 'false'
  );

  private shortcuts: Record<string, string> = {
    'd': '/traveler/dashboard',
    'e': '/traveler/explorar-destinos',
    'v': '/traveler/mis-viajes',
    'i': '/traveler/itinerarios',
    'f': '/traveler/favoritos',
    'p': '/traveler/perfil',
  };

  constructor(private router: Router) {
    if (typeof window !== 'undefined') {
      window.addEventListener('keydown', this.handleKeydown.bind(this));
    }
  }

  toggle() {
    this.shortcutsEnabled.update(v => !v);
    localStorage.setItem(
      'smarttravel_shortcuts_enabled',
      this.shortcutsEnabled().toString()
    );
  }

  handleKeydown(e: KeyboardEvent) {
    if (!this.shortcutsEnabled()) return;
    if (!e.altKey || e.ctrlKey || e.metaKey) return;
    
    const target = e.target as HTMLElement;
    if (target && target.tagName) {
      const tag = target.tagName.toLowerCase();
      if (tag === 'input' || tag === 'textarea') return;
    }

    const key = e.key.toLowerCase();

    if (this.shortcuts[key]) {
      e.preventDefault();
      this.router.navigate([this.shortcuts[key]]);
      return;
    }
    
    if (key === 'b') {
      e.preventDefault();
      const searchInput = document.querySelector<HTMLElement>('[data-search-input]');
      searchInput?.focus();
    }
    
    if (key === 's') {
      e.preventDefault();
      const sidebarBtn = document.querySelector<HTMLElement>('.mobile-menu-btn');
      sidebarBtn?.click();
    }
  }
}
