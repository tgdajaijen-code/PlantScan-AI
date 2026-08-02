import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Scan, 
  Sparkles, 
  HeartPulse, 
  ShieldCheck, 
  Compass, 
  ArrowRight, 
  Check, 
  Leaf, 
  BookOpen, 
  Database 
} from 'lucide-react';
import { useApp } from '../context/AppContext';

interface Slide {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
  accentColor: string;
  bgGradient: string;
  badge: string;
}

const SLIDES: Slide[] = [
  {
    id: 1,
    title: 'Instant Botanical AI Recognition',
    subtitle: 'PlantNet API & Vision Engine',
    description: 'Snap a quick photo or import an image from your gallery. Identify thousands of plant species with up to 99.8% precision.',
    icon: <Scan className="w-12 h-12 text-emerald-400 animate-pulse" />,
    accentColor: 'text-emerald-500',
    bgGradient: 'from-emerald-950 via-slate-900 to-teal-950',
    badge: '99.8% Vision Accuracy'
  },
  {
    id: 2,
    title: 'Medicinal Uses & Pet Toxicity Alerts',
    subtitle: 'Comprehensive Safety & Herbal Guide',
    description: 'Discover traditional herbal remedies, active phytochemicals, care schedules, and instant toxicity warnings for dogs and cats.',
    icon: <HeartPulse className="w-12 h-12 text-teal-400" />,
    accentColor: 'text-teal-500',
    bgGradient: 'from-teal-950 via-slate-900 to-emerald-950',
    badge: 'Herbal & Veterinary Safe'
  },
  {
    id: 3,
    title: 'Local Scan History & Care Journal',
    subtitle: 'Privacy-First Botanical Vault',
    description: 'Keep a localized history of every plant scan with custom geotags, notes, and watering reminders stored securely on your device.',
    icon: <Database className="w-12 h-12 text-emerald-300" />,
    accentColor: 'text-emerald-400',
    bgGradient: 'from-slate-950 via-emerald-950 to-slate-900',
    badge: '100% Offline Vault'
  }
];

export const OnboardingScreen: React.FC = () => {
  const { setScreen } = useApp();
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);

  const slide = SLIDES[currentSlideIndex];

  const handleNext = () => {
    if (currentSlideIndex < SLIDES.length - 1) {
      setCurrentSlideIndex(prev => prev + 1);
    } else {
      setScreen('home');
    }
  };

  const handleSkip = () => {
    setScreen('home');
  };

  return (
    <div className={`flex-1 flex flex-col justify-between p-6 bg-gradient-to-br ${slide.bgGradient} text-white relative overflow-hidden select-none transition-colors duration-700`}>
      {/* Background Decorative Blur Orbs */}
      <div className="absolute -top-12 -right-12 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header Bar */}
      <div className="relative z-10 flex items-center justify-between pt-2">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center backdrop-blur-md">
            <Leaf className="w-5 h-5 text-emerald-400" />
          </div>
          <span className="font-extrabold tracking-wide text-sm bg-gradient-to-r from-emerald-300 to-teal-200 bg-clip-text text-transparent">
            PlantScan AI
          </span>
        </div>

        <button
          onClick={handleSkip}
          id="onboarding-skip-button"
          className="text-xs font-semibold text-slate-300 hover:text-white px-3 py-1.5 rounded-full bg-slate-900/60 border border-white/10 backdrop-blur-md transition cursor-pointer"
        >
          Skip
        </button>
      </div>

      {/* Main Slide Card with Motion Animation */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center my-6 text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            initial={{ opacity: 0, x: 20, scale: 0.96 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -20, scale: 0.96 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="w-full flex flex-col items-center"
          >
            {/* Feature Icon Shield */}
            <div className="w-28 h-28 rounded-3xl bg-slate-900/80 border border-emerald-500/30 backdrop-blur-xl flex items-center justify-center shadow-2xl shadow-emerald-950/80 mb-6 relative group">
              <div className="absolute inset-0 rounded-3xl bg-emerald-500/10 blur-xl group-hover:bg-emerald-500/20 transition" />
              {slide.icon}
            </div>

            {/* Badge Pill */}
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 backdrop-blur-md mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{slide.badge}</span>
            </span>

            {/* Title & Subtitle */}
            <h2 className="text-2xl font-black text-white leading-tight mb-2 max-w-xs">
              {slide.title}
            </h2>
            <h3 className="text-xs font-semibold text-emerald-400 mb-4 tracking-wide uppercase">
              {slide.subtitle}
            </h3>

            {/* Detailed Description */}
            <p className="text-xs text-slate-300 leading-relaxed max-w-xs font-normal px-2">
              {slide.description}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer Navigation Bar */}
      <div className="relative z-10 space-y-4">
        {/* Step Indicator Dots */}
        <div className="flex items-center justify-center gap-2">
          {SLIDES.map((s, index) => (
            <button
              key={s.id}
              onClick={() => setCurrentSlideIndex(index)}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                index === currentSlideIndex
                  ? 'w-8 bg-emerald-400 shadow-md shadow-emerald-500/50'
                  : 'w-2 bg-slate-700/80 hover:bg-slate-500'
              }`}
            />
          ))}
        </div>

        {/* Action Button */}
        <button
          onClick={handleNext}
          id="onboarding-next-button"
          className="w-full py-3.5 bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-600 text-white font-extrabold text-xs rounded-2xl shadow-xl shadow-emerald-900/40 hover:scale-[1.01] active:scale-[0.99] transition cursor-pointer flex items-center justify-center gap-2 border border-emerald-400/30"
        >
          <span>{currentSlideIndex === SLIDES.length - 1 ? 'Get Started Now' : 'Continue'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
