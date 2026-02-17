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
  const [createUserProfile, { isLoading }] = useCreateUserProfileMutation();

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
  };

  // Recursively removes empty optional fields from an object
  const removeEmptyFields = (input: unknown): unknown => {
    if (input === null || input === undefined) return undefined;

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
    setCurrentStep(3);
  };

  const handleVideoNext = async (data: TVideo) => {
    const videoData = data as TVideo & {
      videoTitles?: string[];
      videos?: File[];
      videoMeta?: Array<{
        type: VideoType;
        title?: string;
        description?: string;
      }>;
    };

    const combinedRaw = {
      ...(formData.personalInfo ?? {}),
      ...(formData.professionalInfo ?? {}),
    };

    const imageFile =
      (combinedRaw as any).image instanceof File
        ? (combinedRaw as any).image
        : null;

    const dataWithoutImage = { ...combinedRaw };
    delete (dataWithoutImage as any).image;

    const cleanedCombined = removeEmptyFields(dataWithoutImage) ?? {};

    setFormData((prev) => ({ ...prev, videos: data }));

    const formDataToSend = new FormData();
    formDataToSend.append("data", JSON.stringify(cleanedCombined));

    if (imageFile) {
      formDataToSend.append("image", imageFile);
    }

    // Player roles use videoTitles, staff roles use videoMeta
    if (videoData.videoTitles && Array.isArray(videoData.videoTitles)) {
      formDataToSend.append(
        "videoTitles",
        JSON.stringify(videoData.videoTitles)
      );
    } else {
      const videoMeta = videoData.videoMeta;
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

    if (videoData.videos) {
      videoData.videos.forEach((video: any) => {
        formDataToSend.append("videos", video);
      });
    }

    const { data: userProfile } = await createUserProfile(formDataToSend);
    if (userProfile?.data.profileId) {
      toast.success("Profile completed successfully!");
      router.push("/");
    } else {
      toast.error("Failed to create profile. Please try again.");
    }
  };

  const handlePrevStep = () => {
    setCurrentStep((prev) => Math.max(1, prev - 1));
  };

  const renderProfessionalForm = () => {
    const baseProps = {
      onNext: handleProfessionalInfoNext,
      onPrev: handlePrevStep,
      steps,
    } as const;

    switch (userRole) {
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

  const renderVideoForm = () => {
    const videoProps = {
      onNext: handleVideoNext as (data: TVideo) => void,
      onPrev: handlePrevStep,
      initialData: formData.videos as TVideo | undefined,
      steps,
      isLoading,
    };

    switch (userRole) {
      case CandidateRole.PROFESSIONAL_PLAYER:
      case CandidateRole.AMATEUR_PLAYER:
      case CandidateRole.HIGH_SCHOOL:
      case CandidateRole.COLLEGE_UNIVERSITY:
        return <PlayerVideoForm {...videoProps} />;

      case CandidateRole.OFFICE_STAFF:
        return <OfficeStaffVideoForm {...videoProps} />;
    }

    switch (fieldStaffPosition) {
      case FieldStaffPosition.HEAD_COACH:
      case FieldStaffPosition.ASSISTANT_COACH:
        return <HeadCoachVideoForm {...videoProps} fieldStaffPosition={fieldStaffPosition} />;

      case FieldStaffPosition.GK_COACH:
      case FieldStaffPosition.MENTAL_COACH:
      case FieldStaffPosition.VIDEO_ANALYST_COACH:
        return <GKCoachVideoForm {...videoProps} />;

      case FieldStaffPosition.SPECIFIC_OFFENSIVE_COACH:
      case FieldStaffPosition.SPECIFIC_DEFENSIVE_COACH:
      case FieldStaffPosition.SPECIFIC_TECHNICAL_COACH:
        return <SpecificCoachVideoForm {...videoProps} />;

      case FieldStaffPosition.SCOUT:
        return <ScoutVideoForm {...videoProps} />;

      case FieldStaffPosition.TECHNICAL_DIRECTOR:
        return <TechnicalDirectorVideoForm {...videoProps} />;

      case FieldStaffPosition.ACADEMY_DIRECTOR:
        return <AcademyDirectorVideoForm {...videoProps} />;

      case FieldStaffPosition.DIRECTOR_OF_COACHING:
        return <DirectorOfCoachingVideoForm {...videoProps} />;

      default:
        return null;
    }
  };

  return (
    <div>
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
