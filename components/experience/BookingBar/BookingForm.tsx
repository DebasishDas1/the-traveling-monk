// components/experience/BookingBar/BookingForm.tsx
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface BookingFormProps {
  name: string
  phone: string
  onNameChange: (name: string) => void
  onPhoneChange: (phone: string) => void
  disabled?: boolean
}

export function BookingForm({
  name,
  phone,
  onNameChange,
  onPhoneChange,
  disabled = false,
}: BookingFormProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Full Name</Label>
        <Input
          id="name"
          placeholder="John Doe"
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
          disabled={disabled}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="phone">Phone Number</Label>
        <Input
          id="phone"
          type="tel"
          placeholder="+1 (555) 000-0000"
          value={phone}
          onChange={(e) => onPhoneChange(e.target.value)}
          disabled={disabled}
          required
        />
      </div>
    </div>
  )
}
