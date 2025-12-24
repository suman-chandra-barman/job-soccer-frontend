import React from "react";
import { User } from "lucide-react";
import { RequestCardProps } from "@/types/cards";

// Request Card Component
const RequestCard: React.FC<RequestCardProps> = ({
  request,
  onAccept,
  onCancel,
  isLoading = false,
}) => {
  const senderName = request.senderId?.email?.split("@")[0] || "Unknown User";
  const senderRole = request.senderRole || "User";

  return (
    <div className="flex gap-2 items-center justify-between p-4 bg-white border-b border-gray-100 hover:bg-gray-50 transition-colors">
      <div className="flex items-center gap-3">
        <div className="relative">
          <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
            <User size={20} className="text-gray-600" />
          </div>
        </div>
        <div>
          <h3 className="font-medium text-gray-900">{senderName}</h3>
          <p className="text-sm text-gray-500">{senderRole}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onCancel(request._id)}
          disabled={isLoading}
          className="px-4 py-2 text-sm text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Cancel Request
        </button>
        <button
          onClick={() => onAccept(request._id)}
          disabled={isLoading}
          className="px-4 py-2 text-sm text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Accept Request
        </button>
      </div>
    </div>
  );
};

export default RequestCard;
