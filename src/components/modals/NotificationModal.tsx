import React from "react";
import { MoreHorizontal, Clock, Bell } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
interface NotificationItem {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  count: number;
}

const NotificationModal = ({
  isOpen,
  onClose,
  notifications,
}: {
  isOpen: boolean;
  onClose: () => void;
  notifications: NotificationItem[];
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md p-0 gap-0">
        <DialogHeader className="p-0">
          <DialogTitle className="sr-only">Notifications</DialogTitle>
        </DialogHeader>

        {/* Notifications List */}
        <div className="max-h-[80vh] overflow-y-auto">
          {notifications.map((notification, index) => (
            <div
              key={notification.id}
              className={`flex items-start space-x-3 p-4 hover:bg-gray-50 transition-colors ${
                index !== notifications.length - 1
                  ? "border-b border-gray-100"
                  : ""
              }`}
            >
              {/* Avatar */}
              <Avatar className="w-10 h-10 flex-shrink-0 mt-1">
                <AvatarImage src="" />
                <AvatarFallback className="bg-purple-600 text-white">
                  <Bell className="w-5 h-5" />
                </AvatarFallback>
              </Avatar>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-1">
                  <h4 className="text-sm font-medium text-gray-900 leading-tight">
                    {notification.title}
                  </h4>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0 hover:bg-gray-200 flex-shrink-0 ml-2"
                  >
                    <MoreHorizontal className="w-4 h-4 text-gray-400" />
                  </Button>
                </div>

                <p className="text-sm text-gray-600 mb-2 leading-relaxed">
                  {notification.description}
                </p>

                <div className="flex items-center text-xs text-gray-500">
                  <Clock className="w-3 h-3 mr-1" />
                  {notification.timestamp}
                </div>
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NotificationModal;
