import { Component, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ContrastService } from '../../../service/contrast/contrast.service';

@Component({
  selector: 'app-contrast-color',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './contrast-color.html',
  styleUrl: './contrast-color.css',
})
export class ContrastColor {
  contrastService = inject(ContrastService);
}
