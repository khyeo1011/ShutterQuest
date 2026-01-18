"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CameraButton } from "@/app/pending/[questId]/components/camera-button"
import { getPendingQuests, completeQuest } from "@/utils/api"
import { useRouter } from "next/navigation"
import { use, useState, useEffect } from "react"
import { Quest } from "@/types/types"
import { useAuth } from "@/contexts/AuthContext"

export default function QuestDetailsPage({ params }: { params: Promise<{ questId: string }> }) {
  const router = useRouter()
  const { questId } = use(params)
  const { userId } = useAuth()
  const [capturedImage, setCapturedImage] = useState<string | null>(null)
  const [quest, setQuest] = useState<Quest | null>(null)
  const [loading, setLoading] = useState(true)
  const [elapsedTime, setElapsedTime] = useState(0)
  const [submitting, setSubmitting] = useState(false)

  // Timer effect - starts when component mounts
  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedTime((prev) => prev + 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const fetchQuest = async () => {
      if (!userId) return
      
      try {
        const quests = await getPendingQuests(userId)
        const foundQuest = quests.find(q => q.questId === Number(questId))
        setQuest(foundQuest || null)
      } catch (error) {
        console.error("Failed to fetch quest:", error)
        setQuest(null)
      } finally {
        setLoading(false)
      }
    }

    fetchQuest()
  }, [questId, userId])

  const handleImageCapture = (imageData: string) => {
    setCapturedImage(imageData)
  }

  const handleSubmit = async () => {
    if (!capturedImage || !userId) return
    
    setSubmitting(true)
    try {
      // Remove the data URL prefix (e.g., "data:image/jpeg;base64,")
      const base64Image = capturedImage.split(',')[1]

      console.log(base64Image)
      
      const response = await completeQuest(
        questId,
        userId,
        base64Image,
        elapsedTime
      )
      
      console.log("Quest completed successfully:", response)
      
      // Redirect to completed quests page
      router.push("/completed")
    } catch (error) {
      console.error("Failed to complete quest:", error)
      alert("Failed to complete quest. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-background px-4 py-6">
        <div className="mx-auto max-w-md">
          <p className="text-center text-muted-foreground">Loading quest...</p>
        </div>
      </main>
    )
  }

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
            <CardTitle className="flex justify-between items-center">
              <span>Prompt: {quest.prompt}</span>
              <span className="text-sm font-normal">
                {Math.floor(elapsedTime / 60)}:{(elapsedTime % 60).toString().padStart(2, '0')}
              </span>
            </CardTitle>
            <CardDescription>Take a photo of the above prompt!</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="pt-4 flex flex-col items-center space-y-4">
              <div className="w-full aspect-[4/3] bg-muted rounded-lg border overflow-hidden">
                {capturedImage ? (
                  <img 
                    src={capturedImage} 
                    alt="Captured" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                    No photo taken yet
                  </div>
                )}
              </div>
              <div className="w-full flex gap-2">
                <CameraButton onImageCapture={handleImageCapture} />
                <Button 
                  onClick={handleSubmit}
                  disabled={!capturedImage || submitting}
                  className="flex-1"
                >
                  {submitting ? "Submitting..." : "Submit"}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}