"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormLayout } from "@/components/form/FormLayout";
import { FormSection } from "@/components/form/FormSection";
import { FormField } from "@/components/form/fields/FormField";
import VideoUploadForm from "@/components/forms/VideoUploadForm";
import { multipleHighlightsSchema } from "@/shchemas/profileValidation";
import { TMultipleHighlights } from "@/types/profile";
import { VideoType } from "@/constants/video.constant";

interface MultipleHighlightsFormProps {
  onNext: (data: TMultipleHighlights) => void;
  onPrev: () => void;
  initialData?: Partial<TMultipleHighlights>;
  steps?: Array<{
    id: number;
    label: string;
    completed?: boolean;
    active?: boolean;
  }>;
}

export function MultipleHighlightsForm({
  onNext,
  onPrev,
  initialData,
  steps,
}: MultipleHighlightsFormProps) {
  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm<TMultipleHighlights>({
    resolver: zodResolver(multipleHighlightsSchema),
    defaultValues: initialData,
    mode: "onChange",
  });

  // Watch individual video fields for changes
  const preInterviewVideos = watch("preInterviewVideos") || [];
  const technicalVideos = watch("technicalVideos") || [];
  const practicalVideos = watch("practicalVideos") || [];
  const gamePrinciplesVideos = watch("gamePrinciplesVideos") || [];

  const onSubmit = (data: TMultipleHighlights) => {
    onNext(data);
  };

  return (
    <FormLayout
      steps={steps}
      onNext={handleSubmit(onSubmit)}
      onPrev={onPrev}
      showPrev={true}
      nextLabel="Complete"
      isNextDisabled={!isValid}
    >
      <form className="space-y-8">
        {/* Pre Interview Assessment Video */}
        <FormSection title="Pre Interview Assessment Video">
          <FormField error={errors.preInterviewVideos?.message}>
            <VideoUploadForm
              videoType={VideoType.PRE_RECORDED_INTERVIEW}
              value={preInterviewVideos}
              onChange={(files) => setValue("preInterviewVideos", files)}
              showError={!!errors.preInterviewVideos}
              errorMessage={errors.preInterviewVideos?.message}
            />
          </FormField>
        </FormSection>

        {/* Technical Video */}
        <FormSection title="Technical Video">
          <FormField error={errors.technicalVideos?.message}>
            <VideoUploadForm
              videoType={VideoType.TECHNICAL}
              value={technicalVideos}
              onChange={(files) => setValue("technicalVideos", files)}
              showError={!!errors.technicalVideos}
              errorMessage={errors.technicalVideos?.message}
            />
          </FormField>
        </FormSection>

        {/* Tactical Video */}
        <FormSection title="Tactical Video">
          <FormField error={errors.practicalVideos?.message}>
            <VideoUploadForm
              videoType={VideoType.TACTICAL}
              value={practicalVideos}
              onChange={(files) => setValue("practicalVideos", files)}
              showError={!!errors.practicalVideos}
              errorMessage={errors.practicalVideos?.message}
            />
          </FormField>
        </FormSection>

        {/* Game Principles Video */}
        <FormSection title="Game Principles">
          <FormField error={errors.gamePrinciplesVideos?.message}>
            <VideoUploadForm
              videoType={VideoType.GAME_PRINCIPALS}
              value={gamePrinciplesVideos}
              onChange={(files) => setValue("gamePrinciplesVideos", files)}
              showError={!!errors.gamePrinciplesVideos}
              errorMessage={errors.gamePrinciplesVideos?.message}
            />
          </FormField>
        </FormSection>
      </form>
    </FormLayout>
  );
}
