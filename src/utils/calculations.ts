import { BillCalculation, BillState } from '../types';

export function calculateBill(state: BillState): BillCalculation {
  const appetizers = Math.max(0, Number(state.appetizers) || 0);
  const mainCourses = Math.max(0, Number(state.mainCourses) || 0);
  const desserts = Math.max(0, Number(state.desserts) || 0);
  const drinks = Math.max(0, Number(state.drinks) || 0);

  const runningTotal = appetizers + mainCourses + desserts + drinks;
  
  const tipPct = Math.max(0, Number(state.tipPercentage) || 0);
  const tipAmount = runningTotal * (tipPct / 100);
  const totalWithTip = runningTotal + tipAmount;

  const validFriends = Math.max(1, Math.floor(Number(state.numOfFriends) || 1));
  const finalBillPerPerson = totalWithTip / validFriends;

  let eachPays = Math.round(finalBillPerPerson * 100) / 100;
  if (state.roundUpToDollar && eachPays > 0) {
    eachPays = Math.ceil(eachPays);
  }

  const effectiveTotalCollected = eachPays * validFriends;
  const discrepancyCents = Math.round((effectiveTotalCollected - totalWithTip) * 100) / 100;

  return {
    runningTotal,
    tipPercentage: tipPct,
    tipAmount,
    totalWithTip,
    finalBillPerPerson,
    eachPays,
    effectiveTotalCollected,
    discrepancyCents,
  };
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount || 0);
}

export function generateConsoleReceipt(state: BillState, calc: BillCalculation): string {
  const line30 = '='.repeat(30);
  const dash30 = '-'.repeat(30);

  const subtotalStr = `$${calc.runningTotal.toFixed(2)}`;
  const tipStr = `$${calc.tipAmount.toFixed(2)}`;
  const totalStr = `$${calc.totalWithTip.toFixed(2)}`;
  const eachStr = `$${calc.eachPays.toFixed(2)}`;

  return [
    line30,
    `Subtotal:         ${subtotalStr.padStart(12)}`,
    `Tip Amount:       ${tipStr.padStart(12)}`,
    `Total Bill:       ${totalStr.padStart(12)}`,
    dash30,
    `Each person pays: ${eachStr.padStart(12)}`,
    line30,
  ].join('\n');
}

export function generateShareableSummary(state: BillState, calc: BillCalculation): string {
  const friendsText = state.numOfFriends === 1 ? '1 person' : `${state.numOfFriends} people`;
  return [
    `🧾 Bill Split Summary (${friendsText})`,
    `------------------------------`,
    `• Appetizers:   ${formatCurrency(state.appetizers)}`,
    `• Main Courses: ${formatCurrency(state.mainCourses)}`,
    `• Desserts:     ${formatCurrency(state.desserts)}`,
    `• Drinks:       ${formatCurrency(state.drinks)}`,
    `------------------------------`,
    `Subtotal:       ${formatCurrency(calc.runningTotal)}`,
    `Tip (${calc.tipPercentage}%):      ${formatCurrency(calc.tipAmount)}`,
    `Total Bill:     ${formatCurrency(calc.totalWithTip)}`,
    `==============================`,
    `👉 Each Pays:   ${formatCurrency(calc.eachPays)} / person`,
    `==============================`,
  ].join('\n');
}
