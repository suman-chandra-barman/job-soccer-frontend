"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  Plus,
  UserPlus,
  Edit,
  Award,
  Play,
  GraduationCap,
  LayoutGrid,
} from "lucide-react";
import Image from "next/image";
import userImg from "@/assets/candidates/user1.png";
import banner from "@/assets/banner.jpg";
import AddExperienceModal, {
  type FormData as ExperienceFormData,
} from "@/components/modals/AddExperienceModal";
import { useState } from "react";
import AddLicensesOrCertificationsModal, {
  type FormData as CertificationFormData,
} from "@/components/modals/AddLicensesOrCertificationsModal";
import AddEducationModal, {
  FormData as EducationFormData,
} from "@/components/modals/AddEducationModal";

export interface Experience {
  id: string;
  company: string;
  position: string;
  duration: string;
  location: string;
  description: string;
  logo?: string;
}

const user = {
  name: "Suman Barman",
  title: "Professional Player",
  avatar: userImg,
  verification: {
    age: true,
    personal: true,
  },
};

const experiences: Experience[] = [
  {
    id: "1",
    company: "Nebula City FC",
    position: "Defence Player",
    duration: "Mar 2025 - Present",
    location: "Amsterdam, Hollandia",
    description:
      "It's an amazing company with a strong focus on collaboration and design thinking. I'm truly inspired by our team—based work process, where we prioritize research, user and client goals to build better, more",
  },
  {
    id: "2",
    company: "Nebula City FC",
    position: "Defence Player",
    duration: "Mar 2025 - Present",
    location: "Amsterdam, Hollandia",
    description:
      "It's an amazing company with a strong focus on collaboration and design thinking. I'm truly inspired by our team—based work process, where we prioritize research, user and client goals to build better, more",
  },
];
const certificates = [
  {
    id: "1",
    title: "UEFA Pro License",
    issuer: "UEFA",
    date: "Dec 2024",
    description:
      "It's an amazing company with a strong focus on collaboration and design thinking. I'm truly inspired by our team—based work process, where we prioritize research, user and client goals to build better, more",
  },
  {
    id: "2",
    title: "UEFA Pro License",
    issuer: "UEFA",
    date: "Dec 2024",
    description:
      "It's an amazing company with a strong focus on collaboration and design thinking. I'm truly inspired by our team—based work process, where we prioritize research, user and client goals to build better, more",
  },
];
const education = [
  {
    id: "1",
    institution: "Nebula City FC",
    degree: "Bachelor's",
    field: "Business",
    grade: "3.5",
    duration: "Mar 2025 - Present",
    description:
      "It's an amazing company with a strong focus on collaboration and design thinking. I'm truly inspired by our team—based work process, where we prioritize research, user and client goals to build better, more",
  },
  {
    id: "2",
    institution: "Nebula City FC",
    degree: "Bachelor's",
    field: "Business",
    grade: "3.5",
    duration: "Mar 2025 - Present",
    description:
      "It's an amazing company with a strong focus on collaboration and design thinking. I'm truly inspired by our team—based work process, where we prioritize research, user and client goals to build better, more",
  },
];
const videos = [
  {
    id: "1",
    thumbnail:
      "https://images.pexels.com/photos/274422/pexels-photo-274422.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=1",
    title: "Training Session 1",
  },
  {
    id: "2",
    thumbnail:
      "https://images.pexels.com/photos/1618200/pexels-photo-1618200.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=1",
    title: "Match Highlights",
  },
  {
    id: "3",
    thumbnail:
      "https://images.pexels.com/photos/1618269/pexels-photo-1618269.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=1",
    title: "Skills Training",
  },
];

