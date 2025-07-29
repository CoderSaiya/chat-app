"use client"

import React, {useEffect, useState} from 'react';
import {User} from "@/types/user";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Check, Users, X} from "lucide-react";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";

interface CreateGroupProps {
    onClose: () => void
}

const CreateGroup = ({onClose} : CreateGroupProps) => {
    const [groupName, setGroupName] = useState("")
    const [groupDescription, setGroupDescription] = useState("")
    const [users, setUsers] = useState<User[]>([])
    const [selectedUsers, setSelectedUsers] = useState<Set<string>>(new Set())
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        // mock users data, update sau
        setTimeout(() => {
            setUsers([
                {
                    id: "1",
                    name: "Nguyễn Văn A",
                    username: "nguyenvana",
                    avatar: "/placeholder.svg?height=32&width=32",
                },
                {
                    id: "2",
                    name: "Trần Thị B",
                    username: "tranthib",
                    avatar: "/placeholder.svg?height=32&width=32",
                },
                {
                    id: "3",
                    name: "Lê Văn C",
                    username: "levanc",
                    avatar: "/placeholder.svg?height=32&width=32",
                },
                {
                    id: "4",
                    name: "Phạm Thị D",
                    username: "phamthid",
                    avatar: "/placeholder.svg?height=32&width=32",
                },
            ])
            setIsLoading(false)
        }, 500)
    }, [])

    const toggleUserSelection = (userId: string) => {
        const newSelected = new Set(selectedUsers)
        if (newSelected.has(userId)) {
            newSelected.delete(userId)
        } else {
            newSelected.add(userId)
        }
        setSelectedUsers(newSelected)
    }

    const handleCreateGroup = () => {
        if (!groupName.trim() || selectedUsers.size === 0) return

        console.log("Creating group:", {
            name: groupName,
            description: groupDescription,
            members: Array.from(selectedUsers),
        })

        onClose()
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-md max-h-[80vh] overflow-hidden">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                    <CardTitle className="text-lg font-semibold flex items-center">
                        <Users className="w-5 h-5 mr-2 text-orange-500" />
                        Tạo nhóm mới
                    </CardTitle>
                    <Button variant="ghost" size="sm" onClick={onClose} className="p-1">
                        <X className="w-4 h-4" />
                    </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                    {/* Group Info */}
                    <div className="space-y-3">
                        <div>
                            <label className="text-sm font-medium text-gray-700 mb-1 block">Tên nhóm *</label>
                            <Input
                                placeholder="Nhập tên nhóm..."
                                value={groupName}
                                onChange={(e) => setGroupName(e.target.value)}
                                className="focus:border-orange-500 focus:ring-orange-500"
                            />
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-700 mb-1 block">Mô tả nhóm</label>
                            <Textarea
                                placeholder="Mô tả về nhóm (tùy chọn)..."
                                value={groupDescription}
                                onChange={(e) => setGroupDescription(e.target.value)}
                                className="focus:border-orange-500 focus:ring-orange-500 resize-none"
                                rows={2}
                            />
                        </div>
                    </div>

                    {/* Member Selection */}
                    <div>
                        <label className="text-sm font-medium text-gray-700 mb-2 block">
                            Chọn thành viên ({selectedUsers.size} đã chọn)
                        </label>
                        <div className="max-h-48 overflow-y-auto border border-gray-200 rounded-lg">
                            {isLoading ? (
                                <div className="p-3 space-y-2">
                                    {[...Array(4)].map((_, i) => (
                                        <div key={i} className="flex items-center space-x-3">
                                            <div className="skeleton w-8 h-8 rounded-full"></div>
                                            <div className="flex-1">
                                                <div className="skeleton h-4 w-24 rounded mb-1"></div>
                                                <div className="skeleton h-3 w-16 rounded"></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="divide-y divide-gray-100">
                                    {users.map((user) => (
                                        <div
                                            key={user.id}
                                            className="flex items-center space-x-3 p-3 hover:bg-gray-50 cursor-pointer transition-colors"
                                            onClick={() => toggleUserSelection(user.id)}
                                        >
                                            <img
                                                src={user.avatar || "/placeholder.svg"}
                                                alt={user.name}
                                                className="w-8 h-8 rounded-full object-cover"
                                            />
                                            <div className="flex-1 min-w-0">
                                                <p className="font-medium text-gray-900 text-sm truncate">{user.name}</p>
                                                <p className="text-xs text-gray-500 truncate">@{user.username}</p>
                                            </div>
                                            <div
                                                className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                                                    selectedUsers.has(user.id) ? "bg-orange-500 border-orange-500" : "border-gray-300"
                                                }`}
                                            >
                                                {selectedUsers.has(user.id) && <Check className="w-3 h-3 text-white" />}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex space-x-3 pt-2">
                        <Button variant="outline" onClick={onClose} className="flex-1 bg-transparent">
                            Hủy
                        </Button>
                        <Button
                            onClick={handleCreateGroup}
                            disabled={!groupName.trim() || selectedUsers.size === 0}
                            className="flex-1 bg-orange-500 hover:bg-orange-600 text-white"
                        >
                            Tạo nhóm
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default CreateGroup;