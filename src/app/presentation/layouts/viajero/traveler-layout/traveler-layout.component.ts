import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TravelerSidebarComponent } from '../traveler-sidebar/traveler-sidebar.component';
import { TravelerHeaderComponent } from '../traveler-header/traveler-header.component';

@Component({
  selector: 'app-traveler-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, TravelerSidebarComponent, TravelerHeaderComponent],
  templateUrl: './traveler-layout.component.html',
  styleUrl: './traveler-layout.component.css'
})
export class TravelerLayoutComponent {
  isSidebarOpen = signal(false);

  toggleSidebar() {
    this.isSidebarOpen.update(v => !v);
  }

  closeSidebar() {
    this.isSidebarOpen.set(false);
  }
}
