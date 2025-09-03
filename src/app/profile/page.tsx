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
  Upload,
  Camera,
} from "lucide-react";
import Image from "next/image";
import userImg from "@/assets/candidates/user1.png";
import banner from "@/assets/banner.jpg";
import AddExperienceModal, {
  TExperience,
  type FormData as ExperienceFormData,
} from "@/components/modals/AddExperienceModal";
import { useState, useRef } from "react";
import AddLicensesOrCertificationsModal, {
  type FormData as CertificationFormData,
} from "@/components/modals/AddLicensesOrCertificationsModal";
import AddEducationModal, {
  FormData as EducationFormData,
} from "@/components/modals/AddEducationModal";
import UploadResumeModal from "@/components/modals/UploadResumeModal";
import EditPersonalInformationModal from "@/components/modals/EditPersonalInformationModal";
import EditPlayerDetailsModal from "@/components/modals/EditPlayerDetailsModal";
import EditExperienceModal from "@/components/modals/EditExperienceModal";
import EditLicenseOrCertificationsModal from "@/components/modals/EditLicensesOrCertificationsModal";
import EditEducationModal from "@/components/modals/EditEducationModal";
import AddVideoModal from "@/components/modals/AddVideoModal";

interface PersonalContact {
  position: string;
  phone: string;
  dob: string;
  address: string;
  placeOfBirth: string;
  socialMedia: string;
}

