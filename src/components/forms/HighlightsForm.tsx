"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormLayout } from "@/components/form/FormLayout";
import { FormSection } from "@/components/form/FormSection";
import { FormField } from "@/components/form/fields/FormField";
import { FileDropzone } from "@/components/form/fields/FileDropzone";
import {
  highlightsSchema,
  type Highlights,
} from "@/shchemas/profileValidation";

interface HighlightsFormProps {
  onNext: (data: Highlights) => void;
  onPrev: () => void;
  initialData?: Partial<Highlights>;
  steps?: Array<{
    id: number;
    label: string;
    completed?: boolean;
    active?: boolean;
  }>;
}

export function HighlightsForm({
  onNext,
  onPrev,
  initialData,
  steps,
}: HighlightsFormProps) {
  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<Highlights>({
    resolver: zodResolver(highlightsSchema),
    defaultValues: initialData,
    mode: "onChange",
  });

  const videos = watch("videos") || [];

  const onSubmit = (data: Highlights) => {
    onNext(data);
  };

  return (
    <FormLayout
      steps={steps}
      onNext={handleSubmit(onSubmit)}
      onPrev={onPrev}
      showPrev={true}
      nextLabel="Complete"
      isNextDisabled={videos.length > 0 ? false : true}
    >
      <form className="space-y-8">
        <FormSection title="Highlights video">
          <p className="text-sm text-gray-600 mb-4">
            Pre-interview assessment Video
          </p>
          <FormField error={errors.videos?.message}>
            <FileDropzone
              onFilesChange={(files) => setValue("videos", files)}
              accept="video/*"
              multiple={true}
              maxFiles={2}
              placeholder="Drag & drop to upload file or "
            />
          </FormField>
        </FormSection>
      </form>
    </FormLayout>
  );
}
