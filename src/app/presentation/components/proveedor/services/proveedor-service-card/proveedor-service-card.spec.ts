import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { ProveedorServiceCardComponent } from './proveedor-service-card';
import { describe, it, expect } from 'vitest';
import { ComponentRef } from '@angular/core';
import { provideRouter } from '@angular/router';

describe('ProveedorServiceCardComponent', () => {
  let component: ProveedorServiceCardComponent;
  let fixture: ComponentFixture<ProveedorServiceCardComponent>;
  let componentRef: ComponentRef<ProveedorServiceCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProveedorServiceCardComponent, TranslateModule.forRoot()],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(ProveedorServiceCardComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    
    // Set required input
    componentRef.setInput('service', {
      id: '1',
      nombre: 'Test',
      descripcion: 'Test desc',
      precio: 100,
      comodidadesAdicionales: 'wifi, tv',
      disponibilidad: true,
      establecimientoNombre: 'Hotel'
    });
    
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should parse amenities correctly', () => {
    expect(component.amenities).toEqual(['wifi', 'tv']);
  });

  it('should format truncated description correctly for short descriptions', () => {
    expect(component.truncatedDescription).toBe('Test desc');
  });

  it('should emit availabilityChanged on toggleAvailability', () => {
    let emittedValue = null;
    component.availabilityChanged.subscribe(val => {
      emittedValue = val;
    });

    component.toggleAvailability();
    
    // Initial availability is true, so it should emit false
    expect(emittedValue).toBe(false);
  });
});
