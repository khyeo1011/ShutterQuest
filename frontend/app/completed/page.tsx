"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getCompletedQuests } from "@/utils/api"
import { useRouter } from "next/navigation"

const completedQuests = getCompletedQuests("testUserId")

export default function CompletedPage() {
  const router = useRouter()

  const handleQuestClick = (questId: string) => {
    router.push(`/completed/${questId}`)
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
            <CardTitle>Completed Quests</CardTitle>
            <CardDescription>View your completed quests</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-3">
              {completedQuests.map((quest) => (
                <Button
                  key={quest.questId}
                  variant="outline"
                  className="w-full justify-start text-left bg-transparent"
                  onClick={() => handleQuestClick(quest.questId)}
                >
                  {quest.hostId}
                </Button>
              ))}

              {completedQuests.length === 0 && (
                <p className="text-center text-muted-foreground">No completed quests available</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}