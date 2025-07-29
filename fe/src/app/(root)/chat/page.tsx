"use client"

import React, {Suspense, useEffect, useState} from 'react';
import Sidebar from "@/components/chat-page/sidebar";
import SidebarSkeleton from "@/components/shared/sidebar-skeleton";
import { Chat } from '@/types/chat';

const ChatPage = () => {
    const [selectedChatId, setSelectedChatId] = useState<string | null>(null)
    const [showSidebar, setShowSidebar] = useState(true)
    const [chats, setChats] = useState<Chat[]>([])

    useEffect(() => {
        // khởi tạo call service kết nối hub, update sau


        // mock data, sẽ  fetch data sau
        setChats([
            {
                id: "1",
                name: "Nguyễn Văn A",
                type: "personal",
                lastMessage: "Mình cũng tốt. Có dự án mới nào không?",
                timestamp: "10:05",
                unread: 2,
                avatar: "/placeholder.svg?height=40&width=40",
                isOnline: true,
                messages: [
                    {
                        id: "1",
                        content: "Chào bạn! Hôm nay thế nào?",
                        sender: "other",
                        timestamp: "10:00",
                        type: "text",
                    },
                    {
                        id: "2",
                        content: "Chào! Mình khỏe, cảm ơn bạn. Bạn thì sao?",
                        sender: "me",
                        timestamp: "10:02",
                        type: "text",
                    },
                    {
                        id: "3",
                        content: "Mình cũng tốt. Có dự án mới nào không?",
                        sender: "other",
                        timestamp: "10:05",
                        type: "text",
                    },
                ],
            },
            {
                id: "2",
                name: "Nhóm Dự án Web",
                type: "group",
                lastMessage: "Tuyệt vời! Hôm nay chúng ta sẽ review UI design",
                lastSender: "Trần Minh",
                timestamp: "09:25",
                unread: 5,
                avatar: "/placeholder.svg?height=40&width=40",
                memberCount: 8,
                messages: [
                    {
                        id: "1",
                        content: "Chào mọi người! Cuộc họp hôm nay lúc mấy giờ?",
                        sender: "other",
                        senderName: "Trần Minh",
                        timestamp: "09:00",
                        type: "text",
                    },
                    {
                        id: "2",
                        content: "2h chiều nhé, nhớ chuẩn bị tài liệu",
                        sender: "me",
                        timestamp: "09:15",
                        type: "text",
                    },
                    {
                        id: "3",
                        content: "Ok, mình đã chuẩn bị xong rồi",
                        sender: "other",
                        senderName: "Lê Hoa",
                        timestamp: "09:20",
                        type: "text",
                    },
                    {
                        id: "4",
                        content: "Tuyệt vời! Hôm nay chúng ta sẽ review UI design",
                        sender: "other",
                        senderName: "Trần Minh",
                        timestamp: "09:25",
                        type: "text",
                    },
                ],
            },
            {
                id: "3",
                name: "Trần Thị B",
                type: "personal",
                lastMessage: "Cảm ơn bạn nhiều! File đã nhận được rồi",
                timestamp: "Hôm qua",
                unread: 0,
                avatar: "/placeholder.svg?height=40&width=40",
                isOnline: false,
                messages: [
                    {
                        id: "1",
                        content: "Bạn có thể gửi file cho mình không?",
                        sender: "other",
                        timestamp: "Yesterday",
                        type: "text",
                    },
                    {
                        id: "2",
                        content: "Được, mình gửi ngay",
                        sender: "me",
                        timestamp: "Yesterday",
                        type: "text",
                    },
                    {
                        id: "3",
                        content: "Cảm ơn bạn nhiều! File đã nhận được rồi",
                        sender: "other",
                        timestamp: "Yesterday",
                        type: "text",
                    },
                ],
            },
        ])
    }, [])

    const handleSelectChat = (chatId: string) => {
        setSelectedChatId(chatId)
        setShowSidebar(false)
    }

    return (
        <div className="flex h-screen bg-gray-50">
            <div
                className={`${
                    showSidebar ? "flex" : "hidden"
                } sm:flex w-full sm:w-80 lg:w-96 xl:w-80 border-r border-gray-200 bg-white flex-col`}
            >
                <Suspense fallback={<SidebarSkeleton />}>
                    <Sidebar chats={chats} onSelectChat={handleSelectChat} selectedChatId={selectedChatId} />
                </Suspense>
            </div>
        </div>
    );
};

export default ChatPage;