export default function MyProfilePage() {
  const [isAddExperienceModalOpen, setIsAddExperienceModalOpen] =
    useState(false);
  const [
    isAddLicensesOrCertificationsModalOpen,
    setIsAddLicensesOrCertificationsModalOpen,
  ] = useState(false);

  const [isAddEducationModalOpen, setIsAddEducationModalOpen] = useState(false);

  const handleSaveExperience = (data: ExperienceFormData) => {
    console.log("Experience data saved:", data);
    // Save the experience data
    setIsAddExperienceModalOpen(false);
  };

  const handleSaveLicensesOrCertifications = (data: CertificationFormData) => {
    console.log("Licenses or Certifications data saved:", data);
    // Save the licenses or certifications data
    setIsAddLicensesOrCertificationsModalOpen(false);
  };

  const handleAddEducation = (data: EducationFormData) => {
    console.log("Education data saved:", data);
    // Save the education data
    setIsAddEducationModalOpen(false);
  };

  return (
    <div className="px-4">
      {/* Hero Section */}
      <div className="relative mb-8">
        <div className="h-48 lg:h-64 bg-gradient-to-r from-blue-500 to-green-400 rounded-lg overflow-hidden">
          <Image
            src={banner}
            alt="Soccer player"
            className="w-full object-cover"
          />
        </div>

        <div className="absolute -bottom-16 left-8">
          <div className="relative">
            <Image
              src={user.avatar}
              alt={user.name}
              className="rounded-full border-4 border-white object-cover"
              width={128}
              height={128}
            />
          </div>
        </div>
      </div>

      {/* Profile Info */}
      <div className="mt-20 mb-8">
        <div className="mb-4">
          <h2 className="text-3xl font-bold text-gray-900">{user.name}</h2>
          <div className="flex gap-2 mt-4">
            <Badge className="bg-yellow-100 border-yellow-200 px-4 py-1 rounded-full">
              {user.title}
            </Badge>
            <Badge
              variant="default"
              className="bg-gray-100 rounded-full border-gray-100"
            >
              <Award className="!w-4 !h-4" /> Age Verification Badge
            </Badge>
            <Badge
              variant="secondary"
              className="bg-gray-100 rounded-full border-gray-100"
            >
              Personal Information
            </Badge>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <Button
            variant="outline"
            className="flex items-center rounded-full"
            onClick={() => setIsAddExperienceModalOpen(true)}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Experience
          </Button>
          <Button
            variant="outline"
            className="flex items-center rounded-full"
            onClick={() => setIsAddLicensesOrCertificationsModalOpen(true)}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Licenses or Certifications
          </Button>
          <Button
            variant="outline"
            className="flex items-center rounded-full"
            onClick={() => setIsAddEducationModalOpen(true)}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Education
          </Button>
          <Button variant="outline" className="flex items-center rounded-full">
            <Plus className="mr-2 h-4 w-4" />
            Upload Resume
          </Button>
        </div>
      </div>
      <div className="py-8">
        <div>
          {/* Personal Contact Section */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                Personal Contact
              </h2>
              <div className="flex items-center gap-3">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-600 hover:text-gray-900"
                >
                  <Edit className="w-4 h-4 mr-1" />
                  Edit
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              <div>
                <label className="text-sm text-gray-500 mb-1 block">
                  Position
                </label>
                <p className="text-gray-900 font-medium">Striker</p>
              </div>
              <div>
                <label className="text-sm text-gray-500 mb-1 block">
                  Phone number
                </label>
                <p className="text-gray-900 font-medium">+880 1636-828200</p>
              </div>
              <div>
                <label className="text-sm text-gray-500 mb-1 block">
                  Date of birth
                </label>
                <p className="text-gray-900 font-medium">
                  12 May, 1992 (age-32)
                </p>
              </div>
              <div>
                <label className="text-sm text-gray-500 mb-1 block">
                  Address
                </label>
                <p className="text-gray-900 font-medium">
                  33 Pendergast Aven e, GA, 30736
                </p>
              </div>
              <div>
                <label className="text-sm text-gray-500 mb-1 block">
                  Place of birth
                </label>
                <p className="text-gray-900 font-medium">Uganda</p>
              </div>
              <div>
                <label className="text-sm text-gray-500 mb-1 block">
                  Social Media
                </label>
                <p className="text-blue-600 font-medium cursor-pointer hover:underline">
                  Connect your Social Media
                </p>
              </div>
            </div>
          </div>

          {/* Player Details Section */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-semibold text-gray-900">
                  Player Details
                </h2>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-600 hover:text-gray-900"
              >
                <Edit className="w-4 h-4 mr-1" />
                Edit
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-6">
              <div>
                <label className="text-sm text-gray-500 mb-1 block">
                  Contract Expires
                </label>
                <p className="text-gray-900 font-medium">Contract Expires</p>
              </div>
              <div>
                <label className="text-sm text-gray-500 mb-1 block">
                  Market Value
                </label>
                <p className="text-gray-900 font-medium">$42,0000</p>
              </div>
              <div className="sm:col-span-2 lg:col-span-1"></div>

              <div>
                <label className="text-sm text-gray-500 mb-1 block">
                  On loan From
                </label>
                <p className="text-gray-900 font-medium">On loan From</p>
              </div>
              <div>
                <label className="text-sm text-gray-500 mb-1 block">
                  Current Club
                </label>
                <p className="text-gray-900 font-medium">Real Madrid CF</p>
              </div>
              <div className="sm:col-span-2 lg:col-span-1"></div>

              <div>
                <label className="text-sm text-gray-500 mb-1 block">
                  Shortlist
                </label>
                <p className="text-gray-900 font-medium">42 games</p>
              </div>
              <div>
                <label className="text-sm text-gray-500 mb-1 block">
                  Agent
                </label>
                <p className="text-gray-900 font-medium">Agent</p>
              </div>
              <div className="sm:col-span-2 lg:col-span-1"></div>

              <div>
                <label className="text-sm text-gray-500 mb-1 block">
                  Agent
                </label>
                <p className="text-gray-900 font-medium">Agent</p>
              </div>
              <div>
                <label className="text-sm text-gray-500 mb-1 block">
                  Height
                </label>
                <p className="text-gray-900 font-medium">5&apos;10</p>
              </div>
              <div>
                <label className="text-sm text-gray-500 mb-1 block">Age</label>
                <p className="text-gray-900 font-medium">36</p>
              </div>

              <div>
                <label className="text-sm text-gray-500 mb-1 block">
                  Position
                </label>
                <p className="text-gray-900 font-medium">Striker</p>
              </div>
              <div>
                <label className="text-sm text-gray-500 mb-1 block">
                  Weight
                </label>
                <p className="text-gray-900 font-medium">68kg</p>
              </div>
              <div className="sm:col-span-2 lg:col-span-1"></div>

              <div>
                <label className="text-sm text-gray-500 mb-1 block">
                  Gender
                </label>
                <p className="text-gray-900 font-medium">Male</p>
              </div>
              <div className="sm:col-span-2 lg:col-span-1"></div>
              <div className="sm:col-span-2 lg:col-span-1"></div>

              <div>
                <label className="text-sm text-gray-500 mb-1 block">
                  Languages
                </label>
                <p className="text-gray-900 font-medium">English, Spanish</p>
              </div>
              <div>
                <label className="text-sm text-gray-500 mb-1 block">
                  National Team Career
                </label>
                <p className="text-gray-900 font-medium">English, Spanish</p>
              </div>
              <div className="sm:col-span-2 lg:col-span-1"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Analytics Cards */}
      <div className="mb-8">
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
                  <h3 className="font-semibold text-gray-900">Profile View</h3>
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

      {/* Experience Section */}
      <Card className="mb-8">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Experience</CardTitle>
            <Button variant="ghost" size="sm">
              <Plus className="h-4 w-4" />
              Add
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {experiences.map((exp) => (
            <div
              key={exp.id}
              className="flex space-x-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                  NC
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {exp.company}
                    </h3>
                    <p className="text-sm text-gray-600">{exp.position}</p>
                    <p className="text-sm text-gray-500">{exp.duration}</p>
                    <div className="flex items-center mt-1">
                      <MapPin className="h-4 w-4 text-gray-400 mr-1" />
                      <span className="text-sm text-gray-500">
                        {exp.location}
                      </span>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>

                <p className="mt-3 text-sm text-gray-700 line-clamp-3">
                  {exp.description}
                </p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
      {/* Certificates Section */}
      <Card className="mb-8">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg lg:text-xl">Certificate</CardTitle>
            <Button variant="ghost" size="sm">
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline ml-1">Add</span>
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4 lg:space-y-6">
          {certificates.map((cert) => (
            <div
              key={cert.id}
              className="flex space-x-3 lg:space-x-4 p-3 lg:p-4 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex-shrink-0">
                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-green-600 rounded-lg flex items-center justify-center text-white font-bold text-xs lg:text-sm">
                  UE
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm lg:text-base">
                      {cert.title}
                    </h3>
                    <p className="text-xs lg:text-sm text-gray-600">
                      {cert.issuer}
                    </p>
                    <p className="text-xs lg:text-sm text-gray-500">
                      {cert.date}
                    </p>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Edit className="h-3 w-3 lg:h-4 lg:w-4" />
                  </Button>
                </div>

                <p className="mt-2 lg:mt-3 text-xs lg:text-sm text-gray-700 line-clamp-3">
                  {cert.description}
                </p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Education Section */}
      <Card className="mb-8">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg lg:text-xl">Education</CardTitle>
            <Button variant="ghost" size="sm">
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline ml-1">Add</span>
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4 lg:space-y-6">
          {education.map((edu) => (
            <div
              key={edu.id}
              className="flex space-x-3 lg:space-x-4 p-3 lg:p-4 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex-shrink-0">
                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                  <GraduationCap className="h-5 w-5 lg:h-6 lg:w-6 text-gray-600" />
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm lg:text-base">
                      {edu.institution}
                    </h3>
                    <p className="text-xs lg:text-sm text-gray-600">
                      Degree: {edu.degree}
                    </p>
                    <p className="text-xs lg:text-sm text-gray-600">
                      Field of study: {edu.field}
                    </p>
                    <p className="text-xs lg:text-sm text-gray-600">
                      Grade: {edu.grade}
                    </p>
                    <p className="text-xs lg:text-sm text-gray-500">
                      {edu.duration}
                    </p>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Edit className="h-3 w-3 lg:h-4 lg:w-4" />
                  </Button>
                </div>

                <p className="mt-2 lg:mt-3 text-xs lg:text-sm text-gray-700 line-clamp-3">
                  {edu.description}
                </p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Videos Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg lg:text-xl">Videos</CardTitle>
            <Button variant="ghost" size="sm">
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline ml-1">Add</span>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {videos.map((video) => (
              <div key={video.id} className="relative group cursor-pointer">
                <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-12 h-12 bg-white bg-opacity-90 rounded-full flex items-center justify-center">
                      <Play className="h-6 w-6 text-gray-800 ml-1" />
                    </div>
                  </div>
                </div>
                <p className="mt-2 text-sm font-medium text-gray-900">
                  {video.title}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Add Experience Modal */}
      {isAddExperienceModalOpen && (
        <AddExperienceModal
          isOpen={isAddExperienceModalOpen}
          onClose={() => setIsAddExperienceModalOpen(false)}
          onSave={handleSaveExperience}
        />
      )}

      {/* Add Licenses or Certifications Modal */}
      {isAddLicensesOrCertificationsModalOpen && (
        <AddLicensesOrCertificationsModal
          isOpen={isAddLicensesOrCertificationsModalOpen}
          onClose={() => setIsAddLicensesOrCertificationsModalOpen(false)}
          onSave={handleSaveLicensesOrCertifications}
        />
      )}

      {/* Add Education Modal */}
      {isAddEducationModalOpen && (
        <AddEducationModal
          isOpen={isAddEducationModalOpen}
          onClose={() => setIsAddEducationModalOpen(false)}
          onSave={handleAddEducation}
        />
      )}
    </div>
  );
}
