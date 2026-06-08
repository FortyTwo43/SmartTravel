import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LucideAngularModule, LUCIDE_ICONS, LucideIconProvider, CloudUpload, X, Image as ImageIcon } from 'lucide-angular';
import { Router } from '@angular/router';
import { UploadDestinoImageUseCase } from '../../../../../useCase/upload/UploadDestinoImageUseCase';
import { CreateDestinoUseCase } from '../../../../../useCase/destino/CreateDestinoUseCase';
import { INTERESTS } from '../../../../constants/interests.constant';

@Component({
  selector: 'app-admin-destino-form',
  standalone: true,
  imports: [CommonModule, TranslateModule, ReactiveFormsModule, LucideAngularModule],
  providers: [{
    provide: LUCIDE_ICONS,
    multi: true,
    useValue: new LucideIconProvider({ CloudUpload, X, Image: ImageIcon })
  }],
  templateUrl: './admin-destino-form.html',
  styleUrls: ['./admin-destino-form.css']
})
export class AdminDestinoFormComponent {
  private readonly fb = inject(FormBuilder);
  private readonly uploadUseCase = inject(UploadDestinoImageUseCase);
  private readonly createUseCase = inject(CreateDestinoUseCase);
  private readonly router = inject(Router);

  destinoForm: FormGroup;
  loading = signal<boolean>(false);
  error = signal<string | null>(null);
  
  selectedFile = signal<File | null>(null);
  isDragging = signal<boolean>(false);
  
  interests = INTERESTS;

  constructor() {
    this.destinoForm = this.fb.group({
      nombre: ['', Validators.required],
      ciudad: ['', Validators.required],
      pais: ['', Validators.required],
      descripcion: ['', Validators.required],
      tipo_experiencia: ['', Validators.required]
    });
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.isDragging.set(true);
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    this.isDragging.set(false);
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    this.isDragging.set(false);
    
    if (event.dataTransfer?.files.length) {
      this.handleFile(event.dataTransfer.files[0]);
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.handleFile(input.files[0]);
    }
  }

  handleFile(file: File) {
    this.error.set(null);
    const maxSizeBytes = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSizeBytes) {
      this.error.set('ADMIN_DESTINO_FORM.ERROR');
      return;
    }
    if (file.type !== 'image/png' && file.type !== 'image/jpeg') {
      this.error.set('ADMIN_DESTINO_FORM.ERROR');
      return;
    }
    this.selectedFile.set(file);
  }

  removeFile() {
    this.selectedFile.set(null);
  }

  async onSubmit() {
    if (this.destinoForm.invalid || !this.selectedFile()) {
      return;
    }

    this.loading.set(true);
    this.error.set(null);

    try {
      const file = this.selectedFile()!;
      const imagePath = await this.uploadUseCase.execute(file);
      
      const formValue = this.destinoForm.value;
      
      await this.createUseCase.execute({
        nombre: formValue.nombre,
        ciudad: formValue.ciudad,
        pais: formValue.pais,
        descripcion: formValue.descripcion,
        tipo_experiencia: formValue.tipo_experiencia,
        imagen: imagePath
      });

      this.router.navigate(['/admin/destinos']);
    } catch (err: any) {
      console.error(err);
      this.error.set(err.message || 'ADMIN_DESTINO_FORM.ERROR');
    } finally {
      this.loading.set(false);
    }
  }
}
