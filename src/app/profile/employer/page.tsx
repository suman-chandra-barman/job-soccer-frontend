"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useRef, useState } from "react";
import { Award, Camera, Edit, MessageCircle } from "lucide-react";
import Link from "next/link";
import EditEmployerPersonalInformationModal from "@/components/modals/EditEmployerPersonalInformationModal";
import { set } from "zod";

const initialUser = {
  name: "Suman Barman",
  title: "Professional Player",
  avatar:
    "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1",
  verification: {
    age: true,
    personal: true,
  },
};

export default function MyProfilePage() {
  const [
    isEditPersonalInformationModalOpen,
    setIsEditPersonalInformationModalOpen,
  ] = useState(false);

  const [personalInformation, setPersonalInformation] = useState({
    country: "Uganda",
    phone: "+880 1636-828200",
    founded: "2010-01-01",
    address: "123 Main St, Kampala",
    socialMedia: "https://twitter.com/sumanbarman",
    level: "Professional",
    nationality: "Ugandan",
    website: "https://www.sumanbarman.com",
  });

  const [user, setUser] = useState(initialUser);
  const [bannerImage, setBannerImage] = useState(
    "https://images.pexels.com/photos/274422/pexels-photo-274422.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&dpr=1"
  );

  const bannerInputRef = useRef<HTMLInputElement>(null);
  const profileInputRef = useRef<HTMLInputElement>(null);

  const handleProfileImageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setUser((prev) => ({ ...prev, avatar: result }));
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
  return (
    <div className="px-4 w-full">
      <div className="relative mb-8">
        <div className="relative h-48 lg:h-64 bg-gradient-to-r from-blue-500 to-green-400 rounded-lg overflow-hidden group">
          <img
            src={bannerImage}
            alt="Soccer player"
            className="w-full h-full object-cover"
          />
          {/* Banner Edit Button */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300 flex items-center justify-center">
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
              className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 hover:bg-white text-gray-800"
            >
              <Camera className="h-4 w-4 mr-2" />
              Edit Banner
            </Button>
          </div>
        </div>

        <div className="absolute -bottom-16 left-4 lg:left-8">
          <div className="relative group">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-24 h-24 lg:w-32 lg:h-32 rounded-full border-4 border-white object-cover"
            />
            {/* Profile Image Edit Button */}
            <div className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 rounded-full flex items-center justify-center bg-black/0 group-hover:bg-black/50">
              <input
                type="file"
                accept="image/*"
                onChange={handleProfileImageChange}
                className="hidden"
                ref={profileInputRef}
              />
              <Button
                onClick={() => profileInputRef.current?.click()}
                variant="secondary"
                size="sm"
                className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 hover:bg-white text-gray-800 rounded-full p-2"
              >
                <Camera className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Info */}
      <div className="mt-20 mb-8">
        <div className="mb-6">
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-3xl font-bold text-gray-900">{user.name}</h2>
            <div className="items-center flex gap-2">
              <Button variant="outline">
                <Link href="/message">
                  <span className="flex items-center gap-2">
                    <MessageCircle />
                    Message
                  </span>
                </Link>
              </Button>
              <Button variant="outline">Follow</Button>
            </div>
          </div>
          <div className="flex gap-2 flex-wrap mt-4">
            <Badge className="bg-yellow-100 border-yellow-200 px-4 rounded-full">
              {user.title}
            </Badge>
            <Button
              variant="outline"
              size="sm"
              className="bg-gray-100 rounded-full hover:bg-gray-200"
            >
              <Award className="!w-5 !h-5" /> Age Verification Badge
            </Button>
          </div>
        </div>
      </div>

      <div className="p-4 md:p-6 border rounded-2xl shadow">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-900">
            Overview
          </h2>
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-600 hover:text-gray-900"
          >
            <Edit className="w-4 h-4 mr-1" />
            Edit
          </Button>
        </div>
        <p className="text-gray-700 mb-6">
          This is your public profile. Share your skills, experience, and
          achievements to attract potential employers and showcase your soccer
          journey. Make sure to keep your information up-to-date and highlight
          your unique qualities as a player. Stand out in the competitive world
          of soccer and take your career to the next level!
        </p>

        {/* Player Details Section */}
        <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-semibold text-gray-900">
                Professional Information
              </h2>
            </div>
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            <div>
              <label className="text-sm text-gray-500 mb-1 block">
                Country
              </label>
              <p className="text-gray-900 font-medium">
                {personalInformation.country}
              </p>
            </div>
            <div>
              <label className="text-sm text-gray-500 mb-1 block">
                Phone number
              </label>
              <p className="text-gray-900 font-medium">
                {personalInformation.phone}
              </p>
            </div>

            <div>
              <label className="text-sm text-gray-500 mb-1 block">
                Website
              </label>
              <p className="text-gray-900 font-medium">
                {personalInformation.website}
              </p>
            </div>
            <div>
              <label className="text-sm text-gray-500 mb-1 block">
                Address
              </label>
              <p className="text-gray-900 font-medium">
                {personalInformation.address}
              </p>
            </div>
            <div>
              <label className="text-sm text-gray-500 mb-1 block">
                Founded
              </label>
              <p className="text-gray-900 font-medium">
                {personalInformation.founded}
              </p>
            </div>

            <div>
              <label className="text-sm text-gray-500 mb-1 block">
                Nationality
              </label>
              <p className="text-gray-900 font-medium">
                {personalInformation.nationality}
              </p>
            </div>
            <div>
              <label className="text-sm text-gray-500 mb-1 block">Level</label>
              <p className="text-gray-900 font-medium">
                {personalInformation.level}
              </p>
            </div>
            <div>
              <label className="text-sm text-gray-500 mb-1 block">
                Social Media
              </label>
              <p className="text-gray-900 font-medium">
                {personalInformation.socialMedia}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Personal Information Modal */}
      <EditEmployerPersonalInformationModal
        isOpen={isEditPersonalInformationModalOpen}
        onClose={() => setIsEditPersonalInformationModalOpen(false)}
        initialData={personalInformation}
      />
    </div>
  );
}
