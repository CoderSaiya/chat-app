export interface Message {
    id: string
    content: string
    sender: "me" | "other"
    senderName?: string
    timestamp: string
    type: "text" | "image" | "file"
}

export interface Chat {
    id: string
    name: string
    type: "personal" | "group"
    lastMessage: string
    lastSender?: string
    timestamp: string
    unread: number
    avatar: string
    isOnline?: boolean
    memberCount?: number
    messages: Message[]
}