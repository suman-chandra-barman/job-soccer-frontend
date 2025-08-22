import { Check } from "lucide-react";
import React from "react";
import { NewJobs } from "./NewJobs";

const FindYourNextJob = () => {
  const opportunities: string[] = [
    "Club Professional and Amateur - Discover players, staff and insights",
    "Agent - Manage talent and explore club networks",
    "Professional Player and Amateur find Clubs, Agents and opportunities",
    "Staff - Browse and connect with Clubs and Agents",
    "College/University - Connect with Coaches and discover soccer talents",
  ];
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left Column - Opportunities */}
          <div className={`space-y-6 p-8`}>
            <h1 className="text-3xl md:text-4xl font-bold text-[#362F05] leading-tight">
              Find the Right Opportunity for You
            </h1>

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
          <div>
           <NewJobs />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FindYourNextJob;
