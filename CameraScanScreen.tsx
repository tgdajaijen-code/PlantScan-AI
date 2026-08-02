import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowLeft, 
  Zap, 
  ZapOff, 
  Grid, 
  RotateCcw, 
  Image as ImageIcon, 
  Scan, 
  Sparkles, 
  Leaf, 
  Camera as CameraIcon, 
  AlertCircle 
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SAMPLE_PLANTS } from '../data/plantDatabase';
import { Plant } from '../types';

export const CameraScanScreen: React.FC = () => {
  const { goBack, setScreen, startScanFlowWithPlant, showToast } = useApp();
  
  const [flash, setFlash] = useState<boolean>(false);
  const [showGrid, setShowGrid] = useState<boolean>(true);
  const [zoomLevel, setZoomLevel] = useState<'1x' | '2x' | '3x'>('1x');
  const [isFocused, setIsFocused] = useState<boolean>(true);
  const [facingMode, setFacingMode] = useState<'environment' | 'user'>('environment');
  const [selectedPresetPlant, setSelectedPresetPlant] = useState<Plant>(SAMPLE_PLANTS[0]);
  const [isCapturing, setIsCapturing] = useState<boolean>(false);
  
  const [previewCapturedImage, setPreviewCapturedImage] = useState<string | null>(null);

  const [hasWebcamAccess, setHasWebcamAccess] = useState<boolean>(false);
  const [webcamError, setWebcamError] = useState<string | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Initialize camera stream
  useEffect(() => {
    let stream: MediaStream | null = null;

    async function setupCamera() {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setWebcamError('Webcam API not supported in this browser.');
        setHasWebcamAccess(false);
        return;
      }

      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: facingMode,
            width: { ideal: 1280 },
            height: { ideal: 720 }
          }
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
          setHasWebcamAccess(true);
          setWebcamError(null);
        }
      } catch (err: any) {
        console.warn('Webcam access failed:', err);
        setHasWebcamAccess(false);
        setWebcamError('Camera stream unavailable. Interactive viewfinder active.');
      }
    }

    setupCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [facingMode]);

  // Capture photo from live video or preset canvas
  const handleCapture = () => {
    setIsCapturing(true);

    setTimeout(() => {
      let capturedDataUrl: string = selectedPresetPlant.imageUrl;

      if (hasWebcamAccess && videoRef.current) {
        const canvas = document.createElement('canvas');
        canvas.width = videoRef.current.videoWidth || 640;
        canvas.height = videoRef.current.videoHeight || 480;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
          capturedDataUrl = canvas.toDataURL('image/jpeg', 0.92);
        }
      }

      setIsCapturing(false);
      setPreviewCapturedImage(capturedDataUrl);
      showToast('Photo captured! Confirm or retake.', 'info');
    }, 400);
  };

  const handleConfirmPhoto = () => {
    if (previewCapturedImage) {
      startScanFlowWithPlant(selectedPresetPlant, previewCapturedImage);
    }
  };

  const handleRetakePhoto = () => {
    setPreviewCapturedImage(null);
    showToast('Ready for new photo capture', 'info');
  };

  const handleTriggerAutoFocus = () => {
    setIsFocused(false);
    showToast('Auto-focusing lens...', 'info');
    setTimeout(() => setIsFocused(true), 600);
  };

  const handleGallerySelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        startScanFlowWithPlant(selectedPresetPlant, reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleLens = () => {
    setFacingMode(prev => (prev === 'environment' ? 'user' : 'environment'));
    showToast(`Switched lens to ${facingMode === 'environment' ? 'Front Macro' : 'Rear Ultra-Wide'}`, 'info');
  };

  return (
    <div className="flex-1 bg-slate-950 text-white flex flex-col justify-between relative overflow-hidden select-none">
      {/* Hidden File Input */}
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleGallerySelect}
        className="hidden"
        id="camera-gallery-picker-input"
      />

      {/* Camera Viewport Container */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-slate-950">
        {hasWebcamAccess ? (
          <video
            ref={videoRef}
            playsInline
            muted
            className={`w-full h-full object-cover transition-all duration-300 ${
              flash ? 'brightness-125 saturate-125' : 'brightness-90'
            }`}
          />
        ) : (
          <img
            src={selectedPresetPlant.imageUrl}
            alt="Camera Viewfinder"
            className={`w-full h-full object-cover transition-all duration-500 brightness-90 ${
              flash ? 'brightness-125 saturate-150' : 'brightness-90'
            }`}
          />
        )}

        {/* Shutter Flash Animation Effect */}
        {isCapturing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-white z-40 pointer-events-none"
          />
        )}

        {/* Dark Vignette Overlay */}
        <div className="absolute inset-0 bg-radial from-transparent via-slate-950/40 to-slate-950/80 pointer-events-none" />

        {/* Optional Viewfinder Grid Lines */}
        {showGrid && (
          <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 pointer-events-none border border-white/10 opacity-40">
            <div className="border-r border-b border-white/20" />
            <div className="border-r border-b border-white/20" />
            <div className="border-b border-white/20" />
            <div className="border-r border-b border-white/20" />
            <div className="border-r border-b border-white/20" />
            <div className="border-b border-white/20" />
            <div className="border-r border-white/20" />
            <div className="border-r border-white/20" />
            <div />
          </div>
        )}
      </div>

      {/* Top Controls Overlay */}
      <div className="relative z-20 p-4 pt-3 flex items-center justify-between bg-gradient-to-b from-slate-950/80 to-transparent">
        <button
          onClick={goBack}
          id="camera-back-button"
          className="p-2.5 rounded-2xl bg-slate-900/80 hover:bg-slate-800 text-white backdrop-blur-md border border-white/10 transition cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-1.5 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-emerald-500/30 text-xs font-semibold text-emerald-400">
          <Scan className="w-4 h-4 animate-pulse" />
          <span>{hasWebcamAccess ? 'Live Video Sensor' : 'Simulated Viewfinder'}</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleTriggerAutoFocus}
            className={`px-2.5 py-1.5 rounded-2xl backdrop-blur-md border text-xs font-bold transition cursor-pointer ${
              isFocused
                ? 'bg-emerald-600 text-white border-emerald-400'
                : 'bg-amber-500 text-slate-950 border-amber-400 animate-pulse'
            }`}
            title="Auto Focus Lens"
          >
            AF
          </button>

          <button
            onClick={() => setFlash(!flash)}
            className={`p-2.5 rounded-2xl backdrop-blur-md border transition cursor-pointer ${
              flash
                ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md shadow-amber-500/30'
                : 'bg-slate-900/80 text-white border-white/10'
            }`}
            title="Toggle Flash"
          >
            {flash ? <Zap className="w-5 h-5 fill-slate-950" /> : <ZapOff className="w-5 h-5" />}
          </button>

          <button
            onClick={() => setShowGrid(!showGrid)}
            className={`p-2.5 rounded-2xl backdrop-blur-md border transition cursor-pointer ${
              showGrid
                ? 'bg-emerald-600 text-white border-emerald-400'
                : 'bg-slate-900/80 text-white border-white/10'
            }`}
            title="Toggle Grid Lines"
          >
            <Grid className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Zoom Selector Bar */}
      <div className="relative z-20 flex justify-center py-1">
        <div className="bg-slate-900/80 backdrop-blur-md border border-white/10 p-1 rounded-full flex gap-1 shadow-lg">
          {(['1x', '2x', '3x'] as const).map((z) => (
            <button
              key={z}
              onClick={() => {
                setZoomLevel(z);
                showToast(`Lens zoom set to ${z}`, 'info');
              }}
              className={`px-3 py-1 rounded-full text-xs font-bold transition cursor-pointer ${
                zoomLevel === z
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {z}
            </button>
          ))}
        </div>
      </div>

      {/* Center Alignment Target Frame */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center p-6 text-center">
        <motion.div
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          className="w-64 h-64 border-2 border-dashed border-emerald-400/80 rounded-3xl relative flex items-center justify-center bg-emerald-500/5 backdrop-blur-[1px] shadow-2xl"
        >
          {/* Corner Framing Brackets */}
          <div className="absolute -top-1 -left-1 w-6 h-6 border-t-4 border-l-4 border-emerald-400 rounded-tl-xl" />
          <div className="absolute -top-1 -right-1 w-6 h-6 border-t-4 border-r-4 border-emerald-400 rounded-tr-xl" />
          <div className="absolute -bottom-1 -left-1 w-6 h-6 border-b-4 border-l-4 border-emerald-400 rounded-bl-xl" />
          <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-4 border-r-4 border-emerald-400 rounded-br-xl" />

          {/* Leaf Overlay Watermark */}
          <Leaf className="w-20 h-20 text-emerald-400/20 animate-pulse" />

          {/* Alignment Instruction Tag */}
          <div className="absolute -bottom-10 bg-slate-900/90 backdrop-blur-md border border-emerald-500/30 text-emerald-300 text-xs px-3.5 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 whitespace-nowrap">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>Center leaf specimen inside target box</span>
          </div>
        </motion.div>
      </div>

      {/* Bottom Controls Panel */}
      <div className="relative z-20 p-4 pb-6 bg-gradient-to-t from-slate-950 via-slate-950/90 to-transparent space-y-3">
        {/* Sample Preset Selector if Webcam is not active */}
        {!hasWebcamAccess && (
          <div>
            <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1.5 px-1">
              <span className="flex items-center gap-1 font-semibold text-emerald-400">
                <Leaf className="w-3 h-3" /> Select Target Specimen to Scan:
              </span>
            </div>

            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
              {SAMPLE_PLANTS.map((plant) => {
                const isSelected = selectedPresetPlant.id === plant.id;
                return (
                  <button
                    key={plant.id}
                    onClick={() => setSelectedPresetPlant(plant)}
                    className={`flex items-center gap-2 px-2.5 py-1.5 rounded-xl text-xs whitespace-nowrap transition cursor-pointer border ${
                      isSelected
                        ? 'bg-emerald-600/90 border-emerald-400 text-white font-bold ring-2 ring-emerald-500/40'
                        : 'bg-slate-900/80 border-slate-700/60 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <img
                      src={plant.thumbnailUrl}
                      alt={plant.commonName}
                      className="w-5 h-5 rounded-lg object-cover"
                    />
                    <span>{plant.commonName}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Shutter Control Row */}
        <div className="flex items-center justify-around pt-1">
          {/* Gallery Import Button */}
          <button
            onClick={() => setScreen('gallery')}
            id="camera-gallery-screen-button"
            className="flex flex-col items-center gap-1 text-slate-300 hover:text-emerald-400 transition cursor-pointer"
          >
            <div className="w-12 h-12 rounded-2xl bg-slate-900/80 border border-white/10 flex items-center justify-center">
              <ImageIcon className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-medium">Gallery</span>
          </button>

          {/* Main Shutter Capture Button */}
          <button
            onClick={handleCapture}
            id="camera-shutter-trigger"
            className="w-20 h-20 rounded-full bg-white p-1.5 shadow-2xl shadow-emerald-500/50 hover:scale-105 active:scale-95 transition cursor-pointer"
          >
            <div className="w-full h-full rounded-full border-4 border-slate-950 bg-gradient-to-tr from-emerald-600 via-emerald-500 to-teal-400 flex items-center justify-center">
              <Scan className="w-8 h-8 text-white" />
            </div>
          </button>

          {/* Flip / Switch Lens Button */}
          <button
            onClick={toggleLens}
            className="flex flex-col items-center gap-1 text-slate-300 hover:text-emerald-400 transition cursor-pointer"
          >
            <div className="w-12 h-12 rounded-2xl bg-slate-900/80 border border-white/10 flex items-center justify-center">
              <RotateCcw className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-medium">Flip Lens</span>
          </button>
        </div>
      </div>

      {/* Captured Photo Review & Retake Overlay */}
      {previewCapturedImage && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex flex-col justify-between p-4 animate-fadeIn">
          <div className="flex items-center justify-between pt-2">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>Review Specimen Photo</span>
            </h3>
            <button
              onClick={handleRetakePhoto}
              className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1 my-4 flex items-center justify-center overflow-hidden rounded-3xl border border-white/10 shadow-2xl bg-black">
            <img
              src={previewCapturedImage}
              alt="Captured Specimen"
              className="max-h-full max-w-full object-contain"
            />
          </div>

          <div className="grid grid-cols-2 gap-3 pb-4">
            <button
              onClick={handleRetakePhoto}
              id="camera-retake-photo-button"
              className="py-3.5 bg-slate-800 hover:bg-slate-700 text-white rounded-2xl text-xs font-bold transition cursor-pointer flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Retake Picture</span>
            </button>

            <button
              onClick={handleConfirmPhoto}
              id="camera-confirm-photo-button"
              className="py-3.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-2xl text-xs font-bold transition cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30"
            >
              <Scan className="w-4 h-4" />
              <span>Analyze Plant</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
