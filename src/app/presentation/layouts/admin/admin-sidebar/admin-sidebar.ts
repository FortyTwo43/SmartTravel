import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { LucideAngularModule, LUCIDE_ICONS, LucideIconProvider, LayoutDashboard, Inbox, MapPin, Package, BarChart, LogOut, Settings } from 'lucide-angular';
import { SupabaseAuthRepository } from '../../../../infrastructure/repositories/supabase/auth/SupabaseAuthRepository';

@Component({
  selector: 'app-admin-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, LucideAngularModule],
  providers: [{
    provide: LUCIDE_ICONS,
    multi: true,
    useValue: new LucideIconProvider({ LayoutDashboard, Inbox, MapPin, Package, BarChart, LogOut, Settings })
  }],
  templateUrl: './admin-sidebar.html',
  styleUrl: './admin-sidebar.css'
})
export class AdminSidebarComponent {
  private router = inject(Router);
  private authRepository = inject(SupabaseAuthRepository);

  async logout() {
    await this.authRepository.signOut();
    this.router.navigate(['/login']);
  }
}
