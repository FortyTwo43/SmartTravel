import { Injectable, inject } from '@angular/core';
import { SupabaseAuthRepository } from '../../infrastructure/repositories/supabase/auth/SupabaseAuthRepository';
import { SupabasePerfilRepository } from '../../infrastructure/repositories/supabase/SupabasePerfilRepository';
import { SupabasePerfilViajeroRepository } from '../../infrastructure/repositories/supabase/SupabasePerfilViajeroRepository';
import { SupabaseSolicitudProveedorRepository } from '../../infrastructure/repositories/supabase/SupabaseSolicitudProveedorRepository';
import { AuthenticationError } from '../../domain/errors/auth-errors';
import { UploadProviderDocumentUseCase } from '../upload/UploadProviderDocumentUseCase';

export interface RegisterRequest {
  // Datos comunes
  email: string;
  password: string;
  nombre: string;
  apellido: string;
  rol: 'viajero' | 'proveedor';

  // Solo traveler
  presupuesto?: number;
  idioma?: string;

  // Solo provider
  nombre_negocio?: string;
  tipo_negocio?: string;
  telefono?: string;
  descripcion?: string;
  ubicacion?: string;
  documento?: File;
}

export interface RegisterResult {
  success: boolean;
  role: 'viajero' | 'proveedor';
  /** Para provider: mensaje informativo de que está pendiente de revisión */
  message?: string;
}

@Injectable({
  providedIn: 'root'
})
export class RegisterUseCase {
  private readonly authRepository = inject(SupabaseAuthRepository);
  private readonly perfilRepository = inject(SupabasePerfilRepository);
  private readonly perfilViajeroRepository = inject(SupabasePerfilViajeroRepository);
  private readonly solicitudProveedorRepository = inject(SupabaseSolicitudProveedorRepository);
  private readonly uploadProviderDocumentUseCase = inject(UploadProviderDocumentUseCase);

  async execute(request: RegisterRequest): Promise<RegisterResult> {
    if (request.rol === 'viajero') {
      return await this.registerTraveler(request);
    } else {
      return await this.registerProvider(request);
    }
  }

  private async registerTraveler(request: RegisterRequest): Promise<RegisterResult> {
    const metadata = {
      first_name: request.nombre,
      last_name: request.apellido,
      rol: 'viajero',
      intereses: '',
      presupuesto: request.presupuesto ?? 0,
      idioma: request.idioma ?? 'es'
    };

    let authResponse;
    try {
      authResponse = await this.authRepository.signUp(request.email, request.password, metadata);
    } catch (error: any) {
      if (error instanceof AuthenticationError) {
        return { success: false, role: 'viajero', message: error.message };
      }
      throw error;
    }

    return { 
      success: true, 
      role: 'viajero',
      message: 'Usuario registrado exitosamente. Te hemos enviado un correo de verificación, por favor revisa tu bandeja de entrada para confirmarlo.'
    };
  }

  private async registerProvider(request: RegisterRequest): Promise<RegisterResult> {
    const metadata = {
      first_name: request.nombre,
      last_name: request.apellido,
      rol: 'proveedor'
    };

    // PASO 1: Crear usuario en Supabase Auth
    let authResponse;
    try {
      authResponse = await this.authRepository.signUp(request.email, request.password, metadata);
    } catch (error: any) {
      if (error instanceof AuthenticationError) {
        return { success: false, role: 'proveedor', message: error.message };
      }
      throw error;
    }

    console.log(authResponse);
    console.log(authResponse.user);
    console.log(authResponse.session)

    if (!authResponse.user) {
      return {
        success: true,
        role: 'proveedor',
        message: 'Usuario registrado exitosamente. Te hemos enviado un correo de verificación, por favor revisa tu bandeja de entrada para confirmarlo.'
      };
    }

    const userId = authResponse.user.id;

    let documentoUrl = '';
    if (request.documento) {
      try {
        documentoUrl = await this.uploadProviderDocumentUseCase.execute(userId, request.documento);
      } catch (error: any) {
        throw new Error('Error al subir el documento: ' + (error.message ?? 'Error desconocido'));
      }
    }

    // PASO 2: El trigger de DB ya creó el perfil con estado 'activo'.
    // Actualizamos el estado a 'pending' para el proveedor.
    try {
      await this.perfilRepository.update(userId, { estado: 'inactivo' });
    } catch (error: any) {
      throw new Error('Error al actualizar el perfil: ' + (error.message ?? 'Error desconocido'));
    }

    try {
      // PASO 3: Crear solicitud_proveedor
      await this.solicitudProveedorRepository.createWithId({
        id: userId,
        id_perfil: userId,
        nombre_negocio: request.nombre_negocio ?? '',
        tipo_negocio: request.tipo_negocio ?? '',
        descripcion: request.descripcion ?? '',
        telefono: request.telefono ?? '',
        ubicacion: request.ubicacion ?? '',
        documento_url: documentoUrl,
        estado: 'pendiente',
        fecha_solicitud: new Date(),
      });
    } catch (error: any) {
      throw new Error('Error al enviar la solicitud de proveedor: ' + (error.message ?? 'Error desconocido'));
    }

    // PASO 4: NO hacer login. El proveedor queda pendiente.
    let finalMessage = 'Tu solicitud fue enviada y será revisada por un administrador antes de habilitar tu cuenta.';
    
    if (!authResponse.session) {
      finalMessage = 'Registro exitoso. Te hemos enviado un correo de verificación. Tu solicitud como proveedor también será revisada por un administrador.';
    }

    return {
      success: true,
      role: 'proveedor',
      message: finalMessage,
    };
  }
}
