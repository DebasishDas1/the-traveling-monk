import type { SplitMateExpense, SplitMateMember } from '@/types/splitmate'

export interface SplitMateBalance {
  memberId: string
  paidPaise: number
  owedPaise: number
  netPaise: number
}

export function calculateBalances(
  members: SplitMateMember[],
  expenses: SplitMateExpense[]
): SplitMateBalance[] {
  const balances = new Map<string, SplitMateBalance>()

  for (const member of members) {
    balances.set(member.id, {
      memberId: member.id,
      paidPaise: 0,
      owedPaise: 0,
      netPaise: 0,
    })
  }

  for (const expense of expenses) {
    const payer = balances.get(expense.paidBy)

    if (payer) {
      payer.paidPaise += expense.amountPaise
    }

    if (expense.splitType !== 'equal') {
      continue
    }

    const participantCount = expense.participants.length

    if (participantCount === 0) {
      continue
    }

    const baseShare = Math.floor(expense.amountPaise / participantCount)

    let remainder = expense.amountPaise - baseShare * participantCount

    for (const participantId of expense.participants) {
      const participant = balances.get(participantId)

      if (!participant) {
        continue
      }

      const extraPaise = remainder > 0 ? 1 : 0

      participant.owedPaise += baseShare + extraPaise

      remainder -= extraPaise
    }
  }

  return Array.from(balances.values()).map((balance) => ({
    ...balance,
    netPaise: balance.paidPaise - balance.owedPaise,
  }))
}
