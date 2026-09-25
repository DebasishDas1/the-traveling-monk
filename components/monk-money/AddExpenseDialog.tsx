'use client'

import { useState } from 'react'
import { Plus, AlertCircle, Loader } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Field } from '@/components/ui/field'
import { Label } from '@/components/ui/label'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import { useSplitMateStore } from '@/store/monk-money.store'
import { useFirebaseExpenseOperations } from '@/hooks/useFirebaseSync'
import { validateExpense } from '@/lib/validators'
import { formatMoney, rupeesToPaise } from './money'
import type { SplitMateExpense } from '@/types/monk-money'

interface AddExpenseDialogProps {
  expense?: SplitMateExpense
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

const inputClass =
  'h-16 border-0 bg-transparent text-base shadow-none outline-none focus-visible:border-0 focus-visible:ring-0'

export function AddExpenseDialog({
  expense,
  open: controlledOpen,
  onOpenChange,
}: AddExpenseDialogProps) {
  const group = useSplitMateStore((state) => state.group)
  const addExpense = useSplitMateStore((state) => state.addExpense)
  const updateExpense = useSplitMateStore((state) => state.updateExpense)
  const { createExpense, updateExpenseRecord, isLoading } =
    useFirebaseExpenseOperations()

  const [internalOpen, setInternalOpen] = useState(false)
  const [description, setDescription] = useState(expense?.description ?? '')
  const [amount, setAmount] = useState(
    expense ? (expense.amountPaise / 100).toFixed(2) : ''
  )
  const [paidBy, setPaidBy] = useState(expense?.paidBy ?? '')
  const [participants, setParticipants] = useState<string[]>(
    expense?.participants ?? []
  )
  const [validationError, setValidationError] = useState<string | null>(null)

  const isEditing = Boolean(expense)
  const open = controlledOpen ?? internalOpen
  const amountPaise = rupeesToPaise(amount)
  const sharePaise =
    participants.length > 0 ? Math.floor(amountPaise / participants.length) : 0

  if (!group) return null

  const resetForm = () => {
    setDescription('')
    setAmount('')
    setPaidBy('')
    setParticipants([])
    setValidationError(null)
  }

  const toggleParticipant = (memberId: string, checked: boolean) => {
    setParticipants((current) =>
      checked ? [...current, memberId] : current.filter((id) => id !== memberId)
    )
  }

  const handleOpenChange = (nextOpen: boolean) => {
    if (controlledOpen === undefined) {
      setInternalOpen(nextOpen)
    }
    onOpenChange?.(nextOpen)
    if (!nextOpen && !isEditing) {
      resetForm()
    }
  }

  const handleSaveExpense = async () => {
    setValidationError(null)

    const nextExpense: SplitMateExpense = {
      id: expense?.id ?? crypto.randomUUID(),
      description: description.trim(),
      amountPaise,
      currency: 'INR',
      paidBy,
      participants,
      splitType: 'equal',
      createdAt: expense?.createdAt ?? new Date().toISOString(),
    }

    const validation = validateExpense(nextExpense)
    if (validation.error) {
      setValidationError(validation.error)
      return
    }

    try {
      if (isEditing) {
        // Local update first
        updateExpense(expense!.id, nextExpense)
        // Then sync to Firebase
        await updateExpenseRecord(expense!.id, nextExpense)
      } else {
        // Local add first
        addExpense(nextExpense)
        // Then sync to Firebase
        await createExpense(nextExpense)
      }

      handleOpenChange(false)
      resetForm()
    } catch (error) {
      console.error('Failed to save expense:', error)
      setValidationError('Failed to save expense')
    }
  }

  const canSaveExpense =
    description.trim().length > 0 &&
    amountPaise > 0 &&
    paidBy.length > 0 &&
    participants.length > 0 &&
    !isLoading

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      {!isEditing && (
        <DialogTrigger
          render={
            <Button>
              <Plus />
              Add expense
            </Button>
          }
        />
      )}

      <DialogContent className="p-6">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? 'Edit expense' : 'Add expense'}
          </DialogTitle>

          <DialogDescription>
            {isEditing
              ? 'Update the details of this expense.'
              : 'Add something your group spent money on.'}
          </DialogDescription>
        </DialogHeader>

        {validationError && (
          <div className="flex gap-3 rounded-lg bg-red-50 p-3 border border-red-200">
            <AlertCircle className="size-5 text-red-600 shrink-0 mt-0.5" />
            <p className="text-sm text-red-800">{validationError}</p>
          </div>
        )}

        <div className="space-y-5 py-10">
          <Field>
            <Label htmlFor="expense-description">What was it for?</Label>

            <input
              id="expense-description"
              name="description"
              type="text"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Dinner"
              autoComplete="off"
              required
              className={`h-11 rounded-lg border px-3 ${inputClass}`}
            />
          </Field>

          <Field>
            <Label htmlFor="expense-amount">Amount</Label>

            <div className="h-11 rounded-lg border flex items-center">
              <span className="pl-3 text-muted-foreground">₹</span>
              <input
                id="expense-amount"
                name="amount"
                type="number"
                min="0"
                step="0.01"
                inputMode="decimal"
                value={amount}
                onChange={(event) => setAmount(event.target.value)}
                placeholder="4000"
                required
                className={inputClass}
              />
            </div>
          </Field>

          <Field>
            <Label htmlFor="expense-paid-by">Paid by</Label>

            <Select
              value={paidBy}
              onValueChange={(value) => {
                if (value) {
                  setPaidBy(value)
                }
              }}
            >
              <SelectTrigger
                id="expense-paid-by"
                className="h-11 w-full rounded-lg"
              >
                <SelectValue placeholder="Who paid?" />
              </SelectTrigger>

              <SelectContent>
                {group.members.map((member) => (
                  <SelectItem key={member.id} value={member.id}>
                    {member.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>

          <Field>
            <div>
              <Label>Split between</Label>

              <p className="mt-1 text-sm text-muted-foreground">
                Select everyone sharing the expense.
              </p>
            </div>

            <div className="divide-y">
              {group.members.map((member) => {
                const checked = participants.includes(member.id)

                return (
                  <Label
                    key={member.id}
                    htmlFor={`participant-${member.id}`}
                    className="flex cursor-pointer items-center justify-between py-3 font-normal"
                  >
                    <span className="text-sm">{member.name}</span>

                    <Checkbox
                      id={`participant-${member.id}`}
                      checked={checked}
                      onCheckedChange={(value) =>
                        toggleParticipant(member.id, value === true)
                      }
                    />
                  </Label>
                )
              })}
            </div>

            {participants.length > 0 && amountPaise > 0 && (
              <p className="text-sm text-muted-foreground">
                {formatMoney(sharePaise)} each
              </p>
            )}
          </Field>
        </div>

        <div>
          <Button
            type="button"
            className="w-full sm:w-auto"
            disabled={!canSaveExpense}
            onClick={handleSaveExpense}
          >
            {isLoading && <Loader className="mr-2 size-4 animate-spin" />}
            {isEditing ? 'Save changes' : 'Add expense'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
