import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { ProveedorServiceCardComponent } from './proveedor-service-card';

describe('ProveedorServiceCardComponent', () => {
  let component: ProveedorServiceCardComponent;
  let fixture: ComponentFixture<ProveedorServiceCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProveedorServiceCardComponent, TranslateModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProveedorServiceCardComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
