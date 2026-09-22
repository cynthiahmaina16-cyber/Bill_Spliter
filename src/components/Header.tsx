import React from 'react';
import { Calculator, UtensilsCrossed, RotateCcw, Sparkles } from 'lucide-react';

interface HeaderProps {
  onLoadSample: () => void;
  onReset: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onLoadSample, onReset }) => {
  return (
    <header className="mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-600 text-white flex items-center justify-center shadow-md shadow-amber-600/20">
            <Calculator className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-extrabold text-stone-900 tracking-tight">
                Bill Splitter
              </h1>
              <span className="text-[11px] font-semibold uppercase tracking-wider bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">
                Interactive
              </span>
            </div>
            <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
              Course totals, custom gratuity, and itemized split receipt
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            id="load-sample-btn"
            onClick={onLoadSample}
            className="flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-xl bg-white border border-stone-200 text-stone-700 hover:bg-stone-50 hover:text-stone-900 shadow-xs transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Load Sample Dinner</span>
          </button>
          <button
            type="button"
            id="reset-all-btn"
            onClick={onReset}
            className="flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-xl bg-white border border-stone-200 text-stone-600 hover:text-rose-600 hover:bg-rose-50 shadow-xs transition-colors"
            title="Reset all inputs"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>
      </div>
    </header>
  );
};
