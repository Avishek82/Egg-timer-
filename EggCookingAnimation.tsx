
import React from 'react';
import { EggType, DonenessOption } from './types.ts';

interface EggCookingAnimationProps {
  eggType: EggType;
  progress: number;
  doneness: DonenessOption;
  isFlipped: boolean;
}

const BoiledEggVisual = ({ progress }: { progress: number }) => {
    // Yolk color changes from bright yellow (runny) to pale yellow (hard)
    // HSL: Hue=45 (yellow), Saturation=90%, Lightness=60% (vibrant) -> 85% (pale)
    const lightness = 60 + (progress / 100) * 25;
    const yolkColor = `hsl(45, 90%, ${lightness}%)`;

    // A proper, organic egg shape path
    const eggShellPath = "M32,2C16,2 8,18,8,32C8,49,18,62,32,62S56,49,56,32C56,18,48,2,32,2Z";
    const eggWhitePath = "M32,6C19,6 12,20,12,32C12,47,21,58,32,58S52,47,52,32C52,20,45,6,32,6Z";

    return (
        <svg viewBox="0 0 64 64" className="w-48 h-48">
            <g>
                {/* Outer Shell */}
                <path d={eggShellPath} fill="#F3EADF" />
                {/* Inner White */}
                <path d={eggWhitePath} fill="#FFFFFF" />
                {/* Yolk */}
                <circle cx="32" cy="32" r="14" fill={yolkColor} style={{ transition: 'fill 1s linear' }} />
            </g>
        </svg>
    )
}

const FriedEggVisual = ({ progress }: { progress: number }) => {
    // White part becomes more opaque as it cooks
    const whiteOpacity = 0.5 + (progress / 100) * 0.5;
    return (
        <svg viewBox="0 0 64 64" className="w-48 h-48">
            {/* White Part */}
            <path d="M32.5,6.5 C49.5,6.5 58.5,19.5 58.5,32.5 C58.5,45.5 45.5,58.5 32.5,58.5 C19.5,58.5 6.5,45.5 6.5,32.5 C6.5,19.5 15.5,6.5 32.5,6.5 Z" fill="#FFFFFF" fillOpacity={whiteOpacity} style={{ transition: 'fill-opacity 1s linear' }} />
            {/* Yolk */}
            <circle cx="32" cy="32" r="10" fill="#FFD700" />
            <circle cx="30" cy="30" r="3" fill="#FFF" fillOpacity="0.5" />
        </svg>
    )
}

const OmeletVisual = ({ progress, doneness, isFlipped }: { progress: number, doneness: DonenessOption, isFlipped: boolean }) => {
    const isMasala = doneness.style.toLowerCase().includes('masala');

    // Omelet color changes from whitish-yellow (raw) to full yellow (cooked)
    const lightness = 85 - (progress / 100) * 25; // from 85% down to 60%
    const omeletColor = `hsl(50, 90%, ${lightness}%)`;
    
    // Veggies fade in much faster now, fully visible at 25% progress
    const veggieOpacity = Math.min(1, progress / 25);

    const veggies = [
        // Red (tomato/chili)
        { cx: 25, cy: 20, r: 2.5, color: '#ef4444' },
        { cx: 45, cy: 48, r: 2.2, color: '#ef4444' },
        { cx: 22, cy: 45, r: 3, color: '#ef4444' },
        { cx: 50, cy: 25, r: 2, color: '#ef4444' },
        // Green (cilantro/chili)
        { cx: 40, cy: 18, r: 2.5, color: '#22c55e' },
        { cx: 18, cy: 32, r: 2.2, color: '#22c55e' },
        { cx: 50, cy: 35, r: 3, color: '#22c55e' },
        { cx: 33, cy: 52, r: 2.5, color: '#22c55e' },
        // White (onion)
        { cx: 35, cy: 35, r: 2, color: '#ffffff' },
        { cx: 20, cy: 50, r: 2.5, color: '#ffffff' },
    ];

    const OmeletBase = (
        <g>
            <circle cx="32" cy="32" r="26" fill={omeletColor} style={{ transition: 'fill 1s linear' }}/>
            {isMasala && veggies.map((v, i) => (
                <circle
                    key={i}
                    cx={v.cx}
                    cy={v.cy}
                    r={v.r}
                    fill={v.color}
                    opacity={veggieOpacity}
                    style={{ transition: 'opacity 1.5s ease-in' }}
                />
            ))}
        </g>
    );

    return (
        <svg viewBox="0 0 64 64" className="w-48 h-48" style={{ perspective: '400px', overflow: 'visible' }}>
            <g style={{ transformStyle: 'preserve-3d' }}>
                {/* Bottom half (static) */}
                <g style={{ clipPath: 'polygon(0% 50%, 100% 50%, 100% 100%, 0% 100%)' }}>
                    {OmeletBase}
                </g>

                {/* Top half (animated) */}
                <g 
                    className={isFlipped ? 'animate-fold-omelet' : ''}
                    style={{
                        transformOrigin: 'center 32px',
                        clipPath: 'polygon(0% 0%, 100% 0%, 100% 50%, 0% 50%)',
                    }}
                >
                    {OmeletBase}
                </g>
            </g>
        </svg>
    );
};


const EggCookingAnimation: React.FC<EggCookingAnimationProps> = ({ eggType, progress, doneness, isFlipped }) => {
  const renderVisual = () => {
    switch (eggType) {
      case 'Boiled':
        return <BoiledEggVisual progress={progress} />;
      case 'Half-Fried':
        return <FriedEggVisual progress={progress} />;
      case 'Omelet':
        return <OmeletVisual progress={progress} doneness={doneness} isFlipped={isFlipped} />;
      default:
        return null;
    }
  };

  return <div className="relative w-48 h-48 flex items-center justify-center">{renderVisual()}</div>;
};

export default EggCookingAnimation;
