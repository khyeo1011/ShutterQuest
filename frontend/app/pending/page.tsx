"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getPendingQuests } from "@/utils/api"
import { useRouter } from "next/navigation"

const pendingQuests = getPendingQuests("testUserId")

export default function PendingPage() {
  const router = useRouter()

  const handleQuestClick = (questId: string) => {
    router.push(`/pending/${questId}`)
  }

  return (
    <main className="min-h-screen bg-background px-4 py-6">
      <div className="mx-auto max-w-md">
        <Button 
          variant="ghost" 
          className="mb-4"
          onClick={() => router.push("/")}
        >
          ← Back
        </Button>

        <Card>
          <CardHeader>
            <CardTitle>Pending Quests</CardTitle>
            <CardDescription>Select a quest to view details</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-3">
              {pendingQuests.map((quest) => (
                <Button
                  key={quest.questId}
                  variant="outline"
                  className="w-full justify-start text-left bg-transparent"
                  onClick={() => handleQuestClick(quest.questId)}
                >
                  {quest.hostId}
                </Button>
              ))}

              {pendingQuests.length === 0 && (
                <p className="text-center text-muted-foreground">No pending quests available</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}