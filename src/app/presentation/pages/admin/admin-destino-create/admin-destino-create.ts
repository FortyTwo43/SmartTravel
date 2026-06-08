import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { LucideAngularModule, LUCIDE_ICONS, LucideIconProvider, ArrowLeft } from 'lucide-angular';
import { AdminDestinoFormComponent } from '../../../components/admin/destinos/admin-destino-form/admin-destino-form';

@Component({
  selector: 'app-admin-destino-create',
  standalone: true,
  imports: [CommonModule, TranslateModule, RouterModule, LucideAngularModule, AdminDestinoFormComponent],
  providers: [{
    provide: LUCIDE_ICONS,
    multi: true,
    useValue: new LucideIconProvider({ ArrowLeft })
  }],
  templateUrl: './admin-destino-create.html',
  styleUrls: ['./admin-destino-create.css']
})
export class AdminDestinoCreateComponent {}