interface PlayerDetails {
  contractExpires: string;
  marketValue: string;
  onLoanFrom: string;
  currentClub: string;
  shortlist: string;
  agent: string;
  height: string;
  age: string;
  weight: string;
  position: string;
  gender: string;
  languages: string;
  nationalTeamCareer: string;
}

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
const experiences: TExperience[] = [
  {
    title: "Forward Striker",
    employmentType: "Full-time",
    club: "FC Barcelona",
    location: "Barcelona, Spain",
    isCurrentlyWorking: true,
    startMonth: "August",
    startYear: "2022",
    endMonth: undefined, // optional
    endYear: undefined, // optional
    description:
      "Playing as the main forward, responsible for scoring and assisting goals during league and international matches.",
  },
  {
    title: "Midfielder",
    employmentType: "Part-time",
    club: "Manchester United",
    location: "Manchester, UK",
    isCurrentlyWorking: false,
    startMonth: "January",
    startYear: "2020",
    endMonth: "June",
    endYear: "2021",
    description:
      "Worked as a central midfielder, managing ball distribution and supporting both defense and attack during matches.",
  },
];
const certificates = [
  {
    id: "cert-001",
    name: "UEFA Pro License",
    issuingOrganization: "UEFA",
    credentialId: "UEFA-PRO-2023-001234",
    credentialUrl: "https://www.uefa.com/certificates/pro-license/001234",
    startMonth: "March",
    startYear: "2023",
    endMonth: "December",
    endYear: "2025",
    description:
      "The highest coaching qualification in European football, covering advanced tactical analysis, leadership development, and elite-level coaching methodologies. This certification enables coaching at the highest professional levels including international teams and top-tier clubs.",
  },
  {
    id: "cert-002",
    name: "FIFA Coaching Certificate Level A",
    issuingOrganization: "FIFA",
    credentialId: "FIFA-COACH-A-2022-005678",
    credentialUrl:
      "https://www.fifa.com/development/coaching/certificates/005678",
    startMonth: "June",
    startYear: "2022",
    endMonth: "",
    endYear: "",
    description:
      "Comprehensive coaching certification covering modern football tactics, player development, sports psychology, and team management. Focuses on developing coaching skills for professional and semi-professional football environments with emphasis on youth development and performance optimization.",
  },
];
const education = [
  {
    id: "edu-001",
    schoolName: "University of Barcelona",
    degree: "Bachelor of Science",
    fieldOfStudy: "Sports Science and Physical Education",
    grade: "3.8 GPA",
    startMonth: "September",
    startYear: "2010",
    endMonth: "June",
    endYear: "2014",
    description:
      "Comprehensive study of sports science including biomechanics, exercise physiology, sports psychology, and nutrition. Specialized in football performance analysis and athlete development. Completed thesis on 'Impact of High-Intensity Training on Professional Football Players' which received academic recognition.",
  },
  {
    id: "edu-002",
    schoolName: "Real Madrid Graduate School - Universidad Europea",
    degree: "Master of Science",
    fieldOfStudy: "Football Management and Analytics",
    grade: "4.0 GPA",
    startMonth: "January",
    startYear: "2015",
    endMonth: "December",
    endYear: "2016",
    description:
      "Advanced program focusing on modern football management, data analytics, tactical analysis, and sports business administration. Collaborated with Real Madrid coaching staff on research projects involving player performance metrics and team strategy optimization. Graduated summa cum laude with specialization in youth academy development.",
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
  const [
    isEditLicensesOrCertificationsModalOpen,
    setIsEditLicensesOrCertificationsModalOpen,
  ] = useState(false);

  const [isAddEducationModalOpen, setIsAddEducationModalOpen] = useState(false);
  const [isEditEducationModalOpen, setIsEditEducationModalOpen] =
    useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isAddVideoModalOpen, setIsAddVideoModalOpen] = useState(false);
  const [
    isEditPersonalInformationModalOpen,
    setIsEditPersonalInformationModalOpen,
  ] = useState(false);
  const [isEditPlayerDetailsModalOpen, setIsPlayerDetailsModalOpen] =
    useState(false);
  const [isEditExperienceModalOpen, setIsEditExperienceModalOpen] =
    useState(false);

  const [personalContact, setPersonalContact] = useState<PersonalContact>({
    position: "Striker",
    phone: "+880 1636-828200",
    dob: "12 May, 1992 (age-32)",
    address: "33 Pendergast Avenue, GA, 30736",
    placeOfBirth: "Uganda",
    socialMedia: "Connect your Social Media",
  });

  const [playerDetails, setPlayerDetails] = useState<PlayerDetails>({
    contractExpires: "June 2025",
    marketValue: "$42,000",
    onLoanFrom: "Not on loan",
    currentClub: "Real Madrid CF",
    shortlist: "42 games",
    agent: "Sports Agent Pro",
    height: "5'10\"",
    age: "36",
    weight: "68kg",
    position: "Striker",
    gender: "Male",
    languages: "English, Spanish",
    nationalTeamCareer: "English, Spanish",
  });

  const [editExperienceData, setEditExperienceData] = useState(null);
  const [editLicensesOrCertifications, setEditLicensesOrCertifications] =
    useState(null);
  const [editEducation, setEditEducation] = useState(null);

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
    <div className="px-4">
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
          <h2 className="text-3xl font-bold text-gray-900">{user.name}</h2>
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

        <div className="flex flex-wrap gap-3">
          <Button
            variant="outline"
            className="flex items-center rounded-full"
            onClick={() => setIsAddExperienceModalOpen(true)}
          >
            <Plus className="mr-1 h-4 w-4" />
            Add Experience
          </Button>
          <Button
            variant="outline"
            className="flex items-center rounded-full"
            onClick={() => setIsAddLicensesOrCertificationsModalOpen(true)}
          >
            <Plus className="mr-1 h-4 w-4" />
            Add Licenses or Certifications
          </Button>
          <Button
            variant="outline"
            className="flex items-center rounded-full"
            onClick={() => setIsAddEducationModalOpen(true)}
          >
            <Plus className="mr-1 h-4 w-4" />
            Add Education
          </Button>
          <Button
            variant="outline"
            className="flex items-center rounded-full"
            onClick={() => setIsUploadModalOpen(true)}
          >
            <Upload className="mr-1 h-4 w-4" />
            Upload Resume
          </Button>
        </div>
      </div>

      <div className="p-4 md:p-6 border rounded-2xl shadow">
        {/* Personal Contact Section */}
        <div className="bg-white rounded-lg border shadow border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              Personal Contact
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
              <p className="text-gray-900 font-medium">12 May, 1992 (age-32)</p>
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
        <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
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
              onClick={() => setIsPlayerDetailsModalOpen(true)}
            >
              <Edit className="w-4 h-4 mr-1" />
              Edit
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
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

            <div>
              <label className="text-sm text-gray-500 mb-1 block">
                Shortlist
              </label>
              <p className="text-gray-900 font-medium">42 games</p>
            </div>
            <div>
              <label className="text-sm text-gray-500 mb-1 block">Agent</label>
              <p className="text-gray-900 font-medium">Agent</p>
            </div>
            <div>
              <label className="text-sm text-gray-500 mb-1 block">Height</label>
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
              <label className="text-sm text-gray-500 mb-1 block">Weight</label>
              <p className="text-gray-900 font-medium">68kg</p>
            </div>

            <div>
              <label className="text-sm text-gray-500 mb-1 block">Gender</label>
              <p className="text-gray-900 font-medium">Male</p>
            </div>

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
          </div>
        </div>

        {/* Analytics Cards */}
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

        {/* Experience Section */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Experience</CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsAddExperienceModalOpen(true)}
              >
                <Plus className="h-4 w-4" />
                Add
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6 px-0">
            {experiences.map((exp) => (
              <div
                key={exp.id}
                className="flex space-x-4 p-4 hover:bg-gray-50 transition-colors"
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
                        {exp.club}
                      </h3>
                      <p className="text-sm text-gray-600">{exp.title}</p>
                      <p className="text-sm text-gray-500">
                        {exp.startMonth} {exp.startYear} -{" "}
                        {`${
                          exp.isCurrentlyWorking && !exp.endMonth
                            ? "Present"
                            : `${exp.endMonth}
                              ${exp.endYear}`
                        }`}
                      </p>
                      <div className="flex items-center mt-1">
                        <MapPin className="h-4 w-4 text-gray-400 mr-1" />
                        <span className="text-sm text-gray-500">
                          {exp.location}
                        </span>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setEditExperienceData(exp);
                        setIsEditExperienceModalOpen(true);
                      }}
                    >
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
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg lg:text-xl">Certificate</CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsAddLicensesOrCertificationsModalOpen(true)}
              >
                <Plus className="h-4 w-4" />
                <span className="hidden sm:inline ml-1">Add</span>
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 lg:space-y-6 px-0">
            {certificates.map((cert) => (
              <div
                key={cert.id}
                className="flex space-x-3 lg:space-x-4 p-3 lg:p-4 hover:bg-gray-50 transition-colors"
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
                        {cert.name}
                      </h3>
                      <p className="text-xs lg:text-sm text-gray-600">
                        {cert.issuingOrganization}
                      </p>
                      <p className="text-xs lg:text-sm text-gray-500">
                        {cert.startMonth} {cert.startYear} -{" "}
                        {`${
                          !cert.endMonth
                            ? "Present"
                            : `${cert.endMonth}
                              ${cert.endYear}`
                        }`}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setEditLicensesOrCertifications(cert);
                        setIsEditLicensesOrCertificationsModalOpen(true);
                      }}
                    >
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
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg lg:text-xl">Education</CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsAddEducationModalOpen(true)}
              >
                <Plus className="h-4 w-4" />
                <span className="hidden sm:inline ml-1">Add</span>
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 lg:space-y-6 px-0">
            {education.map((edu) => (
              <div
                key={edu.id}
                className="flex space-x-3 lg:space-x-4 p-3 lg:p-4 hover:bg-gray-50 transition-colors"
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
                        {edu.schoolName}
                      </h3>
                      <p className="text-xs lg:text-sm text-gray-600">
                        Degree: {edu.degree}
                      </p>
                      <p className="text-xs lg:text-sm text-gray-600">
                        Field of study: {edu.fieldOfStudy}
                      </p>
                      <p className="text-xs lg:text-sm text-gray-600">
                        Grade: {edu.grade}
                      </p>
                      <p className="text-xs lg:text-sm text-gray-500">
                        {edu.startMonth} {edu.startYear} -{" "}
                        {`${
                          !edu.endMonth
                            ? "Present"
                            : `${edu.endMonth}
                              ${edu.endYear}`
                        }`}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setEditEducation(edu);
                        setIsEditEducationModalOpen(true);
                      }}
                    >
                      <Edit className="h-3 w-3 lg:h-4 lg:w-4" />
                      Edit
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
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsAddVideoModalOpen(true)}
              >
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
      </div>

      {/* Modals */}
      <AddExperienceModal
        isOpen={isAddExperienceModalOpen}
        onClose={() => setIsAddExperienceModalOpen(false)}
      />
      <AddLicensesOrCertificationsModal
        isOpen={isAddLicensesOrCertificationsModalOpen}
        onClose={() => setIsAddLicensesOrCertificationsModalOpen(false)}
      />
      <AddEducationModal
        isOpen={isAddEducationModalOpen}
        onClose={() => setIsAddEducationModalOpen(false)}
      />
      <UploadResumeModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
      />
      <AddVideoModal
        isOpen={isAddVideoModalOpen}
        onClose={() => setIsAddVideoModalOpen(false)}
      />
      <EditPersonalInformationModal
        isOpen={isEditPersonalInformationModalOpen}
        onClose={() => setIsEditPersonalInformationModalOpen(false)}
        initialData={personalContact}
      />
      <EditPlayerDetailsModal
        isOpen={isEditPlayerDetailsModalOpen}
        onClose={() => setIsPlayerDetailsModalOpen(false)}
        initialData={playerDetails}
      />
      {editExperienceData && (
        <EditExperienceModal
          isOpen={isEditExperienceModalOpen}
          onClose={() => setIsEditExperienceModalOpen(false)}
          experienceData={editExperienceData}
        />
      )}
      {editLicensesOrCertifications && (
        <EditLicenseOrCertificationsModal
          isOpen={isEditLicensesOrCertificationsModalOpen}
          onClose={() => setIsEditLicensesOrCertificationsModalOpen(false)}
          certificationData={editLicensesOrCertifications}
        />
      )}
      {editEducation && (
        <EditEducationModal
          isOpen={isEditEducationModalOpen}
          onClose={() => setIsEditEducationModalOpen(false)}
          educationData={editEducation}
        />
      )}
    </div>
  );
}
