import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TravelerHeaderComponent } from './traveler-header.component';
import { TranslateModule } from '@ngx-translate/core';
import { SharedTravelerDataService } from '../../../service/shared/shared-traveler-data.service';
import { describe, it, expect, vi } from 'vitest';

describe('TravelerHeaderComponent', () => {
  let component: TravelerHeaderComponent;
  let fixture: ComponentFixture<TravelerHeaderComponent>;
  let mockSharedTravelerDataService: any;

  beforeEach(async () => {
    mockSharedTravelerDataService = {
      dashboardData: {},
      getUserName: vi.fn().mockReturnValue('Carlos')
    };

    await TestBed.configureTestingModule({
      imports: [TravelerHeaderComponent, TranslateModule.forRoot()],
      providers: [
        { provide: SharedTravelerDataService, useValue: mockSharedTravelerDataService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TravelerHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get userName from service', () => {
    expect(component.getUserName()).toBe('Carlos');
    expect(mockSharedTravelerDataService.getUserName).toHaveBeenCalled();
  });
});
