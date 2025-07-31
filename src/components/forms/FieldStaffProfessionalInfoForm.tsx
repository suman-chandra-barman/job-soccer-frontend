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
import {
  fieldStaffProfessionalInfoSchema
} from "@/shchemas/profileValidation";
import { TFieldStaffProfessionalInfo } from "@/types/profile";

interface IFieldStaffProfessionalInfoFormProps {
  onNext: (data: TFieldStaffProfessionalInfo) => void;
  onPrev: () => void;
  initialData?: Partial<TFieldStaffProfessionalInfo>;
  steps?: Array<{
    id: number;
    label: string;
    completed?: boolean;
    active?: boolean;
  }>;
}

export function FieldStaffProfessionalInfoForm({
  onNext,
  onPrev,
  initialData,
  steps,
}: IFieldStaffProfessionalInfoFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm<TFieldStaffProfessionalInfo>({
    resolver: zodResolver(fieldStaffProfessionalInfoSchema),
    defaultValues: initialData,
    mode: "onChange",
  });

  const onSubmit = (data: TFieldStaffProfessionalInfo) => {
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
            <FormField label="Current Club" error={errors.currentClub?.message}>
              <Input
                {...register("currentClub")}
                placeholder="Ex. Real Madrid"
                className="bg-gray-50 border-0"
              />
            </FormField>

            <FormField
              label="Availability"
              error={errors.availability?.message}
            >
              <Select
                onValueChange={(value) => setValue("availability", value)}
              >
                <SelectTrigger className="bg-gray-50 border-0 w-full">
                  <SelectValue placeholder="Availability" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="now">Now</SelectItem>
                  <SelectItem value="later">Later</SelectItem>
                  <SelectItem value="soon">Soon</SelectItem>
                </SelectContent>
              </Select>
            </FormField>

            <FormField label="Social Media" error={errors.socialMedia?.message}>
              <Input
                {...register("socialMedia")}
                placeholder="Social Media"
                className="bg-gray-50 border-0"
              />
            </FormField>

            <FormField label="Licenses" error={errors.licenses?.message}>
              <Input
                {...register("licenses")}
                placeholder="Licenses"
                className="bg-gray-50 border-0"
              />
            </FormField>

            <FormField label="Country" error={errors.country?.message}>
              <Input
                {...register("country")}
                placeholder="Write your country name"
                className="bg-gray-50 border-0"
              />
            </FormField>

            <FormField label="Category" error={errors.category?.message}>
              <Select onValueChange={(value) => setValue("category", value)}>
                <SelectTrigger className="bg-gray-50 border-0 w-full">
                  <SelectValue placeholder="Select your category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="U10">U10</SelectItem>
                  <SelectItem value="U11">U11</SelectItem>
                  <SelectItem value="U12">U12</SelectItem>
                  <SelectItem value="U13">U13</SelectItem>
                  <SelectItem value="U14">U14</SelectItem>
                  <SelectItem value="U15">U15</SelectItem>
                  <SelectItem value="U16">U16</SelectItem>
                  <SelectItem value="U17">U17</SelectItem>
                  <SelectItem value="U18">U18</SelectItem>
                  <SelectItem value="U19">U19</SelectItem>
                </SelectContent>
              </Select>
            </FormField>


            <FormField label="League" error={errors.league?.message}>
              <Select onValueChange={(value) => setValue("league", value)}>
                <SelectTrigger className="bg-gray-50 border-0 w-full">
                  <SelectValue placeholder="Select League" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="premier">Premier League</SelectItem>
                  <SelectItem value="championship">Championship</SelectItem>
                  <SelectItem value="league-one">League One</SelectItem>
                </SelectContent>
              </Select>
            </FormField>

            <FormField label="Agent" error={errors.agent?.message}>
              <Select onValueChange={(value) => setValue("agent", value)}>
                <SelectTrigger className="bg-gray-50 border-0 w-full">
                  <SelectValue placeholder="Select your answer" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="yes">Yes</SelectItem>
                  <SelectItem value="no">No</SelectItem>
                </SelectContent>
              </Select>
            </FormField>

            <FormField
              label="Select Your Position"
              error={errors.category?.message}
            >
              <Select onValueChange={(value) => setValue("position", value)}>
                <SelectTrigger className="bg-gray-50 border-0 w-full">
                  <SelectValue placeholder="Select your position" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Assistant Coach">
                    Assistant Coach
                  </SelectItem>
                  <SelectItem value="GK Coach">GK Coach</SelectItem>
                  <SelectItem value="Mental Coach">Mental Coach</SelectItem>
                  <SelectItem value="Mental Coach">Mental Coach</SelectItem>
                  <SelectItem value="Video Analyst Coach">
                    Video Analyst Coach
                  </SelectItem>
                  <SelectItem value="Video Analyst Coach">
                    Video Analyst Coach
                  </SelectItem>
                  <SelectItem value="Specific Forward Coach">
                    Specific Forward Coach
                  </SelectItem>
                  <SelectItem value="Specific Defensive Coach">
                    Specific Defensive Coach
                  </SelectItem>
                  <SelectItem value="Specific Technical Coach">
                    Specific Technical Coach
                  </SelectItem>
                  <SelectItem value="Scout">Scout</SelectItem>
                  <SelectItem value="Technical Director">
                    Technical Director
                  </SelectItem>
                </SelectContent>
              </Select>
            </FormField>
          </div>
        </FormSection>
      </form>
    </FormLayout>
  );
}
