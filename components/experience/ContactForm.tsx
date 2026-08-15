'use client'

import { useRef, useState } from 'react'
import { Check, Loader2, Mail, Phone, Send, User } from 'lucide-react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Field, FieldGroup } from '@/components/ui/field'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupTextarea,
} from '@/components/ui/input-group'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { enquiryTypes } from '@/lib/data/contact-page'

const fieldClass = 'h-16 rounded-full border-0 bg-primary/10 shadow-none'

const inputClass =
  'h-16 border-0 bg-transparent text-base shadow-none outline-none focus-visible:border-0 focus-visible:ring-0'

const selectClass =
  'h-16 min-h-16 w-full rounded-full border-0 bg-primary/10 px-5 text-base shadow-none outline-none focus:border-0 focus:ring-0 focus-visible:border-0 focus-visible:ring-0'

const textareaGroupClass =
  'min-h-36 rounded-2xl border-0 bg-primary/10 shadow-none'

const textareaClass =
  'min-h-36 resize-none border-0 bg-transparent px-3 py-3 text-base shadow-none outline-none focus-visible:border-0 focus-visible:ring-0'

export function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [enquiry, setEnquiry] = useState('')

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (isSubmitting) return

    const form = event.currentTarget

    if (!form.reportValidity()) return

    if (!enquiry) {
      toast.error('Please select what you need help with.')
      return
    }

    setIsSubmitting(true)

    try {
      const formData = new FormData(form)

      console.log(Object.fromEntries(formData))

      form.reset()
      setEnquiry('')

      toast.success('Message sent.', {
        description: "Thanks for reaching out. We'll be in touch soon.",
        icon: <Check className="size-4" />,
      })
    } catch {
      toast.error('Something went wrong.', {
        description: 'Please try again in a moment.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  function handleClear() {
    if (isSubmitting) return

    formRef.current?.reset()
    setEnquiry('')
  }

  return (
    <form
      ref={formRef}
      id="contact-form"
      onSubmit={handleSubmit}
      aria-busy={isSubmitting}
      className="w-full rounded-2xl border p-5 sm:p-7 bg-white"
    >
      <FieldGroup className="gap-3">
        {/* Name */}
        <Field>
          <InputGroup className={fieldClass}>
            <InputGroupAddon className="pl-5 text-muted-foreground">
              <User className="size-4" aria-hidden="true" />
            </InputGroupAddon>

            <InputGroupInput
              id="name"
              name="name"
              type="text"
              placeholder="Name"
              autoComplete="name"
              required
              className={inputClass}
            />
          </InputGroup>
        </Field>

        {/* Email */}
        <Field>
          <InputGroup className={fieldClass}>
            <InputGroupAddon className="pl-5 text-muted-foreground">
              <Mail className="size-4" aria-hidden="true" />
            </InputGroupAddon>

            <InputGroupInput
              id="email"
              name="email"
              type="email"
              placeholder="Email"
              autoComplete="email"
              required
              className={inputClass}
            />
          </InputGroup>
        </Field>

        {/* Phone */}
        <Field>
          <InputGroup className={fieldClass}>
            <InputGroupAddon className="pl-5 text-muted-foreground">
              <Phone className="size-4" aria-hidden="true" />
            </InputGroupAddon>

            <InputGroupInput
              id="phone"
              name="phone"
              type="tel"
              placeholder="Phone"
              autoComplete="tel"
              inputMode="tel"
              className={inputClass}
            />
          </InputGroup>
        </Field>

        {/* Enquiry */}
        <Field>
          <Select
            value={enquiry}
            onValueChange={(value) => setEnquiry(value ?? '')}
          >
            <SelectTrigger
              aria-label="What can we help with?"
              className={selectClass}
            >
              <SelectValue placeholder="What can we help with?" />
            </SelectTrigger>

            <SelectContent className="bg-background p-1">
              {enquiryTypes.map(({ value, label }) => (
                <SelectItem key={value} value={value} className="p-2">
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <input type="hidden" name="enquiry" value={enquiry} />
        </Field>

        {/* Message */}
        <Field>
          <InputGroup className={textareaGroupClass}>
            <InputGroupTextarea
              id="message"
              name="message"
              placeholder="Tell us what's on your mind..."
              required
              className={textareaClass}
            />
          </InputGroup>
        </Field>

        {/* Actions */}
        <div className="flex items-center gap-2 pt-2">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="h-12 rounded-full px-6 text-base font-medium shadow-none hover:bg-primary focus-visible:ring-0"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                Sending
              </>
            ) : (
              <>
                <Send className="size-4" aria-hidden="true" />
                Send message
              </>
            )}
          </Button>

          <Button
            type="button"
            variant="outline"
            onClick={handleClear}
            disabled={isSubmitting}
            className="h-12 rounded-full px-5 text-base text-muted-foreground shadow-none hover:bg-transparent hover:text-muted-foreground focus-visible:ring-0"
          >
            Clear
          </Button>
        </div>

        <p className="pt-1 text-xs text-muted-foreground">
          Usually replies within one working day.
        </p>
      </FieldGroup>
    </form>
  )
}
