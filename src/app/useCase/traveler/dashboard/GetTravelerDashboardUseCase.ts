import { Injectable, inject } from '@angular/core';
import { SupabasePerfilViajeroRepository } from '../../../infrastructure/repositories/supabase/SupabasePerfilViajeroRepository';
import { SupabaseAuthRepository } from '../../../infrastructure/repositories/supabase/auth/SupabaseAuthRepository';

/**
 * Interfaces para los datos del dashboard
 */
export interface TripCard {
  id: string;
  destination: string;
  image: string;
  startDate: string;
  endDate: string;
  status: 'scheduled' | 'in_progress' | 'completed';
  people: number;
  description: string;
}

export interface DestinationCard {
  id: string;
  name: string;
  country: string;
  image: string;
  description: string;
  estimatedBudget: number;
  rating: number;
}

export interface ItineraryItem {
  id: string;
  title: string;
  destination: string;
  date: string;
  status: 'scheduled' | 'in_progress' | 'completed';
}

export interface ServiceCard {
  id: string;
  type: 'hotel' | 'restaurant' | 'tour' | 'transport';
  name: string;
  description: string;
  price: number;
  rating: number;
}

export interface DashboardStats {
  viajes_completados: number;
  destinos_visitados: number;
  favoritos: number;
  presupuesto_restante: number;
}

export interface DashboardData {
  proximosViajes: TripCard[];
  destinosRecomendados: DestinationCard[];
  itinerariosRecientes: ItineraryItem[];
  serviciosSugeridos: ServiceCard[];
  estadisticas: DashboardStats;
  userName: string;
}

/**
 * Mock data para el dashboard del viajero
 */
const MOCK_TRIPS: TripCard[] = [
  {
    id: '1',
    destination: 'París, Francia',
    image: 'https://via.placeholder.com/400x250?text=Paris',
    startDate: '24 Sep 2024',
    endDate: '30 Sep 2024',
    status: 'scheduled',
    people: 2,
    description: 'Una escapada romántica a la ciudad de la luz con visitas a museos y cafés parisinos.'
  }
];

const MOCK_DESTINATIONS: DestinationCard[] = [
  {
    id: '1',
    name: 'Santorini',
    country: 'Grecia',
    image: 'https://via.placeholder.com/300x200?text=Santorini',
    description: 'Playas volcánicas y vistas al atardecer incomparables',
    estimatedBudget: 1450,
    rating: 4.9
  },
  {
    id: '2',
    name: 'Tokio',
    country: 'Japón',
    image: 'https://via.placeholder.com/300x200?text=Tokyo',
    description: 'Metrópolis moderna con tradición ancestral',
    estimatedBudget: 2300,
    rating: 4.8
  },
  {
    id: '3',
    name: 'Taj Mahal',
    country: 'India',
    image: 'https://via.placeholder.com/300x200?text=Taj+Mahal',
    description: 'Monumento histórico de arquitectura mogol',
    estimatedBudget: 1900,
    rating: 4.9
  }
];

const MOCK_ITINERARIES: ItineraryItem[] = [
  {
    id: '1',
    title: 'Ciudad de México',
    destination: 'México',
    date: '01 Jun 2024',
    status: 'completed'
  },
  {
    id: '2',
    title: 'Barcelona Modernista',
    destination: 'España',
    date: '15 Aug 2024',
    status: 'in_progress'
  },
  {
    id: '3',
    title: 'Nueva York Invernal',
    destination: 'Estados Unidos',
    date: '20 Dec 2024',
    status: 'scheduled'
  }
];

const MOCK_SERVICES: ServiceCard[] = [
  {
    id: '1',
    type: 'hotel',
    name: 'Hotels Boutique',
    description: 'Selección exclusiva en París con vista a la Torre Eiffel',
    price: 250,
    rating: 4.7
  },
  {
    id: '2',
    type: 'restaurant',
    name: 'Gastronomía Michelin',
    description: 'Restaurantes con estrella Michelin en Europa',
    price: 150,
    rating: 4.9
  },
  {
    id: '3',
    type: 'tour',
    name: 'Tours Culturales',
    description: 'Experiencias guiadas en museos y sitios históricos',
    price: 85,
    rating: 4.6
  }
];

const MOCK_STATS: DashboardStats = {
  viajes_completados: 5,
  destinos_visitados: 12,
  favoritos: 8,
  presupuesto_restante: 15000
};

@Injectable({
  providedIn: 'root'
})
export class GetTravelerDashboardUseCase {
  private readonly perfilViajeroRepository = inject(SupabasePerfilViajeroRepository);
  private readonly authRepository = inject(SupabaseAuthRepository);

  /**
   * Obtiene datos del dashboard del viajero
   * Por ahora retorna mock data
   * Después se conectará a Supabase para datos reales
   * 
   * @returns Promise<DashboardData> con datos del dashboard
   */
  async execute(): Promise<DashboardData> {
    try {
      // Obtener usuario actual
      const { data: authData } = await this.authRepository.getCurrentUser();
      
      if (!authData?.user?.id) {
        return this.getMockDashboardData('Usuario');
      }

      const userId = authData.user.id;
      
      // TODO: Obtener datos reales de Supabase
      // const proximosViajes = await this.itinerarioRepository.getByUserId(userId);
      // const destinos = await this.destinoRepository.getRecommended();
      // etc...

      // Por ahora retornar mock data
      const userName = authData.user.user_metadata?.['first_name'] || 'Viajero';
      const dashboardData = this.getMockDashboardData(userName);

      return dashboardData;
    } catch (error) {
      console.error('Error loading dashboard:', error);
      return this.getMockDashboardData('Usuario');
    }
  }

  /**
   * Retorna datos mockeados del dashboard
   * Esto permite desarrollar la UI sin depender de BD
   */
  private getMockDashboardData(userName: string): DashboardData {
    return {
      proximosViajes: MOCK_TRIPS,
      destinosRecomendados: MOCK_DESTINATIONS,
      itinerariosRecientes: MOCK_ITINERARIES,
      serviciosSugeridos: MOCK_SERVICES,
      estadisticas: MOCK_STATS,
      userName
    };
  }
}
