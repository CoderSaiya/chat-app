import React from 'react';

const SidebarSkeleton = () => {
    return (
        <div className="flex flex-col h-full p-4">
            <div className="flex items-center justify-between mb-4">
                <div className="skeleton h-6 w-32 rounded"></div>
                <div className="flex space-x-2">
                    <div className="skeleton h-8 w-8 rounded"></div>
                    <div className="skeleton h-8 w-8 rounded"></div>
                </div>
            </div>
            <div className="skeleton h-10 w-full rounded-lg mb-4"></div>
            <div className="space-y-3">
                {[...Array(6)].map((_, i) => (
                    <div key={i} className="flex items-center space-x-3 p-3">
                        <div className="skeleton h-12 w-12 rounded-full"></div>
                        <div className="flex-1">
                            <div className="skeleton h-4 w-24 rounded mb-2"></div>
                            <div className="skeleton h-3 w-32 rounded"></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SidebarSkeleton;