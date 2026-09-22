import React, { useState, useMemo } from 'react';
import { BillState } from './types';
import { calculateBill } from './utils/calculations';
import { Header } from './components/Header';
import { PartySelector } from './components/PartySelector';
import { CategoryInputs } from './components/CategoryInputs';
import { TipSelector } from './components/TipSelector';
import { Receipt } from './components/Receipt';

const INITIAL_STATE: BillState = {
  numOfFriends: 4,
  appetizers: 24.50,
  mainCourses: 68.00,
  desserts: 18.50,
  drinks: 22.00,
  tipPercentage: 20,
  isCustomTip: false,
  customTipValue: '',
  roundUpToDollar: false,
};

const EMPTY_STATE: BillState = {
  numOfFriends: 2,
  appetizers: 0,
  mainCourses: 0,
  desserts: 0,
  drinks: 0,
  tipPercentage: 18,
  isCustomTip: false,
  customTipValue: '',
  roundUpToDollar: false,
};

export default function App() {
  const [billState, setBillState] = useState<BillState>(INITIAL_STATE);

  const calculation = useMemo(() => calculateBill(billState), [billState]);

  const handleCategoryChange = (
    field: 'appetizers' | 'mainCourses' | 'desserts' | 'drinks',
    value: number
  ) => {
    setBillState((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleClearCategories = () => {
    setBillState((prev) => ({
      ...prev,
      appetizers: 0,
      mainCourses: 0,
      desserts: 0,
      drinks: 0,
    }));
  };

  const handlePartyChange = (num: number) => {
    setBillState((prev) => ({
      ...prev,
      numOfFriends: num,
    }));
  };

  const handleTipChange = (percentage: number, isCustom = false, customValue = '') => {
    setBillState((prev) => ({
      ...prev,
      tipPercentage: percentage,
      isCustomTip: isCustom,
      customTipValue: isCustom ? customValue : '',
    }));
  };

  const handleRoundUpChange = (roundUp: boolean) => {
    setBillState((prev) => ({
      ...prev,
      roundUpToDollar: roundUp,
    }));
  };

  const handleLoadSample = () => {
    setBillState({
      numOfFriends: 4,
      appetizers: 28.00,
      mainCourses: 84.50,
      desserts: 21.00,
      drinks: 32.50,
      tipPercentage: 20,
      isCustomTip: false,
      customTipValue: '',
      roundUpToDollar: false,
    });
  };

  const handleReset = () => {
    setBillState(EMPTY_STATE);
  };

  return (
    <div className="min-h-screen bg-stone-100 text-stone-900 py-6 px-4 sm:px-6 lg:px-8 flex flex-col justify-between">
      <main className="max-w-6xl mx-auto w-full">
        <Header onLoadSample={handleLoadSample} onReset={handleReset} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Input Form (Party, Categories, Tip) */}
          <div className="lg:col-span-7 space-y-5">
            {/* Step 1: Party Count */}
            <PartySelector
              numOfFriends={billState.numOfFriends}
              onChange={handlePartyChange}
            />

            {/* Step 2: Course Category Totals */}
            <CategoryInputs
              appetizers={billState.appetizers}
              mainCourses={billState.mainCourses}
              desserts={billState.desserts}
              drinks={billState.drinks}
              onChange={handleCategoryChange}
              onClearAll={handleClearCategories}
            />

            {/* Step 3: Tip Percentage */}
            <TipSelector
              subtotal={calculation.runningTotal}
              tipPercentage={billState.tipPercentage}
              isCustomTip={billState.isCustomTip}
              customTipValue={billState.customTipValue}
              roundUpToDollar={billState.roundUpToDollar}
              onTipChange={handleTipChange}
              onRoundUpChange={handleRoundUpChange}
            />
          </div>

          {/* Right Column: Dynamic Bill Receipt & Console Terminal */}
          <div className="lg:col-span-5 sticky top-6">
            <Receipt state={billState} calc={calculation} />
          </div>
        </div>
      </main>

      <footer className="mt-12 py-4 text-center text-xs text-stone-400 border-t border-stone-200/60 max-w-6xl mx-auto w-full">
        <p>Interactive Bill Splitter • Calculations directly mirroring the Advanced Bill Splitter algorithm</p>
      </footer>
    </div>
  );
}
