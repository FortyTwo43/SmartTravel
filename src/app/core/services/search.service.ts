import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SearchService {
  searchTerm = signal<string>('');

  clearSearch() {
    this.searchTerm.set('');
  }

  setTerm(term: string) {
    this.searchTerm.set(term.trim().toLowerCase());
  }
}
