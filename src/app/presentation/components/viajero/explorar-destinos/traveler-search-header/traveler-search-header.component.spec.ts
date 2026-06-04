import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { TravelerSearchHeaderComponent } from './traveler-search-header.component';
import { describe, it, expect } from 'vitest';

describe('TravelerSearchHeaderComponent', () => {
  let component: TravelerSearchHeaderComponent;
  let fixture: ComponentFixture<TravelerSearchHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TravelerSearchHeaderComponent, TranslateModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TravelerSearchHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit empty search payload onSearch', () => {
    let emittedPayload: any = null;
    component.search.subscribe(p => emittedPayload = p);
    
    component.onSearch();
    
    expect(emittedPayload).toEqual({});
  });
});
