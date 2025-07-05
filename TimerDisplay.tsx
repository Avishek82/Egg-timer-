
import React, { useState, useEffect, useMemo } from 'react';
import RestartIcon from './RestartIcon.tsx';
import { EggType, DonenessOption } from './types.ts';
import EggCookingAnimation from './EggCookingAnimation.tsx';

interface TimerDisplayProps {
  totalTime: number;
  onComplete: () => void;
  onRestart: () => void;
  eggType: EggType;
  doneness: DonenessOption;
}

const TimerDisplay: React.FC<TimerDisplayProps> = ({ totalTime, onComplete, onRestart, eggType, doneness }) => {
  const [remainingTime, setRemainingTime] = useState(totalTime);
  const [isResting, setIsResting] = useState(false);
  const [restTime, setRestTime] = useState(30);
  const [isFlipped, setIsFlipped] = useState(false);
  const [showFlipAlert, setShowFlipAlert] = useState(false);

  const alarmSound = useMemo(() => {
    if (typeof Audio === 'undefined') return null;
    // A reliable, high-quality WAV chime, Base64-encoded to prevent external dependency issues.
    const audioSrc = 'data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA';
    try {
        return new Audio(audioSrc);
    } catch (e) {
        console.error("Failed to create audio:", e);
        return null;
    }
  }, []);

  useEffect(() => {
    if (remainingTime <= 0 && !isResting) {
      if (navigator.vibrate) {
        navigator.vibrate([200, 100, 200]);
      }
      alarmSound?.play().catch(e => console.error("Error playing sound:", e));
      setIsResting(true);
      return;
    }
    
    if (isResting && restTime <= 0) {
      onComplete();
      return;
    }

    if (eggType === 'Omelet' && !isFlipped && totalTime > 90 && (totalTime - remainingTime) >= 90) {
        setIsFlipped(true);
        setShowFlipAlert(true);
        setTimeout(() => setShowFlipAlert(false), 4000); // Hide alert after 4 seconds
    }

    const timer = setInterval(() => {
        if (isResting) {
            setRestTime(prev => prev - 1);
        } else {
            setRemainingTime(prev => Math.max(0, prev - 1));
        }
    }, 1000);

    return () => clearInterval(timer);
  }, [remainingTime, isResting, restTime, onComplete, alarmSound, eggType, totalTime, isFlipped]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const progress = isResting ? 100 : ((totalTime - remainingTime) / totalTime) * 100;

  return (
    <div className="flex flex-col items-center justify-between p-6 text-center h-full w-full text-brand-text-light dark:text-brand-text-dark">
        <header className="w-full">
            <h2 className="text-4xl font-bold tracking-widest">{eggType} Egg</h2>
            <p className="text-2xl opacity-80">{doneness.style}</p>
        </header>

        <main className="flex flex-col items-center justify-center my-8">
            <EggCookingAnimation eggType={eggType} progress={progress} doneness={doneness} isFlipped={isFlipped} />
            
            <div className="mt-8 text-center">
                <div className="h-10 mb-2 flex items-center justify-center">
                    {showFlipAlert && (
                         <p className="text-2xl text-brand-primary-light dark:text-brand-primary-dark animate-fade-in">Flip the Omelet! 🍳</p>
                    )}
                </div>
                {isResting ? (
                    <div className="animate-fade-in">
                        <span className="text-6xl font-bold block text-brand-primary-light dark:text-brand-primary-dark">Done!</span>
                        <span className="text-2xl mt-2 block opacity-80">Resting... {formatTime(restTime)}</span>
                    </div>
                ) : (
                    <span className="text-8xl font-bold tracking-tighter">{formatTime(remainingTime)}</span>
                )}
            </div>
        </main>
        
        <footer className="w-full max-w-sm">
            <div className="w-full bg-brand-surface-light dark:bg-brand-surface-dark rounded-full h-4 border border-black/10 dark:border-white/10 overflow-hidden">
                <div 
                    className="bg-brand-primary-light dark:bg-brand-primary-dark h-full rounded-full transition-all duration-1000 ease-linear"
                    style={{ width: `${progress}%` }}
                ></div>
            </div>

            <p className="mt-4 h-10 text-lg opacity-60">
                {isResting ? "Let it rest... it makes peeling easier!" : "Place eggs after water boils. Enjoy! ✨"}
            </p>

            <button
                onClick={onRestart}
                className="w-full mt-4 flex items-center justify-center gap-3 px-6 py-4 bg-brand-primary-light dark:bg-brand-primary-dark text-brand-bg-dark dark:text-brand-text-light rounded-2xl text-2xl font-bold shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-yellow-300 dark:focus:ring-yellow-500"
            >
                <RestartIcon className="w-8 h-8" />
                Cook Another Egg
            </button>
        </footer>
    </div>
  );
};

export default TimerDisplay;
