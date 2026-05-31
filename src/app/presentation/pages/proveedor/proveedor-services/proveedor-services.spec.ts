import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { ProveedorServicesPageComponent } from './proveedor-services';

describe('ProveedorServicesPageComponent', () => {
  let component: ProveedorServicesPageComponent;
  let fixture: ComponentFixture<ProveedorServicesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProveedorServicesPageComponent, TranslateModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProveedorServicesPageComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
