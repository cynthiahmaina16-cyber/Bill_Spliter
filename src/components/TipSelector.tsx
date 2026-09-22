import React, { useState } from 'react';
import { Percent, Sparkles, ArrowUpRight } from 'lucide-react';
import { formatCurrency } from '../utils/calculations';

interface TipSelectorProps {
  subtotal: number;
  tipPercentage: number;
  isCustomTip: boolean;
  customTipValue: string;
  roundUpToDollar: boolean;
  onTipChange: (percentage: number, isCustom?: boolean, customValue?: string) => void;
  onRoundUpChange: (roundUp: boolean) => void;
}

const PRESET_TIPS = [0, 10, 15, 18, 20, 25];

export const TipSelector: React.FC<TipSelectorProps> = ({
  subtotal,
  tipPercentage,
  isCustomTip,
  customTipValue,
  roundUpToDollar,
  onTipChange,
  onRoundUpChange,
}) => {
  const [isEditingCustom, setIsEditingCustom] = useState(isCustomTip);

  const handlePresetClick = (pct: number) => {
    setIsEditingCustom(false);
    onTipChange(pct, false, '');
  };

  const handleCustomInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    setIsEditingCustom(true);
    const parsed = parseFloat(raw);
    if (!isNaN(parsed) && parsed >= 0) {
      onTipChange(Math.min(100, parsed), true, raw);
    } else if (raw === '') {
      onTipChange(0, true, '');
    }
  };

  return (
    <div id="tip-selector-card" className="bg-white rounded-2xl p-5 border border-stone-200/80 shadow-xs space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-violet-50 text-violet-700 flex items-center justify-center font-semibold">
            <Percent className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold text-stone-900 text-base">Tip / Gratuity</h3>
            <p className="text-xs text-stone-500">Choose or enter your tip percentage</p>
          </div>
        </div>
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-violet-50 text-violet-700">
          {tipPercentage}% ({formatCurrency(subtotal * (tipPercentage / 100))})
        </span>
      </div>

      {/* Preset grid */}
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
        {PRESET_TIPS.map((pct) => {
          const isSelected = !isCustomTip && tipPercentage === pct;
          const calculatedTip = subtotal * (pct / 100);

          return (
            <button
              key={pct}
              id={`tip-preset-${pct}`}
              type="button"
              onClick={() => handlePresetClick(pct)}
              className={`p-2.5 rounded-xl text-center border transition-all ${
                isSelected
                  ? 'border-violet-600 bg-violet-600 text-white shadow-xs font-semibold'
                  : 'border-stone-200 bg-stone-50/70 hover:bg-stone-100/80 text-stone-800'
              }`}
            >
              <div className="text-sm font-bold">{pct}%</div>
              <div className={`text-[11px] mt-0.5 ${isSelected ? 'text-violet-100' : 'text-stone-500'}`}>
                {pct === 0 ? 'No Tip' : formatCurrency(calculatedTip)}
              </div>
            </button>
          );
        })}
      </div>

      {/* Custom Tip row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1 border-t border-stone-100">
        <div className="flex items-center gap-2">
          <label htmlFor="custom-tip-input" className="text-xs font-medium text-stone-600">
            Custom Tip %:
          </label>
          <div className="relative w-28">
            <input
              id="custom-tip-input"
              type="number"
              min="0"
              max="100"
              step="1"
              placeholder="e.g. 22"
              value={isCustomTip ? customTipValue : ''}
              onChange={handleCustomInput}
              onFocus={() => {
                setIsEditingCustom(true);
                if (!isCustomTip) {
                  onTipChange(tipPercentage, true, String(tipPercentage));
                }
              }}
              className={`w-full bg-stone-50 border rounded-lg pl-3 pr-7 py-1.5 text-sm font-mono text-stone-900 focus:outline-hidden transition-all ${
                isCustomTip
                  ? 'border-violet-600 ring-2 ring-violet-500/20 bg-white'
                  : 'border-stone-200 hover:border-stone-300'
              }`}
            />
            <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs font-bold text-stone-400 select-none">
              %
            </span>
          </div>
        </div>

        {/* Round up option */}
        <label
          htmlFor="round-up-toggle"
          className="flex items-center gap-2 cursor-pointer select-none text-xs text-stone-600 hover:text-stone-900"
        >
          <input
            id="round-up-toggle"
            type="checkbox"
            checked={roundUpToDollar}
            onChange={(e) => onRoundUpChange(e.target.checked)}
            className="w-4 h-4 rounded-sm border-stone-300 text-violet-600 focus:ring-violet-500 cursor-pointer"
          />
          <span className="font-medium">Round each person up to nearest $</span>
        </label>
      </div>
    </div>
  );
};
