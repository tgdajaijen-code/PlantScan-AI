import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  ScreenType, 
  Plant, 
  ScanRecord, 
  UserProfile, 
  AppSettings,
  AuthUser,
  PlantReminder,
  ScanLocation
} from '../types';
import { SAMPLE_PLANTS } from '../data/plantDatabase';
import { getTranslation, Translations } from '../services/i18nService';
import { plantIdentificationService } from '../services/plantIdentificationService';

interface ToastMessage {
  id: string;
  message: string;
  type?: 'success' | 'info' | 'warning';
}

interface AppContextType {
  currentScreen: ScreenType;
  setScreen: (screen: ScreenType) => void;
  goBack: () => void;
  selectedPlant: Plant | null;
  setSelectedPlant: (plant: Plant | null) => void;
  selectedPlantCandidates: Plant[];
  setSelectedPlantCandidates: (candidates: Plant[]) => void;
  selectCandidate: (candidate: Plant) => void;
  plantNetApiKey: string;
  setPlantNetApiKey: (key: string) => void;
  identifyImage: (imageUri: string, organ?: string) => Promise<Plant | null>;
  capturedImage: string | null;
  setCapturedImage: (img: string | null) => void;
  history: ScanRecord[];
  addHistoryRecord: (plant: Plant, customImg?: string, customNote?: string, location?: any) => void;
  updateScanNote: (id: string, note: string) => void;
  removeHistoryRecord: (id: string) => void;
  clearHistory: () => void;
  favorites: string[]; // plant IDs
  toggleFavorite: (plantId: string) => boolean; // returns true if favorited
  userProfile: UserProfile;
  setUserProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
  settings: AppSettings;
  updateSettings: (newSettings: Partial<AppSettings>) => void;
  toasts: ToastMessage[];
  showToast: (message: string, type?: 'success' | 'info' | 'warning') => void;
  startScanFlowWithPlant: (plant: Plant, imageUri?: string) => void;
  resetAllData: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  isOnline: boolean;
  authUser: AuthUser | null;
  loginWithEmail: (email: string, pass: string) => Promise<boolean>;
  signUpWithEmail: (name: string, email: string, pass: string) => Promise<boolean>;
  loginWithGoogle: () => Promise<boolean>;
  logoutUser: () => void;
  forgotPassword: (email: string) => Promise<void>;
  updateUserDisplayName: (newName: string, newRole?: string) => void;
  reminders: PlantReminder[];
  addReminder: (reminder: Omit<PlantReminder, 'id'>) => void;
  deleteReminder: (id: string) => void;
  toggleReminder: (id: string) => void;
  exportUserData: () => void;
  deleteAccount: () => void;
  t: Translations;
}

const DEFAULT_SETTINGS: AppSettings = {
  darkMode: false,
  hdScanning: true,
  autoSaveHistory: true,
  enableSoundEffects: true,
  showTriviaOnLoading: true,
  offlineMode: false,
  preferredUnits: 'Metric',
  deviceFrame: true,
  language: 'en',
  pushNotifications: true,
  locationTracking: true,
  privacyDataCollection: true,
};

const INITIAL_PROFILE: UserProfile = {
  name: 'Elena Rostova',
  roleTitle: 'Master Botanist & Herbalist',
  level: 5,
  xp: 1850,
  nextLevelXp: 2500,
  totalScans: 14,
  favoriteCount: 3,
  streakDays: 6,
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
  badges: [
    {
      id: 'badge-1',
      title: 'First Discovery',
      description: 'Scanned your very first plant species',
      icon: 'Sprout',
      unlocked: true,
      unlockedAt: '2026-07-20'
    },
    {
      id: 'badge-2',
      title: 'Herbal Specialist',
      description: 'Identified 5 medicinal or herbal plants',
      icon: 'HeartPulse',
      unlocked: true,
      unlockedAt: '2026-07-25'
    },
    {
      id: 'badge-3',
      title: 'Green Guardian',
      description: 'Saved 3 plants to your collection',
      icon: 'Bookmark',
      unlocked: true,
      unlockedAt: '2026-07-28'
    },
    {
      id: 'badge-4',
      title: 'Flora Explorer',
      description: 'Scan 25 unique botanical specimens',
      icon: 'Compass',
      unlocked: false
    }
  ]
};

