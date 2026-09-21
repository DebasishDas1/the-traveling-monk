export function rupeesToPaise(value: string | number): number {
  const amount = Number(value)

  if (!Number.isFinite(amount) || amount < 0) {
    return 0
  }

  return Math.round(amount * 100)
}

export function paiseToRupees(paise: number): number {
  return paise / 100
}

export function formatMoney(paise: number, currency = 'INR'): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(paise / 100)
}
