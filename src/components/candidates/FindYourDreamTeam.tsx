import { Check } from "lucide-react";
import React from "react";
import { EmployerCard } from "../cards/EmployerCard";
import { Button } from "../ui/button";
import { TClub } from "@/app/job-board/page";

const FindYourDreamTeam = () => {
  const opportunities: string[] = [
    "Club Professional and Amateur - Discover players, staff and insights",
    "Agent - Manage talent and explore club networks",
    "Professional Player and Amateur find Clubs, Agents and opportunities",
    "Staff - Browse and connect with Clubs and Agents",
    "College/University - Connect with Coaches and discover soccer talents",
  ];
  const clubsData: TClub[] = [
    {
      id: 1,
      name: "Barcelona FC",
      location: "Barcelona, Spain",
      logo: "🔵",
      verified: true,
      clubType: "Professional Club",
      activeJobPosts: 8,
      followers: 125430,
      following: 45,
    },
    {
      id: 2,
      name: "Manchester United",
      location: "Manchester, England",
      logo: "🔴",
      verified: true,
      clubType: "Professional Club",
      activeJobPosts: 12,
      followers: 98750,
      following: 67,
    },
    {
      id: 3,
      name: "Bayern Munich",
      location: "Munich, Germany",
      logo: "⚪",
      verified: true,
      clubType: "Professional Club",
      activeJobPosts: 7,
      followers: 87643,
      following: 52,
    },
    {
      id: 4,
      name: "Ajax Amsterdam",
      location: "Amsterdam, Netherlands",
      logo: "🟡",
      verified: true,
      clubType: "Professional Club",
      activeJobPosts: 5,
      followers: 54320,
      following: 89,
    },
  ];
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8 lg:py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#362F05] mb-1">
            Find Your Dream Team
          </h2>
          <p>
            Build your dream team . We connect you with the talent that fits
            your vision
          </p>
        </div>
        <div className="md:flex gap-2 lg:gap-12 items-start">
          {/* Left Column - Opportunities */}
          <div className={`space-y-6 py-8 md:w-2/5`}>
            <h2 className="text-3xl md:text-4xl font-bold text-[#362F05] leading-tight">
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
          <div className="bg-[#F7F6F2] rounded-3xl p-2 md:p-4  md:w-3/5">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl md:4xl font-bold text-gray-900">
                Employer
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4 mb-8">
              {clubsData.map((job) => (
                <EmployerCard key={job.id} job={job} />
              ))}
            </div>

            <div className="flex justify-end">
              <Button className="bg-yellow-300 hover:bg-yellow-400 text-black font-semibold px-6 py-3 rounded-lg">
                See All Jobs
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FindYourDreamTeam;
