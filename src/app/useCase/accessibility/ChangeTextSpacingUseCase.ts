import { Injectable, inject } from '@angular/core';
import { TextSpacingService, TextSpacingLevel } from '../../presentation/service/text-spacing/text-spacing.service';

@Injectable({
  providedIn: 'root'
})
export class ChangeTextSpacingUseCase {
  private textSpacingService = inject(TextSpacingService);

  execute(textSpacing: TextSpacingLevel): void {
    this.textSpacingService.setTextSpacing(textSpacing);
  }
}
