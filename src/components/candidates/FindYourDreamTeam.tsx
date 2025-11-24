import { Check } from "lucide-react";
import React, { Suspense } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import EmployersPreview from "./EmployersPreview";
import { CardSkeletonGrid } from "../skeleton/CardSkeleton";

const FindYourDreamTeam = () => {
  const opportunities: string[] = [
    "Club Professional and Amateur - Discover players, staff and insights",
    "Agent - Manage talent and explore club networks",
    "Professional Player and Amateur find Clubs, Agents and opportunities",
    "Staff - Browse and connect with Clubs and Agents",
    "College/University - Connect with Coaches and discover soccer talents",
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8 lg:py-16">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-4xl font-bold text-[#362F05] mb-1">
            Find your dream job!
          </h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
          {/* Left Column - Opportunities */}
          <div className={`space-y-6 py-8 lg:col-span-2`}>
            <h2 className="text-2xl md:text-4xl font-bold text-[#362F05] leading-tight">
              Find the Right Opportunity for You
            </h2>
            <div className="space-y-8 text-[#504A20]">
              {opportunities.map((opportunity, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-1 bg-amber-50">
                    <Check className="w-5 h-5 text-[#504A20]" />
                  </div>
                  <p className="text-gray-700 leading-relaxed">{opportunity}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Jobs */}
          <div className="bg-[#F7F6F2] rounded-3xl p-4 md:p-6 w-full lg:col-span-3">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                Employers
              </h2>
            </div>

            <Suspense fallback={<CardSkeletonGrid className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 " />}>
              <EmployersPreview />
            </Suspense>

            <div className="flex justify-end mt-4">
              <Button className="bg-yellow-300  hover:scale-105 transition-transform duration-200 font-semibold px-6 py-3">
                <Link href="/employers">See All</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FindYourDreamTeam;
