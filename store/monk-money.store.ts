import { create } from 'zustand'

import type { SplitMateExpense, SplitMateGroup } from '@/types/monk-money'

export interface SplitMateState {
  group: SplitMateGroup | null
  expenses: SplitMateExpense[]
  paidSettlementIds: string[]
  setGroup: (group: SplitMateGroup) => void
  clearGroup: () => void
  addExpense: (expense: SplitMateExpense) => void
  updateExpense: (expenseId: string, expense: SplitMateExpense) => void
  removeExpense: (expenseId: string) => void
  markSettlementPaid: (settlementId: string) => void
}

export const useSplitMateStore = create<SplitMateState>((set) => ({
  group: null,
  expenses: [],
  paidSettlementIds: [],

  setGroup: (group) =>
    set({
      group,
      expenses: [],
      paidSettlementIds: [],
    }),

  clearGroup: () =>
    set({
      group: null,
      expenses: [],
      paidSettlementIds: [],
    }),

  addExpense: (expense) =>
    set((state) => ({
      expenses: [...state.expenses, expense],
    })),

  updateExpense: (expenseId, expense) =>
    set((state) => ({
      expenses: state.expenses.map((current) =>
        current.id === expenseId ? expense : current
      ),
    })),

  removeExpense: (expenseId) =>
    set((state) => ({
      expenses: state.expenses.filter((expense) => expense.id !== expenseId),
    })),

  markSettlementPaid: (settlementId) =>
    set((state) => ({
      paidSettlementIds: [...state.paidSettlementIds, settlementId],
    })),
}))
