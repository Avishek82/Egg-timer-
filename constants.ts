

import { CookingData } from './types.ts';

export const COOKING_DATA: CookingData = {
  'Boiled': [
    { style: 'Soft Boiled', description: 'Runny yolk, firm white', times: { Stove: 240, Heater: 270 } },
    { style: 'Goopy / Jammy', description: 'Jammy, soft yolk', times: { Stove: 360, Heater: 390 } },
    { style: 'Medium-Boiled', description: 'Mostly firm, tender yolk', times: { Stove: 480, Heater: 510 } },
    { style: 'Medium-Hard', description: 'Firm yolk with soft center', times: { Stove: 600, Heater: 645 } },
    { style: 'Hard-Boiled', description: 'Fully cooked, firm yolk', times: { Stove: 720, Heater: 795 } },
  ],
  'Half-Fried': [
    { style: 'Runny Yolk', description: 'Classic sunny-side up', times: { Stove: 120, Heater: 150 } },
    { style: 'Goopy Yolk', description: 'Creamy, jammy yolk', times: { Stove: 165, Heater: 195 } },
    { style: 'Firm Yolk', description: 'Fully cooked yolk', times: { Stove: 270, Heater: 330 } },
  ],
  'Omelet': [
    { style: 'Plain/Fluffy', description: 'Light, fluffy, and tender', times: { Stove: 165, Heater: 195 } },
    { style: 'Masala', description: 'With veggies and spices', times: { Stove: 210, Heater: 255 } },
  ],
};