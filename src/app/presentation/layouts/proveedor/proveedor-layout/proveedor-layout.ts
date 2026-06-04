import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProveedorSidebarComponent } from '../proveedor-sidebar/proveedor-sidebar';
import { ProveedorHeaderComponent } from '../proveedor-header/proveedor-header';
import { Footer } from '../../footer/footer';

@Component({
  selector: 'app-proveedor-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, ProveedorSidebarComponent, ProveedorHeaderComponent, Footer],
  templateUrl: './proveedor-layout.html',
  styleUrl: './proveedor-layout.css'
})
export class ProveedorLayoutComponent {}
