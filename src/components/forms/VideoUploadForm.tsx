"use client";

import React from "react";
import { VideoType } from "@/constants/video.constant";
import { getVideoDuration } from "@/lib/videoValidation";

interface VideoUploadFormProps {
  videoType: VideoType;
  value: File[];
  onChange: (files: File[]) => void;
  showError?: boolean;
  errorMessage?: string;
}

export default function VideoUploadForm({
  videoType,
  value,
  onChange,
  showError,
  errorMessage,
}: VideoUploadFormProps) {
  const handleFiles = async (fList: FileList | null) => {
    if (!fList) return;
    const file = fList[0]; // Only take the first file since we use single file upload

    try {
      // Validate duration
      const duration = await getVideoDuration(file);
      if (duration > 180) {
        // 3 minutes max
        alert("Video must be less than 3 minutes long");
        return;
      }

      onChange([file]);
    } catch (err) {
      console.error("Error validating video:", err);
      alert("Error validating video. Please try again.");
    }
  };

  return (
    <div className="space-y-4">
      <div className="text-sm text-gray-600">
        Upload a video (max duration: 180s)
      </div>

      <input
        type="file"
        accept="video/*"
        onChange={(e) => handleFiles(e.target.files)}
      />

      {value.length > 0 && (
        <div className="space-y-2">
          <div className="p-2 border rounded">
            <div className="flex justify-between items-center">
              <div>{value[0].name}</div>
              <div className="text-sm text-gray-500">
                {(value[0].size / (1024 * 1024)).toFixed(2)} MB
              </div>
            </div>
            <div className="mt-2 text-sm text-gray-500">Type: {videoType}</div>
            <button
              onClick={() => onChange([])}
              className="mt-2 text-red-500 hover:text-red-700 text-sm"
            >
              Remove
            </button>
          </div>
        </div>
      )}

      {showError && errorMessage && (
        <div className="text-red-600 text-sm">{errorMessage}</div>
      )}
    </div>
  );
}
