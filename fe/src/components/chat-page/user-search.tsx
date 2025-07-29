"use client"

import React, {useEffect, useState} from 'react';
import {User} from "@/types/user";
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Button} from "@/components/ui/button";
import {Search, X} from "lucide-react";
import {Input} from "@/components/ui/input";
import UserItem from "@/components/chat-page/user-item";

interface UserSearchProps {
    onClose: () => void
}

const UserSearch = ({ onClose }: UserSearchProps) => {
    const [searchQuery, setSearchQuery] = useState("")
    const [searchResults, setSearchResults] = useState<User[]>([])
    const [suggestedUsers, setSuggestedUsers] = useState<User[]>([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        // mock data, update sau
        setSuggestedUsers([
            {
                id: "1",
                username: "huy_ga",
                name: "Huy Ga",
                avatar: "/placeholder.svg?height=40&width=40",
                isOnline: true,
                mutualFriends: 5,
            },
            {
                id: "2",
                username: "binh_ga",
                name: "Binh Ga",
                avatar: "/placeholder.svg?height=40&width=40",
                isOnline: false,
                mutualFriends: 3,
            },
        ])
    }, [])

    useEffect(() => {
        if (searchQuery.trim()) {
            setIsLoading(true)
            // mock search, update sau
            setTimeout(() => {
                setSearchResults([
                    {
                        id: "3",
                        username: "tien_ga",
                        name: "Tien Ga",
                        avatar: "/placeholder.svg?height=40&width=40",
                        isOnline: true,
                    },
                    {
                        id: "4",
                        username: "cuong_pro",
                        name: "Cuong Pro",
                        avatar: "/placeholder.svg?height=40&width=40",
                        isOnline: false,
                    },
                ])
                setIsLoading(false)
            }, 500)
        } else {
            setSearchResults([])
        }
    }, [searchQuery])

    const handleStartChat = (user: User) => {
        console.log("Start chat with:", user)
        onClose()
    }

    return (
        <div>
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <Card className="w-full max-w-md max-h-[80vh] overflow-hidden">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                        <CardTitle className="text-lg font-semibold">Tìm người để chat</CardTitle>
                        <Button variant="ghost" size="sm" onClick={onClose} className="p-1">
                            <X className="w-4 h-4" />
                        </Button>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {/* Search Input */}
                        <div className="relative">
                            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input
                                placeholder="Tìm theo tên đăng nhập..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10"
                            />
                        </div>

                        {/* Search Results */}
                        <div className="max-h-96 overflow-y-auto">
                            {searchQuery.trim() ? (
                                <div>
                                    <h3 className="text-sm font-medium text-gray-700 mb-2">Kết quả tìm kiếm</h3>
                                    {isLoading ? (
                                        <div className="space-y-2">
                                            {[...Array(3)].map((_, i) => (
                                                <div key={i} className="flex items-center space-x-3 p-2">
                                                    <div className="skeleton w-10 h-10 rounded-full"></div>
                                                    <div className="flex-1">
                                                        <div className="skeleton h-4 w-24 rounded mb-1"></div>
                                                        <div className="skeleton h-3 w-16 rounded"></div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="space-y-2">
                                            {searchResults.map((user) => (
                                                <UserItem key={user.id} user={user} onStartChat={handleStartChat} />
                                            ))}
                                            {searchResults.length === 0 && (
                                                <p className="text-sm text-gray-500 text-center py-4">Không tìm thấy người dùng nào</p>
                                            )}
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div>
                                    <h3 className="text-sm font-medium text-gray-700 mb-2">Gợi ý cho bạn</h3>
                                    <div className="space-y-2">
                                        {suggestedUsers.map((user) => (
                                            <UserItem key={user.id} user={user} onStartChat={handleStartChat} />
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default UserSearch;