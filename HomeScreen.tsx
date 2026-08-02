import React from 'react';
import { motion } from 'motion/react';
import { 
  Scan, 
  Upload, 
  Search, 
  History, 
  Heart, 
  Sparkles, 
  ChevronRight, 
  Leaf, 
  ShieldAlert, 
  HeartPulse, 
  BookOpen, 
  ArrowUpRight 
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SAMPLE_PLANTS } from '../data/plantDatabase';
import { Plant } from '../types';

export const HomeScreen: React.FC = () => {
  const { 
    setScreen, 
    userProfile, 
    history, 
    favorites, 
    startScanFlowWithPlant,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory
  } = useApp();

  const categories = ['All', 'Medicinal', 'Indoor', 'Herbal', 'Succulent', 'Wildflower'];

  const filteredPlants = SAMPLE_PLANTS.filter(plant => {
    const matchesCategory = selectedCategory === 'All' || plant.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      plant.commonName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      plant.scientificName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      plant.botanicalFamily.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredPlant = SAMPLE_PLANTS[0]; // Aloe Vera

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        // Randomly pick a plant or match Monstera for demo
        const demoPlant = SAMPLE_PLANTS[1]; // Monstera
        startScanFlowWithPlant(demoPlant, reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex-1 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 p-4 pb-24 space-y-5">
      {/* Top Header */}
      <div className="flex items-center justify-between pt-1">
        <div className="flex items-center gap-3">
          <img
            src={userProfile.avatarUrl}
            alt={userProfile.name}
            className="w-11 h-11 rounded-full object-cover ring-2 ring-emerald-500/50 shadow-md cursor-pointer"
            onClick={() => setScreen('profile')}
          />
          <div>
            <div className="flex items-center gap-1">
              <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                Welcome back, {userProfile.name.split(' ')[0]}
              </span>
              <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            </div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white leading-tight">
              What plant are we scanning?
            </h2>
          </div>
        </div>

        <button
          onClick={() => setScreen('settings')}
          className="p-2.5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:text-emerald-600 transition shadow-sm cursor-pointer"
          aria-label="Settings"
        >
          <Leaf className="w-5 h-5 text-emerald-600" />
        </button>
      </div>

      {/* Main Action Buttons: Scan Plant & Import Image */}
      <div className="grid grid-cols-2 gap-3">
        {/* Scan Plant Primary Card */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setScreen('camera')}
          id="home-scan-plant-button"
          className="col-span-1 bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-800 text-white p-4 rounded-3xl shadow-lg shadow-emerald-700/20 border border-emerald-500/30 flex flex-col justify-between h-40 relative overflow-hidden text-left cursor-pointer group"
        >
          <div className="absolute top-0 right-0 w-28 h-28 bg-white/10 rounded-full blur-xl group-hover:scale-125 transition-transform" />
          
          <div className="w-11 h-11 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/20">
            <Scan className="w-6 h-6 text-white animate-pulse" />
          </div>

          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-200 bg-emerald-950/40 px-2 py-0.5 rounded-full border border-emerald-500/30">
              Live AI Vision
            </span>
            <h3 className="text-lg font-extrabold text-white mt-1 leading-tight">
              Scan Plant
            </h3>
            <p className="text-[11px] text-emerald-100/80">
              Point camera at leaf or stem
            </p>
          </div>
        </motion.button>

        {/* Import Image Secondary Card */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setScreen('gallery')}
          id="home-import-image-button"
          className="col-span-1 bg-white dark:bg-slate-900 p-4 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col justify-between h-40 text-left cursor-pointer hover:border-emerald-500/50 transition group"
        >
          <div className="w-11 h-11 rounded-2xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-400 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition">
            <Upload className="w-5 h-5" />
          </div>

          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              From Gallery
            </span>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-1 leading-tight">
              Import Image
            </h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Upload photo from device
            </p>
          </div>
        </motion.button>
      </div>

      {/* Quick Access to History, Favorites, Map & Reminders */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        <button
          onClick={() => setScreen('history')}
          id="home-quick-history"
          className="p-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 flex items-center gap-2 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition shadow-xs cursor-pointer"
        >
          <div className="w-8 h-8 rounded-xl bg-teal-100 dark:bg-teal-950 text-teal-700 dark:text-teal-400 flex items-center justify-center shrink-0">
            <History className="w-4 h-4" />
          </div>
          <div className="text-left min-w-0">
            <div className="text-xs font-bold text-slate-900 dark:text-white truncate">
              History
            </div>
            <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
              {history.length} Scans
            </div>
          </div>
        </button>

        <button
          onClick={() => setScreen('favorites')}
          id="home-quick-favorites"
          className="p-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 flex items-center gap-2 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition shadow-xs cursor-pointer"
        >
          <div className="w-8 h-8 rounded-xl bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0">
            <Heart className="w-4 h-4 fill-rose-500/20" />
          </div>
          <div className="text-left min-w-0">
            <div className="text-xs font-bold text-slate-900 dark:text-white truncate">
              Favorites
            </div>
            <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
              {favorites.length} Saved
            </div>
          </div>
        </button>

        <button
          onClick={() => setScreen('map')}
          id="home-quick-map"
          className="p-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 flex items-center gap-2 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition shadow-xs cursor-pointer"
        >
          <div className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
            <Sparkles className="w-4 h-4" />
          </div>
          <div className="text-left min-w-0">
            <div className="text-xs font-bold text-slate-900 dark:text-white truncate">
              GPS Map
            </div>
            <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
              Discoveries
            </div>
          </div>
        </button>

        <button
          onClick={() => setScreen('reminders')}
          id="home-quick-reminders"
          className="p-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 flex items-center gap-2 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition shadow-xs cursor-pointer"
        >
          <div className="w-8 h-8 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
            <HeartPulse className="w-4 h-4" />
          </div>
          <div className="text-left min-w-0">
            <div className="text-xs font-bold text-slate-900 dark:text-white truncate">
              Reminders
            </div>
            <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
              Water Alarms
            </div>
          </div>
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => {
              if (!searchQuery) setScreen('search');
            }}
            placeholder="Search plants by common or scientific name..."
            id="home-search-bar"
            className="w-full pl-10 pr-10 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-xs"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              Clear
            </button>
          )}
        </div>

        <button
          onClick={() => setScreen('search')}
          id="home-open-search-screen-button"
          className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-slate-600 dark:text-slate-300 hover:text-emerald-600 hover:border-emerald-500/50 transition cursor-pointer shrink-0 shadow-xs"
          title="Open Search Page"
        >
          <Search className="w-4 h-4 text-emerald-600" />
        </button>
      </div>

      {/* Category Chips */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
              selectedCategory === cat
                ? 'bg-emerald-700 text-white shadow-md shadow-emerald-700/20'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-emerald-50 dark:hover:bg-emerald-950/40'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Plant Spotlight / Catalog Grid */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
            <Leaf className="w-4 h-4 text-emerald-600" />
            <span>Botanical Database</span>
            <span className="text-xs font-normal text-slate-400">({filteredPlants.length})</span>
          </h3>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {filteredPlants.map((plant) => (
            <motion.div
              key={plant.id}
              whileHover={{ y: -3 }}
              onClick={() => startScanFlowWithPlant(plant)}
              id={`plant-card-${plant.id}`}
              className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 overflow-hidden shadow-xs hover:shadow-md transition cursor-pointer flex flex-col group"
            >
              <div className="relative h-28 overflow-hidden bg-slate-100 dark:bg-slate-800">
                <img
                  src={plant.imageUrl}
                  alt={plant.commonName}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-2 left-2 text-[10px] font-bold bg-slate-950/60 backdrop-blur-md text-emerald-300 px-2 py-0.5 rounded-full border border-white/10">
                  {plant.category}
                </span>

                {plant.toxicity.level !== 'safe' && (
                  <span className="absolute top-2 right-2 w-5 h-5 bg-amber-500/80 backdrop-blur-md text-white rounded-full flex items-center justify-center" title="Toxic to pets">
                    <ShieldAlert className="w-3 h-3" />
                  </span>
                )}
              </div>

              <div className="p-3 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-bold text-xs text-slate-900 dark:text-white line-clamp-1">
                    {plant.commonName}
                  </h4>
                  <p className="text-[10px] italic text-emerald-700 dark:text-emerald-400 line-clamp-1">
                    {plant.scientificName}
                  </p>
                </div>

                <div className="mt-2 pt-2 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between text-[10px] text-slate-500 dark:text-slate-400">
                  <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold">
                    <HeartPulse className="w-3 h-3" /> {plant.confidence}% Match
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-600 transition" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Featured Spotlight Card */}
      <div className="bg-gradient-to-br from-teal-900 via-emerald-900 to-slate-900 text-white p-4 rounded-3xl shadow-lg border border-teal-700/30 relative overflow-hidden">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[10px] font-extrabold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 px-2.5 py-0.5 rounded-full border border-emerald-400/30">
            Featured Botanical
          </span>
        </div>

        <div className="flex items-center gap-4">
          <img
            src={featuredPlant.imageUrl}
            alt={featuredPlant.commonName}
            className="w-20 h-20 rounded-2xl object-cover border-2 border-emerald-400/40 shrink-0"
          />
          <div className="flex-1">
            <h4 className="font-bold text-base text-white">{featuredPlant.commonName}</h4>
            <p className="text-xs text-emerald-300 italic mb-1">{featuredPlant.scientificName}</p>
            <p className="text-[11px] text-emerald-100/80 line-clamp-2 leading-relaxed">
              {featuredPlant.description}
            </p>
          </div>
        </div>

        <button
          onClick={() => startScanFlowWithPlant(featuredPlant)}
          className="mt-3 w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl text-xs flex items-center justify-center gap-1.5 transition cursor-pointer"
        >
          <span>View Full Botanical Profile</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Daily Plant Care Tip */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 flex items-start gap-3">
        <div className="w-9 h-9 rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
          <BookOpen className="w-5 h-5" />
        </div>
        <div>
          <h4 className="text-xs font-bold text-slate-900 dark:text-white">Daily Gardening Wisdom</h4>
          <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
            Always test soil moisture 2 inches below surface before watering succulents. Overwatering is the #1 cause of root rot in household flora.
          </p>
        </div>
      </div>
    </div>
  );
};
