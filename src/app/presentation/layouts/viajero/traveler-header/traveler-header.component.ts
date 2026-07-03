import { Component, inject, output, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { SharedTravelerDataService } from '../../../service/shared/shared-traveler-data.service';
import { SearchService } from '../../../../core/services/search.service';
import { LucideAngularModule, LUCIDE_ICONS, LucideIconProvider, Menu } from 'lucide-angular';

@Component({
  selector: 'app-traveler-header',
  standalone: true,
  imports: [CommonModule, TranslateModule, LucideAngularModule],
  providers: [{
    provide: LUCIDE_ICONS,
    multi: true,
    useValue: new LucideIconProvider({ Menu })
  }],
  templateUrl: './traveler-header.component.html',
  styleUrl: './traveler-header.component.css'
})
export class TravelerHeaderComponent implements OnInit {
  private sharedTravelerData = inject(SharedTravelerDataService);
  private searchService = inject(SearchService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  protected dashboardData = this.sharedTravelerData.dashboardData;
  toggleSidebar = output<void>();

  inputValue = signal<string>('');
  private timeoutId: any;

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const q = params['q'];
      if (q) {
        this.inputValue.set(q);
      }
    });
  }

  getUserName(): string {
    return this.sharedTravelerData.getUserName();
  }

  onSearchInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.inputValue.set(value);
    
    if (this.timeoutId) clearTimeout(this.timeoutId);
    
    this.timeoutId = setTimeout(() => {
      if (this.router.url.includes('explorar-destinos')) {
        this.searchService.setTerm(value);
        this.router.navigate([], {
          relativeTo: this.route,
          queryParams: { q: value || null },
          queryParamsHandling: 'merge'
        });
      }
    }, 400);
  }

  onEnter() {
    if (this.timeoutId) clearTimeout(this.timeoutId);
    const value = this.inputValue();
    
    if (this.router.url.includes('explorar-destinos')) {
      this.searchService.setTerm(value);
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { q: value || null },
        queryParamsHandling: 'merge'
      });
    } else {
      this.router.navigate(['/traveler/explorar-destinos'], {
        queryParams: { q: value || null }
      });
    }
  }
}

