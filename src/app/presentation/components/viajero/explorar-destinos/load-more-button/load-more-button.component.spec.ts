import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoadMoreButtonComponent } from './load-more-button.component';
import { describe, it, expect } from 'vitest';

describe('LoadMoreButtonComponent', () => {
  let component: LoadMoreButtonComponent;
  let fixture: ComponentFixture<LoadMoreButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoadMoreButtonComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(LoadMoreButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit click event', () => {
    let emitted = false;
    component.click.subscribe(() => {
      emitted = true;
    });

    // Simulate button click
    const button = fixture.nativeElement.querySelector('button');
    button.click();

    expect(emitted).toBe(true);
  });
});
