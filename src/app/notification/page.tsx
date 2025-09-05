import React, { useState } from 'react';
import { X, MoreHorizontal, Clock, Briefcase, Users, Star, CheckCircle } from 'lucide-react';

// Types for notification data
export interface NotificationItem {
  id: string;
  type: 'opportunity' | 'message' | 'application' | 'system';
  title: string;
  description: string;
  timestamp: string;
  isRead: boolean;
  avatar?: string;
  count?: number;
}

// Mock notification data
const mockNotifications: NotificationItem[] = [
  {
    id: '1',
    type: 'opportunity',
    title: 'You have new 4 opportunity this week',
    description: 'This week, your AI Job-finder has discovered four exciting new Cocktail opportunities...',
    timestamp: '5h ago',
    isRead: false,
    count: 4
  },
  {
    id: '2',
    type: 'opportunity',
    title: 'You have new 4 opportunity this week',
    description: 'This week, your AI Job-finder has discovered four exciting new Cocktail opportunities...',
    timestamp: '5h ago',
    isRead: false,
    count: 4
  },
  {
    id: '3',
    type: 'opportunity',
    title: 'You have new 4 opportunity this week',
    description: 'This week, your AI Job-finder has discovered four exciting new Cocktail opportunities...',
    timestamp: '5h ago',
    isRead: false,
    count: 4
  },
  {
    id: '4',
    type: 'opportunity',
    title: 'You have new 4 opportunity this week',
    description: 'This week, your AI Job-finder has discovered four exciting new Cocktail opportunities...',
    timestamp: '14h ago',
    isRead: true,
    count: 4
  },
  {
    id: '5',
    type: 'opportunity',
    title: 'You have new 4 opportunity this week',
    description: 'This week, your AI Job-finder has discovered four exciting new Cocktail opportunities...',
    timestamp: '22h ago',
    isRead: true,
    count: 4
  },
  {
    id: '6',
    type: 'opportunity',
    title: 'You have new 4 opportunity this week',
    description: 'This week, your AI Job-finder has discovered four exciting new Cocktail opportunities...',
    timestamp: '1d ago',
    isRead: true,
    count: 4
  },
  {
    id: '7',
    type: 'opportunity',
    title: 'You have new 4 opportunity this week',
    description: 'This week, your AI Job-finder has discovered four exciting new Cocktail opportunities...',
    timestamp: '1d ago',
    isRead: true,
    count: 4
  }
];

const NotificationModal = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [notifications, setNotifications] = useState(mockNotifications);
  const [activeTab, setActiveTab] = useState<'all' | 'unread'>('all');

  const unreadCount = notifications.filter(n => !n.isRead).length;
  
  const filteredNotifications = activeTab === 'unread' 
    ? notifications.filter(n => !n.isRead)
    : notifications;

  const handleMarkAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, isRead: true }
          : notification
      )
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, isRead: true }))
    );
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'opportunity':
        return <Briefcase className="w-5 h-5" />;
      case 'message':
        return <Users className="w-5 h-5" />;
      case 'application':
        return <Star className="w-5 h-5" />;
      default:
        return <CheckCircle className="w-5 h-5" />;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center pt-16 px-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold">Notifications</h2>
              <p className="text-blue-100 text-sm">
                {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
              </p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Tabs */}
          <div className="flex mt-4 bg-white bg-opacity-20 rounded-lg p-1">
            <button
              onClick={() => setActiveTab('all')}
              className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-colors ${
                activeTab === 'all'
                  ? 'bg-white text-blue-600'
                  : 'text-white hover:bg-white hover:bg-opacity-20'
              }`}
            >
              All ({notifications.length})
            </button>
            <button
              onClick={() => setActiveTab('unread')}
              className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-colors ${
                activeTab === 'unread'
                  ? 'bg-white text-blue-600'
                  : 'text-white hover:bg-white hover:bg-opacity-20'
              }`}
            >
              Unread ({unreadCount})
            </button>
          </div>
        </div>

        {/* Actions */}
        {unreadCount > 0 && (
          <div className="px-6 py-3 border-b border-gray-100 bg-gray-50">
            <button
              onClick={handleMarkAllAsRead}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors"
            >
              Mark all as read
            </button>
          </div>
        )}

        {/* Notifications List */}
        <div className="overflow-y-auto max-h-96">
          {filteredNotifications.length === 0 ? (
            <div className="text-center py-12 px-6">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">All caught up!</h3>
              <p className="text-gray-500 text-sm">
                {activeTab === 'unread' 
                  ? 'No unread notifications'
                  : 'You have no notifications'
                }
              </p>
            </div>
          ) : (
            filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`relative px-6 py-4 border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer ${
                  !notification.isRead ? 'bg-blue-50' : ''
                }`}
                onClick={() => handleMarkAsRead(notification.id)}
              >
                {/* Unread Indicator */}
                {!notification.isRead && (
                  <div className="absolute left-2 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-blue-500 rounded-full"></div>
                )}

                <div className="flex items-start space-x-3">
                  {/* Avatar/Icon */}
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white">
                      {getNotificationIcon(notification.type)}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-gray-900 mb-1 leading-tight">
                          {notification.title.replace('4', notification.count?.toString() || '4')}
                        </h4>
                        <p className="text-sm text-gray-600 mb-2 leading-relaxed">
                          {notification.description}
                        </p>
                        <div className="flex items-center text-xs text-gray-500">
                          <Clock className="w-3 h-3 mr-1" />
                          {notification.timestamp}
                        </div>
                      </div>

                      {/* More Options */}
                      <button className="p-1 hover:bg-gray-200 rounded-full transition-colors flex-shrink-0 ml-2">
                        <MoreHorizontal className="w-4 h-4 text-gray-400" />
                      </button>
                    </div>

                    {/* Count Badge */}
                    {notification.count && (
                      <div className="inline-flex items-center mt-2">
                        <span className="bg-orange-100 text-orange-800 text-xs font-medium px-2 py-1 rounded-full">
                          {notification.count} new opportunities
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
          <button className="w-full text-center text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors py-2">
            View all notifications
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationModal;