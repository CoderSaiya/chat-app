import React, {useEffect, useRef, useState} from 'react';
import {Chat} from "@/types/chat";
import {Message} from "postcss";
import {Input} from "@/components/ui/input";
import {ArrowLeft, MoreVertical, Paperclip, Phone, Send, Smile, Users, Video} from 'lucide-react';
import {Button} from "@/components/ui/button";

interface ChatInterfaceProps {
    chat: Chat
    onBackToSidebar: () => void
    onSendMessage: (chatId: string, message: Message) => void
    onStartCall: (type: "voice" | "video") => void
}

const ChatInterface = ({
                           chat,
                           onBackToSidebar,
                           onSendMessage,
                           onStartCall }: ChatInterfaceProps) => {
    const [newMessage, setNewMessage] = useState("")
    const messagesEndRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [chat.messages])

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault()
        if (!newMessage.trim()) return

        const message: Message = {
            id: Date.now().toString(),
            content: newMessage,
            sender: "me",
            timestamp: new Date().toLocaleTimeString("vi-VN", {
                hour: "2-digit",
                minute: "2-digit",
            }),
            type: "text",
        }

        onSendMessage(chat.id, message)
        setNewMessage("")

        // mock response bằng random, update sau
        setTimeout(() => {
            const responses = [
                "Cảm ơn bạn đã nhắn tin!",
                "Mình hiểu rồi",
                "Được rồi, để mình xem xét",
                "Ok, mình sẽ phản hồi sớm",
                "Tuyệt vời!",
            ]

            const randomResponse = responses[Math.floor(Math.random() * responses.length)]
            const senderName = chat.type === "group" ? "Demo User" : undefined

            const response: Message = {
                id: (Date.now() + 1).toString(),
                content: randomResponse,
                sender: "other",
                senderName,
                timestamp: new Date().toLocaleTimeString("vi-VN", {
                    hour: "2-digit",
                    minute: "2-digit",
                }),
                type: "text",
            }

            onSendMessage(chat.id, response)
        }, 1000)
    }

    return (
        <div className="flex flex-col h-full">
            {/* Chat Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white shadow-sm">
                <div className="flex items-center space-x-3">
                    {/* Back button - chỉ hiện trên mobile */}
                    <Button variant="ghost" size="sm" className="p-2 hover:bg-orange-50 sm:hidden" onClick={onBackToSidebar}>
                        <ArrowLeft className="w-4 h-4 text-gray-600" />
                    </Button>

                    <img
                        src={chat.avatar || "/placeholder.svg"}
                        alt="Avatar"
                        className="w-10 h-10 rounded-full ring-2 ring-orange-100"
                    />
                    <div>
                        <h2 className="font-semibold text-gray-900 flex items-center">
                            {chat.name}
                            {chat.type === "group" && <Users className="w-4 h-4 ml-2 text-orange-500" />}
                        </h2>
                        {chat.type === "personal" ? (
                            <p className={`text-sm ${chat.isOnline ? "text-green-500" : "text-gray-500"}`}>
                                {chat.isOnline ? "Đang hoạt động" : "Không hoạt động"}
                            </p>
                        ) : (
                            <p className="text-sm text-gray-500">{chat.memberCount} thành viên</p>
                        )}
                    </div>
                </div>
                <div className="flex items-center space-x-2">
                    {/* Call buttons - chỉ hiện cho personal chat */}
                    {chat.type === "personal" && (
                        <>
                            <Button variant="ghost" size="sm" className="p-2 hover:bg-orange-50" onClick={() => onStartCall("voice")}>
                                <Phone className="w-4 h-4 text-gray-600" />
                            </Button>
                            <Button variant="ghost" size="sm" className="p-2 hover:bg-orange-50" onClick={() => onStartCall("video")}>
                                <Video className="w-4 h-4 text-gray-600" />
                            </Button>
                        </>
                    )}
                    <Button variant="ghost" size="sm" className="p-2 hover:bg-orange-50">
                        <MoreVertical className="w-4 h-4 text-gray-600" />
                    </Button>
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-orange-25 to-white">
                {chat.messages.map((message) => (
                    <div key={message.id} className={`flex ${message.sender === "me" ? "justify-end" : "justify-start"}`}>
                        <div className={`chat-bubble ${message.sender === "me" ? "chat-bubble-sent" : "chat-bubble-received"}`}>
                            {/* Hiển thị tên người gửi cho group chat */}
                            {message.sender === "other" && chat.type === "group" && message.senderName && (
                                <p className="text-xs font-medium text-orange-600 mb-1">{message.senderName}</p>
                            )}
                            <p className="text-sm">{message.content}</p>
                            <p className={`text-xs mt-1 ${message.sender === "me" ? "text-orange-100" : "text-gray-500"}`}>
                                {message.timestamp}
                            </p>
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-gray-200 bg-white">
                <form onSubmit={handleSendMessage} className="flex items-center space-x-3">
                    <Button type="button" variant="ghost" size="sm" className="p-2 hover:bg-orange-50">
                        <Paperclip className="w-4 h-4 text-gray-600" />
                    </Button>
                    <div className="flex-1 relative">
                        <Input
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            placeholder="Nhập tin nhắn..."
                            className="pr-10 border-gray-200 focus:border-orange-500 focus:ring-orange-500 rounded-full"
                        />
                        <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 hover:bg-orange-50"
                        >
                            <Smile className="w-4 h-4 text-gray-600" />
                        </Button>
                    </div>
                    <Button
                        type="submit"
                        className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-full p-3"
                        disabled={!newMessage.trim()}
                    >
                        <Send className="w-4 h-4" />
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default ChatInterface;