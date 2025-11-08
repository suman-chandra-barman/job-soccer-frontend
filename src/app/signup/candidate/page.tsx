"use client";

import React, { useState } from "react";
import { PersonalInfoForm } from "@/components/forms/PersonalInfoForm";
import { HighlightsForm } from "@/components/forms/HighlightsForm";
import { toast } from "sonner";
import {
  type TPersonalInfo,
  type TProfessionalPlayerProfessionalInfo,
  type THighlights,
  type TAmateurPlayerProfessionalInfo,
  type THighSchoolPlayerProfessionalInfo,
  type TCollegePlayerProfessionalInfo,
  type TOfficeStaffProfessionalInfo,
  type TFieldStaffProfessionalInfo,
  type TMultipleHighlights,
  CandidateRole,
} from "@/types/profile";
import { useRouter } from "next/navigation";
import { candidateRoleConfig } from "@/shchemas/profileValidation";
import { MultipleHighlightsForm } from "@/components/forms/MultipleHighlisghtsForm";
import { AmateurPlayerProfessionalInfoForm } from "@/components/forms/AmateurPlayerProfessionalInfoForm";
import { ProfessionalPlayerProfessionalInfoForm } from "@/components/forms/ProfessionalPlayerProfessionalInfoForm";
import { HighSchoolPlayerProfessionalInfoForm } from "@/components/forms/HighSchoolPlayerProfessionalInfoForm";
import { CollegePlayerProfessionalInfoForm } from "@/components/forms/CollegePlayerProfessionalInfoForm";
import { FieldStaffProfessionalInfoForm } from "@/components/forms/FieldStaffProfessionalInfoForm";
import { OfficeStaffProfessionalInfoForm } from "@/components/forms/OfficeStaffProfessionalInfoForm";
import { useAppSelector } from "@/redux/hooks";
import { useGetMeQuery } from "@/redux/features/auth/authApi";

export default function CandidateProfilePage() {
  // Get the user's token and data
  const token = useAppSelector((state) => state.auth.token);
  const { data: user } = useGetMeQuery(undefined, { skip: !token });

  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<{
    personalInfo?: TPersonalInfo;
    professionalInfo?:
      | TAmateurPlayerProfessionalInfo
      | TProfessionalPlayerProfessionalInfo
      | THighSchoolPlayerProfessionalInfo
      | TCollegePlayerProfessionalInfo
      | TOfficeStaffProfessionalInfo
      | TFieldStaffProfessionalInfo;
    highlights?: THighlights | TMultipleHighlights;
  }>({});

  const router = useRouter();
  const role = user?.data?.role as CandidateRole;

  const config = candidateRoleConfig[role];

  if (!config) {
    return (
      <div className="grid h-screen w-full place-items-center">Loading...</div>
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

  const handleProfessionalInfoNext = (
    data:
      | TProfessionalPlayerProfessionalInfo
      | TAmateurPlayerProfessionalInfo
      | THighSchoolPlayerProfessionalInfo
      | TCollegePlayerProfessionalInfo
      | TOfficeStaffProfessionalInfo
      | TFieldStaffProfessionalInfo
  ) => {
    setFormData((prev) => ({ ...prev, professionalInfo: data }));
    setCurrentStep(3);
  };

  const handleHighlightsNext = (data: THighlights | TMultipleHighlights) => {
    setFormData((prev) => ({ ...prev, highlights: data }));

    // Here you would typically submit the complete form data to your API
    console.log("Complete form data:", { ...formData, highlights: data });
    toast.success("Profile completed successfully!");

  };

  const handlePrevStep = () => {
    setCurrentStep((prev) => Math.max(1, prev - 1));
  };

  const renderProfessionalForm = () => {
    const commonProps = {
      onNext: handleProfessionalInfoNext,
      onPrev: handlePrevStep,
      initialData: formData.professionalInfo,
      steps,
    };

    switch (role) {
      case CandidateRole.PROFESSIONAL_PLAYER:
        return <ProfessionalPlayerProfessionalInfoForm {...commonProps} />;
      case CandidateRole.AMATEUR_PLAYER:
        return <AmateurPlayerProfessionalInfoForm {...commonProps} />;
      case CandidateRole.HIGH_SCHOOL:
        return <HighSchoolPlayerProfessionalInfoForm {...commonProps} />;
      case CandidateRole.COLLEGE_UNIVERSITY:
        return <CollegePlayerProfessionalInfoForm {...commonProps} />;
      case CandidateRole.ON_FIELD_STAFF:
        return <FieldStaffProfessionalInfoForm {...commonProps} />;
      case CandidateRole.OFFICE_STAFF:
        return <OfficeStaffProfessionalInfoForm {...commonProps} />;
      default:
        return null;
    }
  };

  // Render highlights form based on configuration
  const renderHighlightsForm = () => {
    if (config.highlightsType === "multiple") {
      const multipleProps = {
        onNext: handleHighlightsNext as (data: TMultipleHighlights) => void,
        onPrev: handlePrevStep,
        initialData: formData.highlights as TMultipleHighlights | undefined,
        steps,
      };
      return <MultipleHighlightsForm {...multipleProps} />;
    } else {
      const singleProps = {
        onNext: handleHighlightsNext as (data: THighlights) => void,
        onPrev: handlePrevStep,
        initialData: formData.highlights as THighlights | undefined,
        steps,
      };
      return <HighlightsForm {...singleProps} />;
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
