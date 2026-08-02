import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  Heart, 
  Share2, 
  Bookmark, 
  Scan, 
  ShieldAlert, 
  ShieldCheck, 
  HeartPulse, 
  BookOpen, 
  Sun, 
  Droplets, 
  Thermometer, 
  Globe, 
  Sparkles, 
  Check, 
  Info, 
  Maximize2, 
  X,
  FileEdit,
  MapPin,
  Bot,
  Volume2,
  VolumeX,
  Sprout,
  Calendar
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ShareModal } from '../components/ShareModal';
import { PlantAiChatbot } from '../components/PlantAiChatbot';
import { SAMPLE_PLANTS } from '../data/plantDatabase';

export const PlantResultScreen: React.FC = () => {
  const { 
    selectedPlant, 
    selectedPlantCandidates,
    selectCandidate,
    capturedImage, 
    goBack, 
    setScreen, 
    favorites, 
    toggleFavorite, 
    addHistoryRecord, 
    showToast 
  } = useApp();

  const plant = selectedPlant || SAMPLE_PLANTS[0];
  const isFav = favorites.includes(plant.id);

  const [activeTab, setActiveTab] = useState<'overview' | 'medicinal' | 'care'>('overview');
  const [isShareOpen, setIsShareOpen] = useState<boolean>(false);
  const [isChatbotOpen, setIsChatbotOpen] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [isSavedToHistory, setIsSavedToHistory] = useState<boolean>(false);
  const [isImageLightboxOpen, setIsImageLightboxOpen] = useState<boolean>(false);
  const [personalNote, setPersonalNote] = useState<string>('');
  const [scanLocation, setScanLocation] = useState<string>('Home Garden');

  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handleToggleSpeech = () => {
    if ('speechSynthesis' in window) {
      if (isSpeaking) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
        showToast('Voice playback stopped', 'info');
      } else {
        const textToRead = `${plant.commonName}. Scientific name: ${plant.scientificName}. Botanical family: ${plant.botanicalFamily}. Description: ${plant.description}. Toxicity risk: ${plant.toxicity.level}. Care sunlight: ${plant.care.sunlight}. Watering: ${plant.care.watering}`;
        const utterance = new SpeechSynthesisUtterance(textToRead);
        utterance.rate = 0.95;
        utterance.onend = () => setIsSpeaking(false);
        utterance.onerror = () => setIsSpeaking(false);
        setIsSpeaking(true);
        window.speechSynthesis.speak(utterance);
        showToast('Voice reading started', 'info');
      }
    } else {
      showToast('Text-to-speech not supported on this browser', 'warning');
    }
  };

  const plantImg = capturedImage || plant.imageUrl;

  const handleSaveToHistory = () => {
    addHistoryRecord(plant, plantImg, personalNote, scanLocation);
    setIsSavedToHistory(true);
  };

  return (
    <div className="flex-1 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 flex flex-col pb-24 relative overflow-y-auto custom-scrollbar">
      {/* Share Modal */}
      <ShareModal
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        plant={plant}
      />

      {/* AI Assistant Chatbot Sheet */}
      <PlantAiChatbot
        plant={plant}
        isOpen={isChatbotOpen}
        onClose={() => setIsChatbotOpen(false)}
      />

      {/* Image Lightbox View */}
      <AnimatePresence>
        {isImageLightboxOpen && (
          <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4">
            <button
              onClick={() => setIsImageLightboxOpen(false)}
              className="absolute top-6 right-6 p-3 bg-slate-800 text-white rounded-full hover:bg-slate-700 transition cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
            <img
              src={plantImg}
              alt={plant.commonName}
              className="max-w-full max-h-[80vh] rounded-3xl object-contain shadow-2xl border-2 border-emerald-500/40"
            />
          </div>
        )}
      </AnimatePresence>

      {/* Top Image Hero Banner */}
      <div className="relative h-72 w-full bg-slate-900 shrink-0">
        <img
          src={plantImg}
          alt={plant.commonName}
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />

        {/* Top Floating Actions */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
          <button
            onClick={goBack}
            id="result-back-button"
            className="p-2.5 rounded-2xl bg-slate-950/60 hover:bg-slate-950 text-white backdrop-blur-md border border-white/20 transition cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handleToggleSpeech}
              className={`p-2.5 rounded-2xl backdrop-blur-md border transition cursor-pointer ${
                isSpeaking
                  ? 'bg-emerald-500 text-white border-emerald-400 animate-pulse'
                  : 'bg-slate-950/60 text-white border-white/20'
              }`}
              title="Voice Reading"
            >
              {isSpeaking ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </button>

            <button
              onClick={() => setIsImageLightboxOpen(true)}
              className="p-2.5 rounded-2xl bg-slate-950/60 hover:bg-slate-950 text-white backdrop-blur-md border border-white/20 transition cursor-pointer"
              title="Expand photo"
            >
              <Maximize2 className="w-5 h-5" />
            </button>

            <button
              onClick={() => toggleFavorite(plant.id)}
              id="result-favorite-button"
              className={`p-2.5 rounded-2xl backdrop-blur-md border transition cursor-pointer ${
                isFav
                  ? 'bg-rose-600 text-white border-rose-400 shadow-lg shadow-rose-600/40'
                  : 'bg-slate-950/60 text-white border-white/20'
              }`}
            >
              <Heart className={`w-5 h-5 ${isFav ? 'fill-white' : ''}`} />
            </button>
          </div>
        </div>

        {/* AI Confidence Badge */}
        <div className="absolute bottom-4 left-4 z-10 flex items-center gap-2">
          <div className="bg-emerald-600/90 text-white backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-md border border-emerald-400/30">
            <Sparkles className="w-4 h-4 text-emerald-300" />
            <span>{plant.confidence}% AI Match Confidence</span>
          </div>

          <span className="bg-slate-950/80 text-emerald-300 px-3 py-1 rounded-full text-xs font-semibold border border-emerald-500/30">
            {plant.category}
          </span>
        </div>
      </div>

      {/* Main Content Body */}
      <div className="p-4 space-y-4 -mt-2 z-10">
        {/* Plant Header Titles & Taxonomy Details */}
        <div className="bg-white dark:bg-slate-900 p-4 rounded-3xl shadow-sm border border-slate-200/80 dark:border-slate-800/80 space-y-3">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                {plant.commonName}
              </h1>
              <p className="text-sm font-serif italic text-emerald-700 dark:text-emerald-400 font-medium">
                {plant.scientificName}
              </p>
            </div>

            <div className="text-right">
              <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold block">
                Family
              </span>
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-lg inline-block mt-0.5">
                {plant.botanicalFamily}
              </span>
            </div>
          </div>

          {/* Explicit Genus & Species Breakdown Badges */}
          <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-slate-100 dark:border-slate-800">
            <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">Taxonomy:</span>
            <span className="text-[10px] font-bold bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 px-2 py-0.5 rounded-md border border-emerald-200 dark:border-emerald-800">
              Genus: <em className="font-serif italic">{plant.genus || plant.scientificName.split(' ')[0]}</em>
            </span>
            <span className="text-[10px] font-bold bg-teal-50 dark:bg-teal-950 text-teal-700 dark:text-teal-300 px-2 py-0.5 rounded-md border border-teal-200 dark:border-teal-800">
              Species: <em className="font-serif italic">{plant.species || plant.scientificName.split(' ').slice(1).join(' ') || 'spec.'}</em>
            </span>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100 dark:border-slate-800/80 text-center text-xs">
            <div className="p-2 bg-emerald-50 dark:bg-emerald-950/40 rounded-2xl">
              <span className="text-[10px] text-slate-500 dark:text-slate-400 block">Toxicity</span>
              <span className={`font-bold capitalize ${
                plant.toxicity.level === 'safe'
                  ? 'text-emerald-600'
                  : plant.toxicity.level === 'mild'
                  ? 'text-amber-600'
                  : 'text-rose-600'
              }`}>
                {plant.toxicity.level}
              </span>
            </div>

            <div className="p-2 bg-emerald-50 dark:bg-emerald-950/40 rounded-2xl">
              <span className="text-[10px] text-slate-500 dark:text-slate-400 block">Sunlight</span>
              <span className="font-bold text-slate-800 dark:text-slate-200 truncate block">
                {plant.care.sunlight.split(' ')[0]} Light
              </span>
            </div>

            <div className="p-2 bg-emerald-50 dark:bg-emerald-950/40 rounded-2xl">
              <span className="text-[10px] text-slate-500 dark:text-slate-400 block">Water</span>
              <span className="font-bold text-slate-800 dark:text-slate-200 truncate block">
                {plant.care.watering.split(' ')[0]}
              </span>
            </div>
          </div>
        </div>

        {/* PlantNet API Candidate Species Selector */}
        {selectedPlantCandidates && selectedPlantCandidates.length > 1 && (
          <div className="bg-white dark:bg-slate-900 p-4 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 space-y-3 shadow-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                <Sparkles className="w-4 h-4 text-emerald-500" />
                <span>Identification Candidates ({selectedPlantCandidates.length})</span>
              </div>
              <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded-md">
                Ordered by Confidence
              </span>
            </div>

            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Multiple species matches were returned by the botanical neural network. Tap any candidate species to review its profile:
            </p>

            <div className="space-y-2 max-h-56 overflow-y-auto pr-1 custom-scrollbar">
              {selectedPlantCandidates.map((candidate, idx) => {
                const isSelected = candidate.scientificName === plant.scientificName;
                return (
                  <button
                    key={candidate.id || idx}
                    onClick={() => selectCandidate(candidate)}
                    className={`w-full p-2.5 rounded-2xl border text-left transition flex items-center justify-between cursor-pointer ${
                      isSelected
                        ? 'bg-emerald-50/80 dark:bg-emerald-950/60 border-emerald-500 ring-2 ring-emerald-500/30'
                        : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200/80 dark:border-slate-800 hover:border-emerald-400'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <img
                          src={candidate.thumbnailUrl || candidate.imageUrl}
                          alt={candidate.commonName}
                          className="w-10 h-10 rounded-xl object-cover border border-emerald-500/30"
                        />
                        <span className="absolute -bottom-1 -right-1 text-[8px] font-black bg-slate-900 text-white px-1 rounded-full border border-emerald-400">
                          #{idx + 1}
                        </span>
                      </div>

                      <div>
                        <span className="text-xs font-bold text-slate-900 dark:text-white block">
                          {candidate.commonName}
                        </span>
                        <span className="text-[10px] font-serif italic text-emerald-600 dark:text-emerald-400 block">
                          {candidate.scientificName}
                        </span>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className={`text-xs font-black px-2 py-0.5 rounded-lg inline-block ${
                        candidate.confidence >= 85
                          ? 'bg-emerald-600 text-white'
                          : candidate.confidence >= 60
                          ? 'bg-amber-500 text-slate-950'
                          : 'bg-slate-600 text-white'
                      }`}>
                        {candidate.confidence}%
                      </span>
                      {isSelected && (
                        <span className="text-[9px] font-extrabold text-emerald-600 dark:text-emerald-400 block mt-0.5">
                          Active Choice
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* AI Assistant Banner */}
        <button
          onClick={() => setIsChatbotOpen(true)}
          id="result-open-ai-chat-button"
          className="w-full p-3.5 bg-gradient-to-r from-emerald-900 via-emerald-800 to-teal-900 text-white rounded-3xl text-xs font-bold flex items-center justify-between shadow-md hover:scale-[1.01] transition cursor-pointer border border-emerald-500/30"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center shrink-0">
              <Bot className="w-5 h-5 text-emerald-300" />
            </div>
            <div className="text-left">
              <span className="block font-black text-xs text-white">Ask Botanical AI Assistant</span>
              <span className="block text-[10px] text-emerald-200">Get care, watering & disease answers</span>
            </div>
          </div>
          <Sparkles className="w-5 h-5 text-emerald-300 animate-pulse" />
        </button>

        {/* Action Buttons Toolbar: Save, Favorite, Share, Scan another */}
        <div className="grid grid-cols-4 gap-2">
          <button
            onClick={handleSaveToHistory}
            id="result-save-history-button"
            className={`py-2.5 rounded-2xl text-xs font-bold flex flex-col items-center gap-1 transition cursor-pointer border ${
              isSavedToHistory
                ? 'bg-emerald-700 text-white border-emerald-600'
                : 'bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-800 hover:bg-emerald-50'
            }`}
          >
            {isSavedToHistory ? <Check className="w-4 h-4 text-emerald-300" /> : <Bookmark className="w-4 h-4 text-emerald-600" />}
            <span>{isSavedToHistory ? 'Saved' : 'Save'}</span>
          </button>

          <button
            onClick={() => toggleFavorite(plant.id)}
            id="result-fav-toggle-button"
            className={`py-2.5 rounded-2xl text-xs font-bold flex flex-col items-center gap-1 transition cursor-pointer border ${
              isFav
                ? 'bg-rose-600 text-white border-rose-500'
                : 'bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-800 hover:bg-rose-50'
            }`}
          >
            <Heart className={`w-4 h-4 ${isFav ? 'fill-white text-white' : 'text-rose-500'}`} />
            <span>Favorite</span>
          </button>

          <button
            onClick={() => setIsShareOpen(true)}
            id="result-share-button"
            className="py-2.5 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 rounded-2xl text-xs font-bold flex flex-col items-center gap-1 transition cursor-pointer"
          >
            <Share2 className="w-4 h-4 text-teal-600" />
            <span>Share</span>
          </button>

          <button
            onClick={() => setScreen('camera')}
            id="result-scan-another-button"
            className="py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-2xl text-xs font-bold flex flex-col items-center gap-1 shadow-md shadow-emerald-600/30 transition cursor-pointer"
          >
            <Scan className="w-4 h-4 text-white" />
            <span>Scan New</span>
          </button>
        </div>

        {/* Tab Navigation Controls */}
        <div className="flex bg-slate-200/60 dark:bg-slate-900 p-1 rounded-2xl text-xs font-semibold">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex-1 py-2 rounded-xl transition cursor-pointer ${
              activeTab === 'overview'
                ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs font-bold'
                : 'text-slate-500 dark:text-slate-400'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('medicinal')}
            className={`flex-1 py-2 rounded-xl transition cursor-pointer ${
              activeTab === 'medicinal'
                ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs font-bold'
                : 'text-slate-500 dark:text-slate-400'
            }`}
          >
            Medicinal & Uses
          </button>
          <button
            onClick={() => setActiveTab('care')}
            className={`flex-1 py-2 rounded-xl transition cursor-pointer ${
              activeTab === 'care'
                ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs font-bold'
                : 'text-slate-500 dark:text-slate-400'
            }`}
          >
            Care & Habitat
          </button>
        </div>

        {/* Tab Content 1: Overview */}
        {activeTab === 'overview' && (
          <div className="space-y-4">
            {/* Description Card */}
            <div className="bg-white dark:bg-slate-900 p-4 rounded-3xl border border-slate-200/80 dark:border-slate-800/80">
              <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 mb-2">
                Botanical Summary
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {plant.description}
              </p>
            </div>

            {/* Plant Health & Disease Diagnosis Card */}
        {plant.health && (
          <div className="bg-gradient-to-br from-emerald-950 via-teal-950 to-slate-900 text-white p-4 rounded-3xl border border-emerald-700/40 shadow-lg space-y-3">
            <div className="flex items-center justify-between border-b border-emerald-800/60 pb-2">
              <div className="flex items-center gap-2">
                <HeartPulse className="w-5 h-5 text-emerald-400 animate-pulse" />
                <h3 className="text-xs font-black uppercase tracking-wider text-white">
                  AI Health & Disease Diagnosis
                </h3>
              </div>
              <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border ${
                plant.health.status === 'healthy'
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400/40'
                  : 'bg-amber-500/20 text-amber-300 border-amber-400/40'
              }`}>
                {plant.health.status.toUpperCase()} ({plant.health.healthScore}% Score)
              </span>
            </div>

            <p className="text-xs text-emerald-100/90 leading-relaxed font-medium">
              {plant.health.diagnosis}
            </p>

            {plant.health.symptoms && plant.health.symptoms.length > 0 && (
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">Observed Symptoms:</span>
                <div className="flex flex-wrap gap-1.5">
                  {plant.health.symptoms.map((symptom, i) => (
                    <span key={i} className="text-[10px] bg-slate-900/80 text-emerald-200 px-2 py-0.5 rounded-md border border-emerald-700/40">
                      • {symptom}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {plant.health.treatments && plant.health.treatments.length > 0 && (
              <div className="space-y-1 pt-1">
                <span className="text-[10px] font-bold text-teal-300 uppercase tracking-wider">Recommended Treatment:</span>
                <ul className="text-xs text-emerald-100/80 space-y-1 list-disc list-inside">
                  {plant.health.treatments.map((treatment, i) => (
                    <li key={i}>{treatment}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
            <div className={`p-4 rounded-3xl border ${
              plant.toxicity.level === 'safe'
                ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800/60'
                : plant.toxicity.level === 'mild'
                ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800/60'
                : 'bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800/60'
            }`}>
              <div className="flex items-start gap-3">
                <div className={`w-9 h-9 rounded-2xl flex items-center justify-center shrink-0 ${
                  plant.toxicity.level === 'safe'
                    ? 'bg-emerald-100 dark:bg-emerald-900 text-emerald-700'
                    : plant.toxicity.level === 'mild'
                    ? 'bg-amber-100 dark:bg-amber-900 text-amber-700'
                    : 'bg-rose-100 dark:bg-rose-900 text-rose-700'
                }`}>
                  {plant.toxicity.level === 'safe' ? <ShieldCheck className="w-5 h-5" /> : <ShieldAlert className="w-5 h-5" />}
                </div>

                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white capitalize flex items-center gap-1.5">
                    Toxicity Risk: {plant.toxicity.level}
                    {plant.toxicity.affectedPets && plant.toxicity.affectedPets.length > 0 && (
                      <span className="text-[10px] bg-white/80 dark:bg-slate-800 px-2 py-0.5 rounded-full text-slate-600 dark:text-slate-300">
                        Pets: {plant.toxicity.affectedPets.join(', ')}
                      </span>
                    )}
                  </h4>
                  <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                    {plant.toxicity.details}
                  </p>
                </div>
              </div>
            </div>

            {/* Fun Fact Card */}
            <div className="bg-gradient-to-r from-emerald-900 to-teal-950 text-white p-4 rounded-3xl shadow-sm border border-emerald-700/30">
              <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-300 mb-1">
                <Sparkles className="w-4 h-4 text-emerald-400" /> Did You Know?
              </div>
              <p className="text-xs text-emerald-100/90 leading-relaxed italic">
                "{plant.funFact}"
              </p>
            </div>

            {/* Personal Observation & Location Note */}
            <div className="bg-white dark:bg-slate-900 p-4 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
                <FileEdit className="w-4 h-4 text-emerald-600" /> Personal Scan Note & Location
              </h3>

              <div className="space-y-2">
                <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-800/50 p-2 rounded-2xl border border-slate-200 dark:border-slate-800">
                  <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
                  <input
                    type="text"
                    value={scanLocation}
                    onChange={(e) => setScanLocation(e.target.value)}
                    placeholder="Location tag (e.g., Living Room Window, Balcony Garden)..."
                    className="w-full text-xs bg-transparent text-slate-900 dark:text-white border-none focus:outline-none placeholder-slate-400"
                  />
                </div>

                <textarea
                  value={personalNote}
                  onChange={(e) => setPersonalNote(e.target.value)}
                  placeholder="Add custom notes (e.g., Watered today, fertilized with organic mix, repotted in May)..."
                  rows={2}
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-2xl text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
                />

                <button
                  onClick={handleSaveToHistory}
                  className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs transition cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Bookmark className="w-3.5 h-3.5" /> Save Note to Scan Record
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tab Content 2: Medicinal Benefits & Traditional Uses */}
        {activeTab === 'medicinal' && (
          <div className="space-y-4">
            {/* Medicinal Benefits */}
            <div className="bg-white dark:bg-slate-900 p-4 rounded-3xl border border-slate-200/80 dark:border-slate-800/80">
              <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 mb-3 flex items-center gap-1.5">
                <HeartPulse className="w-4 h-4 text-emerald-600" /> Therapeutic & Health Benefits
              </h3>
              <div className="space-y-2.5">
                {plant.medicinalBenefits.map((benefit, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300">
                    <div className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5 font-bold text-[10px]">
                      ✓
                    </div>
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Traditional Uses */}
            <div className="bg-white dark:bg-slate-900 p-4 rounded-3xl border border-slate-200/80 dark:border-slate-800/80">
              <h3 className="text-xs font-bold uppercase tracking-wider text-teal-700 dark:text-teal-400 mb-3 flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-teal-600" /> Traditional & Ethnobotanical Uses
              </h3>
              <div className="space-y-2.5">
                {plant.traditionalUses.map((useItem, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300">
                    <div className="w-5 h-5 rounded-full bg-teal-100 dark:bg-teal-950 text-teal-700 dark:text-teal-400 flex items-center justify-center shrink-0 mt-0.5 text-[10px]">
                      📜
                    </div>
                    <span>{useItem}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab Content 3: Care Guide & Native Habitat */}
        {activeTab === 'care' && (
          <div className="space-y-4">
            {/* Native Region & Habitat */}
            <div className="bg-white dark:bg-slate-900 p-4 rounded-3xl border border-slate-200/80 dark:border-slate-800/80">
              <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 mb-2 flex items-center gap-1.5">
                <Globe className="w-4 h-4" /> Native Habitat & Geography
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-2">
                <strong className="text-slate-900 dark:text-white">Origin:</strong> {plant.nativeRegion}
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                <strong className="text-slate-900 dark:text-white">Natural Setting:</strong> {plant.habitat}
              </p>
            </div>

            {/* Care Instructions Checklist */}
            <div className="bg-white dark:bg-slate-900 p-4 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 mb-2">
                Cultivation & Care Blueprint
              </h3>

              <div className="flex items-start gap-3 p-2.5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl">
                <Sun className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-bold text-slate-900 dark:text-white block">Sunlight Requirement</span>
                  <span className="text-[11px] text-slate-600 dark:text-slate-300">{plant.care.sunlight}</span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-2.5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl">
                <Droplets className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-bold text-slate-900 dark:text-white block">Watering Routine</span>
                  <span className="text-[11px] text-slate-600 dark:text-slate-300">{plant.care.watering}</span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-2.5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl">
                <Sprout className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-bold text-slate-900 dark:text-white block">Soil Preference</span>
                  <span className="text-[11px] text-slate-600 dark:text-slate-300">{plant.care.soil}</span>
                </div>
              </div>

              {plant.growthPeriod && (
                <div className="flex items-start gap-3 p-2.5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl">
                  <Calendar className="w-5 h-5 text-teal-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-bold text-slate-900 dark:text-white block">Growth Period & Flowering</span>
                    <span className="text-[11px] text-slate-600 dark:text-slate-300">
                      {plant.growthPeriod} {plant.floweringSeason ? `• Flowering: ${plant.floweringSeason}` : ''}
                    </span>
                  </div>
                </div>
              )}

              <div className="flex items-start gap-3 p-2.5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl">
                <Thermometer className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-bold text-slate-900 dark:text-white block">Ideal Temperature & Humidity</span>
                  <span className="text-[11px] text-slate-600 dark:text-slate-300">{plant.care.temperature} ({plant.care.humidity})</span>
                </div>
              </div>

              {plant.similarSpecies && plant.similarSpecies.length > 0 && (
                <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-2xl space-y-1">
                  <span className="text-xs font-bold text-slate-900 dark:text-white block">Similar Botanical Species:</span>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {plant.similarSpecies.map((sp, i) => (
                      <span key={i} className="text-[10px] bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 px-2 py-0.5 rounded-md font-serif italic">
                        {sp}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
