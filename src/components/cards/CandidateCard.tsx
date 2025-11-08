import React from "react";
import { Card, CardContent } from "../ui/card";
import { Bookmark, Lock, MapPin, MessageCircle, SquarePen } from "lucide-react";
import { FaPlayCircle } from "react-icons/fa";
import { Button } from "../ui/button";
import { ICandidate } from "@/types/user";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

function CandidateCard({ candidate }: { candidate: ICandidate }) {
  return (
    <div>
      <Card className="bg-gradient-to-br from-white to-[#FDF9E3] border-0 shadow-sm hover:shadow-md transition-shadow">
        <CardContent className="p-6">
          {/* Profile Header */}
          <div className="flex items-center gap-3 mb-4">
            <Avatar className="w-12 h-12">
              <AvatarImage
                src={candidate?.profileImage || ""}
                alt={`${candidate?.firstName || ""} 
                }`}
                className="object-cover"
              />
              <AvatarFallback className="text-base font-medium">
                {candidate?.firstName?.charAt(0)}
                {candidate?.lastName?.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <h4 className="font-semibold text-gray-900">
                {candidate.firstName + " " + candidate.lastName}
              </h4>
              <p className="text-sm text-gray-500">{candidate.role}</p>
            </div>
          </div>

          {/* Location */}
          <div className="flex items-center gap-2 mb-3">
            <MapPin className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-600">
              {candidate.profile?.placeOfBirth}
            </span>
          </div>

          {/* Nationality */}
          <div className="mb-3">
            <span className="text-sm text-gray-600">
              <span className="font-medium">Nationality:</span>{" "}
              {candidate.profile?.nationality}
            </span>
          </div>

          <button className="flex mb-3 items-center gap-1 text-sm text-gray-600 hover:text-gray-900 transition-colors">
            <SquarePen className="w-4 h-4" />
            View Profile
          </button>
          <button className="flex mb-6 items-center gap-1 text-sm  transition-colors">
            <FaPlayCircle className="w-4 h-4 text-red-500 hover:text-red-600" />
            Watch Interview
          </button>

          {/* Action Buttons */}
          <div className="space-y-2">
            <Button
              variant="outline"
              size="sm"
              className="w-full text-xs bg-transparent"
            >
              <Bookmark className="w-3 h-3 mr-1" />
              Shortlist
            </Button>

            <Button
              variant="outline"
              size="sm"
              className="w-full text-xs bg-gray-100 text-gray-500"
              disabled
            >
              <Lock className="w-3 h-3 mr-1" />
              Request Access
            </Button>

            <Button
              size="sm"
              className="w-full text-xs bg-yellow-300 hover:bg-yellow-400 text-black font-medium py-3"
            >
              <MessageCircle className="w-3 h-3 mr-1" />
              Message
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default CandidateCard;
