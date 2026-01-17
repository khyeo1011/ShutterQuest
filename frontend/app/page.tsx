"use client"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function Page() {
  const router = useRouter()

  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="mx-auto max-w-md w-full space-y-6">
        <h1 className="text-4xl font-bold text-center text-foreground">Shutter Quest</h1>
        
        <div className="flex flex-col gap-3">
          <Button 
            onClick={() => router.push("/start")}
            size="lg"
            className="w-full"
          >
            Start Quest
          </Button>
          
          <Button 
            onClick={() => router.push("/pending")}
            variant="outline"
            size="lg"
            className="w-full"
          >
            Pending Quests
          </Button>
          
          <Button 
            onClick={() => router.push("/completed")}
            variant="outline"
            size="lg"
            className="w-full"
          >
            Completed Quests
          </Button>
        </div>
      </div>
    </main>
  )
}