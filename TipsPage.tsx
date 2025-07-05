
import React from 'react';
import ChevronLeftIcon from './ChevronLeftIcon.tsx';

interface TipsPageProps {
  onBack: () => void;
}

const TipSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="mb-8">
        <h2 className="text-3xl font-bold text-brand-text-light dark:text-brand-text-dark mb-3 border-b-4 border-brand-primary-light dark:border-brand-primary-dark pb-2">{title}</h2>
        <div className="space-y-4 text-brand-text-light/90 dark:text-brand-text-dark/90 text-lg">
            {children}
        </div>
    </div>
);

const TipsPage: React.FC<TipsPageProps> = ({ onBack }) => {
    return (
        <div className="p-6 sm:p-8 max-w-4xl mx-auto text-brand-text-light dark:text-brand-text-dark">
            <header className="flex items-center mb-8">
                <button
                    onClick={onBack}
                    className="p-3 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
                >
                    <ChevronLeftIcon className="w-8 h-8" />
                </button>
                <h1 className="text-4xl font-bold ml-4">Egg Cooking Tips 💡</h1>
            </header>

            <div className="animate-fade-in">
                <TipSection title="🔥 Stove vs. ⚡ Heater">
                    <p>
                        <strong>Stoves (Gas Flame)</strong> transfer heat very quickly and offer instant temperature control. This can sometimes lead to uneven cooking if not watched carefully.
                    </p>
                    <p>
                        <strong>Heaters (Induction/Electric)</strong> provide more even, consistent heat. They might take slightly longer to heat up and cool down, which is why timer settings are adjusted slightly.
                    </p>
                </TipSection>

                <TipSection title="🥚 Perfect Peeling Tips">
                    <ul className="list-disc list-inside space-y-2">
                        <li><strong>Ice Bath is Key:</strong> After cooking, immediately transfer boiled eggs to a bowl of ice water. This shock stops the cooking process and makes the membrane separate from the shell.</li>
                        <li><strong>Older Eggs Peel Easier:</strong> Fresher eggs have a lower pH, causing the membrane to stick tightly. Eggs that are a week or two old are ideal for boiling.</li>
                        <li><strong>Gentle Cracking:</strong> Tap the egg on a hard surface to create a network of fine cracks all over. Avoid smashing it.</li>
                        <li><strong>Peel Under Water:</strong> Peeling the egg under a stream of cool running water helps to wash away small shell fragments.</li>
                    </ul>
                </TipSection>
                
                <TipSection title="🧅 Masala Omelet Recipe">
                    <div className="flex flex-col md:flex-row gap-6">
                        <img src="https://picsum.photos/400/300?random=2" alt="Masala Omelet" className="w-full md:w-1/3 h-auto rounded-lg shadow-md" />
                        <div className="space-y-3">
                           <h3 className="text-2xl font-semibold">Ingredients:</h3>
                           <ul className="list-disc list-inside">
                               <li>2 Large Eggs</li>
                               <li>1/4 cup finely chopped Onion</li>
                               <li>1/4 cup finely chopped Tomato</li>
                               <li>1 Green Chili, finely chopped</li>
                               <li>1 tbsp chopped Cilantro</li>
                               <li>1/4 tsp Turmeric Powder</li>
                               <li>1/2 tsp Red Chili Powder (optional)</li>
                               <li>Salt to taste</li>
                               <li>1 tsp Oil or Butter</li>
                           </ul>
                           <h3 className="text-2xl font-semibold mt-4">Steps:</h3>
                           <ol className="list-decimal list-inside space-y-1">
                               <li>Whisk eggs in a bowl. Add all chopped vegetables, spices, and salt. Mix well.</li>
                               <li>Heat oil or butter in a pan over medium heat.</li>
                               <li>Pour the egg mixture into the pan and let it cook for 2-3 minutes until the edges set.</li>
                               <li>Gently fold it in half and cook for another minute until golden brown.</li>
                               <li>Serve hot!</li>
                           </ol>
                        </div>
                    </div>
                </TipSection>
            </div>
        </div>
    );
};

export default TipsPage;
