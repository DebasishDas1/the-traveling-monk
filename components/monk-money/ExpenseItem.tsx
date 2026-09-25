'use client'

import { MoreHorizontal, Pencil, Trash2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import type { SplitMateExpense, SplitMateMember } from '@/types/monk-money'

import { formatMoney } from './money'

interface ExpenseItemProps {
  expense: SplitMateExpense
  payer?: SplitMateMember
  onEdit: () => void
  onDelete: () => void
}

export function ExpenseItem({
  expense,
  payer,
  onEdit,
  onDelete,
}: ExpenseItemProps) {
  return (
    <AlertDialog>
      <div className="flex items-center gap-3 rounded-xl bg-muted/50 px-4 py-3">
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium">{expense.description}</p>

          <p className="mt-1 text-xs text-muted-foreground">
            Paid by {payer?.name ?? 'Unknown'}
          </p>
        </div>

        <p className="shrink-0 text-sm font-medium tabular-nums">
          {formatMoney(expense.amountPaise)}
        </p>

        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button
                variant="ghost"
                className="shrink-0 text-muted-foreground"
              >
                <MoreHorizontal className="size-4" strokeWidth={1.7} />

                <span className="sr-only">Expense actions</span>
              </Button>
            }
          />

          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={onEdit}>
              <Pencil />
              Edit
            </DropdownMenuItem>

            <DropdownMenuItem
              variant="destructive"
              render={<AlertDialogTrigger className="w-full" />}
            >
              <Trash2 />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete this expense?</AlertDialogTitle>

          <AlertDialogDescription>
            This will remove “{expense.description}” and recalculate
            everyone&apos;s balances.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>

          <AlertDialogAction onClick={onDelete}>
            Delete expense
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
