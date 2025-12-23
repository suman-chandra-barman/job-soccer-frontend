"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  BadgeCheck,
  Mail,
  XCircle,
  MessageCircle,
  UserPlus,
  UserMinus,
  Globe,
  MapPin,
  Phone,
  Calendar,
} from "lucide-react";
import Image from "next/image";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { toast } from "sonner";
import { useGetUserByIdQuery } from "@/redux/features/user/userApi";
import { ProfileSkeleton } from "@/components/skeleton/ProfileSkeleton";
import { useAppSelector } from "@/redux/hooks";
import { StartChatButton } from "@/components/messaging/StartChatButton";
import {
  useFollowEmployerMutation,
  useUnfollowEmployerMutation,
} from "@/redux/features/follow/followApi";

export default function EmployerDetailsPage() {
  const params = useParams();
  const employerId = params?.id as string;
  const currentUser = useAppSelector((state) => state.auth.user);

  // Check if viewing own profile
  const isOwnProfile = currentUser?._id === employerId;

  // Fetch employer data
  const {
    data: employerData,
    isLoading: isLoadingEmployer,
    error: employerError,
  } = useGetUserByIdQuery(employerId, {
    skip: !employerId,
  });

  // Follow/Unfollow mutations
  const [followEmployer, { isLoading: isFollowLoading }] =
    useFollowEmployerMutation();
  const [unfollowEmployer, { isLoading: isUnfollowLoading }] =
    useUnfollowEmployerMutation();

  // Local state for optimistic updates
  const [localIsFollowing, setLocalIsFollowing] = React.useState<
    boolean | null
  >(null);

  const employer = employerData?.data;

  // Use local state if available, otherwise use API data
  const isFollowing = localIsFollowing ?? employer?.isFollowing ?? false;
  const isLoading = isFollowLoading || isUnfollowLoading;

  // Handle follow/unfollow
  const handleFollowToggle = async () => {
    if (!currentUser) {
      toast.error("Please log in to follow employers");
      return;
    }

    const previousState = isFollowing;

    try {
      // Optimistic update
      setLocalIsFollowing(!isFollowing);

      if (isFollowing) {
        // Unfollow
        await unfollowEmployer(employerId).unwrap();
        toast.success("Unfollowed successfully");
      } else {
        // Follow
        await followEmployer(employerId).unwrap();
        toast.success("Followed successfully");
      }
    } catch (error) {
      // Revert on error
      setLocalIsFollowing(previousState);
      const err = error as { data?: { message?: string } };
      toast.error(
        err?.data?.message ||
          `Failed to ${isFollowing ? "unfollow" : "follow"} employer`
      );
    }
  };

  // Prepare display data
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "";
  const displayName = employer
    ? `${employer.firstName} ${employer.lastName}`.trim()
    : "Employer";

  const displayAvatar = employer?.profileImage
    ? `${BASE_URL}${employer.profileImage}`
    : null;

  const displayBanner = employer?.bannerImage
    ? `${BASE_URL}${employer.bannerImage}`
    : null;

  const displayRole = employer?.role;

  // Get verification status
  const verificationStatus = employer?.adminVerificationStatus;

  // Format founded date
  const formatFoundedDate = (dateString?: string) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Loading state
  if (isLoadingEmployer) {
    return <ProfileSkeleton />;
  }

  // Error state
  if (employerError || !employer) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Card className="max-w-md w-full">
          <CardContent className="p-6 text-center">
            <XCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Employer Not Found
            </h3>
            <p className="text-gray-600">
              The employer profile you&apos;re looking for doesn&apos;t exist or
              has been removed.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="px-4 max-w-7xl mx-auto relative">
      {/* Banner Section */}
      <div className="relative mb-8 h-64 rounded-2xl overflow-hidden bg-gradient-to-r from-green-400 to-blue-500">
        {displayBanner && (
          <Image
            src={displayBanner}
            alt="Banner"
            fill
            className="object-cover"
          />
        )}
      </div>

      {/* Profile Avatar */}
      <div className="relative -mt-32 mb-8 px-4">
        <div className="flex items-end gap-4 flex-wrap">
          <div className="relative">
            {displayAvatar ? (
              <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-white shadow-lg bg-white">
                <Image
                  src={displayAvatar}
                  alt={displayName}
                  width={160}
                  height={160}
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <Avatar className="w-40 h-40 border-4 border-white shadow-lg">
                <AvatarFallback className="text-4xl font-medium bg-gradient-to-br from-green-400 to-blue-500 text-white">
                  {employer?.firstName?.charAt(0)}
                  {employer?.lastName?.charAt(0)}
                </AvatarFallback>
              </Avatar>
            )}
          </div>

          {/* Profile Info */}
          <div className="flex-1 min-w-0 bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div className="flex-1 min-w-0">
                <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                  {displayName}
                  {verificationStatus?.status === "approved" && (
                    <BadgeCheck className="h-6 w-6 text-blue-500" />
                  )}
                </h2>

                {/* Contact Information */}
                <div className="flex flex-wrap gap-4 mt-2 mb-4 text-gray-600">
                  {employer?.email && (
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      <span className="text-sm">{employer.email}</span>
                    </div>
                  )}
                  {employer?.profile?.location && (
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span className="text-sm">
                        {employer.profile.location}
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex gap-2 flex-wrap">
                  {displayRole && (
                    <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200 px-4 rounded-full">
                      {displayRole}
                    </Badge>
                  )}
                  {employer?.profile?.clubName && (
                    <Badge className="bg-green-100 text-green-800 border-green-200 px-4 rounded-full">
                      {employer.profile.clubName}
                    </Badge>
                  )}
                </div>
              </div>

              {/* Action Buttons - Hide on own profile */}
              {!isOwnProfile && (
                <div className="flex gap-2 flex-wrap">
                  <StartChatButton
                    userId={employerId}
                    userName={displayName}
                    className="flex items-center gap-2"
                  />
                  <Button
                    variant="outline"
                    onClick={handleFollowToggle}
                    disabled={isLoading}
                    className={`flex items-center gap-2 ${
                      isFollowing
                        ? "bg-green-50 border-green-500 text-green-700"
                        : ""
                    }`}
                  >
                    {isLoading ? (
                      <>{isFollowing ? "Unfollowing..." : "Following..."}</>
                    ) : (
                      <>
                        {isFollowing ? (
                          <>
                            <UserMinus className="h-4 w-4" />
                            Unfollow
                          </>
                        ) : (
                          <>
                            <UserPlus className="h-4 w-4" />
                            Follow
                          </>
                        )}
                      </>
                    )}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 md:p-6 border rounded-2xl shadow bg-white">
        {/* Overview Section */}
        {employer?.profile?.clubDescription && (
          <div className="mb-6">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4">
              Overview
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {employer.profile.clubDescription}
            </p>
          </div>
        )}

        {/* Professional Information Section */}
        <div className="bg-white rounded-lg border shadow border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              Professional Information
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            {/* Club Name */}
            {employer?.profile?.clubName && (
              <div>
                <label className="text-sm text-gray-500 mb-1 block">
                  Club Name
                </label>
                <p className="text-gray-900 font-medium">
                  {employer.profile.clubName}
                </p>
              </div>
            )}

            {/* Country */}
            {employer?.profile?.country && (
              <div>
                <label className="text-sm text-gray-500 mb-1 block">
                  Country
                </label>
                <p className="text-gray-900 font-medium">
                  {employer.profile.country}
                </p>
              </div>
            )}

            {/* Phone Number */}
            {employer?.profile?.phoneNumber && (
              <div>
                <label className="text-sm text-gray-500 mb-1 block">
                  Phone Number
                </label>
                <p className="text-gray-900 font-medium flex items-center gap-2">
                  <Phone className="h-4 w-4 text-gray-500" />
                  {employer.profile.phoneNumber}
                </p>
              </div>
            )}

            {/* Website */}
            {employer?.profile?.website && (
              <div>
                <label className="text-sm text-gray-500 mb-1 block">
                  Website
                </label>
                <p className="text-blue-600 font-medium cursor-pointer hover:underline flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  <a
                    href={employer.profile.website}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {employer.profile.website}
                  </a>
                </p>
              </div>
            )}

            {/* Address */}
            {employer?.profile?.address && (
              <div>
                <label className="text-sm text-gray-500 mb-1 block">
                  Address
                </label>
                <p className="text-gray-900 font-medium flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-gray-500" />
                  {employer.profile.address}
                </p>
              </div>
            )}

            {/* Location */}
            {employer?.profile?.location && (
              <div>
                <label className="text-sm text-gray-500 mb-1 block">
                  Location
                </label>
                <p className="text-gray-900 font-medium">
                  {employer.profile.location}
                </p>
              </div>
            )}

            {/* Founded */}
            {employer?.profile?.founded && (
              <div>
                <label className="text-sm text-gray-500 mb-1 block">
                  Founded
                </label>
                <p className="text-gray-900 font-medium flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  {formatFoundedDate(employer.profile.founded)}
                </p>
              </div>
            )}

            {/* Level */}
            {employer?.profile?.level && (
              <div>
                <label className="text-sm text-gray-500 mb-1 block">
                  Level
                </label>
                <p className="text-gray-900 font-medium">
                  {employer.profile.level}
                </p>
              </div>
            )}

            {/* Nationality */}
            {employer?.profile?.nationality && (
              <div>
                <label className="text-sm text-gray-500 mb-1 block">
                  Nationality
                </label>
                <p className="text-gray-900 font-medium">
                  {employer.profile.nationality}
                </p>
              </div>
            )}

            {/* Club Contact */}
            {employer?.profile?.clubContact && (
              <div>
                <label className="text-sm text-gray-500 mb-1 block">
                  Club Contact
                </label>
                <p className="text-gray-900 font-medium">
                  {employer.profile.clubContact}
                </p>
              </div>
            )}

            {/* Active Job Count */}
            <div>
              <label className="text-sm text-gray-500 mb-1 block">
                Active Job Posts
              </label>
              <p className="text-gray-900 font-medium">
                {employer?.activeJobCount || 0}
              </p>
            </div>

            {/* Follower Count */}
            <div>
              <label className="text-sm text-gray-500 mb-1 block">
                Followers
              </label>
              <p className="text-gray-900 font-medium">
                {employer?.followerCount || 0}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
