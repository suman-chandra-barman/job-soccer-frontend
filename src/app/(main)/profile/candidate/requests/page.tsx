/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { User } from "lucide-react";
import {
  useGetReceivedFriendRequestsQuery,
  useGetFriendsListQuery,
  useUpdateFriendRequestMutation,
  FriendRequest,
  Friend,
} from "@/redux/features/friend/friendListApi";
import { toast } from "sonner";

// Type definitions
interface RequestCardProps {
  request: FriendRequest;
  onAccept: (id: string) => void;
  onCancel: (id: string) => void;
  isLoading?: boolean;
}

interface AcceptedRequestCardProps {
  request: Friend;
  onViewProfile: (id: string) => void;
}

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
    <div className="flex items-center justify-between p-4 bg-white border-b border-gray-100 hover:bg-gray-50 transition-colors">
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

      <div className="flex gap-2">
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

// Accepted Request Card Component
const AcceptedRequestCard: React.FC<AcceptedRequestCardProps> = ({
  request,
  onViewProfile,
}) => {
  const friendName = request.friend?.email?.split("@")[0] || "Unknown User";
  const friendRole = request.friend?.role || "User";

  return (
    <div className="flex items-center justify-between p-4 bg-white border-b border-gray-100 hover:bg-gray-50 transition-colors">
      <div className="flex items-center gap-3">
        <div className="relative">
          <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
            <User size={20} className="text-gray-600" />
          </div>
        </div>
        <div>
          <h3 className="font-medium text-gray-900">{friendName}</h3>
          <p className="text-sm text-gray-500">{friendRole}</p>
          <p className="text-xs text-gray-400">
            Friends since{" "}
            {new Date(request.friendshipDate).toLocaleDateString()}
          </p>
        </div>
      </div>

      <button
        onClick={() => onViewProfile(request.friend._id)}
        className="px-4 py-2 text-sm text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors"
      >
        View Profile
      </button>
    </div>
  );
};

// Main Component
const AcceptRequestInterface: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"Request" | "Accepted">("Request");
  const [page, setPage] = useState(1);
  const limit = 10;

  // Fetch received friend requests
  const {
    data: receivedRequestsData,
    isLoading: isLoadingRequests,
    error: requestsError,
  } = useGetReceivedFriendRequestsQuery({ page, limit });

  // Fetch accepted friends list
  const {
    data: friendsListData,
    isLoading: isLoadingFriends,
    error: friendsError,
  } = useGetFriendsListQuery({ page, limit });

  // Mutation for accepting/rejecting requests
  const [updateFriendRequest, { isLoading: isUpdating }] =
    useUpdateFriendRequestMutation();

  // Handle accepting a request
  const handleAcceptRequest = async (requestId: string) => {
    try {
      const result = await updateFriendRequest({
        id: requestId,
        body: { status: "accepted" },
      }).unwrap();

      toast.success(result.message || "Friend request accepted successfully");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to accept friend request");
    }
  };

  // Handle canceling/rejecting a request
  const handleCancelRequest = async (requestId: string) => {
    try {
      const result = await updateFriendRequest({
        id: requestId,
        body: { status: "rejected" },
      }).unwrap();

      toast.success(result.message || "Friend request rejected successfully");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to reject friend request");
    }
  };

  // Handle viewing profile
  const handleViewProfile = (userId: string) => {
    // Navigate to user profile
    window.location.href = `/candidates/${userId}`;
  };

  const getTabCount = (tab: "Request" | "Accepted"): number => {
    if (tab === "Request") {
      return receivedRequestsData?.meta?.total || 0;
    }
    return friendsListData?.meta?.total || 0;
  };

  return (
    <div className="flex-1 min-h-screen border rounded-2xl">
      {/* Header */}
      <div className="border-b border-gray-200 px-6 py-4">
        <h1 className="text-xl font-semibold text-gray-900">Access Request</h1>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-6">
          <div className="flex space-x-8">
            {["Request", "Accepted"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as "Request" | "Accepted")}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                {tab} ({getTabCount(tab as "Request" | "Accepted")})
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="px-6 py-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          {activeTab === "Request" ? (
            <>
              {isLoadingRequests ? (
                <div className="p-8 text-center">
                  <p className="text-gray-500">Loading requests...</p>
                </div>
              ) : requestsError ? (
                <div className="p-8 text-center">
                  <p className="text-red-500">Failed to load requests</p>
                </div>
              ) : !receivedRequestsData?.data ||
                receivedRequestsData.data.length === 0 ? (
                <div className="p-8 text-center">
                  <p className="text-gray-500">No pending requests</p>
                </div>
              ) : (
                <div>
                  {receivedRequestsData.data.map((request) => (
                    <RequestCard
                      key={request._id}
                      request={request}
                      onAccept={handleAcceptRequest}
                      onCancel={handleCancelRequest}
                      isLoading={isUpdating}
                    />
                  ))}
                </div>
              )}
            </>
          ) : (
            <>
              {isLoadingFriends ? (
                <div className="p-8 text-center">
                  <p className="text-gray-500">Loading friends...</p>
                </div>
              ) : friendsError ? (
                <div className="p-8 text-center">
                  <p className="text-red-500">Failed to load friends</p>
                </div>
              ) : !friendsListData?.data ||
                friendsListData.data.length === 0 ? (
                <div className="p-8 text-center">
                  <p className="text-gray-500">No accepted requests</p>
                </div>
              ) : (
                <div>
                  {friendsListData.data.map((friend) => (
                    <AcceptedRequestCard
                      key={friend._id}
                      request={friend}
                      onViewProfile={handleViewProfile}
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AcceptRequestInterface;
