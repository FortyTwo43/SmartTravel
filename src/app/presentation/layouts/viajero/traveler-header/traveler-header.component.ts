import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-traveler-header',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './traveler-header.component.html',
  styleUrl: './traveler-header.component.css'
})
export class TravelerHeaderComponent {
  userName = input<string>('Viajero');
}
