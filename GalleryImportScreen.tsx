import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  UploadCloud, 
  Image as ImageIcon, 
  Sparkles, 
  Check, 
  Leaf, 
  Scan, 
  FileText, 
  Info, 
  Layers 
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SAMPLE_PLANTS } from '../data/plantDatabase';
import { Plant } from '../types';

export const GalleryImportScreen: React.FC = () => {
  const { goBack, startScanFlowWithPlant, showToast } = useApp();

  const [selectedImageUri, setSelectedImageUri] = useState<string | null>(SAMPLE_PLANTS[1].imageUrl);
  const [selectedPlant, setSelectedPlant] = useState<Plant>(SAMPLE_PLANTS[1]); // Default Monstera
  const [selectedOrgan, setSelectedOrgan] = useState<'leaf' | 'flower' | 'fruit' | 'bark'>('leaf');
  const [rotation, setRotation] = useState<number>(0);
  const [cropZoom, setCropZoom] = useState<number>(100);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      showToast('Please select a valid image file (PNG, JPG, WebP)', 'warning');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const dataUri = reader.result as string;
      setSelectedImageUri(dataUri);
      
      // Smart matching against sample plants based on filename or default to Monstera
      const matched = SAMPLE_PLANTS.find(p => 
        file.name.toLowerCase().includes(p.commonName.toLowerCase()) || 
        file.name.toLowerCase().includes(p.category.toLowerCase())
      ) || SAMPLE_PLANTS[1];

      setSelectedPlant(matched);
      showToast('Image loaded into gallery scanner', 'success');
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleStartAnalysis = () => {
    if (!selectedImageUri) {
      showToast('Please upload or select an image first', 'warning');
      return;
    }
    startScanFlowWithPlant(selectedPlant, selectedImageUri);
  };

  return (
    <div className="flex-1 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 p-4 pb-24 flex flex-col justify-between space-y-4">
      {/* Hidden file input */}
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        id="gallery-file-input"
      />

      {/* Top App Bar Header */}
      <div className="flex items-center gap-3 pt-1">
        <button
          onClick={goBack}
          id="gallery-back-button"
          className="p-2.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:text-emerald-600 transition shadow-xs cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-emerald-600" />
            <span>Gallery Import</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Select or upload a plant photo for instant AI vision analysis
          </p>
        </div>
      </div>

      {/* Drag & Drop Upload Zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        id="gallery-upload-dropzone"
        className={`border-2 border-dashed rounded-3xl p-5 text-center transition cursor-pointer flex flex-col items-center justify-center relative overflow-hidden ${
          isDragging
            ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 scale-[1.01]'
            : 'border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-emerald-500/60 shadow-xs'
        }`}
      >
        <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-2 shadow-xs">
          <UploadCloud className="w-6 h-6 animate-bounce" />
        </div>

        <h3 className="text-xs font-bold text-slate-900 dark:text-white">
          Drop your plant image here, or <span className="text-emerald-600 dark:text-emerald-400 underline">browse files</span>
        </h3>
        <p className="text-[10px] text-slate-400 mt-0.5">
          Supports PNG, JPG, JPEG, or WebP up to 15MB
        </p>
      </div>

      {/* Active Selected Image Preview Box */}
      {selectedImageUri && (
        <div className="bg-white dark:bg-slate-900 p-3.5 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 shadow-xs space-y-3">
          <div className="flex items-center justify-between text-xs font-bold text-slate-900 dark:text-white">
            <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
              <Sparkles className="w-4 h-4" /> Selected Photo Preview
            </span>
            <span className="text-[10px] bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 px-2 py-0.5 rounded-full font-semibold">
              Ready for Analysis
            </span>
          </div>

          <div className="relative h-44 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-950 flex items-center justify-center">
            <img
              src={selectedImageUri}
              alt="Uploaded plant specimen"
              style={{
                transform: `rotate(${rotation}deg) scale(${cropZoom / 100})`,
                transition: 'transform 0.3s ease'
              }}
              className="max-h-full max-w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />

            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
              <span className="font-semibold">{selectedPlant.commonName}</span>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setRotation((prev) => (prev + 90) % 360)}
                  className="px-2 py-0.5 rounded-md bg-slate-900/80 hover:bg-emerald-600 backdrop-blur-md border border-white/20 text-[10px] cursor-pointer"
                >
                  Rotate ↻ ({rotation}°)
                </button>
                <button
                  type="button"
                  onClick={() => setCropZoom((prev) => (prev >= 150 ? 100 : prev + 25))}
                  className="px-2 py-0.5 rounded-md bg-slate-900/80 hover:bg-emerald-600 backdrop-blur-md border border-white/20 text-[10px] cursor-pointer"
                >
                  Crop Zoom ({cropZoom}%)
                </button>
              </div>
            </div>
          </div>

          {/* Plant Organ Selector Pills */}
          <div>
            <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 block mb-1.5">
              Focus Organ for Classification:
            </span>
            <div className="grid grid-cols-4 gap-1.5">
              {(['leaf', 'flower', 'fruit', 'bark'] as const).map((organ) => (
                <button
                  key={organ}
                  onClick={() => setSelectedOrgan(organ)}
                  className={`py-1.5 rounded-xl text-xs font-semibold capitalize transition cursor-pointer border ${
                    selectedOrgan === organ
                      ? 'bg-emerald-700 text-white border-emerald-600 shadow-xs'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                  }`}
                >
                  {organ}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Preset Curated Gallery Grid */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-1.5">
            <Layers className="w-4 h-4 text-emerald-600" />
            <span>Curated Sample Photos</span>
          </h3>
          <span className="text-[10px] text-slate-400">Tap to select photo</span>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {SAMPLE_PLANTS.map((plant) => {
            const isSelected = selectedPlant.id === plant.id;
            return (
              <motion.button
                key={plant.id}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setSelectedPlant(plant);
                  setSelectedImageUri(plant.imageUrl);
                }}
                className={`relative h-24 rounded-2xl overflow-hidden border transition cursor-pointer group ${
                  isSelected
                    ? 'border-emerald-500 ring-2 ring-emerald-500/50 shadow-md'
                    : 'border-slate-200 dark:border-slate-800 opacity-80 hover:opacity-100'
                }`}
              >
                <img
                  src={plant.thumbnailUrl}
                  alt={plant.commonName}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent" />
                
                {isSelected && (
                  <div className="absolute top-1.5 right-1.5 w-5 h-5 bg-emerald-500 text-white rounded-full flex items-center justify-center shadow-md">
                    <Check className="w-3 h-3" />
                  </div>
                )}

                <span className="absolute bottom-1.5 left-1.5 right-1.5 text-[10px] font-bold text-white truncate text-left">
                  {plant.commonName}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Main Action Trigger */}
      <button
        onClick={handleStartAnalysis}
        id="gallery-start-analysis-button"
        className="w-full py-3.5 bg-gradient-to-r from-emerald-600 via-emerald-700 to-teal-800 text-white rounded-2xl text-xs font-extrabold flex items-center justify-center gap-2 shadow-lg shadow-emerald-700/30 hover:scale-[1.01] active:scale-[0.99] transition cursor-pointer"
      >
        <Scan className="w-4 h-4 text-white animate-pulse" />
        <span>Analyze Selected Photo with AI Vision</span>
      </button>
    </div>
  );
};
