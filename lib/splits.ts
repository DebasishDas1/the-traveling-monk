import { v5 as uuidv5 } from 'uuid'
import type { SplitMateBalance } from './calculations'

export interface SplitMateSettlement {
  id: string
  from: string
  to: string
  amountPaise: number
  paid: boolean
  createdAt: string
}

// Use a stable namespace for settlement IDs
const SETTLEMENT_NAMESPACE = '550e8400-e29b-41d4-a716-446655440000'

interface SettleableBalance {
  memberId: string
  amountPaise: number
}

/**
 * Simplifies debts using a greedy algorithm
 * Produces deterministic settlements with stable IDs
 */
export function simplifyDebts(
  balances: SplitMateBalance[]
): SplitMateSettlement[] {
  // Separate creditors and debtors
  const creditors: SettleableBalance[] = balances
    .filter((b) => b.netPaise > 0)
    .map((b) => ({
      memberId: b.memberId,
      amountPaise: b.netPaise,
    }))
    .sort((a, b) => b.amountPaise - a.amountPaise)

  const debtors: SettleableBalance[] = balances
    .filter((b) => b.netPaise < 0)
    .map((b) => ({
      memberId: b.memberId,
      amountPaise: Math.abs(b.netPaise),
    }))
    .sort((a, b) => b.amountPaise - a.amountPaise)

  const settlements: SplitMateSettlement[] = []
  let settlementIndex = 0

  let creditorIndex = 0
  let debtorIndex = 0

  while (creditorIndex < creditors.length && debtorIndex < debtors.length) {
    const creditor = creditors[creditorIndex]
    const debtor = debtors[debtorIndex]

    // Minimum of the two amounts
    const amountPaise = Math.min(creditor.amountPaise, debtor.amountPaise)

    if (amountPaise > 0) {
      // Generate stable ID using v5 UUID
      // This ensures same settlement gets same ID even if recalculated
      const settlementKey = `${debtor.memberId}:${creditor.memberId}:${settlementIndex}`
      const id = uuidv5(settlementKey, SETTLEMENT_NAMESPACE)

      settlements.push({
        id,
        from: debtor.memberId,
        to: creditor.memberId,
        amountPaise,
        paid: false,
        createdAt: new Date().toISOString(),
      })

      settlementIndex++
    }

    // Deduct the amount from both
    creditor.amountPaise -= amountPaise
    debtor.amountPaise -= amountPaise

    // Move to next creditor if this one is satisfied
    if (creditor.amountPaise === 0) {
      creditorIndex++
    }

    // Move to next debtor if this one is satisfied
    if (debtor.amountPaise === 0) {
      debtorIndex++
    }
  }

  return settlements
}

/**
 * Validates settlement logic
 */
export function validateSettlements(
  settlements: SplitMateSettlement[],
  balances: SplitMateBalance[]
): { valid: boolean; errors: string[] } {
  const errors: string[] = []

  // Check all members in settlements exist in balances
  const balanceIds = new Set(balances.map((b) => b.memberId))
  for (const settlement of settlements) {
    if (!balanceIds.has(settlement.from)) {
      errors.push(`Settlement references unknown debtor: ${settlement.from}`)
    }
    if (!balanceIds.has(settlement.to)) {
      errors.push(`Settlement references unknown creditor: ${settlement.to}`)
    }
  }

  // Check no duplicate settlements
  const settlementIds = new Set(settlements.map((s) => s.id))
  if (settlementIds.size !== settlements.length) {
    errors.push('Duplicate settlement IDs detected')
  }

  return {
    valid: errors.length === 0,
    errors,
  }
}
