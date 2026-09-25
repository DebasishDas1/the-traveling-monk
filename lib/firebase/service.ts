import {
  ref,
  set,
  get,
  update,
  remove,
  onValue,
  Unsubscribe,
} from 'firebase/database'
import { ensureFirebaseAuth, getFirebaseDb } from './client'
import type { SplitMateExpense, SplitMateGroup } from '@/types/monk-money'

export class FirebaseService {
  private get db() {
    return getFirebaseDb()
  }

  // === GROUP OPERATIONS ===

  async createGroup(group: SplitMateGroup): Promise<SplitMateGroup> {
    try {
      await ensureFirebaseAuth()
      const groupRef = ref(this.db, `groups/${group.id}`)
      const groupData = {
        ...group,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
      await set(groupRef, groupData)
      return groupData as SplitMateGroup
    } catch (error) {
      const isAuthUnavailable =
        error instanceof Error &&
        error.message.includes('auth/configuration-not-found')

      if (!isAuthUnavailable) {
        console.error('Failed to create group:', error)
      }
      throw error
    }
  }

  async getGroup(groupId: string): Promise<SplitMateGroup | null> {
    try {
      const groupRef = ref(this.db, `groups/${groupId}`)
      const snapshot = await get(groupRef)
      return snapshot.exists() ? (snapshot.val() as SplitMateGroup) : null
    } catch (error) {
      console.error('Failed to get group:', error)
      throw error
    }
  }

  async updateGroup(
    groupId: string,
    updates: Partial<SplitMateGroup>
  ): Promise<void> {
    try {
      const groupRef = ref(this.db, `groups/${groupId}`)
      await update(groupRef, {
        ...updates,
        updatedAt: new Date().toISOString(),
      })
    } catch (error) {
      console.error('Failed to update group:', error)
      throw error
    }
  }

  async deleteGroup(groupId: string): Promise<void> {
    try {
      const groupRef = ref(this.db, `groups/${groupId}`)
      await remove(groupRef)
    } catch (error) {
      console.error('Failed to delete group:', error)
      throw error
    }
  }

  // === EXPENSE OPERATIONS ===

  async createExpense(
    groupId: string,
    expense: SplitMateExpense
  ): Promise<SplitMateExpense> {
    try {
      const expenseRef = ref(
        this.db,
        `groups/${groupId}/expenses/${expense.id}`
      )
      const expenseData = {
        ...expense,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
      await set(expenseRef, expenseData)
      return expenseData as SplitMateExpense
    } catch (error) {
      const isExpectedOfflineError =
        error instanceof Error &&
        (error.message.includes('PERMISSION_DENIED') ||
          error.message.includes('auth/configuration-not-found'))

      if (!isExpectedOfflineError) {
        console.error('Failed to create expense:', error)
      }
      throw error
    }
  }

  async getExpensesByGroup(groupId: string): Promise<SplitMateExpense[]> {
    try {
      const expensesRef = ref(this.db, `groups/${groupId}/expenses`)
      const snapshot = await get(expensesRef)
      if (!snapshot.exists()) return []

      const data = snapshot.val()
      return Object.values(data) as SplitMateExpense[]
    } catch (error) {
      console.error('Failed to get expenses:', error)
      throw error
    }
  }

  async updateExpense(
    groupId: string,
    expenseId: string,
    updates: Partial<SplitMateExpense>
  ): Promise<void> {
    try {
      const expenseRef = ref(this.db, `groups/${groupId}/expenses/${expenseId}`)
      await update(expenseRef, {
        ...updates,
        updatedAt: new Date().toISOString(),
      })
    } catch (error) {
      console.error('Failed to update expense:', error)
      throw error
    }
  }

  async deleteExpense(groupId: string, expenseId: string): Promise<void> {
    try {
      const expenseRef = ref(this.db, `groups/${groupId}/expenses/${expenseId}`)
      await remove(expenseRef)
    } catch (error) {
      console.error('Failed to delete expense:', error)
      throw error
    }
  }

  // === SETTLEMENT OPERATIONS ===

  async markSettlementPaid(
    groupId: string,
    settlementId: string
  ): Promise<void> {
    try {
      const settlementRef = ref(
        this.db,
        `groups/${groupId}/settlements/${settlementId}`
      )
      await update(settlementRef, {
        paid: true,
        paidAt: new Date().toISOString(),
      })
    } catch (error) {
      console.error('Failed to mark settlement paid:', error)
      throw error
    }
  }

  // === REAL-TIME LISTENERS ===

  onGroupChanges(
    groupId: string,
    callback: (group: SplitMateGroup | null) => void
  ): Unsubscribe {
    try {
      const groupRef = ref(this.db, `groups/${groupId}`)
      return onValue(
        groupRef,
        (snapshot) => {
          callback(
            snapshot.exists() ? (snapshot.val() as SplitMateGroup) : null
          )
        },
        (error) => {
          console.error('Error listening to group changes:', error)
          callback(null)
        }
      )
    } catch (error) {
      console.error('Failed to listen to group:', error)
      throw error
    }
  }

  onExpensesChanges(
    groupId: string,
    callback: (expenses: SplitMateExpense[]) => void
  ): Unsubscribe {
    try {
      const expensesRef = ref(this.db, `groups/${groupId}/expenses`)
      return onValue(
        expensesRef,
        (snapshot) => {
          if (!snapshot.exists()) {
            callback([])
            return
          }
          const data = snapshot.val()
          const expenses = Object.values(data) as SplitMateExpense[]
          callback(expenses)
        },
        (error) => {
          console.error('Error listening to expenses changes:', error)
          callback([])
        }
      )
    } catch (error) {
      console.error('Failed to listen to expenses:', error)
      throw error
    }
  }
}

export const firebaseService = new FirebaseService()
