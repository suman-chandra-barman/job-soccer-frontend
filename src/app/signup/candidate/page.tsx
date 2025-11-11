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
  type TCollegeOrUniversityPlayerProfessionalInfo,
  type TOfficeStaffProfessionalInfo,
  type TFieldStaffProfessionalInfo,
  type TMultipleHighlights,
  CandidateRole,
} from "@/types/profile";
import { candidateRoleConfig } from "@/shchemas/profileValidation";
import { MultipleHighlightsForm } from "@/components/forms/MultipleHighlisghtsForm";
import { AmateurPlayerProfessionalInfoForm } from "@/components/forms/AmateurPlayerProfessionalInfoForm";
import { ProfessionalPlayerProfessionalInfoForm } from "@/components/forms/ProfessionalPlayerProfessionalInfoForm";
import { HighSchoolPlayerProfessionalInfoForm } from "@/components/forms/HighSchoolPlayerProfessionalInfoForm";
import { CollegeOrUniversityPlayerProfessionalInfoForm } from "@/components/forms/CollegeOrUniversityPlayerProfessionalInfoForm";
import { FieldStaffProfessionalInfoForm } from "@/components/forms/FieldStaffProfessionalInfoForm";
import { OfficeStaffProfessionalInfoForm } from "@/components/forms/OfficeStaffProfessionalInfoForm";
import { useAppSelector } from "@/redux/hooks";
import { Spinner } from "@/components/ui/spinner";

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

  const user = useAppSelector((state) => state.auth.user);

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
