import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormArray, ReactiveFormsModule, Validators, AbstractControl } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { LucideAngularModule, LUCIDE_ICONS, LucideIconProvider, ArrowLeft, Save, Plus, Trash2 } from 'lucide-angular';
import { CreateProveedorServiceUseCase } from '../../../../useCase/proveedor/services/CreateProveedorServiceUseCase';
import { LoadEstablecimientosUseCase } from '../../../../useCase/proveedor/services/LoadEstablecimientosUseCase';
import { EstablecimientoTuristico } from '../../../../domain/entities/EstablecimientoTuristico';
import { CreateServicioReservableDto } from '../../../../domain/entities/dtos';

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
      useValue: new LucideIconProvider({ ArrowLeft, Save, Plus, Trash2 })
    }
  ]
})
export class ProveedorServiceFormComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly createServiceUseCase = inject(CreateProveedorServiceUseCase);
  private readonly loadEstablecimientosUseCase = inject(LoadEstablecimientosUseCase);

  public serviceForm!: FormGroup;
  public establecimientos = signal<EstablecimientoTuristico[]>([]);
  public loading = signal<boolean>(false);
  public loadingEstablecimientos = signal<boolean>(true);
  public error = signal<string | null>(null);

  ngOnInit(): void {
    this.initForm();
    this.loadEstablecimientos();
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

  private async loadEstablecimientos(): Promise<void> {
    try {
      this.loadingEstablecimientos.set(true);
      const data = await this.loadEstablecimientosUseCase.execute();
      this.establecimientos.set(data);

      if (data.length === 1) {
        this.serviceForm.patchValue({ id_establecimiento: data[0].id });
      }
    } catch (err) {
      console.error(err);
      this.error.set('PROVIDER_SERVICES.FORM.ERROR');
    } finally {
      this.loadingEstablecimientos.set(false);
    }
  }

  public async onSubmit(): Promise<void> {
    if (this.serviceForm.invalid) {
      this.serviceForm.markAllAsTouched();
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

      const dto: CreateServicioReservableDto = {
        ...rawValue,
        comodidades_adicionales: comodidades
      };
      
      await this.createServiceUseCase.execute(dto);
      
      this.router.navigate(['/provider/services']);
    } catch (err) {
      console.error(err);
      this.error.set('PROVIDER_SERVICES.FORM.ERROR');
    } finally {
      this.loading.set(false);
    }
  }
}
