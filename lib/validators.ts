import { z } from 'zod'

export const MemberSchema = z.object({
  id: z.string().uuid('Invalid member ID'),
  name: z
    .string()
    .min(1, 'Name is required')
    .max(50, 'Name must be less than 50 characters')
    .regex(
      /^[a-zA-Z\s'-]+$/,
      'Name can only contain letters, spaces, hyphens, and apostrophes'
    ),
})

export const GroupSchema = z.object({
  id: z.string().uuid(),
  name: z
    .string()
    .min(1, 'Trip name is required')
    .max(100, 'Trip name must be less than 100 characters'),
  members: z.array(MemberSchema).min(1, 'At least 1 member required'),
})

export const ExpenseSchema = z.object({
  id: z.string().uuid(),
  description: z
    .string()
    .min(1, 'Description is required')
    .max(100, 'Description must be less than 100 characters'),
  amountPaise: z
    .number()
    .int('Amount must be in paise')
    .positive('Amount must be greater than 0')
    .max(999999999, 'Amount too large'),
  currency: z.literal('INR'),
  paidBy: z.string().uuid('Invalid payer'),
  participants: z
    .array(z.string().uuid())
    .min(1, 'At least 1 participant required'),
  splitType: z.enum(['equal', 'exact', 'percentage', 'shares']),
  createdAt: z.string().datetime(),
})

export const SettlementSchema = z.object({
  id: z.string().uuid(),
  from: z.string().uuid(),
  to: z.string().uuid(),
  amountPaise: z.number().int().positive(),
  paid: z.boolean(),
  createdAt: z.string().datetime(),
})

export type ValidatedExpense = z.infer<typeof ExpenseSchema>
export type ValidatedGroup = z.infer<typeof GroupSchema>
export type ValidatedSettlement = z.infer<typeof SettlementSchema>

// Safe validation helpers
export function validateExpense(data: unknown) {
  try {
    return { data: ExpenseSchema.parse(data), error: null }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        data: null,
        error: error.issues[0]?.message || 'Validation failed',
      }
    }

    return {
      data: null,
      error: 'Unknown error',
    }
  }
}

export function validateGroup(data: unknown) {
  try {
    return { data: GroupSchema.parse(data), error: null }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        data: null,
        error: error.issues[0]?.message || 'Validation failed',
      }
    }

    return {
      data: null,
      error: 'Unknown error',
    }
  }
}

export function validateSettlement(data: unknown) {
  try {
    return { data: SettlementSchema.parse(data), error: null }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        data: null,
        error: error.issues[0]?.message || 'Validation failed',
      }
    }

    return {
      data: null,
      error: 'Unknown error',
    }
  }
}
