import { TripCard } from "./TripCard";
import { DestinationCard } from "./DestinationCard";
import { ItineraryItem } from "./ItineraryItem";
import { ServiceCard } from "./ServiceCard";
import { DashboardStats } from "./DashboardStats";

export interface DashboardData {
  proximosViajes: TripCard[];
  destinosRecomendados: DestinationCard[];
  itinerariosRecientes: ItineraryItem[];
  serviciosSugeridos: ServiceCard[];
  estadisticas: DashboardStats;
  userName: string;
}