import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExploreCardComponent } from './explore-card.component';
import { ComponentRef } from '@angular/core';

describe('ExploreCardComponent', () => {
  let component: ExploreCardComponent;
  let fixture: ComponentFixture<ExploreCardComponent>;
  let componentRef: ComponentRef<ExploreCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExploreCardComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ExploreCardComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;

    // Set required inputs
    componentRef.setInput('imageUrl', 'https://example.com/image.jpg');
    componentRef.setInput('title', 'Test Title');
    componentRef.setInput('subtitle', 'Test Subtitle');

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have imageUrl input', () => {
    expect(component.imageUrl()).toBe('https://example.com/image.jpg');
  });

  it('should have title input', () => {
    expect(component.title()).toBe('Test Title');
  });

  it('should have subtitle input', () => {
    expect(component.subtitle()).toBe('Test Subtitle');
  });
});
