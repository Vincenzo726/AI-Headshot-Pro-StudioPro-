import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Upload, 
  Sparkles, 
  X, 
  Check, 
  ChevronRight, 
  ChevronLeft, 
  Loader2, 
  AlertCircle,
  Download,
  RefreshCw,
  Camera,
  Image as ImageIcon,
  Zap
} from 'lucide-react';
import { HEADSHOT_STYLES, BACKGROUND_CATEGORIES, HeadshotStyle, BackgroundOption } from '../constants';
import { generateHeadshot } from '../services/geminiService';
import { cn } from '../utils';

interface GenerateProps {
  user: any;
  userData: any;
}

export function Generate({ user, userData }: GenerateProps) {
  const [step, setStep] = useState(1);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<HeadshotStyle>(HEADSHOT_STYLES[0]);
  const [selectedBackground, setSelectedBackground] = useState<BackgroundOption | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [status, setStatus] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [currentGenTime, setCurrentGenTime] = useState<number | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        setStep(2);
      };
      reader.readAsDataURL(file);
    }
  };

  const compressImage = async (base64Str: string): Promise<string> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = base64Str;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 1024;
        const MAX_HEIGHT = 1024;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', 0.8));
      };
    });
  };

  const handleGenerate = async () => {
    if (!selectedImage) return;
    
    setIsGenerating(true);
    setError(null);
    setStatus('Preparing image...');
    const startTime = Date.now();

    try {
      // 1. Compress image
      const compressedImage = await compressImage(selectedImage);
      
      // 2. AI Generation
      setStatus('Generating headshot...');
      console.log("[Generation] Sending request to Gemini API...");
      
      // AI Generation with timeout - 60s
      const generationResult = await Promise.race([
        generateHeadshot(compressedImage, selectedStyle, selectedBackground || undefined),
        new Promise((_, reject) => setTimeout(() => reject(new Error("Generation timed out. Please try again.")), 60000))
      ]) as any;
      
      console.log("[Generation] API response received.");
      
      if (!generationResult || !generationResult.base64) {
        throw new Error("Image generation failed. No image was returned.");
      }

      const generationTime = generationResult.generationTime || (Date.now() - startTime);

      console.log("[Generation] Process complete! Time:", (generationTime / 1000).toFixed(1), "s");
      setStatus('Generation complete!');
      setResult(generationResult.base64);
      setCurrentGenTime(generationTime);
      setStep(4);
    } catch (err: any) {
      console.error("[Generation] Error occurred:", err);
      setError(err.message || "An unexpected error occurred. Please try again.");
    } finally {
      setIsGenerating(false);
      setStatus('');
    }
  };

  const reset = () => {
    setStep(1);
    setSelectedImage(null);
    setResult(null);
    setError(null);
    setCurrentGenTime(null);
  };

  return (
    <div className="max-w-5xl mx-auto">
      {/* Progress Header */}
      <div className="flex items-center justify-between mb-12">
        <div className="flex items-center gap-4">
          {[1, 2, 3].map((i) => (
            <React.Fragment key={i}>
              <div className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-500",
                step === i ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 scale-110 shadow-xl" : 
                step > i ? "bg-emerald-500 text-white" : "bg-zinc-100 dark:bg-zinc-800 text-zinc-400"
              )}>
                {step > i ? <Check className="w-5 h-5" /> : i}
              </div>
              {i < 3 && <div className={cn("w-12 h-0.5 rounded-full transition-colors duration-500", step > i ? "bg-emerald-500" : "bg-zinc-100 dark:bg-zinc-800")} />}
            </React.Fragment>
          ))}
        </div>
        <div className="text-right">
          <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Current Step</p>
          <p className="text-lg font-bold dark:text-white">
            {step === 1 ? "Upload Photo" : step === 2 ? "Select Style" : step === 3 ? "Choose Background" : "Final Result"}
          </p>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {/* Step 1: Upload */}
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-4xl font-display font-bold dark:text-white mb-4">Start with a selfie.</h2>
              <p className="text-zinc-500 dark:text-zinc-400 text-lg">
                Upload a clear photo of yourself. For best results, ensure good lighting and a neutral expression.
              </p>
            </div>

            <div 
              onClick={() => fileInputRef.current?.click()}
              className="group relative aspect-video rounded-[40px] border-2 border-dashed border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 flex flex-col items-center justify-center cursor-pointer hover:border-zinc-900 dark:hover:border-white transition-all overflow-hidden"
            >
              <div className="absolute inset-0 atmosphere opacity-0 group-hover:opacity-10 transition-opacity" />
              
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-20 h-20 rounded-3xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-sm">
                  <Upload className="w-8 h-8 text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors" />
                </div>
                <p className="text-xl font-bold dark:text-white mb-2">Click or drag to upload</p>
                <p className="text-zinc-400 text-sm">PNG, JPG or WEBP up to 10MB</p>
              </div>
              
              <input 
                type="file" 
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept="image/*"
                className="hidden"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { icon: Camera, title: "Clear Face", desc: "Ensure your face is fully visible and not covered." },
                { icon: Sparkles, title: "Good Lighting", desc: "Natural daylight or bright indoor light works best." },
                { icon: Zap, title: "Single Person", desc: "Photos with multiple people may cause issues." }
              ].map((tip, i) => (
                <div key={i} className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800">
                  <tip.icon className="w-6 h-6 text-zinc-400 mb-4" />
                  <h4 className="font-bold dark:text-white mb-1">{tip.title}</h4>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">{tip.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Step 2: Style Selection */}
        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-10"
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-display font-bold dark:text-white">Choose your style.</h2>
                <p className="text-zinc-500 dark:text-zinc-400 mt-1">Select the professional look you want to achieve.</p>
              </div>
              <div className="flex gap-3">
                <button 
                  onClick={() => setStep(1)}
                  className="px-6 py-3 rounded-2xl font-bold text-sm text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-all"
                >
                  Back
                </button>
                <button 
                  onClick={() => setStep(3)}
                  className="px-8 py-3 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-2xl font-bold text-sm hover:scale-105 transition-all shadow-xl"
                >
                  Next Step
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {HEADSHOT_STYLES.map((style) => (
                <div 
                  key={style.id}
                  onClick={() => setSelectedStyle(style)}
                  className={cn(
                    "group relative rounded-[32px] overflow-hidden cursor-pointer transition-all duration-300",
                    selectedStyle.id === style.id ? "ring-4 ring-zinc-900 dark:ring-white scale-[1.02] shadow-2xl" : "hover:scale-[1.01] shadow-sm"
                  )}
                >
                  <div className="aspect-[4/5] relative">
                    <img src={style.previewUrl} alt={style.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-6 flex flex-col justify-end">
                      <h4 className="text-white font-bold text-xl">{style.name}</h4>
                      <p className="text-white/60 text-xs mt-1">{style.description}</p>
                    </div>
                  </div>
                  {selectedStyle.id === style.id && (
                    <div className="absolute top-4 right-4 w-8 h-8 bg-zinc-900 dark:bg-white rounded-full flex items-center justify-center shadow-lg">
                      <Check className="w-4 h-4 text-white dark:text-zinc-900" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Step 3: Background Selection */}
        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-10"
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-display font-bold dark:text-white">Set the scene.</h2>
                <p className="text-zinc-500 dark:text-zinc-400 mt-1">Choose a background or keep the original style's default.</p>
              </div>
              <div className="flex gap-3">
                <button 
                  onClick={() => setStep(2)}
                  className="px-6 py-3 rounded-2xl font-bold text-sm text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-all"
                >
                  Back
                </button>
                <button 
                  onClick={handleGenerate}
                  disabled={isGenerating}
                  className="px-8 py-3 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-2xl font-bold text-sm hover:scale-105 transition-all shadow-xl flex items-center gap-2 disabled:opacity-50"
                >
                  {isGenerating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                  Generate Headshot
                </button>
              </div>
            </div>

            <div className="space-y-12">
              {BACKGROUND_CATEGORIES.map((category) => (
                <div key={category.id} className="space-y-6">
                  <h3 className="text-xl font-bold dark:text-white flex items-center gap-3">
                    <span className="w-8 h-0.5 bg-zinc-200 dark:bg-zinc-800 rounded-full" />
                    {category.name}
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {category.options.map((option) => (
                      <div 
                        key={option.id}
                        onClick={() => setSelectedBackground(selectedBackground?.id === option.id ? null : option)}
                        className={cn(
                          "group relative aspect-square rounded-3xl overflow-hidden cursor-pointer transition-all",
                          selectedBackground?.id === option.id ? "ring-4 ring-zinc-900 dark:ring-white scale-105 shadow-xl" : "hover:scale-[1.02] shadow-sm"
                        )}
                      >
                        <img src={option.previewUrl} alt={option.name} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <p className="text-white text-xs font-bold">{option.name}</p>
                        </div>
                        {selectedBackground?.id === option.id && (
                          <div className="absolute top-3 right-3 w-6 h-6 bg-zinc-900 dark:bg-white rounded-full flex items-center justify-center shadow-lg">
                            <Check className="w-3 h-3 text-white dark:text-zinc-900" />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Step 4: Result */}
        {step === 4 && (
          <motion.div
            key="step4"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-10"
          >
            <div className="text-center max-w-2xl mx-auto">
              <div className="inline-flex p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-900/10 mb-6">
                <Check className="w-8 h-8 text-emerald-500" />
              </div>
              <h2 className="text-4xl font-display font-bold dark:text-white mb-4">Your headshot is ready.</h2>
              <p className="text-zinc-500 dark:text-zinc-400">
                Generated in {currentGenTime ? (currentGenTime / 1000).toFixed(1) : '...'} seconds. You can now download it for your profiles.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="aspect-[4/5] rounded-[40px] overflow-hidden bg-zinc-100 dark:bg-zinc-900 shadow-2xl relative group">
                {result && (
                  <img src={result} alt="Generated result" className="w-full h-full object-cover" />
                )}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Sparkles className="w-12 h-12 text-white animate-pulse" />
                </div>
              </div>

              <div className="space-y-8">
                <div className="p-8 rounded-[40px] bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 space-y-6">
                  <h4 className="font-bold dark:text-white text-xl">Generation Details</h4>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-zinc-400">Style</span>
                      <span className="font-bold dark:text-white">{selectedStyle.name}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-zinc-400">Background</span>
                      <span className="font-bold dark:text-white">{selectedBackground?.name || 'Default'}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-zinc-400">Resolution</span>
                      <span className="font-bold dark:text-white">1024 x 1024</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  <a 
                    href={result || '#'} 
                    download="headshot.png"
                    className="w-full py-5 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-2xl font-bold text-sm flex items-center justify-center gap-3 hover:scale-[1.02] transition-all shadow-xl"
                  >
                    <Download className="w-5 h-5" />
                    Download High-Res
                  </a>
                  <button 
                    onClick={reset}
                    className="w-full py-5 bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white rounded-2xl font-bold text-sm flex items-center justify-center gap-3 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-all"
                  >
                    <RefreshCw className="w-5 h-5" />
                    Generate Another
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Loading Overlay */}
      <AnimatePresence>
        {isGenerating && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-white/90 dark:bg-zinc-950/90 backdrop-blur-xl flex flex-col items-center justify-center p-8"
          >
            <div className="relative mb-12">
              <div className="w-32 h-32 rounded-full border-4 border-zinc-100 dark:border-zinc-900 border-t-zinc-900 dark:border-t-white animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Sparkles className="w-10 h-10 text-zinc-900 dark:text-white animate-pulse" />
              </div>
            </div>
            
            <div className="text-center space-y-4 max-w-md">
              <h3 className="text-3xl font-display font-bold dark:text-white">{status}</h3>
              <p className="text-zinc-500 dark:text-zinc-400 font-medium">
                Our AI is meticulously crafting your professional image. This usually takes 15-30 seconds.
              </p>
            </div>

            {/* Progress bar */}
            <div className="w-full max-w-xs h-1.5 bg-zinc-100 dark:bg-zinc-900 rounded-full mt-12 overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 30, ease: "linear" }}
                className="h-full bg-zinc-900 dark:bg-white"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error Toast */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 w-full max-w-md p-6 bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/20 rounded-[32px] shadow-2xl flex items-center gap-4"
          >
            <div className="w-12 h-12 rounded-2xl bg-red-500 flex items-center justify-center flex-shrink-0 shadow-lg shadow-red-500/20">
              <AlertCircle className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold text-red-600 dark:text-red-400">Generation Failed</p>
              <p className="text-xs text-red-500/80 dark:text-red-400/60 mt-0.5">{error}</p>
            </div>
            <button 
              onClick={() => setError(null)}
              className="p-2 hover:bg-red-100 dark:hover:bg-red-900/20 rounded-xl transition-colors"
            >
              <X className="w-5 h-5 text-red-500" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
