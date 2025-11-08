import type { IPositionVideoConfig } from "@/constants/video.constant";
import { getVideoRequirements } from "@/constants/video.constant";
import type { VideoType } from "@/constants/video.constant";

// Resolve the duration of a File (video) in seconds
export const getVideoDuration = (file: File): Promise<number> =>
  new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const video = document.createElement("video");
    video.preload = "metadata";
    video.onloadedmetadata = () => {
      URL.revokeObjectURL(url);
      const dur = video.duration;
      if (isFinite(dur)) resolve(Math.round(dur));
      else reject(new Error("Unable to read video duration"));
    };
    video.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Failed to load video metadata"));
    };
    video.src = url;
  });

export interface IVideoUpload {
  file: File;
  type?: VideoType;
}

export interface IVideoValidationResult {
  isValid: boolean;
  error?: string;
}

export async function validateVideosForPosition(
  position: string,
  videos: IVideoUpload[]
): Promise<IVideoValidationResult> {
  let config: IPositionVideoConfig;

  try {
    config = getVideoRequirements(position);
  } catch {
    return {
      isValid: false,
      error: `No configuration for position "${position}"`,
    };
  }

  // count check (exact match)
  if (videos.length !== config.totalVideos) {
    return {
      isValid: false,
      error: `You must upload exactly ${config.totalVideos} video(s). Currently uploaded: ${videos.length}`,
    };
  }

  // durations
  const durations = await Promise.all(
    videos.map((v) => getVideoDuration(v.file).catch(() => -1))
  );

  for (let i = 0; i < durations.length; i++) {
    const d = durations[i];
    if (d < 0) {
      return {
        isValid: false,
        error: `Could not read duration of file ${videos[i].file.name}`,
      };
    }
    if (d > config.maxDuration) {
      return {
        isValid: false,
        error: `File ${videos[i].file.name} is too long (${d}s). Maximum allowed is ${config.maxDuration}s.`,
      };
    }
  }

  // forbidden
  if (config.forbiddenVideoTypes && config.forbiddenVideoTypes.length) {
    for (const v of videos) {
      if (!v.type) continue;
      if (config.forbiddenVideoTypes.includes(v.type)) {
        return {
          isValid: false,
          error: `Video of type "${v.type}" is not allowed for position ${position}.`,
        };
      }
    }
  }

  // required types
  if (config.requiredVideoTypes && config.requiredVideoTypes.length) {
    const required = config.requiredVideoTypes
      .filter((r) => r.required)
      .map((r) => r.type);
    const providedTypes = videos
      .map((v) => v.type)
      .filter(Boolean) as VideoType[];
    for (const reqType of required) {
      if (!providedTypes.includes(reqType)) {
        return {
          isValid: false,
          error: `Missing required video type "${reqType}" for position ${position}.`,
        };
      }
    }
  }

  return { isValid: true };
}
