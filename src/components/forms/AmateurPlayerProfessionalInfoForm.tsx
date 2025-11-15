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
import { amateurPlayerProfessionalInfoSchema } from "@/shchemas/profileValidation";
import type { TAmateurPlayerProfessionalInfo } from "@/types/profile";

interface IAmateurPlayerProfessionalInfoFormProps {
  onNext: (data: TAmateurPlayerProfessionalInfo) => void;
  onPrev: () => void;
  initialData?: Partial<TAmateurPlayerProfessionalInfo>;
  steps?: Array<{
    id: number;
    label: string;
    completed?: boolean;
    active?: boolean;
  }>;
}

export function AmateurPlayerProfessionalInfoForm({
  onNext,
  onPrev,
  initialData,
  steps,
}: IAmateurPlayerProfessionalInfoFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm<TAmateurPlayerProfessionalInfo>({
    resolver: zodResolver(amateurPlayerProfessionalInfoSchema),
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

  const onSubmit = (data: TAmateurPlayerProfessionalInfo) => {
    console.log("Amateur Player Professional Info:", data);

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
                    value as TAmateurPlayerProfessionalInfo["gender"],
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
                    value as unknown as TAmateurPlayerProfessionalInfo["availability"],
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
                      value as TAmateurPlayerProfessionalInfo["height"]["unit"],
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
                      value as TAmateurPlayerProfessionalInfo["weight"]["unit"],
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

            {/* National Team Category */}
            <FormField
              label="Category"
              error={errors.nationalTeamCategory?.message}
            >
              <Select
                onValueChange={(value) =>
                  setValue(
                    "nationalTeamCategory",
                    value as unknown as TAmateurPlayerProfessionalInfo["nationalTeamCategory"],
                    { shouldValidate: true, shouldDirty: true }
                  )
                }
              >
                <SelectTrigger className="bg-gray-50 border-0 w-full">
                  <SelectValue placeholder="Select your category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="U14">U14</SelectItem>
                  <SelectItem value="U15">U15</SelectItem>
                  <SelectItem value="U16">U16</SelectItem>
                  <SelectItem value="U17">U17</SelectItem>
                  <SelectItem value="U18">U18</SelectItem>
                  <SelectItem value="U19">U19</SelectItem>
                  <SelectItem value="U20">U20</SelectItem>
                  <SelectItem value="U21">U21</SelectItem>
                </SelectContent>
              </Select>
            </FormField>

            {/* Foot */}
            <FormField label="Foot" error={errors.foot?.message}>
              <Select
                onValueChange={(value) =>
                  setValue(
                    "foot",
                    value as unknown as TAmateurPlayerProfessionalInfo["foot"],
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
                    value as unknown as TAmateurPlayerProfessionalInfo["position"],
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
            <FormField label="Agent" error={errors.agent?.message}>
              <Input
                {...register("agent")}
                placeholder="Ex. Suman Barman"
                className="bg-gray-50 border-0"
              />
            </FormField>

            {/* Social Media */}
            <FormField
              label="Social Media"
              error={errors.socialMedia?.message}
              className="md:col-span-2"
            >
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
