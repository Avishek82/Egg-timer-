export type EggType = 'Boiled' | 'Half-Fried' | 'Omelet';
export type CookingMethod = 'Stove' | 'Heater';
export type AppStep = 'TYPE_SELECTION' | 'METHOD_SELECTION' | 'DONENESS_SELECTION' | 'TIMER' | 'TIPS';

export interface DonenessOption {
    style: string;
    description: string;
    times: {
        [key in CookingMethod]: number; // Time in seconds
    };
}

export type CookingData = {
    [key in EggType]: DonenessOption[];
};
