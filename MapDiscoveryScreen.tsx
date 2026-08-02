import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, MapPin, Compass, Search, Filter, Sparkles, Navigation, Layers, ExternalLink } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ScanRecord } from '../types';

export const MapDiscoveryScreen: React.FC = () => {
  const { history, goBack, setSelectedPlant, setScreen, t } = useApp();
  const [selectedScan, setSelectedScan] = useState<ScanRecord | null>(history[0] || null);
  const [mapFilter, setMapFilter] = useState<'all' | 'verified' | 'recent'>('all');

  const scansWithLoc = history.filter(h => h.location && typeof h.location === 'object');

  return (
    <div className="flex flex-col h-full bg-slate-900 text-white relative overflow-hidden">
      {/* Top Navigation Header */}
      <div className="p-4 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 flex items-center justify-between z-20">
        <div className="flex items-center gap-3">
          <button
            onClick={goBack}
            className="p-2 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-base font-bold flex items-center gap-1.5 text-white">
              <MapPin className="w-4 h-4 text-emerald-400" />
              <span>{t.map}</span>
            </h1>
            <p className="text-[10px] text-slate-400">
              {scansWithLoc.length} Geotagged Plant Discoveries
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1 bg-slate-800/80 p-1 rounded-2xl border border-slate-700">
          <button
            onClick={() => setMapFilter('all')}
            className={`px-2.5 py-1 text-[10px] font-bold rounded-xl transition cursor-pointer ${
              mapFilter === 'all' ? 'bg-emerald-500 text-white shadow-md' : 'text-slate-400'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setMapFilter('recent')}
            className={`px-2.5 py-1 text-[10px] font-bold rounded-xl transition cursor-pointer ${
              mapFilter === 'recent' ? 'bg-emerald-500 text-white shadow-md' : 'text-slate-400'
            }`}
          >
            Recent
          </button>
        </div>
      </div>

      {/* Interactive Map Canvas View */}
      <div className="relative flex-1 bg-slate-950 overflow-hidden flex items-center justify-center">
        {/* Stylized Grid Lines for High-Tech GPS Map feel */}
        <div 
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle, rgba(16,185,129,0.3) 1px, transparent 1px), linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)`,
            backgroundSize: '32px 32px'
          }}
        />

        {/* Map World Topography Mock Canvas */}
        <div className="absolute inset-0 flex items-center justify-center opacity-40">
          <svg className="w-full h-full text-slate-800" viewBox="0 0 1000 600" fill="currentColor">
            <path d="M150,120 Q200,80 300,140 T500,100 T700,180 T900,120 Q950,300 850,450 T550,500 T300,420 T100,300 Z" />
            <circle cx="280" cy="220" r="140" fill="currentColor" opacity="0.5" />
            <circle cx="680" cy="320" r="180" fill="currentColor" opacity="0.4" />
          </svg>
        </div>

        {/* Radar Scanning Line Animation */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
          className="absolute w-[600px] h-[600px] rounded-full border border-emerald-500/10 pointer-events-none flex items-center justify-center"
        >
          <div className="w-1/2 h-1/2 bg-gradient-to-br from-emerald-500/10 via-transparent to-transparent origin-bottom-right rounded-tl-full" />
        </motion.div>

        {/* Geotagged Scan Markers */}
        <div className="relative w-full h-full max-w-md mx-auto">
          {scansWithLoc.map((record, index) => {
            const loc = record.location!;
            // Calculate pseudo coordinates on stage
            const leftPercent = 20 + ((index * 30 + (loc.longitude || 0)) % 65);
            const topPercent = 25 + ((index * 22 + (loc.latitude || 0)) % 55);
            const isSelected = selectedScan?.id === record.id;

            return (
              <motion.button
                key={record.id}
                onClick={() => setSelectedScan(record)}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                whileHover={{ scale: 1.15 }}
                style={{ left: `${leftPercent}%`, top: `${topPercent}%` }}
                className={`absolute -translate-x-1/2 -translate-y-1/2 z-10 cursor-pointer group flex flex-col items-center`}
              >
                {/* Marker Pulse */}
                <div className={`relative flex items-center justify-center p-2 rounded-full backdrop-blur-md transition ${
                  isSelected 
                    ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/50 scale-110 ring-4 ring-emerald-300/40' 
                    : 'bg-slate-900/90 text-emerald-400 border border-emerald-500/40 hover:bg-emerald-600 hover:text-white'
                }`}>
                  <MapPin className="w-5 h-5" />
                  <span className="absolute -bottom-1 w-2 h-2 bg-emerald-400 rotate-45" />
                </div>

                <div className="mt-1 px-2 py-0.5 rounded-md bg-slate-900/90 border border-slate-700 text-[9px] font-bold text-white whitespace-nowrap shadow-md opacity-90 group-hover:opacity-100">
                  {record.plant.commonName}
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Selected Plant Discovery Detail Card Sheet */}
        <AnimatePresence>
          {selectedScan && (
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              className="absolute bottom-4 left-4 right-4 z-30 bg-slate-900/95 border border-slate-800 rounded-3xl p-4 backdrop-blur-xl shadow-2xl"
            >
              <div className="flex items-center gap-3">
                <img
                  src={selectedScan.customImage || selectedScan.plant.imageUrl}
                  alt={selectedScan.plant.commonName}
                  className="w-16 h-16 rounded-2xl object-cover border border-emerald-500/30 shrink-0"
                />

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded-md border border-emerald-800/40">
                      {selectedScan.plant.confidence}% AI Accuracy
                    </span>
                    <span className="text-[10px] text-slate-400">
                      {new Date(selectedScan.scannedAt).toLocaleDateString()}
                    </span>
                  </div>

                  <h3 className="text-sm font-black text-white truncate mt-1">
                    {selectedScan.plant.commonName}
                  </h3>
                  <p className="text-[11px] italic font-serif text-slate-400 truncate">
                    {selectedScan.plant.scientificName}
                  </p>

                  <p className="text-[10px] text-slate-300 mt-1 flex items-center gap-1">
                    <Navigation className="w-3 h-3 text-emerald-400" />
                    <span>
                      {selectedScan.location?.cityName}, {selectedScan.location?.country}
                    </span>
                  </p>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-slate-800 flex items-center gap-2">
                <button
                  onClick={() => {
                    setSelectedPlant(selectedScan.plant);
                    setScreen('result');
                  }}
                  className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-2xl text-xs flex items-center justify-center gap-1.5 transition cursor-pointer shadow-md"
                >
                  <span>View Botanical Report</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
