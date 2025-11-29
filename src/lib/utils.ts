import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format a date string to a human-readable "time ago" format
 * @param dateString - ISO date string or any valid date string
 * @returns Formatted string like "Today", "2 days ago", "3 months ago"
 */
export function formatTimeAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInDays === 0) return "Today";
  if (diffInDays === 1) return "1 day ago";
  if (diffInDays < 30) return `${diffInDays} days ago`;

  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths === 1) return "1 month ago";
  return `${diffInMonths} months ago`;
}

/**
 * Validate and get image dimensions
 * @param file - Image file to validate
 * @returns Promise with image dimensions and validation result
 */
export function validateImageDimensions(
  file: File
): Promise<{ width: number; height: number; aspectRatio: number }> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const objectUrl = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(objectUrl);
      resolve({
        width: img.width,
        height: img.height,
        aspectRatio: img.width / img.height,
      });
    };

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error("Failed to load image"));
    };

    img.src = objectUrl;
  });
}

/**
 * Resize and crop image to fit aspect ratio
 * @param file - Image file to process
 * @param targetAspectRatio - Desired aspect ratio (width/height)
 * @param maxWidth - Maximum width in pixels
 * @returns Promise with processed image as File
 */
export async function processImageForBanner(
  file: File,
  targetAspectRatio: number = 16 / 9,
  maxWidth: number = 1920
): Promise<File> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const objectUrl = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(objectUrl);

      // Create canvas
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      if (!ctx) {
        reject(new Error("Failed to get canvas context"));
        return;
      }

      // Calculate dimensions
      const sourceWidth = img.width;
      const sourceHeight = img.height;
      const sourceAspectRatio = sourceWidth / sourceHeight;

      // Determine crop area to match target aspect ratio
      let cropX = 0;
      let cropY = 0;
      let cropWidth = sourceWidth;
      let cropHeight = sourceHeight;

      if (sourceAspectRatio > targetAspectRatio) {
        // Image is wider than target, crop sides
        cropWidth = sourceHeight * targetAspectRatio;
        cropX = (sourceWidth - cropWidth) / 2;
      } else if (sourceAspectRatio < targetAspectRatio) {
        // Image is taller than target, crop top/bottom
        cropHeight = sourceWidth / targetAspectRatio;
        cropY = (sourceHeight - cropHeight) / 2;
      }

      // Calculate final dimensions
      let finalWidth = cropWidth;
      let finalHeight = cropHeight;

      if (finalWidth > maxWidth) {
        finalWidth = maxWidth;
        finalHeight = maxWidth / targetAspectRatio;
      }

      // Set canvas size
      canvas.width = finalWidth;
      canvas.height = finalHeight;

      // Draw cropped and resized image
      ctx.drawImage(
        img,
        cropX,
        cropY,
        cropWidth,
        cropHeight,
        0,
        0,
        finalWidth,
        finalHeight
      );

      // Convert canvas to blob
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error("Failed to create image blob"));
            return;
          }

          // Create new file from blob
          const processedFile = new File([blob], file.name, {
            type: file.type,
            lastModified: Date.now(),
          });

          resolve(processedFile);
        },
        file.type,
        0.95
      );
    };

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error("Failed to load image"));
    };

    img.src = objectUrl;
  });
}
