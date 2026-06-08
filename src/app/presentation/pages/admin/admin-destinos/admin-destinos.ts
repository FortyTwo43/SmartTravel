import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { LucideAngularModule, LUCIDE_ICONS, LucideIconProvider, Plus, Search } from 'lucide-angular';
import { DestinoCardComponent } from '../../../components/admin/destinos/destino-card/destino-card';
import { SupabaseDestinoRepository } from '../../../../infrastructure/repositories/supabase/SupabaseDestinoRepository';
import { Destino } from '../../../../domain/entities/Destino';

@Component({
  selector: 'app-admin-destinos',
  standalone: true,
  imports: [CommonModule, TranslateModule, LucideAngularModule, DestinoCardComponent],
  providers: [{
    provide: LUCIDE_ICONS,
    multi: true,
    useValue: new LucideIconProvider({ Plus, Search })
  }],
  templateUrl: './admin-destinos.html',
  styleUrls: ['./admin-destinos.css']
})
export class AdminDestinosComponent implements OnInit {
  private readonly destinoRepository = inject(SupabaseDestinoRepository);

  destinos = signal<Destino[]>([]);
  isLoading = signal<boolean>(true);

  ngOnInit() {
    this.loadDestinos();
  }

  async loadDestinos() {
    try {
      this.isLoading.set(true);
      const data = await this.destinoRepository.getAll();
      this.destinos.set(data);
    } catch (error) {
      console.error('Error loading destinations', error);
    } finally {
      this.isLoading.set(false);
    }
  }
}
