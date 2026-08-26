'use client'

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
} from 'react'
import { ChevronRight, ImagePlus, X } from 'lucide-react'
import { toast } from 'sonner'

import { uploadTrekPhoto } from '@/lib/vercel-blob'
import { generateBadge } from '@/lib/badge-generator'

import { Button } from '@/components/ui/button'
import { Field, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'

import type { Trek } from '@/types/experience'
import { Media } from '../common'
import { SocialShare } from './SocialShare'

interface CompletionFlowProps {
  trek: Trek
}

type Step = 'upload' | 'share'

const MAX_FILE_SIZE = 10 * 1024 * 1024

function getLocalDate() {
  const date = new Date()

  return [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, '0'),
    String(date.getDate()).padStart(2, '0'),
  ].join('-')
}

export function CompletionFlow({ trek }: CompletionFlowProps) {
  const [step, setStep] = useState<Step>('upload')
  const [file, setFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState('')
  const [completionDate, setCompletionDate] = useState(getLocalDate())
  const [quote, setQuote] = useState('')
  const [isUploading, setIsUploading] = useState(false)
  const [uploadedImageUrl, setUploadedImageUrl] = useState('')
  const [badgeUrl, setBadgeUrl] = useState('')

  const previewUrlRef = useRef<string | null>(null)

  useEffect(() => {
    return () => {
      if (previewUrlRef.current) {
        URL.revokeObjectURL(previewUrlRef.current)
      }
    }
  }, [])

  const handleFileChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const selectedFile = event.target.files?.[0]

      if (!selectedFile) return

      if (!selectedFile.type.startsWith('image/')) {
        toast.error('Please choose an image.')
        event.target.value = ''
        return
      }

      if (selectedFile.size > MAX_FILE_SIZE) {
        toast.error('Image must be smaller than 10 MB.')
        event.target.value = ''
        return
      }

      if (previewUrlRef.current) {
        URL.revokeObjectURL(previewUrlRef.current)
      }

      const url = URL.createObjectURL(selectedFile)

      previewUrlRef.current = url

      setFile(selectedFile)
      setPreviewUrl(url)
    },
    []
  )

  const removeFile = useCallback(() => {
    if (previewUrlRef.current) {
      URL.revokeObjectURL(previewUrlRef.current)
      previewUrlRef.current = null
    }

    setFile(null)
    setPreviewUrl('')
  }, [])

  const handleUpload = useCallback(async () => {
    if (!file || isUploading) return

    setIsUploading(true)

    try {
      const [photoUrl, badge] = await Promise.all([
        uploadTrekPhoto(file),
        generateBadge(trek.title, completionDate, trek.difficulty),
      ])

      setUploadedImageUrl(photoUrl)
      setBadgeUrl(badge)
      setStep('share')

      toast.success('Trek completion recorded')
    } catch (error) {
      console.error('Failed to upload trek completion:', error)
      toast.error("Couldn't upload your photo. Please try again.")
    } finally {
      setIsUploading(false)
    }
  }, [file, isUploading, trek.title, trek.difficulty, completionDate])

  const handleClose = useCallback(() => {
    setStep('upload')
    setFile(null)
    setPreviewUrl('')
    setQuote('')
    setUploadedImageUrl('')
    setBadgeUrl('')
    setCompletionDate(getLocalDate())
  }, [])

  return (
    <>
      <div className="space-y-8">
        {/* Photo */}
        <Field>
          {previewUrl ? (
            <div className="relative overflow-hidden rounded-xl border border-border">
              <div className="aspect-video">
                <Media
                  src={previewUrl}
                  alt="Selected trek"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>

              <Button
                type="button"
                size="icon"
                variant="secondary"
                onClick={removeFile}
                disabled={isUploading}
                aria-label="Remove photo"
                className="
                absolute right-3 top-3
                size-8 rounded-full
                border bg-background/90
                shadow-sm backdrop-blur-sm
                hover:bg-background
              "
              >
                <X className="size-4" />
              </Button>
            </div>
          ) : (
            <label className="group block cursor-pointer">
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp,image/heic"
                onChange={handleFileChange}
                className="sr-only"
              />

              <div
                className="
                flex aspect-16/8
                flex-col items-center justify-center
                rounded-xl
                border border-dashed border-border
                px-6
                transition-colors
                hover:border-foreground/30
                hover:bg-muted/30
              "
              >
                <ImagePlus
                  className="size-5 text-muted-foreground"
                  strokeWidth={1.5}
                />

                <p className="mt-3 text-sm font-medium">Add a photo</p>

                <p className="mt-1 text-xs text-muted-foreground">
                  JPG, PNG, WebP or HEIC · Max 10 MB
                </p>
              </div>
            </label>
          )}
        </Field>

        <Separator />

        {/* Details */}
        <div className="grid gap-5 sm:grid-cols-2">
          <Field>
            <FieldLabel htmlFor="completion-date">Completion date</FieldLabel>

            <Input
              id="completion-date"
              type="date"
              value={completionDate}
              onChange={(event) => setCompletionDate(event.target.value)}
              className="h-10 border-border bg-transparent"
            />
          </Field>

          <Field>
            <div className="flex items-center justify-between">
              <FieldLabel htmlFor="completion-quote">A thought</FieldLabel>

              <span className="text-xs tabular-nums text-muted-foreground">
                {quote.length}/100
              </span>
            </div>

            <Input
              id="completion-quote"
              value={quote}
              onChange={(event) => setQuote(event.target.value)}
              placeholder="Optional"
              maxLength={100}
              className="h-10 border-border bg-transparent"
            />
          </Field>
        </div>

        <div className="flex justify-end">
          <Button
            onClick={handleUpload}
            disabled={!file || isUploading}
            className="h-10 px-5"
          >
            {isUploading ? (
              <>
                <span className="mr-2 size-3.5 animate-spin rounded-full border-2 border-current/30 border-t-current" />
                Uploading…
              </>
            ) : (
              <>
                Continue
                <ChevronRight className="ml-1 size-4" />
              </>
            )}
          </Button>
        </div>
      </div>

      <SocialShare
        open={step === 'share' && !!uploadedImageUrl && !!badgeUrl}
        trek={trek}
        photoUrl={uploadedImageUrl}
        badgeUrl={badgeUrl}
        completionDate={completionDate}
        quote={quote}
        onClose={handleClose}
      />
    </>
  )
}
