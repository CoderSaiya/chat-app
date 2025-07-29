export interface User {
    id: string
    username: string
    name: string
    avatar: string
    isOnline?: boolean
    mutualFriends?: number
    isSelected?: boolean
}