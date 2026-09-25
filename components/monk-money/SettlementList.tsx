'use client'

import { ArrowRight, Check, Loader } from 'lucide-react'

import { Button } from '@/components/ui/button'

import { useSplitMateStore } from '@/store/monk-money.store'
import { useFirebaseSettlementOperations } from '@/hooks/useFirebaseSync'

import { calculateBalances } from './calculations'
import { formatMoney } from './money'
import { simplifyDebts } from './splits'

export function SettlementList() {
  const group = useSplitMateStore((state) => state.group)
  const expenses = useSplitMateStore((state) => state.expenses)
  const paidSettlementIds = useSplitMateStore(
    (state) => state.paidSettlementIds
  )

  const { markPaid, isLoading } = useFirebaseSettlementOperations()

  if (!group || expenses.length === 0) {
    return null
  }

  const balances = calculateBalances(group.members, expenses)
  const settlements = simplifyDebts(balances)

  const unpaidSettlements = settlements.filter(
    (settlement) => !paidSettlementIds.includes(settlement.id)
  )

  if (unpaidSettlements.length === 0) {
    return (
      <section className="mt-10 border-t pt-8">
        <div className="flex items-center gap-3">
          <div className="flex size-9 items-center justify-center rounded-full bg-muted">
            <Check className="size-4" strokeWidth={1.8} />
          </div>

          <div>
            <p className="text-sm font-medium">All settled</p>

            <p className="mt-1 text-sm text-muted-foreground">
              Everyone is square.
            </p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="mt-10 border-t pt-8">
      <div>
        <p className="text-sm font-medium">Settle up</p>

        <p className="mt-1 text-sm text-muted-foreground">
          The simplest way to clear the group balance.
        </p>
      </div>

      <div className="mt-5 space-y-3">
        {unpaidSettlements.map((settlement) => {
          const from = group.members.find(
            (member) => member.id === settlement.from
          )

          const to = group.members.find((member) => member.id === settlement.to)

          if (!from || !to) {
            return null
          }

          const handleMarkPaid = async () => {
            try {
              await markPaid(settlement.id)
            } catch (error) {
              console.error('Failed to mark settlement paid:', error)
            }
          }

          return (
            <div key={settlement.id} className="rounded-2xl bg-muted/50 p-4">
              <div className="flex items-center justify-between gap-4">
                <div className="flex min-w-0 items-center gap-3">
                  <span className="truncate text-sm font-medium">
                    {from.name}
                  </span>

                  <ArrowRight
                    className="size-4 shrink-0 text-muted-foreground"
                    strokeWidth={1.7}
                  />

                  <span className="truncate text-sm font-medium">
                    {to.name}
                  </span>
                </div>

                <span className="shrink-0 text-sm font-medium tabular-nums">
                  {formatMoney(settlement.amountPaise)}
                </span>
              </div>

              <Button
                variant="ghost"
                size="sm"
                className="mt-3 h-8 px-2 text-muted-foreground disabled:opacity-50"
                onClick={handleMarkPaid}
                disabled={isLoading}
              >
                {isLoading && <Loader className="mr-1 size-3 animate-spin" />}
                Mark as paid
              </Button>
            </div>
          )
        })}
      </div>
    </section>
  )
}
