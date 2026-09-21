export interface SplitMateMember {
  id: string
  name: string
}

export interface SplitMateGroup {
  id: string
  name: string
  members: SplitMateMember[]
}

export type SplitType = 'equal' | 'exact' | 'percentage' | 'shares'

export interface SplitMateExpense {
  id: string
  description: string
  amountPaise: number
  currency: string
  paidBy: string
  participants: string[]
  splitType: SplitType
  createdAt: string
  updatedAt?: string
}

export interface SplitMateSettlement {
  id: string
  from: string
  to: string
  amountPaise: number
  paid: boolean
}
