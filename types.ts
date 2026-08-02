export type ScreenType = 
  | 'splash' 
  | 'onboarding'
  | 'home' 
  | 'camera' 
  | 'gallery'
  | 'analysis' 
  | 'result' 
  | 'history' 
  | 'favorites' 
  | 'profile' 
  | 'settings'
  | 'search'
  | 'about'
  | 'map'
  | 'reminders';

export type LanguageCode = 'en' | 'fr' | 'es' | 'pt' | 'ar';

export type ToxicityLevel = 'safe' | 'mild' | 'severe' | 'unknown';

export interface CareInfo {
  sunlight: string;
  watering: string;
  soil: string;
  temperature: string;
  humidity: string;
}

export interface PlantHealth {
  status: 'Healthy' | 'Mild Issues' | 'Diseased' | 'Pest Infested';
  score: number; // 0-100
  diagnosisName: string;
  symptoms: string[];
  recommendedTreatments: string[];
}

export interface ScanLocation {
  latitude: number;
  longitude: number;
  cityName: string;
  country: string;
}

export interface Plant {
  id: string;
  commonName: string;
  scientificName: string;
  botanicalFamily: string;
  genus?: string;
  species?: string;
  imageUrl: string;
  thumbnailUrl: string;
  confidence: number;
  description: string;
  medicinalBenefits: string[];
  traditionalUses: string[];
  toxicity: {
    level: ToxicityLevel;
    details: string;
    affectedPets?: string[];
  };
  habitat: string;
  nativeRegion: string;
  growthPeriod?: string;
  floweringSeason?: string;
  similarSpecies?: string[];
  edibleStatus?: 'Edible' | 'Non-Edible' | 'Caution Required' | 'Toxic';
  care: CareInfo;
  category: 'Medicinal' | 'Indoor' | 'Wildflower' | 'Succulent' | 'Tree & Shrub' | 'Herbal';
  funFact: string;
  healthDiagnosis?: PlantHealth;
}

export interface ScanRecord {
  id: string;
  plantId: string;
  plant: Plant;
  scannedAt: string; // ISO date string
  confidence: number;
  customNote?: string;
  customImage?: string;
  location?: ScanLocation;
}

export interface PlantReminder {
  id: string;
  plantId: string;
  plantName: string;
  type: 'Watering' | 'Fertilizing' | 'Pruning' | 'Repotting' | 'Health Check';
  frequencyDays: number;
  nextDueDate: string; // ISO date
  time: string; // "09:00"
  enabled: boolean;
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: string;
  unlocked: boolean;
}

export interface AuthUser {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  emailVerified: boolean;
  providerId: 'google.com' | 'password';
  createdAt: string;
}

export interface UserProfile {
  name: string;
  roleTitle: string;
  level: number;
  xp: number;
  nextLevelXp: number;
  totalScans: number;
  favoriteCount: number;
  streakDays: number;
  avatarUrl: string;
  badges: Badge[];
}

export interface AppSettings {
  darkMode: boolean;
  hdScanning: boolean;
  autoSaveHistory: boolean;
  enableSoundEffects: boolean;
  showTriviaOnLoading: boolean;
  offlineMode: boolean;
  preferredUnits: 'Metric' | 'Imperial';
  deviceFrame: boolean;
  language: LanguageCode;
  pushNotifications: boolean;
  locationTracking: boolean;
  privacyDataCollection: boolean;
  plantNetApiKey?: string;
}
