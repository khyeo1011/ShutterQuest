"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getCompletedQuests } from "@/utils/api"
import { useRouter } from "next/navigation"
import { use, useState } from "react"

export default function QuestDetailsPage({ params }: { params: Promise<{ questId: string }> }) {
  const router = useRouter()
  const { questId } = use(params)
  
  const quest = getCompletedQuests("testUserId").find(q => q.questId === questId)

  if (!quest) {
    return (
      <main className="min-h-screen bg-background px-4 py-6">
        <div className="mx-auto max-w-md">
          <h1 className="mb-6 text-2xl font-bold text-foreground">Quest Not Found</h1>
          <Button onClick={() => router.push("/pending")}>
            Back to Pending Quests
          </Button>
        </div> 
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background px-4 py-6">
      <div className="mx-auto max-w-md">
        <Button 
          variant="ghost" 
          className="mb-4"
          onClick={() => router.push("/pending")}
        >
          ← Back
        </Button>

        <Card>
          <CardHeader>
            <CardTitle>Prompt: {quest.prompt}</CardTitle>
            <CardDescription>Completed quest!</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="pt-4 flex flex-col items-center space-y-4">
                Complete!
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}