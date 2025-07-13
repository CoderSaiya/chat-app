import React from 'react';

const ChatSkeleton = () => {
    return (
        <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <div className="flex items-center space-x-3">
                    <div className="skeleton w-10 h-10 rounded-full"></div>
                    <div>
                        <div className="skeleton h-4 w-24 rounded mb-1"></div>
                        <div className="skeleton h-3 w-16 rounded"></div>
                    </div>
                </div>
                <div className="flex space-x-2">
                    <div className="skeleton h-8 w-8 rounded"></div>
                    <div className="skeleton h-8 w-8 rounded"></div>
                    <div className="skeleton h-8 w-8 rounded"></div>
                </div>
            </div>
            <div className="flex-1 p-4 space-y-4">
                {[...Array(5)].map((_, i) => (
                    <div key={i} className={`flex ${i % 2 === 0 ? "justify-start" : "justify-end"}`}>
                        <div className="skeleton h-12 w-48 rounded-2xl"></div>
                    </div>
                ))}
            </div>
            <div className="p-4 border-t border-gray-200">
                <div className="skeleton h-10 w-full rounded-full"></div>
            </div>
        </div>
    );
};

export default ChatSkeleton;