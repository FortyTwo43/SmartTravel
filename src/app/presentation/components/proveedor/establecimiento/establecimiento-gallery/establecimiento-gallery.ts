import { Component, Input, OnChanges, SimpleChanges, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { GetImageUrlUseCase } from '../../../../../useCase/upload/GetImageUrlUseCase';
import { LucideAngularModule, LUCIDE_ICONS, LucideIconProvider, Camera } from 'lucide-angular';

@Component({
  selector: 'app-establecimiento-gallery',
  standalone: true,
  imports: [CommonModule, TranslateModule, LucideAngularModule],
  providers: [{
    provide: LUCIDE_ICONS,
    multi: true,
    useValue: new LucideIconProvider({ Camera })
  }],
  templateUrl: './establecimiento-gallery.html',
  styleUrl: './establecimiento-gallery.css'
})
export class EstablecimientoGalleryComponent implements OnChanges {
  @Input() images: string[] = [];

  private readonly getImageUrlUseCase = inject(GetImageUrlUseCase);

  resolvedImages = signal<string[]>([]);
  isLoading = signal<boolean>(false);

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['images'] && this.images) {
      this.loadImages();
    }
  }

  async loadImages() {
    this.isLoading.set(true);
    try {
      const promises = this.images.map(img => this.getImageUrlUseCase.execute(img, 'servicios_imagenes'));
      const urls = await Promise.all(promises);
      this.resolvedImages.set(urls.filter(url => !!url));
    } catch (error) {
      console.error('Error loading gallery images', error);
    } finally {
      this.isLoading.set(false);
    }
  }
}
