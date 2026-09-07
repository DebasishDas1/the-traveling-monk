import type { SplitMateSettlement } from '@/types/splitmate'

interface Balance {
  memberId: string
  netPaise: number
}

export function splitEqually(
  amountPaise: number,
  participantIds: string[]
): Record<string, number> {
  if (amountPaise < 0) {
    throw new Error('Amount cannot be negative')
  }

  if (participantIds.length === 0) {
    return {}
  }

  const baseShare = Math.floor(amountPaise / participantIds.length)

  let remainder = amountPaise - baseShare * participantIds.length

  return Object.fromEntries(
    participantIds.map((memberId) => {
      const extraPaise = remainder > 0 ? 1 : 0

      remainder -= extraPaise

      return [memberId, baseShare + extraPaise]
    })
  )
}

export function simplifyDebts(balances: Balance[]): SplitMateSettlement[] {
  const creditors = balances
    .filter((balance) => balance.netPaise > 0)
    .map((balance) => ({
      memberId: balance.memberId,
      amountPaise: balance.netPaise,
    }))
    .sort((a, b) => b.amountPaise - a.amountPaise)

  const debtors = balances
    .filter((balance) => balance.netPaise < 0)
    .map((balance) => ({
      memberId: balance.memberId,
      amountPaise: Math.abs(balance.netPaise),
    }))
    .sort((a, b) => b.amountPaise - a.amountPaise)

  const settlements: SplitMateSettlement[] = []

  let creditorIndex = 0
  let debtorIndex = 0

  while (creditorIndex < creditors.length && debtorIndex < debtors.length) {
    const creditor = creditors[creditorIndex]
    const debtor = debtors[debtorIndex]

    const amountPaise = Math.min(creditor.amountPaise, debtor.amountPaise)

    if (amountPaise > 0) {
      settlements.push({
        id: `${debtor.memberId}-${creditor.memberId}-${amountPaise}`,
        from: debtor.memberId,
        to: creditor.memberId,
        amountPaise,
        paid: false,
      })
    }

    creditor.amountPaise -= amountPaise
    debtor.amountPaise -= amountPaise

    if (creditor.amountPaise === 0) {
      creditorIndex++
    }

    if (debtor.amountPaise === 0) {
      debtorIndex++
    }
  }

  return settlements
}
