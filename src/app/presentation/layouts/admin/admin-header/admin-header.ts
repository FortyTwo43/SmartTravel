import { Component, EventEmitter, Output } from '@angular/core';
import { LucideAngularModule, LUCIDE_ICONS, LucideIconProvider, Shield, Bell, Menu } from 'lucide-angular';

@Component({
  selector: 'app-admin-header',
  standalone: true,
  imports: [LucideAngularModule],
  providers: [{
    provide: LUCIDE_ICONS,
    multi: true,
    useValue: new LucideIconProvider({ Shield, Bell, Menu })
  }],
  templateUrl: './admin-header.html',
  styleUrl: './admin-header.css'
})
export class AdminHeaderComponent {
  @Output() toggleSidebar = new EventEmitter<void>();

  onMenuClick() {
    this.toggleSidebar.emit();
  }
}
