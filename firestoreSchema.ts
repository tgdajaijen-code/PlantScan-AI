/**
 * Firestore Architecture & Blueprint Data Schema for PlantScan AI
 * Collections:
 *  - /users/{userId}
 *  - /plants/{plantId}
 *  - /users/{userId}/history/{scanId}
 *  - /users/{userId}/favorites/{plantId}
 *  - /users/{userId}/reminders/{reminderId}
 *  - /users/{userId}/settings/preferences
 */

export interface FirestoreUserDoc {
  uid: string;
  email: string;
  displayName: string;
  avatarUrl: string;
  roleTitle: string;
  level: number;
  xp: number;
  totalScans: number;
  favoriteCount: number;
  createdAt: string; // ISO string
  lastActiveAt: string;
}

export interface FirestoreScanRecordDoc {
  id: string;
  userId: string;
  plantId: string;
  commonName: string;
  scientificName: string;
  imageUrl: string;
  confidence: number;
  scannedAt: string;
  customNote?: string;
  location?: {
    latitude: number;
    longitude: number;
    cityName: string;
    country: string;
  };
  healthStatus?: 'Healthy' | 'Mild Issues' | 'Diseased' | 'Pest Infested';
}

export interface FirestoreFavoriteDoc {
  plantId: string;
  commonName: string;
  scientificName: string;
  imageUrl: string;
  savedAt: string;
}

export interface FirestoreReminderDoc {
  id: string;
  userId: string;
  plantId: string;
  plantName: string;
  type: 'Watering' | 'Fertilizing' | 'Pruning' | 'Repotting' | 'Health Check';
  frequencyDays: number;
  nextDueDate: string;
  time: string;
  enabled: boolean;
}

export const FIRESTORE_COLLECTIONS = {
  USERS: 'users',
  PLANTS: 'plants',
  HISTORY: 'history',
  FAVORITES: 'favorites',
  REMINDERS: 'reminders',
  SETTINGS: 'settings'
};
