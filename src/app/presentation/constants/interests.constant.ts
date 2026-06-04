export const INTERESTS = [
  { id: 'deportes', label: 'TRAVELER_ONBOARDING.INTERESTS.SPORTS', icon: 'activity' },
  { id: 'cocina', label: 'TRAVELER_ONBOARDING.INTERESTS.CUISINE', icon: 'utensils' },
  { id: 'cultura', label: 'TRAVELER_ONBOARDING.INTERESTS.CULTURE', icon: 'landmark' },
  { id: 'naturaleza', label: 'TRAVELER_ONBOARDING.INTERESTS.NATURE', icon: 'leaf' },
  { id: 'playa', label: 'TRAVELER_ONBOARDING.INTERESTS.BEACH', icon: 'umbrella' },
  { id: 'montaña', label: 'TRAVELER_ONBOARDING.INTERESTS.MOUNTAIN', icon: 'mountain' },
  { id: 'historia', label: 'TRAVELER_ONBOARDING.INTERESTS.HISTORY', icon: 'book-open' },
  { id: 'tecnologia', label: 'TRAVELER_ONBOARDING.INTERESTS.TECHNOLOGY', icon: 'monitor' },
  { id: 'gastronomia', label: 'TRAVELER_ONBOARDING.INTERESTS.GASTRONOMY', icon: 'coffee' },
  { id: 'fotografia', label: 'TRAVELER_ONBOARDING.INTERESTS.PHOTOGRAPHY', icon: 'camera' },
  { id: 'ecoturismo', label: 'TRAVELER_ONBOARDING.INTERESTS.ECOTOURISM', icon: 'compass' },
];

export type TipoExperiencia = typeof INTERESTS[number]['id'];