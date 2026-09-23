'use client'

import { useState, memo, useCallback, useMemo } from 'react'
import { ArrowDownLeft, ArrowUpRight, ReceiptText, Users } from 'lucide-react'

import { AddExpenseDialog } from '@/components/splitmate/AddExpenseDialog'
import { ExpenseItem } from '@/components/splitmate/ExpenseItem'
import { SettlementList } from '@/components/splitmate/SettlementList'

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
    <section className="pt-8 sm:pt-10">
      {/* Group header */}
      <header className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Users className="size-3.5" aria-hidden="true" />
            </span>

            <p className="eyebrow">Your trip</p>
          </div>

          <h2 className="mt-4 truncate text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
            {group.name}
          </h2>

          <p className="mt-2 text-sm text-muted-foreground">
            {group.members.map((member) => member.name).join(' · ')}
          </p>
        </div>

        <p className="shrink-0 text-sm text-muted-foreground">
          {group.members.length}{' '}
          {group.members.length === 1 ? 'traveller' : 'travellers'}
        </p>
      </header>

      {/* Add expense */}
      <div className="mt-8">
        <AddExpenseDialog />
      </div>

      {expenses.length > 0 && (
        <div className="mt-12 space-y-12">
          {/* Balances */}
          <section>
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="eyebrow-accent">The maths</p>

                <h3 className="mt-2 text-xl font-semibold tracking-tight">
                  Balances
                </h3>

                <p className="mt-1 text-sm text-muted-foreground">
                  Who owes what, at a glance.
                </p>
              </div>
            </div>

            <div className="mt-5 overflow-hidden rounded-2xl border border-border bg-background">
              {balances.map((balance, index) => {
                const member = group.members.find(
                  (m) => m.id === balance.memberId
                )

                if (!member) return null

                const isPositive = balance.netPaise > 0
                const isNegative = balance.netPaise < 0

                return (
                  <div
                    key={balance.memberId}
                    className={[
                      'flex items-center justify-between gap-4 px-4 py-4 sm:px-5',
                      index > 0 ? 'border-t border-border' : '',
                    ].join(' ')}
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <span
                        className="
                          flex size-9 shrink-0 items-center justify-center
                          rounded-full
                          bg-muted
                          text-muted-foreground
                        "
                      >
                        {isPositive ? (
                          <ArrowDownLeft
                            className="size-4"
                            aria-hidden="true"
                          />
                        ) : isNegative ? (
                          <ArrowUpRight className="size-4" aria-hidden="true" />
                        ) : (
                          <span className="size-1.5 rounded-full bg-current" />
                        )}
                      </span>

                      <span className="truncate text-sm font-medium">
                        {member.name}
                      </span>
                    </div>

                    <span
                      className={
                        isPositive
                          ? 'shrink-0 text-sm font-semibold tabular-nums text-success'
                          : isNegative
                            ? 'shrink-0 text-sm font-semibold tabular-nums text-destructive'
                            : 'shrink-0 text-sm text-muted-foreground'
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

          {/* Settlements */}
          <SettlementList />

          {/* Expenses */}
          <section>
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="eyebrow-accent">Trip spending</p>

                <h3 className="mt-2 text-xl font-semibold tracking-tight">
                  Expenses
                </h3>

                <p className="mt-1 text-sm text-muted-foreground">
                  Everything your group has spent so far.
                </p>
              </div>

              <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-muted">
                <ReceiptText
                  className="size-4 text-muted-foreground"
                  aria-hidden="true"
                />
              </div>
            </div>

            <div className="mt-5 space-y-2">
              {expenses.map((expense) => {
                const payer = group.members.find(
                  (member) => member.id === expense.paidBy
                )

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
        </div>
      )}

      {/* Empty state */}
      {expenses.length === 0 && (
        <div className="mt-10 rounded-2xl border border-dashed border-border bg-background px-6 py-12 text-center">
          <div className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-muted">
            <ReceiptText
              className="size-5 text-muted-foreground"
              aria-hidden="true"
            />
          </div>

          <h3 className="mt-4 text-base font-semibold">No expenses yet</h3>

          <p className="mx-auto mt-1.5 text-sm leading-6 text-muted-foreground">
            Add your first expense and SplitMate will start working out who owes
            what.
          </p>
        </div>
      )}

      {/* Edit expense */}
      {editingExpense && (
        <AddExpenseDialog
          key={editingExpense.id}
          expense={editingExpense}
          open
          onOpenChange={(open) => {
            if (!open) {
              setEditingExpense(null)
            }
          }}
        />
      )}
    </section>
  )
}

export const SplitMateWorkspace = memo(SplitMateWorkspaceComponent)
