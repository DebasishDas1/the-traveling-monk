'use client'

import { useEffect, useCallback, useRef, useState } from 'react'
import { firebaseService } from '@/lib/firebase/service'
import { useSplitMateStore } from '@/store/splitmate.store'
import { useNotificationStore } from '@/store/notifications'
import type { SplitMateExpense, SplitMateGroup } from '@/types/splitmate'

// === REAL-TIME SYNC HOOK ===

export function useFirebaseSync(groupId: string | null) {
  const setGroup = useSplitMateStore((state) => state.setGroup)
  const addExpense = useSplitMateStore((state) => state.addExpense)
  const updateExpense = useSplitMateStore((state) => state.updateExpense)
  const removeExpense = useSplitMateStore((state) => state.removeExpense)
  const expenses = useSplitMateStore((state) => state.expenses)

  const unsubscribersRef = useRef<Array<() => void>>([])
  const addToast = useNotificationStore((state) => state.addToast)
  const [isConnected, setIsConnected] = useState(true)
  const [syncError, setSyncError] = useState<Error | null>(null)


  // Listen to group changes
  useEffect(() => {
    if (!groupId) return

    try {
      const unsubscribe = firebaseService.onGroupChanges(
        groupId,
        (remoteGroup) => {
          if (remoteGroup) {
            setGroup(remoteGroup)
            setIsConnected(true)
          }
        }
      )

      unsubscribersRef.current.push(unsubscribe)

      return () => unsubscribe()
    } catch (error) {
      console.error('Failed to sync group:', error)
      setSyncError(error as Error)
    }
  }, [groupId, setGroup, addToast])

  // Listen to expenses changes
  useEffect(() => {
    if (!groupId) return

    try {
      const unsubscribe = firebaseService.onExpensesChanges(
        groupId,
        (remoteExpenses) => {
          const localIds = new Set(expenses.map((e) => e.id))
          const remoteIds = new Set(remoteExpenses.map((e) => e.id))

          // Add new remote expenses
          remoteExpenses.forEach((expense) => {
            if (!localIds.has(expense.id)) {
              addExpense(expense)
            } else {
              const local = expenses.find((e) => e.id === expense.id)
              if (local && local.updatedAt !== expense.updatedAt) {
                updateExpense(expense.id, expense)
              }
            }
          })

          // Remove locally deleted
          expenses.forEach((expense) => {
            if (!remoteIds.has(expense.id)) {
              removeExpense(expense.id)
            }
          })

          setIsConnected(true)
        }
      )

      unsubscribersRef.current.push(unsubscribe)

      return () => unsubscribe()
    } catch (error) {
      console.error('Failed to sync expenses:', error)
      setSyncError(error as Error)
    }
  }, [groupId, expenses, addExpense, updateExpense, removeExpense])



   // Handle sync errors and update connection state
   useEffect(() => {
     if (syncError) {
       setIsConnected(false)
       addToast({
         message: 'Sync disconnected - working offline',
         type: 'warning',
       })
     }
   }, [syncError, addToast])

  useEffect(() => {
    return () => {
      unsubscribersRef.current.forEach((unsubscribe) => unsubscribe())
    }
  }, [])

  return { isConnected, syncError }
}

export function useFirebaseGroupOperations() {
  const addToast = useNotificationStore((state) => state.addToast)
  const [isLoading, setIsLoading] = useState(false)

  const createGroup = useCallback(
    async (group: SplitMateGroup) => {
      setIsLoading(true)
      try {
        const result = await firebaseService.createGroup(group)
        addToast({
          message: 'Group created successfully',
          type: 'success',
        })
        return result
      } catch (error) {
        const isPermissionDenied =
          error instanceof Error &&
          (error.message.includes('PERMISSION_DENIED') ||
            error.message.includes('auth/configuration-not-found'))

        if (isPermissionDenied) {
          addToast({
            message: 'Group saved locally. Firebase sync is unavailable.',
            type: 'warning',
          })
          return group
        }

        const msg =
          error instanceof Error ? error.message : 'Failed to create group'
        addToast({ message: msg, type: 'error' })
        throw error
      } finally {
        setIsLoading(false)
      }
    },
    [addToast]
  )

  const updateGroup = useCallback(
    async (groupId: string, updates: Partial<SplitMateGroup>) => {
      setIsLoading(true)
      try {
        await firebaseService.updateGroup(groupId, updates)
        addToast({
          message: 'Group updated',
          type: 'success',
          duration: 2000,
        })
      } catch (error) {
        const msg = error instanceof Error ? error.message : 'Failed to update'
        addToast({ message: msg, type: 'error' })
        throw error
      } finally {
        setIsLoading(false)
      }
    },
    [addToast]
  )

  const deleteGroup = useCallback(
    async (groupId: string) => {
      setIsLoading(true)
      try {
        await firebaseService.deleteGroup(groupId)
        addToast({
          message: 'Group deleted',
          type: 'success',
        })
      } catch (error) {
        const msg = error instanceof Error ? error.message : 'Failed to delete'
        addToast({ message: msg, type: 'error' })
        throw error
      } finally {
        setIsLoading(false)
      }
    },
    [addToast]
  )

  return { createGroup, updateGroup, deleteGroup, isLoading }
}

