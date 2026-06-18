import { Component, input, output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { LucideAngularModule, LUCIDE_ICONS, LucideIconProvider, LayoutDashboard, Calendar, ConciergeBell, Store, BarChart, Bell, Settings, ArrowRight } from 'lucide-angular';

@Component({
  selector: 'app-proveedor-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, LucideAngularModule, TranslateModule],
  providers: [{
    provide: LUCIDE_ICONS,
    multi: true,
    useValue: new LucideIconProvider({ LayoutDashboard, Calendar, ConciergeBell, Store, BarChart, Bell, Settings, ArrowRight })
  }],
  templateUrl: './proveedor-sidebar.html',
  styleUrl: './proveedor-sidebar.css'
})
export class ProveedorSidebarComponent {
  isOpen = input<boolean>(false);
  closeSidebar = output<void>();

  onNavItemClick() {
    this.closeSidebar.emit();
  }
}
