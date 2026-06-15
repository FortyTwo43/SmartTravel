import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormArray, ReactiveFormsModule, Validators, AbstractControl } from '@angular/forms';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { LucideAngularModule, LUCIDE_ICONS, LucideIconProvider, ArrowLeft, Save, Plus, Trash2, CloudUpload, Image as ImageIcon, X } from 'lucide-angular';
import { CreateProveedorServiceUseCase } from '../../../../useCase/proveedor/services/CreateProveedorServiceUseCase';
import { UpdateProveedorServiceUseCase } from '../../../../useCase/proveedor/services/UpdateProveedorServiceUseCase';
import { GetProveedorServiceUseCase } from '../../../../useCase/proveedor/services/GetProveedorServiceUseCase';
import { LoadEstablecimientosUseCase } from '../../../../useCase/proveedor/services/LoadEstablecimientosUseCase';
import { UploadServicioImageUseCase } from '../../../../useCase/upload/UploadServicioImageUseCase';
import { EstablecimientoTuristico } from '../../../../domain/entities/EstablecimientoTuristico';
import { CreateServicioReservableDto, UpdateServicioReservableDto } from '../../../../domain/entities/dtos';

@Component({
  selector: 'app-proveedor-service-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TranslateModule, LucideAngularModule, RouterLink],
  templateUrl: './proveedor-service-form.html',
  styleUrls: ['./proveedor-service-form.css'],
  providers: [
    {
      provide: LUCIDE_ICONS,
      multi: true,
      useValue: new LucideIconProvider({ ArrowLeft, Save, Plus, Trash2, CloudUpload, Image: ImageIcon, X })
    }
  ]
})
export class ProveedorServiceFormComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly createServiceUseCase = inject(CreateProveedorServiceUseCase);
  private readonly updateServiceUseCase = inject(UpdateProveedorServiceUseCase);
  private readonly getServiceUseCase = inject(GetProveedorServiceUseCase);
  private readonly loadEstablecimientosUseCase = inject(LoadEstablecimientosUseCase);
  private readonly uploadImageUseCase = inject(UploadServicioImageUseCase);

  public serviceForm!: FormGroup;
  public establecimientos = signal<EstablecimientoTuristico[]>([]);
  public loading = signal<boolean>(false);
  public loadingEstablecimientos = signal<boolean>(true);
  public error = signal<string | null>(null);
  public isEditMode = signal<boolean>(false);
  private editId: string | null = null;
  public selectedFile = signal<File | null>(null);
  public isDragging = signal<boolean>(false);

  ngOnInit(): void {
    this.editId = this.route.snapshot.paramMap.get('id');
    this.isEditMode.set(!!this.editId);
    this.initForm();
    void this.loadEstablecimientos();
  }

  private initForm(): void {
    this.serviceForm = this.fb.group({
      nombre: ['', [Validators.required]],
      precio: [null, [Validators.required, (control: AbstractControl) => control.value > 0 ? null : { greaterThanZero: true }]],
      descripcion: ['', [Validators.required]],
      comodidades_adicionales: this.fb.array([this.fb.control('')]),
      disponibilidad: [true],
      id_establecimiento: ['', [Validators.required]]
    });
  }

  get comodidadesArray(): FormArray {
    return this.serviceForm.get('comodidades_adicionales') as FormArray;
  }

  public addComodidad(): void {
    this.comodidadesArray.push(this.fb.control(''));
  }

  public removeComodidad(index: number): void {
    this.comodidadesArray.removeAt(index);
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
    
    if (event.dataTransfer?.files && event.dataTransfer.files.length > 0) {
      this.handleFile(event.dataTransfer.files[0]);
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.handleFile(input.files[0]);
    }
  }

  private handleFile(file: File) {
    const validTypes = ['image/jpeg', 'image/png'];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!validTypes.includes(file.type)) {
      this.error.set('REGISTER.ERROR_FILE_TYPE');
      return;
    }

    if (file.size > maxSize) {
      this.error.set('REGISTER.ERROR_FILE_SIZE');
      return;
    }

    this.selectedFile.set(file);
    this.error.set(null);
  }

  removeFile() {
    this.selectedFile.set(null);
  }

  private async loadEstablecimientos(): Promise<void> {
    try {
      this.loadingEstablecimientos.set(true);
      const data = await this.loadEstablecimientosUseCase.execute();
      this.establecimientos.set(data);

      if (data.length === 1) {
        this.serviceForm.patchValue({ id_establecimiento: data[0].id });
      }

      if (this.editId) {
        await this.loadServiceForEdit(this.editId);
      }
    } catch (err) {
      console.error(err);
      this.error.set('PROVIDER_SERVICES.FORM.ERROR');
    } finally {
      this.loadingEstablecimientos.set(false);
    }
  }

  private async loadServiceForEdit(id: string): Promise<void> {
    const service = await this.getServiceUseCase.execute(id);
    if (!service) {
      this.error.set('PROVIDER_SERVICES.FORM.ERROR');
      return;
    }

    // Parse comodidades into individual controls
    const comodidades = service.comodidades_adicionales
      .split(',')
      .map(c => c.trim())
      .filter(c => c.length > 0);

    const array = this.comodidadesArray;
    // Clear the default empty control
    while (array.length > 0) array.removeAt(0);
    // Add one control per comodidad, or at least one empty
    if (comodidades.length > 0) {
      comodidades.forEach(c => array.push(this.fb.control(c)));
    } else {
      array.push(this.fb.control(''));
    }

    this.serviceForm.patchValue({
      nombre: service.nombre,
      precio: service.precio,
      descripcion: service.descripcion,
      disponibilidad: service.disponibilidad,
      id_establecimiento: service.id_establecimiento
    });
  }

  public async onSubmit(): Promise<void> {
    if (this.serviceForm.invalid) {
      this.serviceForm.markAllAsTouched();
      return;
    }

    if (!this.isEditMode() && !this.selectedFile()) {
      this.error.set('Por favor selecciona una imagen para el servicio');
      return;
    }

    try {
      this.loading.set(true);
      this.error.set(null);

      const rawValue = this.serviceForm.value;
      const comodidades = (rawValue.comodidades_adicionales as string[])
        .map(c => c.trim())
        .filter(c => c.length > 0)
        .join(', ');

      let imageUrl: string | undefined = undefined;
      if (this.selectedFile()) {
        imageUrl = await this.uploadImageUseCase.execute(this.selectedFile()!);
      }

      if (this.isEditMode() && this.editId) {
        const dto: UpdateServicioReservableDto = {
          ...rawValue,
          comodidades_adicionales: comodidades
        };
        if (imageUrl) {
          dto.imagen = imageUrl;
        }
        await this.updateServiceUseCase.execute(this.editId, dto);
      } else {
        if (!imageUrl) throw new Error('Imagen es requerida al crear');
        const dto: CreateServicioReservableDto = {
          ...rawValue,
          comodidades_adicionales: comodidades,
          imagen: imageUrl
        };
        await this.createServiceUseCase.execute(dto);
      }

      this.router.navigate(['/provider/services']);
    } catch (err) {
      console.error(err);
      this.error.set('PROVIDER_SERVICES.FORM.ERROR');
    } finally {
      this.loading.set(false);
    }
  }
}
