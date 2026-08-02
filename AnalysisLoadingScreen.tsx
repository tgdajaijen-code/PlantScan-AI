import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Scan, Sparkles, CheckCircle2, ShieldCheck, HeartPulse, Leaf } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { TRIVIA_FACTS } from '../data/plantDatabase';

export const AnalysisLoadingScreen: React.FC = () => {
  const { 
    selectedPlant, 
    capturedImage, 
    setScreen, 
    addHistoryRecord, 
    settings,
    identifyImage,
    isOnline,
    showToast
  } = useApp();

  const [progress, setProgress] = useState<number>(0);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [triviaIndex, setTriviaIndex] = useState<number>(0);

  const steps = [
    'Calibrating image & compressing payload',
    'Querying PlantNet AI botanical vision API',
    'Cross-referencing 45,000+ global taxonomy records',
    'Generating confidence, medicinal & care profile'
  ];

  const plantImg = capturedImage || selectedPlant?.imageUrl || '';

  useEffect(() => {
    // Trigger real PlantNet API identification
    if (plantImg) {
      identifyImage(plantImg);
    }
  }, [plantImg]);

  useEffect(() => {
    // Progress interval animation
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 2;
      });
    }, 40);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (progress < 25) setCurrentStep(0);
    else if (progress < 55) setCurrentStep(1);
    else if (progress < 85) setCurrentStep(2);
    else setCurrentStep(3);

    if (progress === 100 && selectedPlant) {
      if (settings.autoSaveHistory) {
        addHistoryRecord(selectedPlant, plantImg);
      }
      setTimeout(() => {
        setScreen('result');
      }, 500);
    }
  }, [progress, selectedPlant]);

  useEffect(() => {
    const triviaTimer = setInterval(() => {
      setTriviaIndex(prev => (prev + 1) % TRIVIA_FACTS.length);
    }, 3200);
    return () => clearInterval(triviaTimer);
  }, []);

  return (
    <div className="flex-1 bg-slate-950 text-white flex flex-col justify-between p-6 relative overflow-hidden select-none">
      {/* Background ambient blur */}
      <div className="absolute top-1/4 -left-20 w-72 h-72 bg-emerald-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-72 h-72 bg-teal-600/20 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header */}
      <div className="text-center pt-2 z-10">
        <div className="inline-flex items-center gap-1.5 bg-emerald-950/80 border border-emerald-500/30 px-3.5 py-1 rounded-full text-emerald-300 text-xs font-semibold mb-2 shadow-lg">
          <Scan className="w-4 h-4 animate-spin text-emerald-400" />
          <span>AI Neural Vision Active</span>
        </div>
        <h2 className="text-xl font-extrabold text-white">Analyzing Botanical Sample</h2>
        <p className="text-xs text-emerald-200/70">Identifying plant species and safety parameters</p>
      </div>

      {/* Center Scanner Image Display */}
      <div className="relative my-auto flex flex-col items-center justify-center z-10">
        <div className="w-64 h-64 rounded-3xl overflow-hidden relative shadow-2xl border-2 border-emerald-500/40">
          <img
            src={plantImg}
            alt="Scanning specimen"
            className="w-full h-full object-cover filter brightness-95"
          />

          {/* Animated Scanning Laser Line */}
          <motion.div
            animate={{ top: ['0%', '100%', '0%'] }}
            transition={{ repeat: Infinity, duration: 2.2, ease: 'linear' }}
            className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_15px_#10b981]"
          />

          {/* Grid Overlay */}
          <div className="absolute inset-0 bg-emerald-900/10 backdrop-contrast-125 border border-emerald-400/20 pointer-events-none" />

          {/* Radial Pulse Badge */}
          <div className="absolute bottom-3 right-3 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-xl text-[11px] font-bold text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>{progress}%</span>
          </div>
        </div>

        {/* Progress Bar Container */}
        <div className="w-full max-w-xs mt-6 space-y-2">
          <div className="flex justify-between items-center text-xs font-semibold text-emerald-300">
            <span>Identification Progress</span>
            <span className="font-mono text-emerald-400">{progress}%</span>
          </div>

          <div className="w-full h-3 bg-slate-900 rounded-full p-0.5 border border-emerald-900/50 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-400 rounded-full shadow-[0_0_10px_#10b981]"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Current Step Checklist */}
        <div className="w-full max-w-xs mt-4 bg-slate-900/80 backdrop-blur-md p-3.5 rounded-2xl border border-emerald-500/20 text-left space-y-2">
          {steps.map((stepText, idx) => {
            const isDone = idx < currentStep;
            const isCurrent = idx === currentStep;

            return (
              <div key={idx} className="flex items-center gap-2.5 text-xs">
                {isDone ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                ) : isCurrent ? (
                  <div className="w-4 h-4 rounded-full border-2 border-emerald-400 border-t-transparent animate-spin shrink-0" />
                ) : (
                  <div className="w-4 h-4 rounded-full border border-slate-700 shrink-0" />
                )}
                <span className={isDone ? 'text-slate-300 line-through text-slate-500' : isCurrent ? 'text-emerald-200 font-semibold' : 'text-slate-500'}>
                  {stepText}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Trivia Card */}
      <div className="z-10 bg-emerald-950/60 border border-emerald-800/40 p-3.5 rounded-2xl backdrop-blur-md text-left">
        <div className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-400 uppercase tracking-wider mb-1">
          <Leaf className="w-3.5 h-3.5" /> Did You Know?
        </div>
        <motion.p
          key={triviaIndex}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          className="text-xs text-emerald-100/90 leading-relaxed font-light"
        >
          "{TRIVIA_FACTS[triviaIndex]}"
        </motion.p>
      </div>
    </div>
  );
};
