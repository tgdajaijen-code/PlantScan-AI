import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Heart, 
  Search, 
  ArrowLeft, 
  ChevronRight, 
  Leaf, 
  Scan, 
  Trash2, 
  Share2 
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SAMPLE_PLANTS } from '../data/plantDatabase';
import { ShareModal } from '../components/ShareModal';
import { Plant } from '../types';

export const FavoritesScreen: React.FC = () => {
  const { 
    favorites, 
    toggleFavorite, 
    startScanFlowWithPlant, 
    goBack, 
    setScreen 
  } = useApp();

  const [search, setSearch] = useState('');
  const [selectedPlantForShare, setSelectedPlantForShare] = useState<Plant | null>(null);

  const favPlants = SAMPLE_PLANTS.filter(plant => favorites.includes(plant.id));
  const filteredFavs = favPlants.filter(plant => 
    plant.commonName.toLowerCase().includes(search.toLowerCase()) ||
    plant.scientificName.toLowerCase().includes(search.toLowerCase()) ||
    plant.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex-1 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 p-4 pb-24 space-y-4">
      {/* Share Modal */}
      {selectedPlantForShare && (
        <ShareModal
          isOpen={!!selectedPlantForShare}
          onClose={() => setSelectedPlantForShare(null)}
          plant={selectedPlantForShare}
        />
      )}

      {/* Top Header */}
      <div className="flex items-center justify-between pt-1">
        <div className="flex items-center gap-3">
          <button
            onClick={goBack}
            className="p-2.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:text-emerald-600 transition shadow-xs cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
              <span>Saved Favorites</span>
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {favorites.length} Saved botanical collection items
            </p>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search saved plants..."
          className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-xs"
        />
      </div>

      {/* Favorites List */}
      {filteredFavs.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 text-center border border-slate-200 dark:border-slate-800 my-8">
          <Heart className="w-12 h-12 text-rose-300 dark:text-rose-900 mx-auto mb-3 animate-pulse" />
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">No saved favorites yet</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-xs mx-auto">
            Tap the heart icon on any plant profile screen to bookmark it into your collection.
          </p>
          <button
            onClick={() => setScreen('home')}
            className="mt-4 px-4 py-2 bg-emerald-600 text-white text-xs font-semibold rounded-xl inline-flex items-center gap-1.5 cursor-pointer shadow-md shadow-emerald-600/30"
          >
            <Leaf className="w-4 h-4" /> Browse Plant Catalog
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3">
          {filteredFavs.map((plant) => (
            <motion.div
              key={plant.id}
              whileHover={{ scale: 1.01 }}
              className="bg-white dark:bg-slate-900 p-3.5 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-xs flex items-center justify-between gap-3 group"
            >
              <div
                className="flex items-center gap-3 flex-1 cursor-pointer"
                onClick={() => startScanFlowWithPlant(plant)}
              >
                <img
                  src={plant.imageUrl}
                  alt={plant.commonName}
                  className="w-16 h-16 rounded-2xl object-cover border border-slate-200 dark:border-slate-800 shrink-0"
                />

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 px-2 py-0.5 rounded-md">
                      {plant.category}
                    </span>
                  </div>

                  <h4 className="font-bold text-xs text-slate-900 dark:text-white mt-1 truncate">
                    {plant.commonName}
                  </h4>
                  <p className="text-[11px] italic text-emerald-700 dark:text-emerald-400 truncate">
                    {plant.scientificName}
                  </p>

                  <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-1">
                    {plant.habitat}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1 shrink-0">
                <button
                  onClick={() => setSelectedPlantForShare(plant)}
                  className="p-2 text-slate-400 hover:text-teal-600 transition rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                  title="Share plant card"
                >
                  <Share2 className="w-4 h-4" />
                </button>

                <button
                  onClick={() => toggleFavorite(plant.id)}
                  className="p-2 text-rose-500 hover:text-rose-700 transition rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/40 cursor-pointer"
                  title="Remove from favorites"
                >
                  <Heart className="w-4 h-4 fill-rose-500" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};
