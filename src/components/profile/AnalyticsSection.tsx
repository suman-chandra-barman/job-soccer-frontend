"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { LayoutGrid, UserPlus } from "lucide-react";
import { useGetMyProfileViewsQuery } from "@/redux/features/profileViews/profileViewsApi";
import { useRouter } from "next/navigation";

function AnalyticsSection() {
  const router = useRouter();
  const { data: profileViewsData, isLoading } = useGetMyProfileViewsQuery({
    page: 1,
    limit: 10,
  });

  const totalViews = profileViewsData?.data?.stats?.totalViews || 0;

  const handleProfileViewClick = () => {
    router.push("/profile/views");
  };

  return (
    <section className="my-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Analytics</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div
              className="flex items-center space-x-4 cursor-pointer hover:bg-gray-50 p-3 rounded-lg transition-colors"
              onClick={handleProfileViewClick}
            >
              <div className="p-3 bg-blue-100 rounded-lg">
                <LayoutGrid className="h-6 w-6" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">Profile View</p>
                <p className="text-sm text-gray-600">
                  {isLoading
                    ? "Loading..."
                    : `${totalViews} ${
                        totalViews === 1 ? "person has" : "people have"
                      } viewed your profile`}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <UserPlus className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Access Request</h3>
                <p className="text-sm text-gray-600">
                  Discover who&apos;s viewed your profile
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}

export default AnalyticsSection;
