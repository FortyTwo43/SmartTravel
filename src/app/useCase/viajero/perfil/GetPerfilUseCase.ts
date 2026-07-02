import { Injectable, inject } from '@angular/core';
import { SupabaseClient } from '@supabase/supabase-js';

export interface UserProfileData {
  name: string;
  email: string;
  phone: string;
  memberSince: string;
  isPremium: boolean;
  nextTrip: {
    destination: string;
    daysLeft: number;
    airline: string;
  };
  preferences: {
    interests: string[];
    language: string;
    budget: string;
  };
  security: {
    twoFactorEnabled: boolean;
  };
  appearance: {
    darkMode: boolean;
    pushNotifications: boolean;
  };
}

@Injectable({ providedIn: 'root' })
export class GetPerfilUseCase {
  private readonly supabase = inject(SupabaseClient);

  async execute(): Promise<UserProfileData> {
    // 1. Get authenticated user
    const { data: authData } = await this.supabase.auth.getUser();
    const user = authData?.user;

    if (!user) {
      return this.emptyProfile();
    }

    // 2. Try to fetch the 'perfil' row for this user
    const { data: perfil } = await this.supabase
      .from('perfil')
      .select('*')
      .eq('id', user.id)
      .maybeSingle();

    // 3. Try to fetch the 'perfil_viajero' row for preferences
    const { data: perfilViajero } = await this.supabase
      .from('perfil_viajero')
      .select('*')
      .eq('id', user.id)
      .maybeSingle();

    // 4. Build name from perfil row or user_metadata
    const meta = user.user_metadata ?? {};
    const nombre: string = perfil?.nombre || meta['nombre'] || meta['name'] || meta['full_name'] || '';
    const apellido: string = perfil?.apellido || meta['apellido'] || meta['last_name'] || '';
    const fullName = apellido ? `${nombre} ${apellido}`.trim() : nombre || user.email?.split('@')[0] || '';

    // 5. Member since (from perfil row fecha_registro or user created_at)
    const rawDate: string = perfil?.fecha_registro || user.created_at || '';
    const memberSince = rawDate
      ? new Date(rawDate).toLocaleDateString('es-ES', { month: 'short', year: 'numeric' })
      : '';

    // 6. Interests from perfil_viajero
    const interestsRaw: string = perfilViajero?.intereses || '';
    const interests = interestsRaw
      ? interestsRaw.split(',').map((s: string) => s.trim()).filter(Boolean)
      : [];

    return {
      name: fullName,
      email: user.email || '',
      phone: meta['phone'] || meta['telefono'] || '',
      memberSince,
      isPremium: perfil?.estado === 'activo',
      nextTrip: {
        destination: '',
        daysLeft: 0,
        airline: ''
      },
      preferences: {
        interests,
        language: perfilViajero?.idioma || '',
        budget: perfilViajero?.presupuesto?.toString() || ''
      },
      security: {
        twoFactorEnabled: false
      },
      appearance: {
        darkMode: false,
        pushNotifications: true
      }
    };
  }

  private emptyProfile(): UserProfileData {
    return {
      name: '',
      email: '',
      phone: '',
      memberSince: '',
      isPremium: false,
      nextTrip: { destination: '', daysLeft: 0, airline: '' },
      preferences: { interests: [], language: '', budget: '' },
      security: { twoFactorEnabled: false },
      appearance: { darkMode: false, pushNotifications: true }
    };
  }
}