// === EXPENSE OPERATIONS HOOK ===

export function useFirebaseExpenseOperations() {
  const group = useSplitMateStore((state) => state.group)
  const addToast = useNotificationStore((state) => state.addToast)
  const [isLoading, setIsLoading] = useState(false)

  const createExpense = useCallback(
    async (expense: SplitMateExpense) => {
      if (!group) {
        addToast({ message: 'No group selected', type: 'error' })
        return
      }

      setIsLoading(true)
      try {
        const result = await firebaseService.createExpense(group.id, expense)
        addToast({
          message: 'Expense added',
          type: 'success',
          duration: 2000,
        })
        return result
      } catch (error) {
        const isOfflineOnly =
          error instanceof Error &&
          (error.message.includes('PERMISSION_DENIED') ||
            error.message.includes('auth/configuration-not-found'))

        if (isOfflineOnly) {
          addToast({
            message: 'Expense saved locally. Firebase sync is unavailable.',
            type: 'warning',
            duration: 2000,
          })
          return expense
        }

        const msg =
          error instanceof Error ? error.message : 'Failed to add expense'
        addToast({ message: msg, type: 'error' })
        throw error
      } finally {
        setIsLoading(false)
      }
    },
    [group, addToast]
  )

  const updateExpenseRecord = useCallback(
    async (expenseId: string, updates: Partial<SplitMateExpense>) => {
      if (!group) return

      setIsLoading(true)
      try {
        await firebaseService.updateExpense(group.id, expenseId, updates)
        addToast({
          message: 'Expense updated',
          type: 'success',
          duration: 2000,
        })
      } catch (error) {
        const msg = error instanceof Error ? error.message : 'Failed to update'
        addToast({ message: msg, type: 'error' })
        throw error
      } finally {
        setIsLoading(false)
      }
    },
    [group, addToast]
  )

  const deleteExpenseRecord = useCallback(
    async (expenseId: string) => {
      if (!group) return

      setIsLoading(true)
      try {
        await firebaseService.deleteExpense(group.id, expenseId)
        addToast({
          message: 'Expense deleted',
          type: 'success',
          duration: 2000,
        })
      } catch (error) {
        const msg = error instanceof Error ? error.message : 'Failed to delete'
        addToast({ message: msg, type: 'error' })
        throw error
      } finally {
        setIsLoading(false)
      }
    },
    [group, addToast]
  )

  return { createExpense, updateExpenseRecord, deleteExpenseRecord, isLoading }
}

// === SETTLEMENT OPERATIONS HOOK ===

export function useFirebaseSettlementOperations() {
  const group = useSplitMateStore((state) => state.group)
  const markSettlementPaid = useSplitMateStore(
    (state) => state.markSettlementPaid
  )
  const addToast = useNotificationStore((state) => state.addToast)
  const [isLoading, setIsLoading] = useState(false)

  const markPaid = useCallback(
    async (settlementId: string) => {
      if (!group) return

      setIsLoading(true)
      try {
        await firebaseService.markSettlementPaid(group.id, settlementId)
        markSettlementPaid(settlementId)
        addToast({
          message: 'Settlement marked as paid',
          type: 'success',
          duration: 2000,
        })
      } catch (error) {
        const msg =
          error instanceof Error ? error.message : 'Failed to mark paid'
        addToast({ message: msg, type: 'error' })
        throw error
      } finally {
        setIsLoading(false)
      }
    },
    [group, markSettlementPaid, addToast]
  )

  return { markPaid, isLoading }
}
