import { Injectable, signal, inject, NgZone, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { SupabaseAuthRepository } from '../../../infrastructure/repositories/supabase/auth/SupabaseAuthRepository';

@Injectable({
  providedIn: 'root'
})
export class SessionService implements OnDestroy {
  private authRepository = inject(SupabaseAuthRepository);
  private router = inject(Router);
  private ngZone = inject(NgZone);

  // 5 minutos de tiempo total, aviso a los 3 minutos
  private readonly TOTAL_TIMEOUT_MS = 5 * 60 * 1000;
  private readonly WARNING_TIMEOUT_MS = 3 * 60 * 1000;

  private timeoutId: any;
  private warningId: any;
  
  public showWarning = signal(false);
  private userInteracting = false;

  constructor() {
    this.setupListeners();
    this.resetTimers();
  }

  private setupListeners() {
    this.ngZone.runOutsideAngular(() => {
      window.addEventListener('mousemove', this.onUserAction);
      window.addEventListener('keydown', this.onUserAction);
      window.addEventListener('click', this.onUserAction);
      window.addEventListener('scroll', this.onUserAction);
    });
  }

  private removeListeners() {
    window.removeEventListener('mousemove', this.onUserAction);
    window.removeEventListener('keydown', this.onUserAction);
    window.removeEventListener('click', this.onUserAction);
    window.removeEventListener('scroll', this.onUserAction);
  }

  private onUserAction = () => {
    // Solo reiniciamos si no estamos mostrando la advertencia
    if (!this.showWarning()) {
      if (!this.userInteracting) {
        this.userInteracting = true;
        setTimeout(() => {
          this.ngZone.run(() => {
            this.resetTimers();
          });
          this.userInteracting = false;
        }, 500); // Throttling de eventos
      }
    }
  };

  public continueSession() {
    this.showWarning.set(false);
    this.resetTimers();
  }

  public async logout() {
    this.clearTimers();
    this.showWarning.set(false);
    await this.authRepository.signOut();
    this.ngZone.run(() => {
      this.router.navigate(['/login']);
    });
  }

  private resetTimers() {
    this.clearTimers();

    this.warningId = setTimeout(() => {
      this.ngZone.run(() => {
        this.showWarning.set(true);
      });
    }, this.WARNING_TIMEOUT_MS);

    this.timeoutId = setTimeout(() => {
      this.ngZone.run(() => {
        this.logout();
      });
    }, this.TOTAL_TIMEOUT_MS);
  }

  private clearTimers() {
    if (this.warningId) {
      clearTimeout(this.warningId);
    }
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  }

  ngOnDestroy() {
    this.removeListeners();
    this.clearTimers();
  }
}
