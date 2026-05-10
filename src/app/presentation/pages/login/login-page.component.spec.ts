import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginPageComponent } from './login-page.component';
import { TranslateModule } from '@ngx-translate/core';
import { LucideAngularModule, Mail, Lock, Eye, EyeOff, Sparkles } from 'lucide-angular';

describe('LoginPageComponent', () => {
  let component: LoginPageComponent;
  let fixture: ComponentFixture<LoginPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        LoginPageComponent,
        TranslateModule.forRoot(),
        LucideAngularModule.pick({ Mail, Lock, Eye, EyeOff, Sparkles })
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
