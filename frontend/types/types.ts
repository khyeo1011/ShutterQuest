export interface Quest {
    questId: string
    prompt: string
    hostId: string
    date: number
}

export interface Participant {
    questId: string
    userId: string
    score: number
    time: number
    photo: any
}

export interface User {
    userId: string
    password: string
}

export interface Participant {
    userId: string
    score: number
    time: number
    photo: any
}

export interface QuestDetail {
    questId: string
    prompt: string
    hostId: string
    date: number
    winner: string
    participants: Participant[]
}