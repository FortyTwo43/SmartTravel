import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, LUCIDE_ICONS, LucideIconProvider, LayoutDashboard, Calendar, ConciergeBell, Users, BarChart, Bell, Settings } from 'lucide-angular';

@Component({
  selector: 'app-proveedor-sidebar',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  providers: [{
    provide: LUCIDE_ICONS,
    multi: true,
    useValue: new LucideIconProvider({ LayoutDashboard, Calendar, ConciergeBell, Users, BarChart, Bell, Settings })
  }],
  templateUrl: './proveedor-sidebar.html',
  styleUrl: './proveedor-sidebar.css'
})
export class ProveedorSidebarComponent {
}
