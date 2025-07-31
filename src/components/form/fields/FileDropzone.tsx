"use client";

import React, { useCallback, useState } from "react";
import { Upload, Video } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FileDropzoneProps {
  onFilesChange: (files: File[]) => void;
  accept?: string;
  multiple?: boolean;
  maxFiles?: number;
  placeholder?: string;
  className?: string;
}

export function FileDropzone({
  onFilesChange,
  accept = "video/*",
  multiple = false,
  maxFiles = 1,
  placeholder = "Drag & drop your files here, or",
  className = "",
}: FileDropzoneProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [files, setFiles] = useState<File[]>([]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragOver(false);

      const droppedFiles = Array.from(e.dataTransfer.files).filter(file => file.type.startsWith('video/'));
      const newFiles = multiple
        ? [...files, ...droppedFiles].slice(0, maxFiles)
        : [droppedFiles[0]].filter(Boolean);

      setFiles(newFiles);
      onFilesChange(newFiles);
    },
    [files, multiple, maxFiles, onFilesChange]
  );

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFiles = Array.from(e.target.files || []).filter(file => file.type.startsWith('video/'));
      const newFiles = multiple
        ? [...files, ...selectedFiles].slice(0, maxFiles)
        : [selectedFiles[0]].filter(Boolean);

      setFiles(newFiles);
      onFilesChange(newFiles);
      
      // Reset the input value to allow selecting the same file again
      e.target.value = '';
    },
    [files, multiple, maxFiles, onFilesChange]
  );

  const removeFile = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
    onFilesChange(newFiles);
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          isDragOver
            ? "border-blue-400 bg-blue-50"
            : "border-gray-300 bg-gray-50"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <Upload className="w-10 h-10 text-gray-400 mx-auto mb-4" />
        <div className="flex items-center justify-center">
          <p className="text-gray-600">{placeholder}</p>
          <input
            type="file"
            accept={accept}
            multiple={multiple}
            onChange={handleFileInput}
            className="hidden"
            id="file-upload"
          />
          <label htmlFor="file-upload">
            <Button
              type="button"
              variant="link"
              size="sm"
              className="cursor-pointer text-blue-600 hover:text-blue-700 underline pl-1"
              onClick={() => document.getElementById("file-upload")?.click()}
            >
              Browse
            </Button>
          </label>
        </div>
      </div>

      {files.length > 0 && (
        <div className="space-y-2">
          {files.map((file, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center space-x-3">
                <Video className="w-5 h-5 text-gray-500" />
                <span className="text-sm font-medium">{file.name}</span>
                <span className="text-xs text-gray-500">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </span>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removeFile(index)}
                className="text-red-500 hover:text-red-700 cursor-pointer"
              >
                Remove
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
