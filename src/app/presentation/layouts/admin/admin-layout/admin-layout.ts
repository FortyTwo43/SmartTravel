import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AdminSidebarComponent } from '../admin-sidebar/admin-sidebar';
import { AdminHeaderComponent } from '../admin-header/admin-header';
import { Footer } from '../../footer/footer';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [RouterModule, AdminSidebarComponent, AdminHeaderComponent, Footer],
  templateUrl: './admin-layout.html',
  styleUrl: './admin-layout.css'
})
export class AdminLayoutComponent {

}
