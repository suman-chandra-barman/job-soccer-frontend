"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Plus,
  UserPlus,
  Edit,
  Award,
  LayoutGrid,
  Upload,
  Mail,
} from "lucide-react";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import UploadResumeModal from "@/components/modals/UploadResumeModal";
import EditPersonalInformationModal from "@/components/modals/EditPersonalInformationModal";
import EditPlayerDetailsModal from "@/components/modals/EditPlayerDetailsModal";
import { useAppSelector } from "@/redux/hooks";
import { ProfileSkeleton } from "@/components/skeleton";
import ExperienceSection from "@/components/profile/ExperienceSection";
import CertificateSection from "@/components/profile/CertificateSection";
import EducationSection from "@/components/profile/EducationSection";
import VideoSection from "@/components/profile/VideoSection";

export default function MyProfilePage() {
  // Get user data from Redux store
  const currentUser = useAppSelector((state) => state.auth.user);

  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [
    isEditPersonalInformationModalOpen,
    setIsEditPersonalInformationModalOpen,
  ] = useState(false);
  const [isEditPlayerDetailsModalOpen, setIsPlayerDetailsModalOpen] =
    useState(false);

  const [bannerImage, setBannerImage] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  const bannerInputRef = useRef<HTMLInputElement>(null);
  const profileInputRef = useRef<HTMLInputElement>(null);

  const handleProfileImageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target?.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        // TODO: Upload profile image to server via API
        console.log("Profile image selected:", result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBannerImageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setBannerImage(result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Prepare display data from Redux store
  const displayName = currentUser
    ? `${currentUser.firstName} ${currentUser.lastName}`
    : "User";

  const displayAvatar = currentUser?.profileImage
    ? `${process.env.NEXT_PUBLIC_BASE_URL}${currentUser.profileImage}`
    : "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1";
  const displayRole = currentUser?.role || "Professional Player";

  // Handle loading state
  useEffect(() => {
    if (currentUser) {
      // Simulate minimal loading time for smooth transition
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [currentUser]);

  // Log user data for debugging
  console.log("Current User from Redux:", currentUser);

  // Show loading skeleton while data is loading
  if (isLoading || !currentUser) {
    return <ProfileSkeleton />;
  }

  return (
    <div className="px-4">
      <div className="relative mb-8">
        {/* ------------------------Banner and Profile Picture--------------------------- */}
        <div className="relative h-48 lg:h-64 bg-gradient-to-br from-gray-100 via-gray-50 to-gray-50 rounded-lg overflow-hidden group">
          {bannerImage ? (
            <Image
              src={bannerImage}
              alt="Profile banner"
              fill
              className="object-cover"
              priority
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-center text-gray-400">
                <svg
                  className="w-16 h-16 mx-auto mb-2 opacity-50"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
            </div>
          )}

          {/* Banner Edit Button - Top Left */}
          <div className="absolute top-4 right-4">
            <input
              type="file"
              accept="image/*"
              onChange={handleBannerImageChange}
              className="hidden"
              ref={bannerInputRef}
            />
            <Button
              onClick={() => bannerInputRef.current?.click()}
              variant="secondary"
              size="sm"
              className="bg-white cursor-pointer hover:bg-gray-100 text-gray-700 shadow-md rounded-full px-3 py-2 flex items-center gap-2"
            >
              {bannerImage ? (
                <Edit className="h-4 w-4" />
              ) : (
                <Plus className="h-4 w-4" />
              )}
              <span className="hidden sm:inline text-sm font-medium">
                {bannerImage ? "Edit" : "Add"}
              </span>
            </Button>
          </div>
        </div>

        <div className="absolute -bottom-16 left-4 lg:left-8">
          <div className="relative">
            <div className="relative w-24 h-24 lg:w-32 lg:h-32 rounded-full border-4 border-white overflow-hidden bg-white">
              <Image
                src={displayAvatar}
                alt={displayName}
                fill
                className="object-cover"
                priority
              />
            </div>
            {/* Profile Image Edit Button - Bottom Right Badge */}
            <input
              type="file"
              accept="image/*"
              onChange={handleProfileImageChange}
              className="hidden"
              ref={profileInputRef}
            />
            <button
              onClick={() => profileInputRef.current?.click()}
              className="absolute cursor-pointer bottom-0 right-0 w-6 h-6 lg:w-10 lg:h-10 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow flex items-center justify-center border-2 border-white"
              aria-label="Edit profile picture"
            >
              <Edit className="h-3 w-3 lg:h-4 lg:w-4 text-gray-700" />
            </button>
          </div>
        </div>
      </div>

      {/* Profile Info */}
      <div className="mt-20 mb-8 px-4">
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-gray-900">{displayName}</h2>

          {/* Contact Information */}
          <div className="flex flex-wrap gap-4 mt-2 mb-4 text-gray-600">
            {currentUser?.email && (
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span className="text-sm">{currentUser.email}</span>
              </div>
            )}
          </div>

          <div className="flex gap-2 flex-wrap mt-4">
            <Badge className="bg-yellow-100 border-yellow-200 px-4 rounded-full">
              {displayRole}
            </Badge>
            <Button variant="outline" className="rounded-full">
              <Award size={20} height={20} /> Add Verification Badge
            </Button>
            <Button
              variant="outline"
              className="flex items-center rounded-full"
              onClick={() => setIsUploadModalOpen(true)}
            >
              <Upload size={20} height={20} />
              Upload Resume
            </Button>
          </div>
        </div>
      </div>

      <div className="p-4 md:p-6 border rounded-2xl shadow">
        {/* ------------------------Profile  Information Section------------------- */}
        <div className="bg-white rounded-lg border shadow border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              Profile Information
            </h2>
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-600 hover:text-gray-900"
                onClick={() => setIsEditPersonalInformationModalOpen(true)}
              >
                <Edit className="w-4 h-4 mr-1" />
                Edit
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            {/* Personal Information Fields */}
            {currentUser?.profile?.dateOfBirth && (
              <div>
                <label className="text-sm text-gray-500 mb-1 block">
                  Date of birth
                </label>
                <p className="text-gray-900 font-medium">
                  {new Date(currentUser.profile.dateOfBirth).toLocaleDateString(
                    "en-US",
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }
                  )}
                </p>
              </div>
            )}

            {currentUser?.profile?.placeOfBirth && (
              <div>
                <label className="text-sm text-gray-500 mb-1 block">
                  Place of birth
                </label>
                <p className="text-gray-900 font-medium">
                  {currentUser.profile.placeOfBirth}
                </p>
              </div>
            )}

            {currentUser?.profile?.nationality && (
              <div>
                <label className="text-sm text-gray-500 mb-1 block">
                  Nationality
                </label>
                <p className="text-gray-900 font-medium">
                  {currentUser.profile.nationality}
                </p>
              </div>
            )}

            <div>
              <label className="text-sm text-gray-500 mb-1 block">
                Phone number
              </label>
              <p className="text-gray-900 font-medium">
                {currentUser?.profile?.phoneNumber
                  ? currentUser.profile.phoneNumber
                  : "N/A"}
              </p>
            </div>

            {/* Professional Information Fields */}
            {currentUser?.profile?.gender && (
              <div>
                <label className="text-sm text-gray-500 mb-1 block">
                  Gender
                </label>
                <p className="text-gray-900 font-medium">
                  {currentUser.profile.gender}
                </p>
              </div>
            )}

            {currentUser?.profile?.position && (
              <div>
                <label className="text-sm text-gray-500 mb-1 block">
                  Position
                </label>
                <p className="text-gray-900 font-medium">
                  {currentUser.profile.position}
                </p>
              </div>
            )}

            {currentUser?.profile?.height && (
              <div>
                <label className="text-sm text-gray-500 mb-1 block">
                  Height
                </label>
                <p className="text-gray-900 font-medium">
                  {currentUser.profile.height.size}{" "}
                  {currentUser.profile.height.unit}
                </p>
              </div>
            )}

            {currentUser?.profile?.weight && (
              <div>
                <label className="text-sm text-gray-500 mb-1 block">
                  Weight
                </label>
                <p className="text-gray-900 font-medium">
                  {currentUser.profile.weight.size}{" "}
                  {currentUser.profile.weight.unit}
                </p>
              </div>
            )}

            {currentUser?.profile?.currentClub && (
              <div>
                <label className="text-sm text-gray-500 mb-1 block">
                  Current Club
                </label>
                <p className="text-gray-900 font-medium">
                  {currentUser.profile.currentClub}
                </p>
              </div>
            )}

            {currentUser?.profile?.availability && (
              <div>
                <label className="text-sm text-gray-500 mb-1 block">
                  Availability
                </label>
                <p className="text-gray-900 font-medium">
                  {currentUser.profile.availability}
                </p>
              </div>
            )}

            {currentUser?.profile?.foot && (
              <div>
                <label className="text-sm text-gray-500 mb-1 block">Foot</label>
                <p className="text-gray-900 font-medium">
                  {currentUser.profile.foot}
                </p>
              </div>
            )}

            {currentUser?.profile?.league && (
              <div>
                <label className="text-sm text-gray-500 mb-1 block">
                  League
                </label>
                <p className="text-gray-900 font-medium">
                  {currentUser.profile.league}
                </p>
              </div>
            )}

            {currentUser?.profile?.country && (
              <div>
                <label className="text-sm text-gray-500 mb-1 block">
                  Country
                </label>
                <p className="text-gray-900 font-medium">
                  {currentUser.profile.country}
                </p>
              </div>
            )}

            {currentUser?.profile?.agent && (
              <div>
                <label className="text-sm text-gray-500 mb-1 block">
                  Agent
                </label>
                <p className="text-gray-900 font-medium">
                  {currentUser.profile.agent}
                </p>
              </div>
            )}

            {currentUser?.profile?.socialMedia && (
              <div>
                <label className="text-sm text-gray-500 mb-1 block">
                  Social Media
                </label>
                <p className="text-blue-600 font-medium cursor-pointer hover:underline">
                  {currentUser.profile.socialMedia}
                </p>
              </div>
            )}

            {/* Professional Player specific fields */}
            {currentUser?.profile?.contractExpires && (
              <div>
                <label className="text-sm text-gray-500 mb-1 block">
                  Contract Expires
                </label>
                <p className="text-gray-900 font-medium">
                  {currentUser.profile.contractExpires}
                </p>
              </div>
            )}

            {currentUser?.profile?.division && (
              <div>
                <label className="text-sm text-gray-500 mb-1 block">
                  Division
                </label>
                <p className="text-gray-900 font-medium">
                  {currentUser.profile.division}
                </p>
              </div>
            )}

            {currentUser?.profile?.nationalTeamCategory && (
              <div>
                <label className="text-sm text-gray-500 mb-1 block">
                  National Team Category
                </label>
                <p className="text-gray-900 font-medium">
                  {currentUser.profile.nationalTeamCategory}
                </p>
              </div>
            )}

            {currentUser?.profile?.nationalTeamGames && (
              <div>
                <label className="text-sm text-gray-500 mb-1 block">
                  National Team Games
                </label>
                <p className="text-gray-900 font-medium">
                  {currentUser.profile.nationalTeamGames}
                </p>
              </div>
            )}

            {currentUser?.profile?.teamsJoined && (
              <div>
                <label className="text-sm text-gray-500 mb-1 block">
                  Teams Joined
                </label>
                <p className="text-gray-900 font-medium">
                  {currentUser.profile.teamsJoined}
                </p>
              </div>
            )}

            {/* College/High School specific fields */}
            {currentUser?.profile?.schoolName && (
              <div>
                <label className="text-sm text-gray-500 mb-1 block">
                  School Name
                </label>
                <p className="text-gray-900 font-medium">
                  {currentUser.profile.schoolName}
                </p>
              </div>
            )}

            {currentUser?.profile?.collegeOrUniversity && (
              <div>
                <label className="text-sm text-gray-500 mb-1 block">
                  College/University
                </label>
                <p className="text-gray-900 font-medium">
                  {currentUser.profile.collegeOrUniversity}
                </p>
              </div>
            )}

            {currentUser?.profile?.diploma && (
              <div>
                <label className="text-sm text-gray-500 mb-1 block">
                  Diploma
                </label>
                <p className="text-gray-900 font-medium">
                  {currentUser.profile.diploma}
                </p>
              </div>
            )}

            {currentUser?.profile?.gpa && (
              <div>
                <label className="text-sm text-gray-500 mb-1 block">GPA</label>
                <p className="text-gray-900 font-medium">
                  {currentUser.profile.gpa}
                </p>
              </div>
            )}

            {currentUser?.profile?.satOrAct && (
              <div>
                <label className="text-sm text-gray-500 mb-1 block">
                  SAT/ACT
                </label>
                <p className="text-gray-900 font-medium">
                  {currentUser.profile.satOrAct}
                </p>
              </div>
            )}

            {currentUser?.profile?.category && (
              <div>
                <label className="text-sm text-gray-500 mb-1 block">
                  Category
                </label>
                <p className="text-gray-900 font-medium">
                  {currentUser.profile.category}
                </p>
              </div>
            )}

            {/* Office Staff specific fields */}
            {currentUser?.profile?.languages && (
              <div>
                <label className="text-sm text-gray-500 mb-1 block">
                  Languages
                </label>
                <p className="text-gray-900 font-medium">
                  {currentUser.profile.languages}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* -------------------------Analytics Cards----------------------- */}
        <div className="my-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Analytics</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <LayoutGrid className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      Profile View
                    </h3>
                    <p className="text-sm text-gray-600">
                      Discover who&apos;s viewed your profile
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-green-100 rounded-lg">
                    <UserPlus className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      Access Request
                    </h3>
                    <p className="text-sm text-gray-600">
                      Discover who&apos;s viewed your profile
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* ------------------ Experience, Certificate, Education, and Video Sections --------------------*/}
        <ExperienceSection userId={currentUser?._id || ""} />
        <CertificateSection userId={currentUser?._id || ""} />
        <EducationSection userId={currentUser?._id || ""} />
        <VideoSection
          videos={currentUser?.profile?.videos || []}
          userId={currentUser?._id || ""}
        />
      </div>

      {/* ------------------Modals --------------------*/}
      <UploadResumeModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        jobId=""
      />
      <EditPersonalInformationModal
        isOpen={isEditPersonalInformationModalOpen}
        onClose={() => setIsEditPersonalInformationModalOpen(false)}
        initialData={currentUser?.profile || {}}
      />
      <EditPlayerDetailsModal
        isOpen={isEditPlayerDetailsModalOpen}
        onClose={() => setIsPlayerDetailsModalOpen(false)}
        initialData={currentUser?.profile || {}}
      />
    </div>
  );
}
