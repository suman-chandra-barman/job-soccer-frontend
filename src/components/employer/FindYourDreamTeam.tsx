import { Check } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import { TCandidate } from "../home/Canditates";
import user1 from "@/assets/candidates/user1.png";
import user2 from "@/assets/candidates/user2.png";
import CandidateCard from "../cards/CandidateCard";

const FindYourDreamTeam = () => {
  const opportunities: string[] = [
    "Club Professional and Amateur - Discover players, staff and insights",
    "Agent - Manage talent and explore club networks",
    "Professional Player and Amateur find Clubs, Agents and opportunities",
    "Staff - Browse and connect with Clubs and Agents",
    "College/University - Connect with Coaches and discover soccer talents",
  ];
  const candidates: TCandidate[] = [
    {
      id: 1,
      name: "Jacob Jones",
      role: "Head Coach",
      location: "Rio, Brazil",
      nationality: "Brazil",
      avatar: user1,
    },
    {
      id: 2,
      name: "Courtney Henry",
      role: "Marketing Manager",
      location: "Dallas, USA",
      nationality: "USA",
      avatar: user2,
    },
    {
      id: 3,
      name: "Wade Warren",
      role: "Technical Director",
      location: "Glasgow, Scotland",
      nationality: "Scottish",
      avatar: user1,
    },
    {
      id: 4,
      name: "John Doe",
      role: "Striker (Player)",
      location: "Madrid, Spain",
      nationality: "Bangladeshi",
      avatar: user2,
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
          <div className={`space-y-6 py-8 `}>
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
          <div className="bg-[#F7F6F2] rounded-3xl p-2 md:p-4">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl md:4xl font-bold text-gray-900">
                Candidate
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4 mb-8">
              {candidates.map((candidate: TCandidate) => (
                <CandidateCard key={candidate.id} candidate={candidate} />
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
