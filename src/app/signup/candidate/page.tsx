"use client";

import React, { useState } from "react";
import { PersonalInfoForm } from "@/components/forms/PersonalInfoForm";
import { toast } from "sonner";
import {
  type TPersonalInfo,
  type TProfessionalPlayerProfessionalInfo,
  type THighlights,
  type TAmateurPlayerProfessionalInfo,
  type THighSchoolPlayerProfessionalInfo,
  type TCollegeOrUniversityPlayerProfessionalInfo,
  type TOfficeStaffProfessionalInfo,
  type TFieldStaffProfessionalInfo,
  type TMultipleHighlights,
  CandidateRole,
} from "@/types/profile";
import { candidateRoleConfig } from "@/shchemas/profileValidation";
import { AmateurPlayerProfessionalInfoForm } from "@/components/forms/AmateurPlayerProfessionalInfoForm";
import { ProfessionalPlayerProfessionalInfoForm } from "@/components/forms/ProfessionalPlayerProfessionalInfoForm";
import { HighSchoolPlayerProfessionalInfoForm } from "@/components/forms/HighSchoolPlayerProfessionalInfoForm";
import { CollegeOrUniversityPlayerProfessionalInfoForm } from "@/components/forms/CollegeOrUniversityPlayerProfessionalInfoForm";
import { FieldStaffProfessionalInfoForm } from "@/components/forms/FieldStaffProfessionalInfoForm";
import { OfficeStaffProfessionalInfoForm } from "@/components/forms/OfficeStaffProfessionalInfoForm";
import { useAppSelector } from "@/redux/hooks";
import { Spinner } from "@/components/ui/spinner";
import { VideoForm } from "@/components/forms/VideoForm";
import { VideoType } from "@/constants/video.constant";
import { useCreateUserProfileMutation } from "@/redux/features/user/userApi";

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
    highlights?: THighlights | TMultipleHighlights;
  }>({});
  const [fieldStaffPosition, setFieldStaffPosition] = useState<string>("");

  const user = useAppSelector((state) => state.auth.user);
  const [createUserProfile] = useCreateUserProfileMutation();

  const config = candidateRoleConfig[user?.role as CandidateRole];
  if (!config) {
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

  const handleVideoNext = async (data: THighlights | TMultipleHighlights) => {
    // Format the complete form data for API submission
    const videoData = data as THighlights & {
      videoTitles?: VideoType[];
      videos?: File[];
    };

    // Debug logs: show current stored formData (userInfo) and incoming video payload
    console.log("handleVideoNext called. current formData state:", formData);
    console.log("redux user:", user);
    console.log("incoming highlights/video data:", videoData);
    if (videoData.videos) {
      try {
        console.log(
          "video files:",
          videoData.videos.map((v) => ({
            name: v.name,
            size: v.size,
            type: v.type,
          }))
        );
      } catch (e) {
        console.log("video files: (unable to enumerate)", e);
      }
    }

    // Prepare the data object combining personal and professional info
    // Use the current formData before setState to ensure we have all data
    const combinedRaw = {
      ...(formData.personalInfo ?? {}),
      ...(formData.professionalInfo ?? {}),
    };

    // Remove empty optional fields so backend only receives populated values
    const cleanedCombined = removeEmptyFields(combinedRaw) ?? {};

    // Update state for future reference
    setFormData((prev) => ({ ...prev, highlights: data }));

    // Create FormData for multipart/form-data submission
    const formDataToSend = new FormData();

    // Append the cleaned data object as JSON string
    formDataToSend.append("data", JSON.stringify(cleanedCombined));

    // Append videoMeta array as JSON string (type, title, description)
    const videoMeta = (
      videoData as unknown as {
        videoMeta?: Array<{
          type: VideoType;
          title?: string;
          description?: string;
        }>;
      }
    ).videoMeta;

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

    // Append each video file
    if (videoData.videos) {
      videoData.videos.forEach((video) => {
        formDataToSend.append("videos", video);
      });
    }

    console.log("Data:", cleanedCombined);
    console.log("VideoMeta:", videoMeta);
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
    console.log("created userProfile", userProfile);
    toast.success("Profile completed successfully!");
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

  // Render highlights form based on configuration
  const renderHighlightsForm = () => {
    const videoProps = {
      onNext: handleVideoNext as (data: THighlights) => void,
      onPrev: handlePrevStep,
      initialData: formData.highlights as THighlights | undefined,
      steps,
    };

    switch (fieldStaffPosition) {
      case "Head Coach":
        return <VideoForm {...videoProps} />;
    }
  };

  return (
    <div>
      {currentStep === 1 && (
        <PersonalInfoForm
          onNext={handlePersonalInfoNext}
          initialData={formData.personalInfo}
          steps={steps}
        />
      )}
      {currentStep === 2 && renderProfessionalForm()}
      {currentStep === 3 && renderHighlightsForm()}
    </div>
  );
}
