/**
 * Financial calculation utilities
 */

export function calculatePERetio(price: number, eps: number): number | null {
  if (eps === 0) return null;
  return price / eps;
}

export function calculateDebtToEquity(totalDebt: number, totalEquity: number): number | null {
  if (totalEquity === 0) return null;
  return totalDebt / totalEquity;
}

export function calculateCurrentRatio(currentAssets: number, currentLiabilities: number): number | null {
  if (currentLiabilities === 0) return null;
  return currentAssets / currentLiabilities;
}

export function calculateROE(netIncome: number, shareholdersEquity: number): number | null {
  if (shareholdersEquity === 0) return null;
  return (netIncome / shareholdersEquity) * 100;
}

export function calculateROA(netIncome: number, totalAssets: number): number | null {
  if (totalAssets === 0) return null;
  return (netIncome / totalAssets) * 100;
}

export function calculateGrossMargin(revenue: number, costOfRevenue: number): number | null {
  if (revenue === 0) return null;
  return ((revenue - costOfRevenue) / revenue) * 100;
}

export function calculatePortfolioValue(holdings: Array<{ shares: number; currentPrice: number }>): number {
  return holdings.reduce((sum, holding) => sum + (holding.shares * holding.currentPrice), 0);
}

export function calculateGainLoss(buyPrice: number, currentPrice: number, shares: number): number {
  return (currentPrice - buyPrice) * shares;
}

export function calculateGainLossPercent(buyPrice: number, currentPrice: number): number {
  if (buyPrice === 0) return 0;
  return ((currentPrice - buyPrice) / buyPrice) * 100;
}

