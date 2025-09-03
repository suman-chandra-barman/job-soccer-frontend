"use client";

import React, { useState } from "react";
import { User } from "lucide-react";

// Type definitions
interface Request {
  id: number;
  name: string;
  role: string;
  avatar: string;
  status: "pending" | "accepted";
}

interface RequestCardProps {
  request: Request;
  onAccept: (id: number) => void;
  onCancel: (id: number) => void;
}

interface AcceptedRequestCardProps {
  request: Request;
  onViewProfile: (id: number) => void;
}

// Sample request data
const initialRequests: Request[] = [
  {
    id: 1,
    name: "John Doe",
    role: "Player Amateur",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
    status: "pending",
  },
  {
    id: 2,
    name: "John Doe",
    role: "Player Amateur",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
    status: "pending",
  },
  {
    id: 3,
    name: "John Doe",
    role: "Player Amateur",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face",
    status: "pending",
  },
  {
    id: 4,
    name: "John Doe",
    role: "Player Amateur",
    avatar:
      "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=40&h=40&fit=crop&crop=face",
    status: "pending",
  },
];

// Sample accepted requests
const initialAcceptedRequests: Request[] = [
  {
    id: 5,
    name: "John Doe",
    role: "Player Amateur",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
    status: "accepted",
  },
  {
    id: 6,
    name: "John Doe",
    role: "Chef",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
    status: "accepted",
  },
  {
    id: 7,
    name: "John Doe",
    role: "Player Amateur",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face",
    status: "accepted",
  },
  {
    id: 8,
    name: "John Doe",
    role: "Player Amateur",
    avatar:
      "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=40&h=40&fit=crop&crop=face",
    status: "accepted",
  },
];

// Request Card Component for pending requests
const RequestCard: React.FC<RequestCardProps> = ({
  request,
  onAccept,
  onCancel,
}) => {
  return (
    <div className="flex items-center justify-between p-4 bg-white border-b border-gray-100 hover:bg-gray-50 transition-colors">
      <div className="flex items-center gap-3">
        <div className="relative">
          <img
            src={request.avatar}
            alt={request.name}
            className="w-10 h-10 rounded-full object-cover"
            onError={(e) => {
              e.target.style.display = "none";
              (e.target as HTMLImageElement).nextSibling!.style.display =
                "flex";
            }}
          />
          <div
            className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center hidden"
            style={{ display: "none" }}
          >
            <User size={20} className="text-gray-600" />
          </div>
        </div>
        <div>
          <h3 className="font-medium text-gray-900">{request.name}</h3>
          <p className="text-sm text-gray-500">{request.role}</p>
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => onCancel(request.id)}
          className="px-4 py-2 text-sm text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Cancel Request
        </button>
        <button
          onClick={() => onAccept(request.id)}
          className="px-4 py-2 text-sm text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors"
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
  return (
    <div className="flex items-center justify-between p-4 bg-white border-b border-gray-100 hover:bg-gray-50 transition-colors">
      <div className="flex items-center gap-3">
        <div className="relative">
          <img
            src={request.avatar}
            alt={request.name}
            className="w-10 h-10 rounded-full object-cover"
            onError={(e) => {
              e.target.style.display = "none";
              (e.target as HTMLImageElement).nextSibling!.style.display =
                "flex";
            }}
          />
          <div
            className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center hidden"
            style={{ display: "none" }}
          >
            <User size={20} className="text-gray-600" />
          </div>
        </div>
        <div>
          <h3 className="font-medium text-gray-900">{request.name}</h3>
          <p className="text-sm text-gray-500">{request.role}</p>
        </div>
      </div>

      <button
        onClick={() => onViewProfile(request.id)}
        className="px-4 py-2 text-sm text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors"
      >
        View Profile
      </button>
    </div>
  );
};

// Main Component
const AcceptRequestInterface: React.FC = () => {
  const [requests, setRequests] = useState<Request[]>(initialRequests);
  const [acceptedRequests, setAcceptedRequests] = useState<Request[]>(
    initialAcceptedRequests
  );
  const [activeTab, setActiveTab] = useState<"Request" | "Accepted">("Request");

  // Handle accepting a request
  const handleAcceptRequest = (requestId: number) => {
    const requestToAccept = requests.find((req) => req.id === requestId);
    if (requestToAccept) {
      // Move from pending to accepted
      setRequests(requests.filter((req) => req.id !== requestId));
      setAcceptedRequests([
        ...acceptedRequests,
        { ...requestToAccept, status: "accepted" },
      ]);

      // Here you would make an API call to your backend
      // acceptRequestAPI(requestId);
    }
  };

  // Handle canceling a request
  const handleCancelRequest = (requestId: number) => {
    setRequests(requests.filter((req) => req.id !== requestId));

    // Here you would make an API call to your backend
    // cancelRequestAPI(requestId);
  };

  // Handle viewing profile
  const handleViewProfile = (requestId: number) => {
    console.log("View profile for request:", requestId);

    // Here you would navigate to the profile page or open a modal
    // navigateToProfile(requestId);
  };

  const getTabCount = (tab: "Request" | "Accepted"): number => {
    return tab === "Request" ? requests.length : acceptedRequests.length;
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
              {requests.length === 0 ? (
                <div className="p-8 text-center">
                  <p className="text-gray-500">No pending requests</p>
                </div>
              ) : (
                <div>
                  {requests.map((request) => (
                    <RequestCard
                      key={request.id}
                      request={request}
                      onAccept={handleAcceptRequest}
                      onCancel={handleCancelRequest}
                    />
                  ))}
                </div>
              )}
            </>
          ) : (
            <>
              {acceptedRequests.length === 0 ? (
                <div className="p-8 text-center">
                  <p className="text-gray-500">No accepted requests</p>
                </div>
              ) : (
                <div>
                  {acceptedRequests.map((request) => (
                    <AcceptedRequestCard
                      key={request.id}
                      request={request}
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
