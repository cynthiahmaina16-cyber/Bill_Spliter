import React from 'react';
import { Utensils, Coffee, IceCream, Salad, RotateCcw } from 'lucide-react';
import { formatCurrency } from '../utils/calculations';

interface CategoryInputsProps {
  appetizers: number;
  mainCourses: number;
  desserts: number;
  drinks: number;
  onChange: (field: 'appetizers' | 'mainCourses' | 'desserts' | 'drinks', value: number) => void;
  onClearAll: () => void;
}

interface CategoryItemConfig {
  field: 'appetizers' | 'mainCourses' | 'desserts' | 'drinks';
  label: string;
  sublabel: string;
  icon: React.ElementType;
  iconBg: string;
  iconColor: string;
  accentBorder: string;
  value: number;
}

export const CategoryInputs: React.FC<CategoryInputsProps> = ({
  appetizers,
  mainCourses,
  desserts,
  drinks,
  onChange,
  onClearAll,
}) => {
  const categories: CategoryItemConfig[] = [
    {
      field: 'appetizers',
      label: 'Appetizers',
      sublabel: 'Starters, small bites, bread',
      icon: Salad,
      iconBg: 'bg-emerald-50',
      iconColor: 'text-emerald-700',
      accentBorder: 'focus-within:border-emerald-500',
      value: appetizers,
    },
    {
      field: 'mainCourses',
      label: 'Main Courses',
      sublabel: 'Entrees, pastas, burgers, steaks',
      icon: Utensils,
      iconBg: 'bg-amber-50',
      iconColor: 'text-amber-700',
      accentBorder: 'focus-within:border-amber-500',
      value: mainCourses,
    },
    {
      field: 'desserts',
      label: 'Desserts',
      sublabel: 'Sweets, ice cream, pastries',
      icon: IceCream,
      iconBg: 'bg-rose-50',
      iconColor: 'text-rose-700',
      accentBorder: 'focus-within:border-rose-500',
      value: desserts,
    },
    {
      field: 'drinks',
      label: 'Drinks',
      sublabel: 'Beverages, cocktails, coffee, water',
      icon: Coffee,
      iconBg: 'bg-sky-50',
      iconColor: 'text-sky-700',
      accentBorder: 'focus-within:border-sky-500',
      value: drinks,
    },
  ];

  const total = appetizers + mainCourses + desserts + drinks;

  const handleInputChange = (field: 'appetizers' | 'mainCourses' | 'desserts' | 'drinks', rawValue: string) => {
    // Allow empty string to easily type
    if (rawValue === '') {
      onChange(field, 0);
      return;
    }
    const val = parseFloat(rawValue);
    if (!isNaN(val) && val >= 0) {
      onChange(field, Math.round(val * 100) / 100);
    }
  };

  const addAmount = (field: 'appetizers' | 'mainCourses' | 'desserts' | 'drinks', increment: number) => {
    const current = field === 'appetizers' ? appetizers :
      field === 'mainCourses' ? mainCourses :
      field === 'desserts' ? desserts : drinks;
    onChange(field, Math.max(0, Math.round((current + increment) * 100) / 100));
  };

  return (
    <div id="category-totals-section" className="bg-white rounded-2xl p-5 border border-stone-200/80 shadow-xs space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-stone-900 text-base">Course Totals</h3>
          <p className="text-xs text-stone-500">Enter the totals for each dining category</p>
        </div>
        {total > 0 && (
          <button
            type="button"
            id="clear-all-categories-btn"
            onClick={onClearAll}
            className="flex items-center gap-1.5 text-xs text-stone-500 hover:text-rose-600 transition-colors px-2 py-1 rounded-md hover:bg-rose-50"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Totals</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const percentage = total > 0 ? Math.round((cat.value / total) * 100) : 0;

          return (
            <div
              key={cat.field}
              id={`category-card-${cat.field}`}
              className="p-3.5 rounded-xl border border-stone-200/90 bg-stone-50/50 hover:bg-white transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-lg ${cat.iconBg} ${cat.iconColor} flex items-center justify-center shrink-0`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <label htmlFor={`input-${cat.field}`} className="text-sm font-semibold text-stone-900 block leading-tight cursor-pointer">
                      {cat.label}
                    </label>
                    <span className="text-[11px] text-stone-500 block leading-tight">
                      {cat.sublabel}
                    </span>
                  </div>
                </div>
                {total > 0 && cat.value > 0 && (
                  <span className="text-[11px] font-semibold text-stone-600 bg-white border border-stone-200 px-1.5 py-0.5 rounded-md">
                    {percentage}%
                  </span>
                )}
              </div>

              {/* Input & Quick add */}
              <div className="flex items-center gap-2 mt-2.5">
                <div className="relative flex-1">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 font-semibold text-sm select-none">
                    $
                  </span>
                  <input
                    id={`input-${cat.field}`}
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="0.00"
                    value={cat.value === 0 ? '' : cat.value}
                    onChange={(e) => handleInputChange(cat.field, e.target.value)}
                    className="w-full bg-white border border-stone-300 rounded-lg pl-7 pr-3 py-2 text-stone-900 font-mono font-medium text-sm focus:outline-hidden focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 transition-all placeholder:text-stone-300"
                  />
                </div>

                {/* Quick Add Buttons */}
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    type="button"
                    onClick={() => addAmount(cat.field, 5)}
                    className="text-[11px] font-medium px-2 py-2 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors"
                    title="Add $5"
                  >
                    +$5
                  </button>
                  <button
                    type="button"
                    onClick={() => addAmount(cat.field, 10)}
                    className="text-[11px] font-medium px-2 py-2 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors"
                    title="Add $10"
                  >
                    +$10
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Subtotal progress / breakdown bar */}
      {total > 0 && (
        <div className="pt-2">
          <div className="flex items-center justify-between text-xs mb-1.5 font-medium text-stone-600">
            <span>Course Distribution</span>
            <span className="font-semibold text-stone-900">Subtotal: {formatCurrency(total)}</span>
          </div>
          <div className="h-2 w-full rounded-full bg-stone-100 overflow-hidden flex">
            {appetizers > 0 && (
              <div
                style={{ width: `${(appetizers / total) * 100}%` }}
                className="bg-emerald-500 h-full transition-all"
                title={`Appetizers: ${formatCurrency(appetizers)}`}
              />
            )}
            {mainCourses > 0 && (
              <div
                style={{ width: `${(mainCourses / total) * 100}%` }}
                className="bg-amber-500 h-full transition-all"
                title={`Main Courses: ${formatCurrency(mainCourses)}`}
              />
            )}
            {desserts > 0 && (
              <div
                style={{ width: `${(desserts / total) * 100}%` }}
                className="bg-rose-500 h-full transition-all"
                title={`Desserts: ${formatCurrency(desserts)}`}
              />
            )}
            {drinks > 0 && (
              <div
                style={{ width: `${(drinks / total) * 100}%` }}
                className="bg-sky-500 h-full transition-all"
                title={`Drinks: ${formatCurrency(drinks)}`}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};
