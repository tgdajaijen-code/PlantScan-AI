import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AppProvider, useApp } from './context/AppContext';
import { MobileContainer } from './components/MobileContainer';

import { SplashScreen } from './screens/SplashScreen';
import { OnboardingScreen } from './screens/OnboardingScreen';
import { HomeScreen } from './screens/HomeScreen';
import { CameraScanScreen } from './screens/CameraScanScreen';
import { GalleryImportScreen } from './screens/GalleryImportScreen';
import { AnalysisLoadingScreen } from './screens/AnalysisLoadingScreen';
import { PlantResultScreen } from './screens/PlantResultScreen';
import { HistoryScreen } from './screens/HistoryScreen';
import { FavoritesScreen } from './screens/FavoritesScreen';
import { ProfileScreen } from './screens/ProfileScreen';
import { SettingsScreen } from './screens/SettingsScreen';
import { SearchScreen } from './screens/SearchScreen';
import { AboutScreen } from './screens/AboutScreen';
import { MapDiscoveryScreen } from './screens/MapDiscoveryScreen';
import { RemindersScreen } from './screens/RemindersScreen';

const MainAppContent: React.FC = () => {
  const { currentScreen, settings } = useApp();

  const renderScreen = () => {
    switch (currentScreen) {
      case 'splash':
        return <SplashScreen key="splash" />;
      case 'onboarding':
        return <OnboardingScreen key="onboarding" />;
      case 'home':
        return <HomeScreen key="home" />;
      case 'camera':
        return <CameraScanScreen key="camera" />;
      case 'gallery':
        return <GalleryImportScreen key="gallery" />;
      case 'analysis':
        return <AnalysisLoadingScreen key="analysis" />;
      case 'result':
        return <PlantResultScreen key="result" />;
      case 'history':
        return <HistoryScreen key="history" />;
      case 'favorites':
        return <FavoritesScreen key="favorites" />;
      case 'profile':
        return <ProfileScreen key="profile" />;
      case 'settings':
        return <SettingsScreen key="settings" />;
      case 'search':
        return <SearchScreen key="search" />;
      case 'about':
        return <AboutScreen key="about" />;
      case 'map':
        return <MapDiscoveryScreen key="map" />;
      case 'reminders':
        return <RemindersScreen key="reminders" />;
      default:
        return <HomeScreen key="home-default" />;
    }
  };

  return (
    <div className={settings.darkMode ? 'dark' : ''}>
      <MobileContainer>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentScreen}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="flex-1 flex flex-col min-h-full"
          >
            {renderScreen()}
          </motion.div>
        </AnimatePresence>
      </MobileContainer>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainAppContent />
    </AppProvider>
  );
}
