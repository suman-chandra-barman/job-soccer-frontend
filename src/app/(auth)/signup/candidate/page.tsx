/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { PersonalInfoForm } from "@/components/forms/PersonalInfoForm";
import { toast } from "sonner";
import {
  type TPersonalInfo,
  type TProfessionalPlayerProfessionalInfo,
  type TAmateurPlayerProfessionalInfo,
  type THighSchoolPlayerProfessionalInfo,
  type TCollegeOrUniversityPlayerProfessionalInfo,
  type TOfficeStaffProfessionalInfo,
  type TFieldStaffProfessionalInfo,
  CandidateRole,
  TVideo,
} from "@/types/profile";
import { AmateurPlayerProfessionalInfoForm } from "@/components/forms/AmateurPlayerProfessionalInfoForm";
import { ProfessionalPlayerProfessionalInfoForm } from "@/components/forms/ProfessionalPlayerProfessionalInfoForm";
import { HighSchoolPlayerProfessionalInfoForm } from "@/components/forms/HighSchoolPlayerProfessionalInfoForm";
import { CollegeOrUniversityPlayerProfessionalInfoForm } from "@/components/forms/CollegeOrUniversityPlayerProfessionalInfoForm";
import { FieldStaffProfessionalInfoForm } from "@/components/forms/FieldStaffProfessionalInfoForm";
import { OfficeStaffProfessionalInfoForm } from "@/components/forms/OfficeStaffProfessionalInfoForm";
import { useAppSelector } from "@/redux/hooks";
import { Spinner } from "@/components/ui/spinner";
import { FieldStaffPosition, VideoType } from "@/constants/video.constant";
import { useCreateUserProfileMutation } from "@/redux/features/user/userApi";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { IoMdArrowBack } from "react-icons/io";
import { HeadCoachVideoForm } from "@/components/forms/HeadCoachVideoForm";
import { GKCoachVideoForm } from "@/components/forms/GKCoachVideoForm";
import { SpecificCoachVideoForm } from "@/components/forms/SpecificCoachVideoForm";
import { ScoutVideoForm } from "@/components/forms/ScoutVideoForm";
import { TechnicalDirectorVideoForm } from "@/components/forms/TechnicalDirectorVideoForm";
import { AcademyDirectorVideoForm } from "@/components/forms/AcademyDirectorVideoForm";
import { DirectorOfCoachingVideoForm } from "@/components/forms/DirectorOfCoachingVideoForm";
import { OfficeStaffVideoForm } from "@/components/forms/OfficeStaffVideoForm";
import { PlayerVideoForm } from "@/components/forms/PlayerVideoForm";

