import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { LucideAngularModule, LUCIDE_ICONS, LucideIconProvider, LayoutDashboard, Calendar, ConciergeBell, Store, BarChart, Bell, Settings } from 'lucide-angular';

@Component({
  selector: 'app-proveedor-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, LucideAngularModule, TranslateModule],
  providers: [{
    provide: LUCIDE_ICONS,
    multi: true,
    useValue: new LucideIconProvider({ LayoutDashboard, Calendar, ConciergeBell, Store, BarChart, Bell, Settings })
  }],
  templateUrl: './proveedor-sidebar.html',
  styleUrl: './proveedor-sidebar.css'
})
export class ProveedorSidebarComponent {}
