import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { EstablecimientoTuristico } from '../../../../../domain/entities/EstablecimientoTuristico';
import { UpdateEstablecimientoTuristicoDto } from '../../../../../domain/entities/dtos/EstablecimientoTuristico.dtos';
import { LucideAngularModule, LUCIDE_ICONS, LucideIconProvider, MapPin } from 'lucide-angular';

@Component({
  selector: 'app-establecimiento-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TranslateModule, LucideAngularModule],
  providers: [{
    provide: LUCIDE_ICONS,
    multi: true,
    useValue: new LucideIconProvider({ MapPin })
  }],
  templateUrl: './establecimiento-details.html',
  styleUrl: './establecimiento-details.css'
})
export class EstablecimientoDetailsComponent implements OnChanges {
  @Input({ required: true }) establecimiento!: EstablecimientoTuristico;
  @Input() destinoLabel: string = '';
  @Output() onUpdate = new EventEmitter<UpdateEstablecimientoTuristicoDto>();

  form: FormGroup;
  @Input() isUpdating = false;

  constructor(private readonly fb: FormBuilder) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      tipo: ['', Validators.required],
      descripcion: ['', Validators.required]
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['establecimiento'] && this.establecimiento) {
      this.form.patchValue({
        nombre: this.establecimiento.nombre,
        tipo: this.establecimiento.tipo,
        descripcion: this.establecimiento.descripcion
      });
    }
  }

  onSubmit() {
    if (this.form.valid && !this.isUpdating) {
      this.onUpdate.emit(this.form.value);
    }
  }

  onCancel() {
    this.form.patchValue({
      nombre: this.establecimiento.nombre,
      tipo: this.establecimiento.tipo,
      descripcion: this.establecimiento.descripcion
    });
  }
}
