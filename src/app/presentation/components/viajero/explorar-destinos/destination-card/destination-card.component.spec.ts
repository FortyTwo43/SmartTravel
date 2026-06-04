import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DestinationCardComponent } from './destination-card.component';
import { TranslateModule } from '@ngx-translate/core';
import { describe, it, expect, beforeEach } from 'vitest';
import { ComponentRef } from '@angular/core';
import { ExploreDestination } from '../../../../../useCase/viajero/explorar-destinos/GetExplorarDestinosUseCase';

describe('DestinationCardComponent', () => {
  let component: DestinationCardComponent;
  let fixture: ComponentFixture<DestinationCardComponent>;
  let componentRef: ComponentRef<DestinationCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DestinationCardComponent, TranslateModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DestinationCardComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    
    const dest: ExploreDestination = {
      id: 'd-1',
      nombre: 'Destino Test',
      pais: 'País Test',
      tipo_experiencia: 'Aventura',
      ratingPromedio: 4.8
    } as ExploreDestination;

    componentRef.setInput('destination', dest);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