const INITIAL_HISTORY: ScanRecord[] = [
  {
    id: 'scan-1',
    plantId: 'plant-1',
    plant: SAMPLE_PLANTS[0], // Aloe Vera
    scannedAt: '2026-08-01T14:32:00.000Z',
    confidence: 99.2,
    location: {
      latitude: 37.7749,
      longitude: -122.4194,
      cityName: 'San Francisco',
      country: 'USA'
    }
  },
  {
    id: 'scan-2',
    plantId: 'plant-2',
    plant: SAMPLE_PLANTS[1], // Monstera
    scannedAt: '2026-07-30T10:15:00.000Z',
    confidence: 98.6,
    location: {
      latitude: 34.0522,
      longitude: -118.2437,
      cityName: 'Los Angeles',
      country: 'USA'
    }
  },
  {
    id: 'scan-3',
    plantId: 'plant-4',
    plant: SAMPLE_PLANTS[3], // Lavender
    scannedAt: '2026-07-28T18:45:00.000Z',
    confidence: 99.0,
    location: {
      latitude: 48.8566,
      longitude: 2.3522,
      cityName: 'Paris',
      country: 'France'
    }
  }
];

const INITIAL_REMINDERS: PlantReminder[] = [
  {
    id: 'rem-1',
    plantId: 'plant-1',
    plantName: 'Aloe Vera',
    type: 'Watering',
    frequencyDays: 14,
    nextDueDate: new Date(Date.now() + 86400000 * 2).toISOString(),
    time: '09:00',
    enabled: true
  },
  {
    id: 'rem-2',
    plantId: 'plant-2',
    plantName: 'Monstera Deliciosa',
    type: 'Watering',
    frequencyDays: 7,
    nextDueDate: new Date(Date.now() + 86400000 * 4).toISOString(),
    time: '10:00',
    enabled: true
  },
  {
    id: 'rem-3',
    plantId: 'plant-4',
    plantName: 'English Lavender',
    type: 'Fertilizing',
    frequencyDays: 30,
    nextDueDate: new Date(Date.now() + 86400000 * 12).toISOString(),
    time: '11:00',
    enabled: true
  }
];

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('splash');
  const [screenStack, setScreenStack] = useState<ScreenType[]>(['splash']);
  const [selectedPlant, setSelectedPlant] = useState<Plant | null>(SAMPLE_PLANTS[0]);
  const [selectedPlantCandidates, setSelectedPlantCandidates] = useState<Plant[]>(SAMPLE_PLANTS);
  const [plantNetApiKey, setPlantNetApiKeyState] = useState<string>(() => {
    return localStorage.getItem('plantnet_api_key') || import.meta.env.VITE_PLANTNET_API_KEY || '';
  });

  const setPlantNetApiKey = (key: string) => {
    setPlantNetApiKeyState(key);
    localStorage.setItem('plantnet_api_key', key);
  };

  const selectCandidate = (candidate: Plant) => {
    setSelectedPlant(candidate);
    showToast(`Switched active species to ${candidate.commonName}`, 'info');
  };

  const identifyImage = async (imageUri: string, organ = 'auto'): Promise<Plant | null> => {
    try {
      const res = await plantIdentificationService.identifyPlant(imageUri, organ, plantNetApiKey);
      if (res.candidates && res.candidates.length > 0) {
        setSelectedPlantCandidates(res.candidates);
        setSelectedPlant(res.topCandidate);
        if (res.isOffline) {
          showToast('Offline Mode: Matched against local botanical database', 'warning');
        } else if (res.isFromApi) {
          showToast(`PlantNet AI: ${res.candidates.length} candidates identified`, 'success');
        }
        return res.topCandidate;
      }
    } catch (err) {
      console.warn('Error identifying image:', err);
    }
    return selectedPlant;
  };
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [history, setHistory] = useState<ScanRecord[]>(() => {
    const saved = localStorage.getItem('plantscan_history');
    return saved ? JSON.parse(saved) : INITIAL_HISTORY;
  });
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('plantscan_favorites');
    return saved ? JSON.parse(saved) : ['plant-1', 'plant-3', 'plant-4'];
  });
  const [userProfile, setUserProfile] = useState<UserProfile>(INITIAL_PROFILE);
  const [settings, setSettings] = useState<AppSettings>(() => {
    const saved = localStorage.getItem('plantscan_settings');
    return saved ? JSON.parse(saved) : DEFAULT_SETTINGS;
  });
  const [reminders, setReminders] = useState<PlantReminder[]>(() => {
    const saved = localStorage.getItem('plantscan_reminders');
    return saved ? JSON.parse(saved) : INITIAL_REMINDERS;
  });
  const [authUser, setAuthUser] = useState<AuthUser | null>(() => {
    const saved = localStorage.getItem('plantscan_user');
    return saved ? JSON.parse(saved) : {
      uid: 'user-2026-pro',
      email: 'elena.rostova@botanist.ai',
      displayName: 'Elena Rostova',
      emailVerified: true,
      providerId: 'password',
      createdAt: '2026-01-10T12:00:00.000Z'
    };
  });

  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isOnline, setIsOnline] = useState<boolean>(typeof navigator !== 'undefined' ? navigator.onLine : true);

  const t = getTranslation(settings.language || 'en');

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      showToast('Network restored: Online 🌐', 'success');
    };
    const handleOffline = () => {
      setIsOnline(false);
      showToast('Operating in Offline Mode ⚡ Saved history available', 'warning');
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  useEffect(() => {
    if (settings.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [settings.darkMode]);

  // Sync state to local storage
  useEffect(() => {
    localStorage.setItem('plantscan_history', JSON.stringify(history));
  }, [history]);

  useEffect(() => {
    localStorage.setItem('plantscan_favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('plantscan_settings', JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem('plantscan_reminders', JSON.stringify(reminders));
  }, [reminders]);

  useEffect(() => {
    if (authUser) {
      localStorage.setItem('plantscan_user', JSON.stringify(authUser));
    } else {
      localStorage.removeItem('plantscan_user');
    }
  }, [authUser]);

  const showToast = (message: string, type: 'success' | 'info' | 'warning' = 'info') => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 2800);
  };

  const setScreen = (newScreen: ScreenType) => {
    if (newScreen !== currentScreen) {
      setScreenStack(prev => [...prev, newScreen]);
      setCurrentScreen(newScreen);
    }
  };

  const goBack = () => {
    if (screenStack.length > 1) {
      const newStack = [...screenStack];
      newStack.pop();
      const prevScreen = newStack[newStack.length - 1];
      setScreenStack(newStack);
      setCurrentScreen(prevScreen);
    } else {
      setCurrentScreen('home');
    }
  };

  // Auth Methods
  const loginWithEmail = async (email: string, pass: string): Promise<boolean> => {
    await new Promise(r => setTimeout(r, 500));
    const user: AuthUser = {
      uid: 'uid-' + Date.now(),
      email,
      displayName: email.split('@')[0],
      emailVerified: true,
      providerId: 'password',
      createdAt: new Date().toISOString()
    };
    setAuthUser(user);
    setUserProfile(prev => ({ ...prev, name: user.displayName }));
    showToast(`Welcome back, ${user.displayName}! 🌱`, 'success');
    return true;
  };

  const signUpWithEmail = async (name: string, email: string, pass: string): Promise<boolean> => {
    await new Promise(r => setTimeout(r, 600));
    const user: AuthUser = {
      uid: 'uid-' + Date.now(),
      email,
      displayName: name,
      emailVerified: false,
      providerId: 'password',
      createdAt: new Date().toISOString()
    };
    setAuthUser(user);
    setUserProfile(prev => ({ ...prev, name }));
    showToast('Account created successfully!', 'success');
    return true;
  };

  const loginWithGoogle = async (): Promise<boolean> => {
    await new Promise(r => setTimeout(r, 500));
    const user: AuthUser = {
      uid: 'google-' + Date.now(),
      email: 'user.botanist@gmail.com',
      displayName: 'Google Botanist',
      photoURL: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      emailVerified: true,
      providerId: 'google.com',
      createdAt: new Date().toISOString()
    };
    setAuthUser(user);
    setUserProfile(prev => ({ ...prev, name: user.displayName }));
    showToast('Signed in with Google 🚀', 'success');
    return true;
  };

  const logoutUser = () => {
    setAuthUser(null);
    showToast('Signed out of PlantScan AI', 'info');
  };

  const forgotPassword = async (email: string) => {
    await new Promise(r => setTimeout(r, 400));
    showToast(`Password reset link sent to ${email}`, 'info');
  };

  const updateUserDisplayName = (newName: string, newRole?: string) => {
    setUserProfile(prev => ({
      ...prev,
      name: newName,
      roleTitle: newRole || prev.roleTitle
    }));
    if (authUser) {
      setAuthUser(prev => prev ? { ...prev, displayName: newName } : null);
    }
    showToast('Profile updated!', 'success');
  };

  // Reminders
  const addReminder = (reminderData: Omit<PlantReminder, 'id'>) => {
    const newRem: PlantReminder = {
      ...reminderData,
      id: 'rem-' + Date.now()
    };
    setReminders(prev => [...prev, newRem]);
    showToast(`Care reminder set for ${newRem.plantName}`, 'success');
  };

  const deleteReminder = (id: string) => {
    setReminders(prev => prev.filter(r => r.id !== id));
    showToast('Reminder removed', 'info');
  };

  const toggleReminder = (id: string) => {
    setReminders(prev => prev.map(r => r.id === id ? { ...r, enabled: !r.enabled } : r));
    showToast('Reminder status updated', 'info');
  };

  // Export & Delete
  const exportUserData = () => {
    const exportBundle = {
      profile: userProfile,
      history,
      favorites,
      reminders,
      settings,
      exportedAt: new Date().toISOString()
    };
    const jsonStr = JSON.stringify(exportBundle, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `plantscan-ai-data-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Data exported successfully as JSON file!', 'success');
  };

  const deleteAccount = () => {
    setAuthUser(null);
    resetAllData();
    showToast('Account deleted and state cleared', 'warning');
    setScreen('home');
  };

  const toggleFavorite = (plantId: string): boolean => {
    const exists = favorites.includes(plantId);
    if (exists) {
      setFavorites(prev => prev.filter(id => id !== plantId));
      showToast('Removed from Favorites', 'info');
      setUserProfile(prev => ({ ...prev, favoriteCount: Math.max(0, prev.favoriteCount - 1) }));
      return false;
    } else {
      setFavorites(prev => [...prev, plantId]);
      showToast('Added to Favorites ❤️', 'success');
      setUserProfile(prev => ({ ...prev, favoriteCount: prev.favoriteCount + 1 }));
      return true;
    }
  };

  const addHistoryRecord = (plant: Plant, customImg?: string, customNote?: string, location?: any) => {
    const newRecord: ScanRecord = {
      id: 'scan-' + Date.now(),
      plantId: plant.id,
      plant: plant,
      scannedAt: new Date().toISOString(),
      confidence: plant.confidence,
      customImage: customImg || plant.imageUrl,
      customNote: customNote || '',
      location: typeof location === 'object' && location !== null ? location : {
        latitude: 37.7749,
        longitude: -122.4194,
        cityName: typeof location === 'string' && location ? location : 'San Francisco',
        country: 'USA'
      }
    };

    setHistory(prev => [newRecord, ...prev]);
    setUserProfile(prev => ({
      ...prev,
      totalScans: prev.totalScans + 1,
      xp: prev.xp + 150
    }));

    showToast('Scan saved to history 🌿', 'success');
  };

  const updateScanNote = (id: string, note: string) => {
    setHistory(prev => prev.map(item => item.id === id ? { ...item, customNote: note } : item));
    showToast('Note saved to history record 📝', 'success');
  };

  const removeHistoryRecord = (id: string) => {
    setHistory(prev => prev.filter(item => item.id !== id));
    showToast('Scan record deleted', 'info');
  };

  const clearHistory = () => {
    setHistory([]);
    showToast('History cleared', 'info');
  };

  const updateSettings = (newSettings: Partial<AppSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
    showToast('Settings updated', 'success');
  };

  const startScanFlowWithPlant = (plant: Plant, imageUri?: string) => {
    setSelectedPlant(plant);
    if (imageUri) {
      setCapturedImage(imageUri);
    } else {
      setCapturedImage(plant.imageUrl);
    }
    setScreen('analysis');
  };

  const resetAllData = () => {
    setHistory(INITIAL_HISTORY);
    setFavorites(['plant-1', 'plant-3']);
    setSettings(DEFAULT_SETTINGS);
    setUserProfile(INITIAL_PROFILE);
    setReminders(INITIAL_REMINDERS);
    showToast('App data reset to default', 'info');
  };

  return (
    <AppContext.Provider
      value={{
        currentScreen,
        setScreen,
        goBack,
        selectedPlant,
        setSelectedPlant,
        selectedPlantCandidates,
        setSelectedPlantCandidates,
        selectCandidate,
        plantNetApiKey,
        setPlantNetApiKey,
        identifyImage,
        capturedImage,
        setCapturedImage,
        history,
        addHistoryRecord,
        updateScanNote,
        removeHistoryRecord,
        clearHistory,
        favorites,
        toggleFavorite,
        userProfile,
        setUserProfile,
        settings,
        updateSettings,
        toasts,
        showToast,
        startScanFlowWithPlant,
        resetAllData,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        isOnline,
        authUser,
        loginWithEmail,
        signUpWithEmail,
        loginWithGoogle,
        logoutUser,
        forgotPassword,
        updateUserDisplayName,
        reminders,
        addReminder,
        deleteReminder,
        toggleReminder,
        exportUserData,
        deleteAccount,
        t
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
