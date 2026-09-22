export type CategoryKey = 'appetizers' | 'main_courses' | 'desserts' | 'drinks';

export interface CategoryConfig {
  key: CategoryKey;
  label: string;
  shortLabel: string;
  description: string;
  iconName: 'Salad' | 'Utensils' | 'IceCream' | 'GlassWater';
}

export interface BillState {
  numOfFriends: number;
  appetizers: number;
  mainCourses: number;
  desserts: number;
  drinks: number;
  tipPercentage: number;
  isCustomTip: boolean;
  customTipValue: string;
  roundUpToDollar: boolean;
}

export interface BillCalculation {
  runningTotal: number;
  tipPercentage: number;
  tipAmount: number;
  totalWithTip: number;
  finalBillPerPerson: number;
  eachPays: number;
  effectiveTotalCollected: number;
  discrepancyCents: number;
}
