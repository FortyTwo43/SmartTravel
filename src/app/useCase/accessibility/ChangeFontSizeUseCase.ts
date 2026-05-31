import { Injectable, inject } from '@angular/core';
import { FontSizeService, FontSizeLevel } from '../../presentation/service/font-size/font-size.service';

@Injectable({
  providedIn: 'root'
})
export class ChangeFontSizeUseCase {
  private fontSizeService = inject(FontSizeService);

  /**
   * Execute the use case to change the font size
   * @param fontSize The font size level to apply
   */
  execute(fontSize: FontSizeLevel): void {
    this.fontSizeService.setFontSize(fontSize);
  }
}
