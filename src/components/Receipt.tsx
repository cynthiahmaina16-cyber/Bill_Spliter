import React, { useState } from 'react';
import { Copy, Check, Terminal, Receipt as ReceiptIcon, Share2, Sparkles } from 'lucide-react';
import { BillState, BillCalculation } from '../types';
import { formatCurrency, generateConsoleReceipt, generateShareableSummary } from '../utils/calculations';

interface ReceiptProps {
  state: BillState;
  calc: BillCalculation;
}

export const Receipt: React.FC<ReceiptProps> = ({ state, calc }) => {
  const [viewMode, setViewMode] = useState<'receipt' | 'terminal'>('receipt');
  const [copiedType, setCopiedType] = useState<'summary' | 'terminal' | null>(null);

  const consoleText = generateConsoleReceipt(state, calc);
  const shareableText = generateShareableSummary(state, calc);

  const handleCopy = async (type: 'summary' | 'terminal') => {
    const textToCopy = type === 'terminal' ? consoleText : shareableText;
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(textToCopy);
      }
      setCopiedType(type);
      setTimeout(() => setCopiedType(null), 2500);
    } catch {
      // fallback
    }
  };

  const hasAnyItems = calc.runningTotal > 0;

  return (
    <div className="w-full space-y-4">
      {/* Top action / view toggle */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 p-1 bg-stone-200/80 rounded-xl">
          <button
            type="button"
            id="view-mode-receipt-btn"
            onClick={() => setViewMode('receipt')}
            className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-all ${
              viewMode === 'receipt'
                ? 'bg-white text-stone-900 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <ReceiptIcon className="w-3.5 h-3.5" />
            <span>Dining Receipt</span>
          </button>
          <button
            type="button"
            id="view-mode-terminal-btn"
            onClick={() => setViewMode('terminal')}
            className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-all ${
              viewMode === 'terminal'
                ? 'bg-stone-900 text-amber-400 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>Console View</span>
          </button>
        </div>

        {/* Copy actions */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            id="copy-summary-btn"
            onClick={() => handleCopy(viewMode === 'terminal' ? 'terminal' : 'summary')}
            className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl border border-stone-300 bg-white text-stone-700 hover:bg-stone-50 hover:text-stone-900 shadow-xs transition-colors"
          >
            {copiedType ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>{viewMode === 'terminal' ? 'Copy Output' : 'Copy Split'}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {viewMode === 'receipt' ? (
        /* Paper Dining Receipt View */
        <div
          id="dining-receipt-card"
          className="relative bg-white rounded-2xl p-6 sm:p-7 border border-stone-200/90 shadow-sm text-stone-800"
        >
          {/* Header */}
          <div className="text-center pb-5 border-b border-dashed border-stone-300">
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-amber-50 text-amber-700 mb-2">
              <ReceiptIcon className="w-5 h-5" />
            </div>
            <h2 className="font-bold tracking-tight text-lg text-stone-900 uppercase">
              The Bistro & Bar
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">Itemized Dining Breakdown</p>
            <div className="flex items-center justify-center gap-3 text-[11px] font-mono text-stone-400 mt-2">
              <span>PARTY: {state.numOfFriends} {state.numOfFriends === 1 ? 'PERSON' : 'PEOPLE'}</span>
              <span>•</span>
              <span>TIP: {calc.tipPercentage}%</span>
            </div>
          </div>

          {/* Itemized Categories */}
          <div className="py-4 space-y-2.5 font-mono text-xs border-b border-dashed border-stone-300">
            <div className="flex justify-between items-center text-stone-600">
              <span className="font-sans font-medium text-stone-700">Appetizers</span>
              <span className="font-semibold text-stone-900">{formatCurrency(state.appetizers)}</span>
            </div>
            <div className="flex justify-between items-center text-stone-600">
              <span className="font-sans font-medium text-stone-700">Main Courses</span>
              <span className="font-semibold text-stone-900">{formatCurrency(state.mainCourses)}</span>
            </div>
            <div className="flex justify-between items-center text-stone-600">
              <span className="font-sans font-medium text-stone-700">Desserts</span>
              <span className="font-semibold text-stone-900">{formatCurrency(state.desserts)}</span>
            </div>
            <div className="flex justify-between items-center text-stone-600">
              <span className="font-sans font-medium text-stone-700">Drinks</span>
              <span className="font-semibold text-stone-900">{formatCurrency(state.drinks)}</span>
            </div>
          </div>

          {/* Subtotal, Tip, Total */}
          <div className="py-4 space-y-2 text-sm font-mono border-b border-dashed border-stone-300">
            <div className="flex justify-between items-center text-stone-600">
              <span className="font-sans text-stone-700">Subtotal:</span>
              <span className="font-semibold text-stone-900">{formatCurrency(calc.runningTotal)}</span>
            </div>
            <div className="flex justify-between items-center text-stone-600">
              <span className="font-sans text-stone-700">Tip Amount ({calc.tipPercentage}%):</span>
              <span className="font-semibold text-stone-900">{formatCurrency(calc.tipAmount)}</span>
            </div>
            <div className="flex justify-between items-center pt-2 text-base font-bold text-stone-900 font-mono">
              <span className="font-sans">Total Bill:</span>
              <span>{formatCurrency(calc.totalWithTip)}</span>
            </div>
          </div>

          {/* Highlighted: EACH PERSON PAYS */}
          <div className="mt-5 p-4 rounded-xl bg-amber-50/80 border border-amber-200/90 text-center">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-800 block">
              Each Person Pays
            </span>
            <div className="text-3xl sm:text-4xl font-extrabold text-amber-950 font-mono my-1 tracking-tight">
              {formatCurrency(calc.eachPays)}
            </div>
            <p className="text-xs text-amber-700/90">
              {state.numOfFriends === 1
                ? 'Full bill for 1 person'
                : `${formatCurrency(calc.totalWithTip)} split among ${state.numOfFriends} people`}
            </p>
            {state.roundUpToDollar && calc.discrepancyCents > 0 && (
              <p className="text-[11px] text-amber-600/80 mt-1">
                (Includes {formatCurrency(calc.discrepancyCents)} extra from rounding up)
              </p>
            )}
          </div>

          {/* Receipt Footer */}
          <div className="mt-5 text-center text-xs text-stone-400 font-mono">
            <p>*** THANK YOU FOR DINING WITH US ***</p>
            <p className="text-[10px] text-stone-400 mt-1">Interactive Bill Splitter</p>
          </div>
        </div>
      ) : (
        /* Terminal Console View (faithful representation of the Python script output) */
        <div
          id="terminal-console-card"
          className="bg-stone-950 text-stone-100 rounded-2xl p-6 font-mono text-xs sm:text-sm border border-stone-800 shadow-xl overflow-x-auto"
        >
          <div className="flex items-center gap-2 pb-3 mb-3 border-b border-stone-800 text-stone-400 text-xs">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
            </div>
            <span className="text-[11px] text-stone-400 ml-2">python bill_splitter.py</span>
          </div>

          <pre className="text-emerald-400 leading-relaxed select-all">
{`--- Welcome to the Advanced Bill Splitter ---
How many people are splitting the bill? ${state.numOfFriends}

Enter the totals for each category:
Appetizers total: $${state.appetizers.toFixed(2)}
Main courses total: $${state.mainCourses.toFixed(2)}
Desserts total: $${state.desserts.toFixed(2)}
Drinks total: $${state.drinks.toFixed(2)}

Enter tip percentage (e.g., 20 for 20%): ${calc.tipPercentage}

${consoleText}`}
          </pre>

          <div className="mt-4 pt-3 border-t border-stone-800/80 flex items-center justify-between text-stone-500 text-[11px]">
            <span>Status: 200 OK • Python Logic Executed</span>
            <button
              type="button"
              onClick={() => handleCopy('terminal')}
              className="text-stone-300 hover:text-white underline transition-colors"
            >
              Copy Terminal Output
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
