'use client'

import { useState, memo, useCallback, useMemo } from 'react'
import { AddExpenseDialog } from '@/components/splitmate/AddExpenseDialog'
import { ExpenseItem } from '@/components/splitmate/ExpenseItem'
import { SettlementList } from '@/components/splitmate/SettlementList'
import { Separator } from '@/components/ui/separator'

import { useSplitMateStore } from '@/store/splitmate.store'
import type { SplitMateState } from '@/store/splitmate.store'
import type { SplitMateExpense } from '@/types/splitmate'

import { calculateBalances } from './calculations'
import { formatMoney } from './money'

function SplitMateWorkspaceComponent() {
  const group = useSplitMateStore((state: SplitMateState) => state.group)
  const expenses = useSplitMateStore((state: SplitMateState) => state.expenses)
  const removeExpense = useSplitMateStore(
    (state: SplitMateState) => state.removeExpense
  )

  const [editingExpense, setEditingExpense] = useState<SplitMateExpense | null>(
    null
  )

  const balances = useMemo(
    () => (group ? calculateBalances(group.members, expenses) : []),
    [group, expenses]
  )

  const handleEdit = useCallback((expense: SplitMateExpense) => {
    setEditingExpense(expense)
  }, [])

  const handleDelete = useCallback(
    (id: string) => {
      removeExpense(id)
    },
    [removeExpense]
  )

  if (!group) return null

  return (
    <section className="pt-10">
      {/* Group Header */}
      <header>
        <p className="text-sm text-muted-foreground">Group</p>
        <div className="mt-1 flex items-baseline justify-between gap-4">
          <h2 className="truncate text-3xl font-semibold tracking-tight">
            {group.name}
          </h2>
          <span className="shrink-0 text-sm text-muted-foreground">
            {group.members.length}{' '}
            {group.members.length === 1 ? 'person' : 'people'}
          </span>
        </div>
        <p className="mt-3 text-sm text-muted-foreground">
          {group.members.map((member) => member.name).join(' · ')}
        </p>
      </header>

      {/* Add Expense Action */}
      <div className="mt-8">
        <AddExpenseDialog />
      </div>

      {expenses.length > 0 && (
        <>
          <Separator className="my-12" />

          {/* Balances Section */}
          <section>
            <h3 className="text-lg font-semibold tracking-tight">Balances</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              What everyone owes or gets back.
            </p>
            <div className="mt-5">
              {balances.map((balance) => {
                const member = group.members.find(
                  (m) => m.id === balance.memberId
                )
                if (!member) return null

                const isPositive = balance.netPaise > 0
                const isNegative = balance.netPaise < 0

                return (
                  <div
                    key={balance.memberId}
                    className="flex items-center justify-between py-3"
                  >
                    <span className="text-sm">{member.name}</span>
                    <span
                      className={
                        isPositive
                          ? 'text-sm font-medium tabular-nums text-green-600'
                          : isNegative
                            ? 'text-sm font-medium tabular-nums text-red-600'
                            : 'text-sm text-muted-foreground'
                      }
                    >
                      {isPositive
                        ? `+${formatMoney(balance.netPaise)}`
                        : isNegative
                          ? `-${formatMoney(Math.abs(balance.netPaise))}`
                          : 'Settled'}
                    </span>
                  </div>
                )
              })}
            </div>
          </section>

          {/* Settlements Section */}
          <SettlementList />

          <Separator className="my-12" />

          {/* Expenses List */}
          <section>
            <div className="flex items-baseline justify-between">
              <h3 className="text-lg font-semibold tracking-tight">Expenses</h3>
              <span className="text-sm text-muted-foreground">
                {expenses.length}
              </span>
            </div>
            <div className="mt-5 space-y-2">
              {expenses.map((expense) => {
                const payer = group.members.find((m) => m.id === expense.paidBy)
                return (
                  <ExpenseItem
                    key={expense.id}
                    expense={expense}
                    payer={payer}
                    onEdit={() => handleEdit(expense)}
                    onDelete={() => handleDelete(expense.id)}
                  />
                )
              })}
            </div>
          </section>
        </>
      )}

      {/* Edit Expense Dialog */}
      {editingExpense && (
        <AddExpenseDialog
          key={editingExpense.id}
          expense={editingExpense}
          open
          onOpenChange={(open) => {
            if (!open) setEditingExpense(null)
          }}
        />
      )}
    </section>
  )
}

export const SplitMateWorkspace = memo(SplitMateWorkspaceComponent)
