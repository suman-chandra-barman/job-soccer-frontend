import React, { useState } from "react";
import { Card, CardContent } from "../ui/card";
import { Bookmark, Lock, MapPin, MessageCircle, SquarePen } from "lucide-react";
import { FaPlayCircle } from "react-icons/fa";
import { Button } from "../ui/button";
import { ICandidate } from "@/types/user";
import { Avatar, AvatarFallback } from "../ui/avatar";
import Image from "next/image";
import Link from "next/link";
import {
  useShortlistCandidateMutation,
  useRemoveFromShortlistMutation,
} from "@/redux/features/candidateShortlist/candidateShortlistApi";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  addToShortlist,
  removeFromShortlist,
} from "@/redux/features/candidateShortlist/candidateShortlistSlice";
import { toast } from "sonner";
import VideoPlayerModal from "../modals/VideoPlayerModal";

function CandidateCard({ candidate }: { candidate: ICandidate }) {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const dispatch = useAppDispatch();
  const shortlistedIds = useAppSelector(
    (state) => state.candidateShortlist.shortlistedIds
  );
  const isShortlisted = shortlistedIds.includes(candidate._id);

  const [shortlistCandidate, { isLoading: isShortlisting }] =
    useShortlistCandidateMutation();
  const [removeFromShortlistApi, { isLoading: isRemoving }] =
    useRemoveFromShortlistMutation();

  const handleShortlist = async () => {
    try {
      if (isShortlisted) {
        await removeFromShortlistApi(candidate._id).unwrap();
        dispatch(removeFromShortlist(candidate._id));
        toast.success("Removed from shortlist");
      } else {
        await shortlistCandidate(candidate._id).unwrap();
        dispatch(addToShortlist(candidate._id));
        toast.success("Added to shortlist");
      }
    } catch (error) {
      const err = error as { data?: { message?: string } };
      toast.error(err?.data?.message || "Failed to update shortlist");
    }
  };

  return (
    <div className="h-full">
      <Card className="bg-linear-to-br from-white to-[#FDF9E3] border-0 shadow-sm hover:shadow-md transition-shadow h-full flex flex-col">
        <CardContent className="p-6 flex-1 flex flex-col">
          {/* Profile Header */}
          <div className="flex items-center gap-3 mb-4">
            {candidate?.profileImage ? (
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-transparent hover:border-green-500 transition-colors">
                <Image
                  src={`${process.env.NEXT_PUBLIC_BASE_URL}${candidate.profileImage}`}
                  alt={`${candidate?.firstName || ""} ${
                    candidate?.lastName || ""
                  }`}
                  width={48}
                  height={48}
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <Avatar className="w-12 h-12">
                <AvatarFallback className="text-base font-medium">
                  {candidate?.firstName?.charAt(0)}
                  {candidate?.lastName?.charAt(0)}
                </AvatarFallback>
              </Avatar>
            )}
            <div>
              <h4 className=" text-sm xl:text-base font-semibold text-gray-900">
                {candidate.firstName + " " + candidate.lastName}
              </h4>
              <p className="text-xs xl:text-sm text-gray-500">
                {candidate.role}
              </p>
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

          <Link
            href={`/candidates/${candidate._id}`}
            className="flex mb-3 items-center gap-1 text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            <SquarePen className="w-4 h-4" />
            View Profile
          </Link>
          <button
            onClick={() => setIsVideoModalOpen(true)}
            disabled={!candidate?.profile?.videos?.length}
            className="flex mb-6 items-center gap-1 text-sm transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FaPlayCircle className="w-4 h-4 text-red-500 hover:text-red-600" />
            Watch Interview{" "}
            {candidate?.profile?.videos?.length
              ? `(${candidate.profile.videos.length})`
              : ""}
          </button>

          {/* Spacer to push footer to bottom */}
          <div className="flex-1"></div>

          {/* Card Footer - Action Buttons */}
          <div className="space-y-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleShortlist}
              disabled={isShortlisting || isRemoving}
              className={`w-full text-xs hover:scale-105 transition-transform duration-200 ${
                isShortlisted
                  ? "bg-green-50 border-green-500 text-green-700"
                  : "bg-transparent"
              }`}
            >
              {isShortlisting || isRemoving ? (
                <>
                  <span className="w-3 h-3 mr-1 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
                  {isShortlisted ? "Removing..." : "Adding..."}
                </>
              ) : (
                <>
                  <Bookmark
                    className={`w-3 h-3 mr-1 ${
                      isShortlisted ? "fill-current" : ""
                    }`}
                  />
                  {isShortlisted ? "Shortlisted" : "Shortlist"}
                </>
              )}
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
              className="w-full text-xs bg-yellow-300 hover:scale-105 transition-transform duration-200"
            >
              <MessageCircle className="w-3 h-3 mr-1" />
              Message
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Video Player Modal */}
      {candidate?.profile?.videos?.length > 0 && (
        <VideoPlayerModal
          isOpen={isVideoModalOpen}
          onClose={() => setIsVideoModalOpen(false)}
          videos={candidate.profile.videos}
          candidateName={`${candidate.firstName} ${candidate.lastName}`}
        />
      )}
    </div>
  );
}

export default CandidateCard;
