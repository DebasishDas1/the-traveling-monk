import { Wallet } from 'lucide-react'

import { Container, Heading } from '@/components/common'
import { CreateGroupDialog } from '@/components/splitmate/CreateGroupDialog'
import { SplitMateWorkspace } from '@/components/splitmate/SplitMateWorkspace'

export default function SplitMatePage() {
  return (
    <main>
      <Container className="pt-10">
        <div className="flex items-center">
          <Wallet className="size-16 pr-4" strokeWidth={1.7} />

          <Heading title="SplitMate" size="h1" />
        </div>

        <p className="text-lg text-muted-foreground">
          Split the bill. Keep the trip moving.
        </p>

        <div className="mt-10">
          <CreateGroupDialog />
        </div>

        <SplitMateWorkspace />
      </Container>
    </main>
  )
}
