import React from 'react';
import { Users, Minus, Plus, UserCheck } from 'lucide-react';

interface PartySelectorProps {
  numOfFriends: number;
  onChange: (num: number) => void;
}

const PRESET_COUNTS = [1, 2, 3, 4, 5, 6, 8, 10];

export const PartySelector: React.FC<PartySelectorProps> = ({ numOfFriends, onChange }) => {
  const handleDecrement = () => {
    if (numOfFriends > 1) {
      onChange(numOfFriends - 1);
    }
  };

  const handleIncrement = () => {
    if (numOfFriends < 99) {
      onChange(numOfFriends + 1);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    if (isNaN(val) || val < 1) {
      onChange(1);
    } else {
      onChange(Math.min(99, val));
    }
  };

  return (
    <div id="party-selector-card" className="bg-white rounded-2xl p-5 border border-stone-200/80 shadow-xs">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-semibold">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold text-stone-900 text-base">Party Size</h3>
            <p className="text-xs text-stone-500">How many people are splitting the bill?</p>
          </div>
        </div>
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-stone-100 text-stone-700">
          {numOfFriends === 1 ? 'Solo Dining' : `${numOfFriends} Diners`}
        </span>
      </div>

      <div className="flex items-center gap-3 mt-4">
        <div className="flex items-center bg-stone-50 border border-stone-200 rounded-xl p-1 shadow-inner">
          <button
            id="party-decrement-btn"
            type="button"
            onClick={handleDecrement}
            disabled={numOfFriends <= 1}
            className="w-10 h-10 rounded-lg bg-white text-stone-700 hover:text-stone-900 hover:bg-stone-100 disabled:opacity-35 disabled:hover:bg-white flex items-center justify-center transition-colors shadow-xs"
            aria-label="Decrease party size"
          >
            <Minus className="w-4 h-4" />
          </button>
          
          <div className="relative w-16 text-center">
            <input
              id="party-count-input"
              type="number"
              min="1"
              max="99"
              value={numOfFriends}
              onChange={handleInputChange}
              className="w-full text-center font-bold text-xl text-stone-900 bg-transparent focus:outline-hidden py-1"
            />
          </div>

          <button
            id="party-increment-btn"
            type="button"
            onClick={handleIncrement}
            disabled={numOfFriends >= 99}
            className="w-10 h-10 rounded-lg bg-white text-stone-700 hover:text-stone-900 hover:bg-stone-100 disabled:opacity-35 disabled:hover:bg-white flex items-center justify-center transition-colors shadow-xs"
            aria-label="Increase party size"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        {/* Quick select presets */}
        <div className="flex flex-wrap items-center gap-1.5 flex-1">
          {PRESET_COUNTS.map((count) => {
            const isSelected = numOfFriends === count;
            return (
              <button
                key={count}
                id={`party-preset-${count}`}
                type="button"
                onClick={() => onChange(count)}
                className={`text-xs font-medium px-2.5 py-1.5 rounded-lg transition-all ${
                  isSelected
                    ? 'bg-amber-600 text-white font-semibold shadow-xs'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200 hover:text-stone-900'
                }`}
              >
                {count} {count === 1 ? 'person' : 'people'}
              </button>
            );
          })}
        </div>
      </div>

      {/* Visual Avatar Representation */}
      <div className="mt-4 pt-3 border-t border-stone-100 flex items-center gap-1 overflow-x-auto py-1 scrollbar-none">
        {Array.from({ length: Math.min(12, numOfFriends) }).map((_, i) => (
          <div
            key={i}
            className="w-6 h-6 rounded-full bg-amber-100 border border-amber-300 text-amber-800 text-[10px] font-bold flex items-center justify-center shrink-0"
            title={`Diner #${i + 1}`}
          >
            {i + 1}
          </div>
        ))}
        {numOfFriends > 12 && (
          <span className="text-[11px] font-medium text-stone-400 pl-1">
            +{numOfFriends - 12} more
          </span>
        )}
      </div>
    </div>
  );
};
