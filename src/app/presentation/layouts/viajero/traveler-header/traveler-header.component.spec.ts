import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TravelerHeaderComponent } from './traveler-header.component';

describe('TravelerHeaderComponent', () => {
  let component: TravelerHeaderComponent;
  let fixture: ComponentFixture<TravelerHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TravelerHeaderComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TravelerHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display userName input', () => {
    expect(component.userName()).toBe('Viajero');
  });
});
