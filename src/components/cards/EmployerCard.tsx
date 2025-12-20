import { MapPin, ShieldCheck, Star, UserRoundPlus, Users } from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";
import { StartChatButton } from "../messaging/StartChatButton";
import { IEmployer } from "@/types/user";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { useFollowEmployerMutation } from "@/redux/features/follow/followApi";
import { useAppDispatch } from "@/redux/hooks";
import { addToFollowing } from "@/redux/features/follow/followSlice";
import { toast } from "sonner";

export function EmployerCard({ employer }: { employer: IEmployer }) {
  const dispatch = useAppDispatch();

  const [followEmployer, { isLoading: isFollowLoading }] =
    useFollowEmployerMutation();

  // Use isFollowing from API if available
  const isFollowing = employer.isFollowing ?? false;

  const handleFollow = async () => {
    try {
      await followEmployer(employer._id).unwrap();
      dispatch(addToFollowing(employer._id));
      toast.success(
        isFollowing ? "Unfollowed successfully" : "Followed successfully"
      );
    } catch (error) {
      const err = error as { data?: { message?: string } };
      toast.error(err?.data?.message || "Failed to follow employer");
    }
  };
  // Get profile image URL
  const getEmployerLogoUrl = () => {
    if (employer?.profileImage) {
      return `${process.env.NEXT_PUBLIC_BASE_URL}${employer.profileImage}`;
    }
    return null;
  };

  const logoUrl = getEmployerLogoUrl();
  const employerName = `${employer?.firstName || ""} ${
    employer?.lastName || ""
  }`.trim();
  const firstNameInitial = employer?.firstName?.charAt(0)?.toUpperCase() || "";
  const lastNameInitial = employer?.lastName?.charAt(0)?.toUpperCase() || "";

  return (
    <div className="bg-gradient-to-br from-white to-[#FDF9E3] rounded-xl p-4 shadow-sm border border-gray-100 flex flex-col h-full">
      <div className="border-b border-gray-200 pb-4">
        <div className="flex items-center gap-3 mb-4 ">
          {logoUrl ? (
            <div className="w-12 h-12 rounded-xl overflow-hidden border border-gray-200 bg-white">
              <Image
                src={logoUrl}
                alt={`${employerName} Logo`}
                width={48}
                height={48}
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <Avatar className="w-12 h-12 rounded-xl">
              <AvatarFallback className="text-base font-semibold bg-black text-white rounded-xl">
                {firstNameInitial}
                {lastNameInitial}
              </AvatarFallback>
            </Avatar>
          )}
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 text-lg truncate">
              {employerName || "Unknown Employer"}
            </h3>
            <div className="flex items-center gap-1 text-gray-500 text-sm mt-1">
              <MapPin className="w-4 h-4 flex-shrink-0" />
              <span className="truncate">
                {employer?.profile?.location || "Location not specified"}
              </span>
            </div>
          </div>
        </div>

        <div className="flex gap-2 items-center flex-wrap">
          <span className="rounded-full text-green-500 border border-green-500 px-2 py-1 text-xs flex items-center gap-1">
            <ShieldCheck className="w-4 h-4" />
            Verified
          </span>
          <span className="rounded-full border border-black  px-2 py-1 text-xs">
            {employer?.profile?.clubName}
          </span>
        </div>
      </div>

      {/* Bottom section with applicant count, salary, and time */}
      <div className="flex items-center justify-between flex-grow">
        <div className="flex flex-col gap-4 py-4">
          <div className="text-gray-600 text-sm">
            <Star className="w-4 h-4 inline-block text-yellow-500 mr-2" />
            <span className="font-bold">Active Job Posts:</span>{" "}
            {employer?.activeJobCount || 0}
          </div>
          <div className="text-gray-600 text-sm">
            <Users className="w-4 h-4 inline-block text-gray-500 mr-2" />
            <span className="font-bold">Followers:</span>{" "}
            {employer?.followerCount || 0}
          </div>
        </div>
      </div>

      {/* Footer - Always at bottom */}
      <div className="border-t border-gray-200 pt-4 flex gap-2 items-center mt-auto">
        <Button
          onClick={handleFollow}
          disabled={isFollowLoading}
          variant="outline"
          className={`w-1/2 hover:scale-105 transition-transform duration-200 font-semibold px-6 py-3 ${
            isFollowing ? "bg-green-50 border-green-500 text-green-700" : ""
          }`}
        >
          {isFollowLoading ? (
            <>{isFollowing ? "Unfollowing..." : "Following..."}</>
          ) : (
            <>
              <UserRoundPlus className="w-6 h-6" />
              {isFollowing ? "Following" : "Follow"}
            </>
          )}
        </Button>
        <StartChatButton
          userId={employer._id}
          userName={employerName}
          className="w-1/2 hover:scale-105 transition-transform duration-200 font-semibold px-6 py-3"
        />
      </div>
    </div>
  );
}
