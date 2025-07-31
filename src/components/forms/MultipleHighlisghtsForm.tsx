"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Video } from "lucide-react";
import { FormLayout } from "@/components/form/FormLayout";
import { FormSection } from "@/components/form/FormSection";
import { FormField } from "@/components/form/fields/FormField";
import { FileDropzone } from "@/components/form/fields/FileDropzone";
import { Button } from "@/components/ui/button";
import {
  multipleHighlightsSchema
} from "@/shchemas/profileValidation";
import { TMultipleHighlights } from "@/types/profile";

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

  // Render the uploaded file's name, size, and preview
  const renderUploadedFile = (file: File, onRemove: () => void) => (
    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg mt-2">
      <div className="flex items-center space-x-3">
        <Video className="w-5 h-5 text-gray-500" />
        <div className="flex flex-col">
          <span className="text-sm font-medium">{file.name}</span>
          <span className="text-xs text-gray-500">
            {(file.size / 1024 / 1024).toFixed(2)} MB
          </span>
        </div>
      </div>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={onRemove}
        className="text-red-500 hover:text-red-700"
      >
        Remove
      </Button>
    </div>
  );

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
            {!preInterviewVideos.length && (
              <FileDropzone
                onFilesChange={(files) => setValue("preInterviewVideos", files)}
                accept="video/*"
                multiple={false}
                maxFiles={1}
                placeholder="Drag & drop your pre-interview video here, or Browse"
              />
            )}
            {preInterviewVideos.length > 0 &&
              renderUploadedFile(preInterviewVideos[0], () =>
                setValue("preInterviewVideos", [])
              )}
          </FormField>
        </FormSection>

        {/* Technical Video */}
        <FormSection title="Technical Video">
          <FormField error={errors.technicalVideos?.message}>
            {!technicalVideos.length && (
              <FileDropzone
                onFilesChange={(files) => setValue("technicalVideos", files)}
                accept="video/*"
                multiple={false}
                maxFiles={1}
                placeholder="Drag & drop your technical video here, or Browse"
              />
            )}
            {technicalVideos.length > 0 &&
              renderUploadedFile(technicalVideos[0], () =>
                setValue("technicalVideos", [])
              )}
          </FormField>
        </FormSection>

        {/* Practical Video */}
        <FormSection title="Practical Video">
          <FormField error={errors.practicalVideos?.message}>
            {!practicalVideos.length && (
              <FileDropzone
                onFilesChange={(files) => setValue("practicalVideos", files)}
                accept="video/*"
                multiple={false}
                maxFiles={1}
                placeholder="Drag & drop your practical video here, or Browse"
              />
            )}
            {practicalVideos.length > 0 &&
              renderUploadedFile(practicalVideos[0], () =>
                setValue("practicalVideos", [])
              )}
          </FormField>
        </FormSection>

        {/* Game Principles Video */}
        <FormSection title="Game Principles">
          <FormField error={errors.gamePrinciplesVideos?.message}>
            {!gamePrinciplesVideos.length && (
              <FileDropzone
                onFilesChange={(files) =>
                  setValue("gamePrinciplesVideos", files)
                }
                accept="video/*"
                multiple={false}
                maxFiles={1}
                placeholder="Drag & drop your game principles video here, or Browse"
              />
            )}
            {gamePrinciplesVideos.length > 0 &&
              renderUploadedFile(gamePrinciplesVideos[0], () =>
                setValue("gamePrinciplesVideos", [])
              )}
          </FormField>
        </FormSection>
      </form>
    </FormLayout>
  );
}
