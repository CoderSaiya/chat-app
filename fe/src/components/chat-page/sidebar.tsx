"use client"

import { Chat } from '@/types/chat';
import {LogOut, MessageCircle, Plus, Search, Settings, Users, UserSearch} from 'lucide-react';
import React, {useState} from 'react';
import { Button } from '@/components/ui/button';
import {Input} from "@/components/ui/input";
import CreateGroup from "@/components/chat-page/create-group";

interface SidebarProps {
    chats: Chat[]
    onSelectChat: (chatId: string) => void
    selectedChatId: string | null
}

const Sidebar = ({
                     chats,
                     onSelectChat,
                     selectedChatId }: SidebarProps) => {

    const [searchQuery, setSearchQuery] = useState("")
    const [showUserSearch, setShowUserSearch] = useState(false)
    const [showCreateGroup, setShowCreateGroup] = useState(false)

    const filteredChats = chats.filter((chat) => chat.name.toLowerCase().includes(searchQuery.toLowerCase()))

    return (
        <div className="flex flex-col h-full bg-white">
            {/* Header */}
            <div className="p-3 sm:p-4 border-b border-gray-100 bg-gradient-to-r from-orange-50 to-white">
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <h1 className="text-lg sm:text-xl font-bold text-gray-800 flex items-center">
                        <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 text-orange-500 mr-2" />
                        <span className="hidden sm:inline">ChatApp</span>
                        <span className="sm:hidden">Chat</span>
                    </h1>
                    <div className="flex space-x-1 sm:space-x-2">
                        <Button
                            size="sm"
                            variant="ghost"
                            className="p-2 hover:bg-orange-100 rounded-full transition-colors"
                            onClick={() => setShowUserSearch(true)}
                        >
                            <Search className="w-4 h-4 text-gray-600" />
                        </Button>
                        <Button
                            size="sm"
                            variant="ghost"
                            className="p-2 hover:bg-orange-100 rounded-full transition-colors"
                            onClick={() => setShowCreateGroup(true)}
                        >
                            <Plus className="w-4 h-4 text-gray-600" />
                        </Button>
                    </div>
                </div>

                {/* Search */}
                <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                        placeholder="Tìm kiếm cuộc trò chuyện..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 bg-gray-50 border-0 focus:bg-white focus:ring-2 focus:ring-orange-200 rounded-full h-10"
                    />
                </div>
            </div>

            {/* Chat List */}
            <div className="flex-1 overflow-y-auto">
                {filteredChats.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-32 text-gray-500">
                        <MessageCircle className="w-8 h-8 mb-2 opacity-50" />
                        <p className="text-sm">Không tìm thấy cuộc trò chuyện</p>
                    </div>
                ) : (
                    filteredChats.map((chat) => (
                        <div
                            key={chat.id}
                            className={`flex items-center p-3 sm:p-4 hover:bg-orange-25 transition-all duration-200 cursor-pointer border-b border-gray-50 last:border-b-0 group ${
                                selectedChatId === chat.id ? "bg-orange-50 border-l-4 border-l-orange-500" : ""
                            }`}
                            onClick={() => onSelectChat(chat.id)}
                        >
                            {/* Avatar */}
                            <div className="relative flex-shrink-0 mr-3">
                                <img
                                    src={chat.avatar || "/placeholder.svg"}
                                    alt={chat.name}
                                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover ring-2 ring-transparent group-hover:ring-orange-200 transition-all"
                                />
                                {/* Online status for personal chat */}
                                {chat.type === "personal" && chat.isOnline && (
                                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 sm:w-4 sm:h-4 bg-green-500 border-2 border-white rounded-full"></div>
                                )}
                                {/* Group indicator */}
                                {chat.type === "group" && (
                                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 sm:w-4 sm:h-4 bg-orange-500 border-2 border-white rounded-full flex items-center justify-center">
                                        <Users className="w-1.5 h-1.5 sm:w-2 sm:h-2 text-white" />
                                    </div>
                                )}
                            </div>

                            {/* Chat Info */}
                            <div className="flex-1 min-w-0 mr-2">
                                <div className="flex items-center justify-between mb-1">
                                    <h3 className="font-semibold text-gray-900 truncate text-sm sm:text-base pr-2">{chat.name}</h3>
                                    <span className="text-xs text-gray-500 flex-shrink-0">{chat.timestamp}</span>
                                </div>

                                {/* Last message with sender name for groups */}
                                <div className="flex items-center text-xs sm:text-sm text-gray-600">
                                    {chat.type === "group" && chat.lastSender && (
                                        <span className="font-medium text-orange-600 mr-1 flex-shrink-0">{chat.lastSender}:</span>
                                    )}
                                    <p className="truncate flex-1">{chat.lastMessage}</p>
                                </div>

                                {/* Group member count */}
                                {chat.type === "group" && chat.memberCount && (
                                    <div className="flex items-center mt-1">
                                        <Users className="w-3 h-3 text-gray-400 mr-1" />
                                        <span className="text-xs text-gray-400">{chat.memberCount} thành viên</span>
                                    </div>
                                )}
                            </div>

                            {/* Unread badge */}
                            {chat.unread > 0 && (
                                <div className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 bg-orange-500 text-white text-xs rounded-full flex items-center justify-center font-medium shadow-sm">
                                    {chat.unread > 99 ? "99+" : chat.unread}
                                </div>
                            )}
                        </div>
                    ))
                )}
            </div>

            {/* Footer */}
            <div className="p-3 sm:p-4 border-t border-gray-100 bg-gray-50">
                <div className="flex items-center justify-between">
                    <Button
                        variant="ghost"
                        size="sm"
                        className="flex items-center space-x-2 hover:bg-orange-50 text-gray-600 hover:text-orange-600 transition-colors rounded-full px-3 py-2"
                    >
                        <Settings className="w-4 h-4" />
                        <span className="hidden sm:inline text-sm">Cài đặt</span>
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="hover:bg-red-50 hover:text-red-600 transition-colors rounded-full p-2"
                        onClick={() => {
                            document.cookie = "auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT"
                            window.location.href = "/login"
                        }}
                    >
                        <LogOut className="w-4 h-4" />
                    </Button>
                </div>
            </div>

            {/* Modals */}
            {showUserSearch && <UserSearch onClose={() => setShowUserSearch(false)} />}
            {showCreateGroup && <CreateGroup onClose={() => setShowCreateGroup(false)} />}
        </div>
    );
};

export default Sidebar;