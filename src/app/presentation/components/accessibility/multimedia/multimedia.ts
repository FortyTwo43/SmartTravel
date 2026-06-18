import { Component, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { MultimediaService } from '../../../service/multimedia/multimedia';

@Component({
  selector: 'app-multimedia',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './multimedia.html',
  styleUrl: './multimedia.css',
})
export class Multimedia {
  public multimediaService = inject(MultimediaService);
}
