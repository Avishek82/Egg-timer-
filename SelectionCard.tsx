
import React from 'react';

interface SelectionCardProps {
  onClick: () => void;
  title: string;
  description?: string;
  icon?: React.ReactNode;
  isSelected?: boolean;
}

const SelectionCard: React.FC<SelectionCardProps> = ({ onClick, title, description, icon, isSelected }) => (
  <button
    onClick={onClick}
    className={`w-full p-5 text-left rounded-2xl transition-all duration-200 transform focus:outline-none focus:ring-4 focus:ring-yellow-300 dark:focus:ring-yellow-500 shadow-md hover:shadow-lg hover:-translate-y-1 ${
      isSelected
        ? 'bg-yellow-300/20 dark:bg-yellow-400/20 border-2 border-brand-primary-light dark:border-brand-primary-dark'
        : 'bg-brand-surface-light dark:bg-brand-surface-dark border-2 border-transparent'
    }`}
  >
    <div className="flex items-center gap-5">
      {icon && <div className="text-5xl text-brand-text-light dark:text-brand-text-dark">{icon}</div>}
      <div className="flex-1">
        <h3 className="text-2xl font-bold text-brand-text-light dark:text-brand-text-dark">{title}</h3>
        {description && <p className="mt-1 text-lg text-brand-text-light/70 dark:text-brand-text-dark/70">{description}</p>}
      </div>
    </div>
  </button>
);

export default SelectionCard;
