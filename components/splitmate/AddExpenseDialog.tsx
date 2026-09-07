'use client'

import { useState } from 'react'
import { Plus } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Field } from '@/components/ui/field'
import { Label } from '@/components/ui/label'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group'
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

import { useSplitMateStore } from '@/store/splitmate.store'
import type { SplitMateExpense } from '@/types/splitmate'

import { formatMoney, rupeesToPaise } from './money'

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

  const [internalOpen, setInternalOpen] = useState(false)

  const [description, setDescription] = useState(expense?.description ?? '')

  const [amount, setAmount] = useState(
    expense ? (expense.amountPaise / 100).toFixed(2) : ''
  )

  const [paidBy, setPaidBy] = useState(expense?.paidBy ?? '')

  const [participants, setParticipants] = useState<string[]>(
    expense?.participants ?? []
  )

  const isEditing = Boolean(expense)

  const open = controlledOpen ?? internalOpen

  const amountPaise = rupeesToPaise(amount)

  const canSaveExpense =
    description.trim().length > 0 &&
    amountPaise > 0 &&
    paidBy.length > 0 &&
    participants.length > 0

  const sharePaise =
    participants.length > 0 ? Math.floor(amountPaise / participants.length) : 0

  if (!group) {
    return null
  }

  const resetForm = () => {
    setDescription('')
    setAmount('')
    setPaidBy('')
    setParticipants([])
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

  const handleSaveExpense = () => {
    if (!canSaveExpense) return

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

    if (expense) {
      updateExpense(expense.id, nextExpense)
    } else {
      addExpense(nextExpense)
    }

    handleOpenChange(false)
    resetForm()
  }

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

        <div className="space-y-5 py-10">
          <Field>
            <Label htmlFor="expense-description">What was it for?</Label>

            <InputGroup className="h-11 rounded-lg">
              <InputGroupInput
                id="expense-description"
                name="description"
                type="text"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                placeholder="Dinner"
                autoComplete="off"
                required
                className={inputClass}
              />
            </InputGroup>
          </Field>

          <Field>
            <Label htmlFor="expense-amount">Amount</Label>

            <InputGroup className="h-11 rounded-lg">
              <InputGroupAddon className="pl-3 text-muted-foreground">
                ₹
              </InputGroupAddon>

              <InputGroupInput
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
            </InputGroup>
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
            {isEditing ? 'Save changes' : 'Add expense'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
