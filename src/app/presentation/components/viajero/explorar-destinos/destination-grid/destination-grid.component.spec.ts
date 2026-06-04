import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DestinationGridComponent } from './destination-grid.component';
import { describe, it, expect, beforeEach } from 'vitest';
import { ComponentRef } from '@angular/core';

describe('DestinationGridComponent', () => {
  let component: DestinationGridComponent;
  let fixture: ComponentFixture<DestinationGridComponent>;
  let componentRef: ComponentRef<DestinationGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DestinationGridComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(DestinationGridComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    
    componentRef.setInput('destinos', []);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