export default function CandidateProfilePage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<{
    personalInfo?: TPersonalInfo;
    professionalInfo?:
      | TAmateurPlayerProfessionalInfo
      | TProfessionalPlayerProfessionalInfo
      | THighSchoolPlayerProfessionalInfo
      | TCollegeOrUniversityPlayerProfessionalInfo
      | TOfficeStaffProfessionalInfo
      | TFieldStaffProfessionalInfo;
    videos?: TVideo;
  }>({});
  const [fieldStaffPosition, setFieldStaffPosition] = useState<string>("");

  const user = useAppSelector((state) => state.auth.user);
  const [createUserProfile] = useCreateUserProfileMutation();

  const router = useRouter();

  const userRole = user?.role as CandidateRole;
  if (!userRole) {
    return (
      <div className="grid h-screen w-full place-items-center">
        <Spinner className="size-8 text-yellow-500" />
      </div>
    );
  }

  const steps = [
    {
      id: 1,
      label: "Step 1",
      completed: currentStep > 1,
      active: currentStep === 1,
    },
    {
      id: 2,
      label: "Step 2",
      completed: currentStep > 2,
      active: currentStep === 2,
    },
    {
      id: 3,
      label: "Step 3",
      completed: currentStep > 3,
      active: currentStep === 3,
    },
  ];

  const handlePersonalInfoNext = (data: TPersonalInfo) => {
    setFormData((prev) => ({ ...prev, personalInfo: data }));
    setCurrentStep(2);

    console.log("Personal Info Data:", data);
  };

  // Remove empty optional fields from an object recursively.
  // Keeps values that are: non-empty strings, numbers, booleans, non-empty arrays, non-empty objects.
  const removeEmptyFields = (input: unknown): unknown => {
    if (input === null || input === undefined) return undefined;

    // Preserve Date objects (they are valid values)
    if (input instanceof Date) return input;

    if (typeof input === "string")
      return input.trim() === "" ? undefined : input;
    if (typeof input === "number" || typeof input === "boolean") return input;

    if (Array.isArray(input)) {
      const cleaned = input
        .map((v) => (typeof v === "object" ? removeEmptyFields(v) : v))
        .filter((v) => v !== undefined && !(typeof v === "string" && v === ""));
      return cleaned.length ? cleaned : undefined;
    }

    if (typeof input === "object") {
      // If it's not a plain object (e.g. File, Map, Set), keep it as-is
      const tag = Object.prototype.toString.call(input);
      if (tag !== "[object Object]") return input;

      const obj = input as Record<string, unknown>;
      const out: Record<string, unknown> = {};
      Object.entries(obj).forEach(([k, v]) => {
        const cleaned = removeEmptyFields(v);
        if (cleaned !== undefined) out[k] = cleaned;
      });
      return Object.keys(out).length ? out : undefined;
    }

    return undefined;
  };

  const handleProfessionalInfoNext = (
    data:
      | TProfessionalPlayerProfessionalInfo
      | TAmateurPlayerProfessionalInfo
      | THighSchoolPlayerProfessionalInfo
      | TCollegeOrUniversityPlayerProfessionalInfo
      | TOfficeStaffProfessionalInfo
      | TFieldStaffProfessionalInfo
  ) => {
    setFormData((prev) => ({ ...prev, professionalInfo: data }));
    setFieldStaffPosition((data as TFieldStaffProfessionalInfo).position || "");
    console.log("Professional Info Data:", data);
    setCurrentStep(3);
  };

  const handleVideoNext = async (data: TVideo) => {
    // Format the complete form data for API submission
    const videoData = data as TVideo & {
      videoTitles?: string[];
      videos?: File[];
      videoMeta?: Array<{
        type: VideoType;
        title?: string;
        description?: string;
      }>;
    };

    // Debug logs: show current stored formData (userInfo) and incoming video payload
    console.log("handleVideoNext called. current formData state:", formData);
    console.log("incoming videos data:", videoData);

    // Prepare the data object combining personal and professional info
    // Use the current formData before setState to ensure we have all data
    const combinedRaw = {
      ...(formData.personalInfo ?? {}),
      ...(formData.professionalInfo ?? {}),
    };

    // Extract the image File if present (File objects can't be JSON stringified)
    const imageFile =
      (combinedRaw as any).image instanceof File
        ? (combinedRaw as any).image
        : null;

    // Remove image from the data object since we'll append it separately
    const dataWithoutImage = { ...combinedRaw };
    delete (dataWithoutImage as any).image;

    // Remove empty optional fields so backend only receives populated values
    const cleanedCombined = removeEmptyFields(dataWithoutImage) ?? {};

    // Update state for future reference
    setFormData((prev) => ({ ...prev, videos: data }));

    // Create FormData for multipart/form-data submission
    const formDataToSend = new FormData();

    // Append the cleaned data object as JSON string
    formDataToSend.append("data", JSON.stringify(cleanedCombined));

    // Append the image file separately if it exists
    if (imageFile) {
      formDataToSend.append("image", imageFile);
    }

    // Check if this is a player role (has videoTitles instead of videoMeta)
    if (videoData.videoTitles && Array.isArray(videoData.videoTitles)) {
      // For players: append videoTitles as JSON array
      formDataToSend.append(
        "videoTitles",
        JSON.stringify(videoData.videoTitles)
      );
    } else {
      // For staff roles: append videoMeta array as JSON string (type, title, description)
      const videoMeta = videoData.videoMeta;

      // Strip empty title/description so optional values are not sent
      const cleanedVideoMeta =
        videoMeta
          ?.map((vm) => {
            const out: Record<string, unknown> = { type: vm.type };
            if (vm.title && vm.title.trim() !== "") out.title = vm.title.trim();
            if (vm.description && vm.description.trim() !== "")
              out.description = vm.description.trim();
            return out;
          })
          .filter((vm) => Object.keys(vm).length > 0) ?? undefined;

      if (cleanedVideoMeta && cleanedVideoMeta.length > 0) {
        formDataToSend.append("videoMeta", JSON.stringify(cleanedVideoMeta));
      }
    }

    // Append each video file
    if (videoData.videos) {
      videoData.videos.forEach((video: any) => {
        formDataToSend.append("videos", video);
      });
    }

    console.log("Data:", cleanedCombined);
    console.log("VideoTitles:", videoData.videoTitles);
    console.log("VideoMeta:", videoData.videoMeta);
    console.log("Videos:", videoData.videos);
    // Log FormData contents in a readable way (files will show name/size)
    for (const pair of formDataToSend.entries()) {
      const [key, value] = pair as [string, unknown];
      if (value instanceof File) {
        console.log(key, "File ->", {
          name: value.name,
          size: value.size,
          type: value.type,
        });
      } else if (Array.isArray(value)) {
        console.log(key, value);
      } else {
        // could be stringified JSON or primitive
        console.log(key, value);
      }
    }

    // Here you would typically submit the FormData to your API
    const { data: userProfile } = await createUserProfile(formDataToSend);
    if (userProfile?.data.profileId) {
      console.log("created userProfile", userProfile);
      toast.success("Profile completed successfully!");
      router.push("/");
    } else {
      toast.error("Failed to create profile. Please try again.");
    }
  };

  const handlePrevStep = () => {
    setCurrentStep((prev) => Math.max(1, prev - 1));
  };

  // Render Professional Info form based on candidate role
  const renderProfessionalForm = () => {
    const baseProps = {
      onNext: handleProfessionalInfoNext,
      onPrev: handlePrevStep,
      steps,
    } as const;

    switch (user?.role) {
      case CandidateRole.PROFESSIONAL_PLAYER:
        return (
          <ProfessionalPlayerProfessionalInfoForm
            {...baseProps}
            initialData={
              formData.professionalInfo as
                | TProfessionalPlayerProfessionalInfo
                | undefined
            }
          />
        );
      case CandidateRole.AMATEUR_PLAYER:
        return (
          <AmateurPlayerProfessionalInfoForm
            {...baseProps}
            initialData={
              formData.professionalInfo as
                | TAmateurPlayerProfessionalInfo
                | undefined
            }
          />
        );
      case CandidateRole.HIGH_SCHOOL:
        return (
          <HighSchoolPlayerProfessionalInfoForm
            {...baseProps}
            initialData={
              formData.professionalInfo as
                | THighSchoolPlayerProfessionalInfo
                | undefined
            }
          />
        );
      case CandidateRole.COLLEGE_UNIVERSITY:
        return (
          <CollegeOrUniversityPlayerProfessionalInfoForm
            {...baseProps}
            initialData={
              formData.professionalInfo as
                | TCollegeOrUniversityPlayerProfessionalInfo
                | undefined
            }
          />
        );
      case CandidateRole.ON_FIELD_STAFF:
        return (
          <FieldStaffProfessionalInfoForm
            {...baseProps}
            initialData={
              formData.professionalInfo as
                | TFieldStaffProfessionalInfo
                | undefined
            }
          />
        );
      case CandidateRole.OFFICE_STAFF:
        return (
          <OfficeStaffProfessionalInfoForm
            {...baseProps}
            initialData={
              formData.professionalInfo as
                | TOfficeStaffProfessionalInfo
                | undefined
            }
          />
        );
      default:
        return null;
    }
  };

  // Render Video form based on configuration
  const renderVideoForm = () => {
    const videoProps = {
      onNext: handleVideoNext as (data: TVideo) => void,
      onPrev: handlePrevStep,
      initialData: formData.videos as TVideo | undefined,
      steps,
    };

    // For office staff, render their specific form
    switch (userRole) {
      case CandidateRole.OFFICE_STAFF:
        return <OfficeStaffVideoForm {...videoProps} />;

      // For all player roles, render player video form
      case CandidateRole.PROFESSIONAL_PLAYER:
      case CandidateRole.AMATEUR_PLAYER:
      case CandidateRole.HIGH_SCHOOL:
      case CandidateRole.COLLEGE_UNIVERSITY:
        return <PlayerVideoForm {...videoProps} />;
    }

    // For on-field staff, render based on specific position
    switch (fieldStaffPosition) {
      // ------ On field staff positions ------
      // Head Coach
      case FieldStaffPosition.HEAD_COACH:
        return <HeadCoachVideoForm {...videoProps} />;

      // Assistant Coach
      case FieldStaffPosition.ASSISTANT_COACH:
        return <HeadCoachVideoForm {...videoProps} />;

      // GK Coach
      case FieldStaffPosition.GK_COACH:
        return <GKCoachVideoForm {...videoProps} />;

      // Mental Coach
      case FieldStaffPosition.MENTAL_COACH:
        return <GKCoachVideoForm {...videoProps} />;

      // Video Analyst Coach
      case FieldStaffPosition.VIDEO_ANALYST_COACH:
        return <GKCoachVideoForm {...videoProps} />;

      // Specific Offensive Coach
      case FieldStaffPosition.SPECIFIC_OFFENSIVE_COACH:
        return <SpecificCoachVideoForm {...videoProps} />;

      // Specific Defensive Coach
      case FieldStaffPosition.SPECIFIC_DEFENSIVE_COACH:
        return <SpecificCoachVideoForm {...videoProps} />;

      // Specific Technical Coach
      case FieldStaffPosition.SPECIFIC_TECHNICAL_COACH:
        return <SpecificCoachVideoForm {...videoProps} />;

      // Specific Technical Coach
      case FieldStaffPosition.SPECIFIC_TECHNICAL_COACH:
        return <SpecificCoachVideoForm {...videoProps} />;

      // Scouting Technical Coach
      case FieldStaffPosition.SCOUT:
        return <ScoutVideoForm {...videoProps} />;

      // Technical Director
      case FieldStaffPosition.TECHNICAL_DIRECTOR:
        return <TechnicalDirectorVideoForm {...videoProps} />;

      // Academy Director
      case FieldStaffPosition.ACADEMY_DIRECTOR:
        return <AcademyDirectorVideoForm {...videoProps} />;

      // Director of Coaching
      case FieldStaffPosition.DIRECTOR_OF_COACHING:
        return <DirectorOfCoachingVideoForm {...videoProps} />;
    }
  };

  return (
    <div>
      {/* Home navigation link */}
      <Link
        href="/"
        className="absolute top-6 left-6 flex items-center gap-2 px-4 py-2 rounded-md bg-black hover:bg-gray-800 text-white hover:text-white shadow-md hover:shadow-lg transition-all duration-300 z-10 group font-medium"
      >
        <IoMdArrowBack className="h-5 w-5 group-hover:-translate-x-1 transition-transform duration-300" />
        <span className="text-sm">Home</span>
      </Link>

      {currentStep === 1 && (
        <PersonalInfoForm
          onNext={handlePersonalInfoNext}
          initialData={formData.personalInfo}
          steps={steps}
        />
      )}
      {currentStep === 2 && renderProfessionalForm()}
      {currentStep === 3 && renderVideoForm()}
    </div>
  );
}
