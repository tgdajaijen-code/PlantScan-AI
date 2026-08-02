import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  History as HistoryIcon, 
  Search, 
  Trash2, 
  Calendar, 
  ChevronRight, 
  ArrowLeft, 
  Scan, 
  Sparkles, 
  ShieldAlert, 
  Filter,
  MapPin,
  FileText
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const HistoryScreen: React.FC = () => {
  const { 
    history, 
    removeHistoryRecord, 
    clearHistory, 
    startScanFlowWithPlant, 
    goBack, 
    setScreen 
  } = useApp();

  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'safe' | 'toxic'>('all');

  const filteredHistory = history.filter(item => {
    const term = search.toLowerCase();
    const matchesSearch = item.plant.commonName.toLowerCase().includes(term) ||
      item.plant.scientificName.toLowerCase().includes(term) ||
      (item.customNote && item.customNote.toLowerCase().includes(term)) ||
      (item.location && item.location.toLowerCase().includes(term));
    
    if (filter === 'safe') return matchesSearch && item.plant.toxicity.level === 'safe';
    if (filter === 'toxic') return matchesSearch && item.plant.toxicity.level !== 'safe';
    return matchesSearch;
  });

  return (
    <div className="flex-1 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 p-4 pb-24 space-y-4">
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
              <HistoryIcon className="w-5 h-5 text-emerald-600" />
              <span>Scan History</span>
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {history.length} Saved botanical identification records
            </p>
          </div>
        </div>

        {history.length > 0 && (
          <button
            onClick={clearHistory}
            className="p-2 text-rose-600 hover:text-rose-700 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-xl transition cursor-pointer text-xs font-semibold flex items-center gap-1"
            title="Clear all history"
          >
            <Trash2 className="w-4 h-4" />
            <span className="hidden sm:inline">Clear</span>
          </button>
        )}
      </div>

      {/* Search and Filters Bar */}
      <div className="space-y-2">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search scan history..."
            className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-xs"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="w-3.5 h-3.5 text-slate-400" />
          <div className="flex gap-1.5 text-[11px] font-semibold">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1 rounded-full transition cursor-pointer ${
                filter === 'all'
                  ? 'bg-emerald-700 text-white'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800'
              }`}
            >
              All Scans
            </button>
            <button
              onClick={() => setFilter('safe')}
              className={`px-3 py-1 rounded-full transition cursor-pointer ${
                filter === 'safe'
                  ? 'bg-emerald-700 text-white'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800'
              }`}
            >
              Pet Safe
            </button>
            <button
              onClick={() => setFilter('toxic')}
              className={`px-3 py-1 rounded-full transition cursor-pointer ${
                filter === 'toxic'
                  ? 'bg-emerald-700 text-white'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800'
              }`}
            >
              Toxic Alerts
            </button>
          </div>
        </div>
      </div>

      {/* History Items List */}
      {filteredHistory.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 text-center border border-slate-200 dark:border-slate-800 my-8">
          <HistoryIcon className="w-12 h-12 text-slate-300 dark:text-slate-700 mx-auto mb-3 animate-bounce" />
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">No scan history found</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-xs mx-auto">
            {search ? 'No plants match your search terms.' : 'Scanned plants will appear here automatically.'}
          </p>
          <button
            onClick={() => setScreen('camera')}
            className="mt-4 px-4 py-2 bg-emerald-600 text-white text-xs font-semibold rounded-xl inline-flex items-center gap-1.5 cursor-pointer shadow-md shadow-emerald-600/30"
          >
            <Scan className="w-4 h-4" /> Start First Scan
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredHistory.map((item) => {
            const dateFormatted = new Date(item.scannedAt).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            });

            return (
              <motion.div
                key={item.id}
                whileHover={{ scale: 1.01 }}
                className="bg-white dark:bg-slate-900 p-3.5 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-xs flex items-center justify-between gap-3 group"
              >
                <div
                  className="flex items-center gap-3 flex-1 cursor-pointer"
                  onClick={() => startScanFlowWithPlant(item.plant, item.customImage || item.plant.imageUrl)}
                >
                  <img
                    src={item.customImage || item.plant.imageUrl}
                    alt={item.plant.commonName}
                    className="w-14 h-14 rounded-xl object-cover border border-slate-200 dark:border-slate-800 shrink-0"
                  />

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <h4 className="font-bold text-xs text-slate-900 dark:text-white truncate">
                        {item.plant.commonName}
                      </h4>
                      {item.plant.toxicity.level !== 'safe' && (
                        <ShieldAlert className="w-3.5 h-3.5 text-amber-500 shrink-0" title="Toxic Warning" />
                      )}
                    </div>

                    <p className="text-[11px] italic text-emerald-700 dark:text-emerald-400 truncate">
                      {item.plant.scientificName}
                    </p>

                    <div className="flex items-center gap-2 mt-1 text-[10px] text-slate-400">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-slate-400" /> {dateFormatted}
                      </span>
                      <span>•</span>
                      <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                        {item.confidence}% Match
                      </span>
                      {item.location && (
                        <>
                          <span>•</span>
                          <span className="flex items-center gap-0.5 text-slate-500">
                            <MapPin className="w-3 h-3 text-emerald-600" /> {item.location}
                          </span>
                        </>
                      )}
                    </div>

                    {item.customNote && (
                      <p className="mt-1 text-[10px] text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 p-1.5 rounded-lg line-clamp-1 italic">
                        " {item.customNote} "
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => removeHistoryRecord(item.id)}
                    className="p-2 text-slate-400 hover:text-rose-600 transition rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                    title="Delete scan record"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 transition" />
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
};
