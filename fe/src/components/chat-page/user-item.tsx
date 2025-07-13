import React from 'react';
import {User} from "@/types/user";
import {Button} from "@/components/ui/button";
import {UserPlus} from "lucide-react";

const UserItem = ({ user, onStartChat }: { user: User; onStartChat: (user: User) => void }) => {
    return (
        <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="relative">
                <img src={user.avatar || "/placeholder.svg"} alt={user.name} className="w-10 h-10 rounded-full object-cover" />
                {user.isOnline && (
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                )}
            </div>
            <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900 truncate">{user.name}</p>
                <p className="text-sm text-gray-500 truncate">@{user.username}</p>
                {user.mutualFriends && <p className="text-xs text-gray-400">{user.mutualFriends} bạn chung</p>}
            </div>
            <Button size="sm" onClick={() => onStartChat(user)} className="bg-orange-500 hover:bg-orange-600 text-white">
                <UserPlus className="w-4 h-4" />
            </Button>
        </div>
    );
};

export default UserItem;