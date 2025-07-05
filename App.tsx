
import React, { useState, useMemo, useEffect } from 'react';
import { AppStep, EggType, CookingMethod, DonenessOption } from './types.ts';
import { COOKING_DATA } from './constants.ts';
import SelectionCard from './components/SelectionCard.tsx';
import TimerDisplay from './components/TimerDisplay.tsx';
import TipsPage from './components/TipsPage.tsx';
import BoiledEggIcon from './components/icons/BoiledEggIcon.tsx';
import FriedEggIcon from './components/icons/FriedEggIcon.tsx';
import OmeletIcon from './components/icons/OmeletIcon.tsx';
import StoveIcon from './components/icons/StoveIcon.tsx';
import HeaterIcon from './components/icons/HeaterIcon.tsx';
import ChevronLeftIcon from './components/icons/ChevronLeftIcon.tsx';
import TipsIcon from './components/icons/TipsIcon.tsx';

const getInitialTheme = (): 'dark' | 'light' => {
  if (typeof window !== 'undefined' && window.localStorage) {
    const storedPrefs = window.localStorage.getItem('color-theme');
    if (typeof storedPrefs === 'string') {
      return storedPrefs as 'dark' | 'light';
    }
    const userMedia = window.matchMedia('(prefers-color-scheme: dark)');
    if (userMedia.matches) {
      return 'dark';
    }
  }
  return 'light';
}

const App: React.FC = () => {
    const [theme, setTheme] = useState<'dark' | 'light'>(getInitialTheme);
    const [step, setStep] = useState<AppStep>('TYPE_SELECTION');
    const [selectedEggType, setSelectedEggType] = useState<EggType | null>(null);
    const [selectedCookingMethod, setSelectedCookingMethod] = useState<CookingMethod | null>(null);
    const [selectedDoneness, setSelectedDoneness] = useState<DonenessOption | null>(null);
    
    useEffect(() => {
        const root = window.document.documentElement;
        const metaThemeColor = document.querySelector('meta[name="theme-color"]');
        
        root.classList.remove(theme === 'dark' ? 'light' : 'dark');
        root.classList.add(theme);
        localStorage.setItem('color-theme', theme);
        
        // Corresponds to tailwind.config.js colors
        if (theme === 'dark') {
            metaThemeColor?.setAttribute('content', '#374151');
        } else {
            metaThemeColor?.setAttribute('content', '#ffffff');
        }
    }, [theme]);
    
    const handleBack = () => {
        if (step === 'METHOD_SELECTION') setStep('TYPE_SELECTION');
        else if (step === 'DONENESS_SELECTION') {
            setStep('METHOD_SELECTION');
            setSelectedCookingMethod(null);
        }
        else if (step === 'TIPS') setStep('TYPE_SELECTION');
    };

    const handleRestart = () => {
        setStep('TYPE_SELECTION');
        setSelectedEggType(null);
        setSelectedCookingMethod(null);
        setSelectedDoneness(null);
    };

    const donenessOptions = useMemo(() => {
        if (!selectedEggType) return [];
        return COOKING_DATA[selectedEggType];
    }, [selectedEggType]);

    const timerSeconds = useMemo(() => {
        if (!selectedDoneness || !selectedCookingMethod) return 0;
        return selectedDoneness.times[selectedCookingMethod];
    }, [selectedDoneness, selectedCookingMethod]);

    const renderStep = () => {
        switch (step) {
            case 'TYPE_SELECTION':
                return (
                    <div className="space-y-4">
                        <SelectionCard title="Boiled Egg" description="Classic, simple, and versatile." icon={<BoiledEggIcon />} onClick={() => { setSelectedEggType('Boiled'); setStep('METHOD_SELECTION'); }} />
                        <SelectionCard title="Half-Fried Egg" description="Sunny-side up with a runny yolk." icon={<FriedEggIcon />} onClick={() => { setSelectedEggType('Half-Fried'); setStep('METHOD_SELECTION'); }} />
                        <SelectionCard title="Omelet" description="Fluffy, folded, and filled." icon={<OmeletIcon />} onClick={() => { setSelectedEggType('Omelet'); setStep('METHOD_SELECTION'); }} />
                    </div>
                );
            case 'METHOD_SELECTION':
                return (
                    <div className="space-y-4">
                        <SelectionCard title="Stove (Gas)" description="Quick, high-heat cooking." icon={<StoveIcon className="w-12 h-12" />} onClick={() => { setSelectedCookingMethod('Stove'); setStep('DONENESS_SELECTION'); }} />
                        <SelectionCard title="Heater / Induction" description="Even, consistent heat." icon={<HeaterIcon className="w-12 h-12" />} onClick={() => { setSelectedCookingMethod('Heater'); setStep('DONENESS_SELECTION'); }} />
                    </div>
                );
            case 'DONENESS_SELECTION':
                return (
                    <div className="space-y-3">
                        {donenessOptions.map((option) => (
                            <SelectionCard
                                key={option.style}
                                title={option.style}
                                description={option.description}
                                onClick={() => { setSelectedDoneness(option); setStep('TIMER'); }}
                            />
                        ))}
                    </div>
                );
            case 'TIMER':
                if (!selectedEggType || !selectedDoneness) return null;
                return <TimerDisplay totalTime={timerSeconds} onComplete={handleRestart} onRestart={handleRestart} eggType={selectedEggType} doneness={selectedDoneness} />;
            case 'TIPS':
                return <TipsPage onBack={handleBack} />;
            default:
                return <div>Error</div>;
        }
    };
    
    const getHeaderText = () => {
        switch(step) {
            case 'TYPE_SELECTION': return "How do you want your egg? 🤔";
            case 'METHOD_SELECTION': return "How are you cooking it? 🔥";
            case 'DONENESS_SELECTION': return `Choose your perfect ${selectedEggType?.toLowerCase()} style...`;
            default: return "";
        }
    }

    if (step === 'TIMER') {
        return <div className="h-screen w-screen">{renderStep()}</div>;
    }
    
    if (step === 'TIPS') {
        return renderStep();
    }

    return (
        <div className="min-h-screen flex flex-col p-4 sm:p-6 text-brand-text-light dark:text-brand-text-dark">
            <header className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-1">
                    {step !== 'TYPE_SELECTION' && (
                        <button onClick={handleBack} className="p-2 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors">
                            <ChevronLeftIcon className="w-8 h-8" />
                        </button>
                    )}
                    <h1 className="text-3xl sm:text-4xl font-bold">🍳 Perfect Egg Timer</h1>
                </div>
                <div className="flex items-center gap-1">
                     <button
                        onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                        className="p-3 w-14 h-14 flex items-center justify-center rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors text-3xl"
                    >
                        {theme === 'light' ? '🌙' : '☀️'}
                    </button>
                    <button
                        onClick={() => setStep('TIPS')}
                        className="p-3 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
                    >
                        <TipsIcon className="w-8 h-8" />
                    </button>
                </div>
            </header>
            <main className="flex-grow flex flex-col justify-center max-w-lg w-full mx-auto">
                <div className="text-center mb-8 px-4">
                    <h2 className="text-2xl opacity-80">{getHeaderText()}</h2>
                </div>
                <div className="animate-fade-in w-full">
                    {renderStep()}
                </div>
            </main>
        </div>
    );
};

export default App;