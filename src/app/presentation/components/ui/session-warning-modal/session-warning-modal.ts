import { Component, inject, effect, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { SessionService } from '../../../service/session/session.service';
import { LucideAngularModule, LUCIDE_ICONS, LucideIconProvider, AlertTriangle } from 'lucide-angular';

@Component({
  selector: 'app-session-warning-modal',
  standalone: true,
  imports: [TranslateModule, LucideAngularModule],
  providers: [{
    provide: LUCIDE_ICONS,
    multi: true,
    useValue: new LucideIconProvider({ AlertTriangle })
  }],
  templateUrl: './session-warning-modal.html',
  styleUrl: './session-warning-modal.css'
})
export class SessionWarningModalComponent implements AfterViewInit {
  sessionService = inject(SessionService);
  
  @ViewChild('dialog') dialog!: ElementRef<HTMLDialogElement>;

  constructor() {
    effect(() => {
      const show = this.sessionService.showWarning();
      if (show && this.dialog?.nativeElement) {
        if (!this.dialog.nativeElement.open) {
          this.dialog.nativeElement.showModal();
        }
      } else if (!show && this.dialog?.nativeElement) {
        if (this.dialog.nativeElement.open) {
          this.dialog.nativeElement.close();
        }
      }
    });
  }

  ngAfterViewInit() {
    // Si la señal está activa antes de montar el DOM (poco probable pero posible)
    if (this.sessionService.showWarning() && this.dialog?.nativeElement) {
      if (!this.dialog.nativeElement.open) {
        this.dialog.nativeElement.showModal();
      }
    }
  }

  continue() {
    this.sessionService.continueSession();
  }

  logout() {
    this.sessionService.logout();
  }
}
