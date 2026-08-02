import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  X, 
  ArrowLeft, 
  Filter, 
  Scan, 
  Sparkles, 
  Leaf, 
  ChevronRight, 
  ShieldAlert, 
  Heart, 
  HeartPulse, 
  Layers 
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SAMPLE_PLANTS } from '../data/plantDatabase';
import { Plant } from '../types';

const CATEGORIES = ['All', 'Medicinal', 'Indoor', 'Wildflower', 'Succulent', 'Tree & Shrub', 'Herbal'];

const RECENT_SEARCHES = ['Monstera', 'Aloe Vera', 'Lavender', 'Peppermint', 'Snake Plant'];

export const SearchScreen: React.FC = () => {
  const { 
    goBack, 
    setSelectedPlant, 
    setScreen, 
    favorites, 
    toggleFavorite, 
    searchQuery, 
    setSearchQuery,
    selectedCategory,
    setSelectedCategory
  } = useApp();

  const [toxicityFilter, setToxicityFilter] = useState<'all' | 'safe' | 'toxic'>('all');

  const filteredPlants = SAMPLE_PLANTS.filter((plant) => {
    const query = searchQuery.toLowerCase().trim();
    const matchesQuery = 
      query === '' ||
      plant.commonName.toLowerCase().includes(query) ||
      plant.scientificName.toLowerCase().includes(query) ||
      plant.botanicalFamily.toLowerCase().includes(query) ||
      plant.description.toLowerCase().includes(query) ||
      plant.medicinalBenefits.some(b => b.toLowerCase().includes(query));

    const matchesCategory = 
      selectedCategory === 'All' || plant.category === selectedCategory;

    const matchesToxicity = 
      toxicityFilter === 'all' ? true :
      toxicityFilter === 'safe' ? plant.toxicity.level === 'safe' :
      plant.toxicity.level !== 'safe';

    return matchesQuery && matchesCategory && matchesToxicity;
  });

  const handleSelectPlant = (plant: Plant) => {
    setSelectedPlant(plant);
    setScreen('result');
  };

  return (
    <div className="flex-1 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 p-4 pb-24 flex flex-col space-y-4">
      {/* Header Bar */}
      <div className="flex items-center gap-3 pt-1">
        <button
          onClick={goBack}
          id="search-back-button"
          className="p-2.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:text-emerald-600 transition shadow-xs cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <Search className="w-5 h-5 text-emerald-600" />
            <span>Botanical Search</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Explore {SAMPLE_PLANTS.length}+ plant species, herbs & succulents
          </p>
        </div>
      </div>

      {/* Main Search Bar Input */}
      <div className="relative">
        <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search common name, Latin binomial, family, or use..."
          id="search-input-field"
          className="w-full pl-11 pr-10 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-xs"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 dark:hover:text-white transition"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Quick Recent Search Chips */}
      {searchQuery === '' && (
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5 block">
            Popular Searches:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {RECENT_SEARCHES.map((term) => (
              <button
                key={term}
                onClick={() => setSearchQuery(term)}
                className="px-2.5 py-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-[11px] text-slate-600 dark:text-slate-300 hover:border-emerald-500 transition cursor-pointer"
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Category Pills Slider */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition cursor-pointer border ${
                isSelected
                  ? 'bg-emerald-600 text-white border-emerald-500 shadow-xs'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-emerald-500/50'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Toxicity Safety Filter Bar */}
      <div className="flex items-center justify-between text-xs bg-white dark:bg-slate-900 p-2.5 rounded-2xl border border-slate-200/80 dark:border-slate-800/80">
        <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1">
          <Filter className="w-3.5 h-3.5 text-emerald-600" /> Pet Toxicity Filter:
        </span>

        <div className="flex items-center gap-1">
          {(['all', 'safe', 'toxic'] as const).map((tf) => (
            <button
              key={tf}
              onClick={() => setToxicityFilter(tf)}
              className={`px-2.5 py-1 rounded-lg text-[10px] font-bold capitalize transition cursor-pointer ${
                toxicityFilter === tf
                  ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-500/40'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {tf === 'toxic' ? 'Mild/Toxic' : tf}
            </button>
          ))}
        </div>
      </div>

      {/* Results Count Summary */}
      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 px-1">
        <span>Showing <strong className="text-slate-900 dark:text-white">{filteredPlants.length}</strong> botanical matches</span>
        {searchQuery && (
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
              setToxicityFilter('all');
            }}
            className="text-emerald-600 dark:text-emerald-400 font-semibold text-[11px] hover:underline"
          >
            Reset Filters
          </button>
        )}
      </div>

      {/* Results List */}
      {filteredPlants.length > 0 ? (
        <div className="space-y-2.5">
          {filteredPlants.map((plant) => {
            const isFav = favorites.includes(plant.id);
            return (
              <motion.div
                key={plant.id}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => handleSelectPlant(plant)}
                className="bg-white dark:bg-slate-900 p-3 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-xs flex items-center justify-between gap-3 cursor-pointer group hover:border-emerald-500/50 transition"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={plant.thumbnailUrl}
                    alt={plant.commonName}
                    className="w-14 h-14 rounded-xl object-cover shrink-0 border border-slate-200 dark:border-slate-800"
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h3 className="text-xs font-extrabold text-slate-900 dark:text-white group-hover:text-emerald-600 transition">
                        {plant.commonName}
                      </h3>
                      <span className="text-[9px] bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 px-1.5 py-0.5 rounded-md font-semibold border border-emerald-500/20">
                        {plant.category}
                      </span>
                    </div>

                    <p className="text-[10px] text-slate-400 italic">
                      {plant.scientificName}
                    </p>

                    <p className="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                      {plant.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(plant.id);
                    }}
                    className={`p-2 rounded-xl transition ${
                      isFav
                        ? 'text-rose-500 bg-rose-50 dark:bg-rose-950/60'
                        : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${isFav ? 'fill-rose-500' : ''}`} />
                  </button>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 transition" />
                </div>
              </motion.div>
            );
          })}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-400 flex items-center justify-center mx-auto">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">
            No Botanical Match Found
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs mx-auto">
            Try searching for a different keyword or scan the leaf using AI Vision scanner.
          </p>
          <div className="pt-2 flex justify-center gap-2">
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
                setToxicityFilter('all');
              }}
              className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold rounded-xl text-xs hover:bg-slate-200 transition"
            >
              Clear Filters
            </button>
            <button
              onClick={() => setScreen('camera')}
              className="px-4 py-2 bg-emerald-600 text-white font-bold rounded-xl text-xs hover:bg-emerald-500 transition flex items-center gap-1.5"
            >
              <Scan className="w-3.5 h-3.5" /> Scan Plant Now
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
