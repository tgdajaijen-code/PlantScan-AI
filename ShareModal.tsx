import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Copy, Share2, Check, Download, Leaf, ShieldCheck } from 'lucide-react';
import { Plant } from '../types';
import { useApp } from '../context/AppContext';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  plant: Plant;
}

export const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose, plant }) => {
  const { showToast } = useApp();
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopyLink = () => {
    navigator.clipboard?.writeText?.(window.location.href);
    setCopied(true);
    showToast('Botanical card link copied!', 'success');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `PlantScan AI: ${plant.commonName}`,
          text: `Check out ${plant.commonName} (${plant.scientificName}) identified with PlantScan AI! Confidence: ${plant.confidence}%`,
          url: window.location.href,
        });
        showToast('Shared successfully!', 'success');
      } catch (e) {
        handleCopyLink();
      }
    } else {
      handleCopyLink();
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="bg-white dark:bg-slate-900 rounded-3xl p-6 w-full max-w-sm shadow-2xl border border-emerald-900/10 dark:border-emerald-500/20 relative overflow-hidden"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="text-center mb-4">
            <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-400 flex items-center justify-center mx-auto mb-2">
              <Share2 className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Share Botanical Report
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Export identification summary for research & sharing
            </p>
          </div>

          {/* Card Preview */}
          <div className="bg-gradient-to-br from-emerald-900 to-teal-950 text-white p-4 rounded-2xl mb-5 shadow-lg border border-emerald-700/30 text-left relative overflow-hidden">
            <div className="absolute top-2 right-2 flex items-center gap-1 bg-emerald-500/20 backdrop-blur-md px-2 py-0.5 rounded-full text-[10px] text-emerald-300 font-semibold border border-emerald-400/30">
              <ShieldCheck className="w-3 h-3 text-emerald-400" />
              <span>{plant.confidence}% Match</span>
            </div>

            <div className="flex items-center gap-3 mb-3">
              <img
                src={plant.imageUrl}
                alt={plant.commonName}
                className="w-14 h-14 rounded-xl object-cover border border-emerald-400/30"
              />
              <div>
                <h4 className="font-bold text-base text-white line-clamp-1">{plant.commonName}</h4>
                <p className="text-xs text-emerald-300 italic">{plant.scientificName}</p>
                <span className="inline-block mt-1 text-[10px] bg-white/10 text-emerald-200 px-2 py-0.5 rounded-md">
                  Family: {plant.botanicalFamily}
                </span>
              </div>
            </div>

            <div className="text-[11px] text-emerald-100/90 line-clamp-2 bg-black/20 p-2.5 rounded-xl border border-white/5">
              "{plant.description}"
            </div>

            <div className="mt-3 pt-2 border-t border-emerald-800/60 flex items-center justify-between text-[10px] text-emerald-300/80 font-medium">
              <span className="flex items-center gap-1">
                <Leaf className="w-3 h-3 text-emerald-400" /> PlantScan AI
              </span>
              <span>Identified via Botanical Intelligence</span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="space-y-2.5">
            <button
              onClick={handleNativeShare}
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-2xl flex items-center justify-center gap-2 shadow-md shadow-emerald-600/30 transition cursor-pointer"
            >
              <Share2 className="w-4 h-4" />
              <span>Share via App / Socials</span>
            </button>

            <button
              onClick={handleCopyLink}
              className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-medium rounded-2xl flex items-center justify-center gap-2 transition cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Link Copied!' : 'Copy Summary Link'}</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
