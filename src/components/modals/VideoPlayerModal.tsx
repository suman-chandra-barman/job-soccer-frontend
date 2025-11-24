"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  X,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Loader2,
} from "lucide-react";
import { Video } from "@/types/user";
import { cn } from "@/lib/utils";

interface VideoPlayerModalProps {
  isOpen: boolean;
  onClose: () => void;
  videos: Video[];
  initialVideoIndex?: number;
  candidateName?: string;
}

export default function VideoPlayerModal({
  isOpen,
  onClose,
  videos,
  initialVideoIndex = 0,
  candidateName = "Candidate",
}: VideoPlayerModalProps) {
  const [currentIndex, setCurrentIndex] = useState(initialVideoIndex);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  const currentVideo = videos[currentIndex];

  // Reset state when video changes
  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      setIsPlaying(false);
      setProgress(0);
      setCurrentTime(0);
    }
  }, [currentIndex, isOpen]);

  // Reset when modal opens
  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialVideoIndex);
    }
  }, [isOpen, initialVideoIndex]);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleMuteUnmute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleFullscreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      }
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const current = videoRef.current.currentTime;
      const total = videoRef.current.duration;
      setCurrentTime(current);
      setProgress((current / total) * 100);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
      setIsLoading(false);
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (videoRef.current) {
      const rect = e.currentTarget.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const percentage = clickX / rect.width;
      const newTime = percentage * duration;
      videoRef.current.currentTime = newTime;
      setProgress(percentage * 100);
    }
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : videos.length - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev < videos.length - 1 ? prev + 1 : 0));
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const getVideoUrl = (video: Video) => {
    if (video.url.startsWith("http")) {
      return video.url;
    }
    return `${process.env.NEXT_PUBLIC_BASE_URL}/${video.url}`;
  };

  const handleVideoError = (
    e: React.SyntheticEvent<HTMLVideoElement, Event>
  ) => {
    console.error("Video loading error:", {
      currentVideo,
      videoUrl: getVideoUrl(currentVideo),
      error: e,
    });
    setIsLoading(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl w-full p-0 overflow-hidden bg-black/95 border-gray-800">
        <DialogHeader className="px-6 pt-4 pb-2 bg-gradient-to-b from-black/80 to-transparent relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-white text-xl font-semibold">
                {candidateName}&apos;s Videos
              </DialogTitle>
              <p className="text-gray-400 text-sm mt-1">
                {currentVideo?.title || `Video ${currentIndex + 1}`}
              </p>
            </div>
            <Button
              onClick={onClose}
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/10 hover:text-white"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </DialogHeader>

        {/* Video Player Container */}
        <div className="relative bg-black">
          {/* Video Element */}
          <div className="relative aspect-video bg-black">
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <Loader2 className="h-12 w-12 text-white animate-spin" />
              </div>
            )}
            <video
              ref={videoRef}
              src={getVideoUrl(currentVideo)}
              className="w-full h-full"
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              onEnded={() => setIsPlaying(false)}
              onClick={handlePlayPause}
              onError={handleVideoError}
              onLoadStart={() =>
                console.log("Video loading started:", getVideoUrl(currentVideo))
              }
              crossOrigin="anonymous"
              playsInline
            />

            {/* Play/Pause Overlay */}
            {!isPlaying && !isLoading && (
              <div
                className="absolute inset-0 flex items-center justify-center cursor-pointer bg-black/20 hover:bg-black/30 transition-colors"
                onClick={handlePlayPause}
              >
                <div className="bg-white/90 rounded-full p-6 hover:bg-white transition-colors">
                  <Play className="h-12 w-12 text-black" fill="black" />
                </div>
              </div>
            )}
          </div>

          {/* Video Controls */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4 space-y-2">
            {/* Progress Bar */}
            <div
              className="w-full h-1.5 bg-white/30 rounded-full cursor-pointer group hover:h-2 transition-all"
              onClick={handleProgressClick}
            >
              <div
                className="h-full bg-yellow-400 rounded-full relative transition-all"
                style={{ width: `${progress}%` }}
              >
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>

            {/* Control Buttons */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Button
                  onClick={handlePlayPause}
                  size="icon"
                  variant="ghost"
                  className="text-white hover:bg-white/10 h-9 w-9"
                >
                  {isPlaying ? (
                    <Pause className="h-5 w-5" />
                  ) : (
                    <Play className="h-5 w-5" fill="white" />
                  )}
                </Button>

                <Button
                  onClick={handleMuteUnmute}
                  size="icon"
                  variant="ghost"
                  className="text-white hover:bg-white/10 h-9 w-9"
                >
                  {isMuted ? (
                    <VolumeX className="h-5 w-5" />
                  ) : (
                    <Volume2 className="h-5 w-5" />
                  )}
                </Button>

                <span className="text-white text-sm ml-2">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
              </div>

              <Button
                onClick={handleFullscreen}
                size="icon"
                variant="ghost"
                className="text-white hover:bg-white/10 h-9 w-9"
              >
                <Maximize className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Navigation Arrows */}
          {videos.length > 1 && (
            <>
              <Button
                onClick={goToPrevious}
                size="icon"
                variant="ghost"
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-white bg-black/50 hover:bg-black/70 h-12 w-12 rounded-full"
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>

              <Button
                onClick={goToNext}
                size="icon"
                variant="ghost"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-white bg-black/50 hover:bg-black/70 h-12 w-12 rounded-full"
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            </>
          )}
        </div>

        {/* Video Thumbnails Slider */}
        {videos.length > 1 && (
          <div className="px-6 py-4 bg-black/80 border-t border-gray-800">
            <div className="flex items-center gap-1">
              <span className="text-gray-400 text-sm mr-3">
                {currentIndex + 1} / {videos.length}
              </span>
              <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900">
                {videos.map((video, index) => (
                  <button
                    key={video._id}
                    onClick={() => setCurrentIndex(index)}
                    className={cn(
                      "flex-shrink-0 relative rounded-lg overflow-hidden transition-all border-2",
                      currentIndex === index
                        ? "border-yellow-400 ring-2 ring-yellow-400/50"
                        : "border-gray-700 hover:border-gray-500"
                    )}
                  >
                    <div className="w-32 h-20 bg-gray-800 flex items-center justify-center">
                      <Play
                        className={cn(
                          "h-6 w-6",
                          currentIndex === index
                            ? "text-yellow-400"
                            : "text-gray-500"
                        )}
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-2">
                      <span className="text-white text-xs font-medium truncate w-full">
                        {video.title || `Video ${index + 1}`}
                      </span>
                    </div>
                    {currentIndex === index && (
                      <div className="absolute top-1 right-1 bg-yellow-400 text-black text-xs px-1.5 py-0.5 rounded-full font-semibold">
                        Now
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
