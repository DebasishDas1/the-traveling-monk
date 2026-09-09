'use client'

import { useState } from 'react'
import { ArrowRight, Plus, User, X } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Field } from '@/components/ui/field'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

import { useSplitMateStore } from '@/store/splitmate.store'
import type { SplitMateMember } from '@/types/splitmate'

export function CreateGroupDialog() {
  const [open, setOpen] = useState(false)
  const [groupName, setGroupName] = useState('')
  const [creatorName, setCreatorName] = useState('')
  const [members, setMembers] = useState<SplitMateMember[]>([])
  const [memberName, setMemberName] = useState('')

  const setGroup = useSplitMateStore((state) => state.setGroup)

  const canContinue =
    groupName.trim().length > 0 && creatorName.trim().length > 0

  const addMember = () => {
    const name = memberName.trim()

    if (!name) return

    setMembers((current) => [
      ...current,
      {
        id: crypto.randomUUID(),
        name,
      },
    ])

    setMemberName('')
  }

  const removeMember = (id: string) => {
    setMembers((current) => current.filter((member) => member.id !== id))
  }

  const resetForm = () => {
    setGroupName('')
    setCreatorName('')
    setMembers([])
    setMemberName('')
  }

  const handleCreate = () => {
    if (!canContinue) return

    setGroup({
      id: crypto.randomUUID(),
      name: groupName.trim(),
      members: [
        {
          id: crypto.randomUUID(),
          name: creatorName.trim(),
        },
        ...members,
      ],
    })

    setOpen(false)
  }

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen)

    if (!nextOpen) {
      resetForm()
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger
        render={
          <Button>
            <Plus />
            Create a group
          </Button>
        }
      />

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a group</DialogTitle>

          <DialogDescription>
            Start a SplitMate group for your trip.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <Field>
            <label
              htmlFor="group-name"
              className="mb-2 block text-sm font-medium"
            >
              Trip name
            </label>

            <InputGroup className="h-12 rounded-xl">
              <InputGroupInput
                id="group-name"
                name="group-name"
                type="text"
                value={groupName}
                onChange={(event) => setGroupName(event.target.value)}
                placeholder="Manali 2026"
                autoComplete="off"
                required
                className="px-3 text-base"
              />
            </InputGroup>
          </Field>

          <Field>
            <label
              htmlFor="creator-name"
              className="mb-2 block text-sm font-medium"
            >
              Your name
            </label>

            <InputGroup className="h-12 rounded-xl">
              <InputGroupAddon className="pl-4 text-muted-foreground">
                <User className="size-4" aria-hidden="true" />
              </InputGroupAddon>

              <InputGroupInput
                id="creator-name"
                name="creator-name"
                type="text"
                value={creatorName}
                onChange={(event) => setCreatorName(event.target.value)}
                placeholder="Deba"
                autoComplete="name"
                required
                className="text-base"
              />
            </InputGroup>
          </Field>

          <div className="space-y-3">
            <div>
              <p className="text-sm font-medium">Your crew</p>

              <p className="mt-1 text-sm text-muted-foreground">
                Add everyone sharing expenses.
              </p>
            </div>

            <div className="flex gap-2">
              <InputGroup className="h-12 min-w-0 flex-1 rounded-xl">
                <InputGroupInput
                  value={memberName}
                  onChange={(event) => setMemberName(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                      event.preventDefault()
                      addMember()
                    }
                  }}
                  placeholder="Friend's name"
                  autoComplete="off"
                  className="text-base"
                />
              </InputGroup>

              <Button
                type="button"
                variant="secondary"
                onClick={addMember}
                disabled={!memberName.trim()}
                className="h-12 shrink-0 rounded-xl px-4"
              >
                <Plus />
                Add
              </Button>
            </div>

            {members.length > 0 && (
              <div className="divide-y divide-border rounded-xl border border-border">
                {members.map((member) => (
                  <div
                    key={member.id}
                    className="flex items-center justify-between px-3 py-2"
                  >
                    <span className="text-sm">{member.name}</span>

                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="size-7 text-muted-foreground"
                      onClick={() => removeMember(member.id)}
                      aria-label={`Remove ${member.name}`}
                    >
                      <X className="size-3.5" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <DialogFooter className="pt-2">
          <Button
            className="w-full rounded-xl sm:w-auto"
            disabled={!canContinue}
            onClick={handleCreate}
          >
            Continue
            <ArrowRight />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
