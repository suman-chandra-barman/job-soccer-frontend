"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Play } from "lucide-react";
import { useCallback } from "react";

interface Video {
  _id: string;
  url: string;
  title: string;
  duration: number;
  uploadedAt: string;
  videoType?: string;
}

interface VideoSectionProps {
  videos?: Video[];
  userId?: string;
}

export default function VideoSection({ videos = [] }: VideoSectionProps) {
  const getVideoUrl = useCallback((video: Video): string => {
    if (!video?.url) return "";

    if (video.url.startsWith("http")) {
      return video.url;
    }
    return `${process.env.NEXT_PUBLIC_BASE_URL}/${video.url}`;
  }, []);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg lg:text-xl">Videos</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        {videos.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <Play className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No videos yet
            </h3>
            <p className="text-gray-600">
              Videos will appear here once uploaded
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {videos.map((video) => {
              const videoUrl = getVideoUrl(video);

              return (
                <div key={video._id} className="relative group">
                  <div className="relative aspect-video bg-gray-900 rounded-lg overflow-hidden">
                    {/* Video Player */}
                    <video
                      src={videoUrl}
                      controls
                      controlsList="nodownload"
                      className="w-full h-full object-contain"
                      preload="metadata"
                      crossOrigin="anonymous"
                      playsInline
                      onError={(e) => {
                        console.error("Video load error:", {
                          video,
                          videoUrl,
                          error: e,
                        });
                      }}
                      aria-label={video.title || "Video"}
                    >
                      Your browser does not support the video tag.
                    </video>
                  </div>

                  {/* Video Title and Info */}
                  <div className="mt-2">
                    <p className="text-sm font-medium text-gray-900 line-clamp-2">
                      {video?.videoType ? video.videoType : "Highlights Video"}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
