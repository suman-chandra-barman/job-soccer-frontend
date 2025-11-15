"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormLayout } from "@/components/form/FormLayout";
import { FormSection } from "@/components/form/FormSection";
import { FormField } from "@/components/form/fields/FormField";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { highSchoolPlayerProfessionalInfoSchema } from "@/shchemas/profileValidation";
import { THighSchoolPlayerProfessionalInfo } from "@/types/profile";

interface IHighSchoolPlayerProfessionalInfoFormProps {
  onNext: (data: THighSchoolPlayerProfessionalInfo) => void;
  onPrev: () => void;
  initialData?: Partial<THighSchoolPlayerProfessionalInfo>;
  steps?: Array<{
    id: number;
    label: string;
    completed?: boolean;
    active?: boolean;
  }>;
}

export function HighSchoolPlayerProfessionalInfoForm({
  onNext,
  onPrev,
  initialData,
  steps,
}: IHighSchoolPlayerProfessionalInfoFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm<THighSchoolPlayerProfessionalInfo>({
    resolver: zodResolver(highSchoolPlayerProfessionalInfoSchema),
    defaultValues: {
      ...(initialData ?? {}),
      height: {
        size: initialData?.height?.size ?? "",
        unit: initialData?.height?.unit ?? "ft",
      },
      weight: {
        size: initialData?.weight?.size ?? "",
        unit: initialData?.weight?.unit ?? "kg",
      },
    },
    mode: "onChange",
  });

  const onSubmit = (data: THighSchoolPlayerProfessionalInfo) => {
    onNext(data);
  };

  return (
    <FormLayout
      steps={steps}
      onNext={handleSubmit(onSubmit)}
      onPrev={onPrev}
      showPrev={true}
      isNextDisabled={!isValid}
    >
      <form className="space-y-8">
        <FormSection title="Professional Information">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Gender */}
            <FormField label="Gender" error={errors.gender?.message}>
              <Select
                onValueChange={(value) =>
                  setValue(
                    "gender" as const,
                    value as THighSchoolPlayerProfessionalInfo["gender"],
                    {
                      shouldValidate: true,
                      shouldDirty: true,
                    }
                  )
                }
              >
                <SelectTrigger className="bg-gray-50 border-0 w-full">
                  <SelectValue placeholder="Select your gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </FormField>

            {/* Availability */}
            <FormField
              label="Availability"
              error={errors.availability?.message}
            >
              <Select
                onValueChange={(value) =>
                  setValue(
                    "availability",
                    value as unknown as THighSchoolPlayerProfessionalInfo["availability"],
                    { shouldValidate: true, shouldDirty: true }
                  )
                }
              >
                <SelectTrigger className="bg-gray-50 border-0 w-full">
                  <SelectValue placeholder="Select availability" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Now">Now</SelectItem>
                  <SelectItem value="Soon">Soon</SelectItem>
                  <SelectItem value="Later">Later</SelectItem>
                </SelectContent>
              </Select>
            </FormField>

            {/* Height */}
            <FormField label="Height" error={errors.height?.size?.message}>
              <div className="flex space-x-2">
                <Input
                  type="number"
                  step="any"
                  {...register("height.size" as const, { valueAsNumber: true })}
                  placeholder="Ex. 5.7"
                  className="bg-gray-50 border-0"
                />
                <Select
                  defaultValue={initialData?.height?.unit || "ft"}
                  onValueChange={(value) =>
                    setValue(
                      "height.unit" as const,
                      value as THighSchoolPlayerProfessionalInfo["height"]["unit"],
                      {
                        shouldValidate: true,
                        shouldDirty: true,
                      }
                    )
                  }
                >
                  <SelectTrigger className="w-20 bg-gray-50 border-0">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ft">ft</SelectItem>
                    <SelectItem value="cm">cm</SelectItem>
                    <SelectItem value="in">in</SelectItem>
                    <SelectItem value="m">m</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </FormField>

            {/* Weight */}
            <FormField label="Weight" error={errors.weight?.size?.message}>
              <div className="flex space-x-2">
                <Input
                  type="number"
                  step="any"
                  {...register("weight.size" as const, { valueAsNumber: true })}
                  placeholder="Ex. 75"
                  className="bg-gray-50 border-0"
                />
                <Select
                  defaultValue={initialData?.weight?.unit || "kg"}
                  onValueChange={(value) =>
                    setValue(
                      "weight.unit" as const,
                      value as THighSchoolPlayerProfessionalInfo["weight"]["unit"],
                      {
                        shouldValidate: true,
                        shouldDirty: true,
                      }
                    )
                  }
                >
                  <SelectTrigger className="w-20 bg-gray-50 border-0">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="kg">kg</SelectItem>
                    <SelectItem value="lb">lb</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </FormField>

            {/* Current Club */}
            <FormField label="Current club" error={errors.currentClub?.message}>
              <Input
                {...register("currentClub")}
                placeholder="Ex. Real Madrid"
                className="bg-gray-50 border-0"
              />
            </FormField>

            {/* Foot */}
            <FormField label="Foot" error={errors.foot?.message}>
              <Select
                onValueChange={(value) =>
                  setValue(
                    "foot",
                    value as unknown as THighSchoolPlayerProfessionalInfo["foot"],
                    { shouldValidate: true, shouldDirty: true }
                  )
                }
              >
                <SelectTrigger className="bg-gray-50 border-0 w-full">
                  <SelectValue placeholder="Select foot" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Right">Right</SelectItem>
                  <SelectItem value="Left">Left</SelectItem>
                  <SelectItem value="Both">Both</SelectItem>
                </SelectContent>
              </Select>
            </FormField>

            {/* Position */}
            <FormField label="Position" error={errors.position?.message}>
              <Select
                onValueChange={(value) =>
                  setValue(
                    "position",
                    value as unknown as THighSchoolPlayerProfessionalInfo["position"],
                    { shouldValidate: true, shouldDirty: true }
                  )
                }
              >
                <SelectTrigger className="bg-gray-50 border-0 w-full">
                  <SelectValue placeholder="Select your position" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="GK">GK</SelectItem>
                  <SelectItem value="Central back">Central back</SelectItem>
                  <SelectItem value="Left back">Left back</SelectItem>
                  <SelectItem value="Right back">Right back</SelectItem>
                  <SelectItem value="Defensive midfielder">
                    Defensive midfielder
                  </SelectItem>
                  <SelectItem value="Offensive midfielder">
                    Offensive midfielder
                  </SelectItem>
                  <SelectItem value="Right winger">Right winger</SelectItem>
                  <SelectItem value="Left winger">Left winger</SelectItem>
                  <SelectItem value="Forward">Forward</SelectItem>
                  <SelectItem value="Striker">Striker</SelectItem>
                </SelectContent>
              </Select>
            </FormField>

            {/* League */}
            <FormField label="League" error={errors.league?.message}>
              <Input
                {...register("league")}
                placeholder="Ex. Premier League"
                className="bg-gray-50 border-0"
              />
            </FormField>

            {/* Agent */}
            <FormField
              label="Agent (if applicable)"
              error={errors.agent?.message}
            >
              <Input
                {...register("agent")}
                placeholder="Ex. Suman Barman"
                className="bg-gray-50 border-0"
              />
            </FormField>

            {/* Category */}
            <FormField
              label="Category (if applicable)"
              error={errors.category?.message}
            >
              <Input
                {...register("category")}
                placeholder="Ex. Forward"
                className="bg-gray-50 border-0"
              />
            </FormField>

            {/* school name */}
            <FormField label="School Name" error={errors.schoolName?.message}>
              <Input
                {...register("schoolName")}
                placeholder="Write your school name"
                className="bg-gray-50 border-0"
              />
            </FormField>
            <FormField label="Diploma" error={errors.diploma?.message}>
              <Input
                {...register("diploma")}
                placeholder="Write your diploma"
                className="bg-gray-50 border-0"
              />
            </FormField>

            <FormField
              label="SAT/ACT (if applicable)"
              error={errors.schoolName?.message}
            >
              <Input
                {...register("satOrAct")}
                placeholder="Write your diploma name"
                className="bg-gray-50 border-0"
              />
            </FormField>

            <FormField
              label="GPA (if applicable)"
              error={errors.schoolName?.message}
            >
              <Input
                {...register("gpa")}
                placeholder="Write your gpa"
                className="bg-gray-50 border-0"
              />
            </FormField>

            <FormField label="Country" error={errors.country?.message}>
              <Input
                {...register("country")}
                placeholder="Write your country"
                className="bg-gray-50 border-0"
              />
            </FormField>

            {/* Social Media */}
            <FormField label="Social Media" error={errors.socialMedia?.message}>
              <Input
                {...register("socialMedia")}
                placeholder="Ex. https://twitter.com/yourprofile"
                className="bg-gray-50 border-0"
              />
            </FormField>
          </div>
        </FormSection>
      </form>
    </FormLayout>
  );
}
