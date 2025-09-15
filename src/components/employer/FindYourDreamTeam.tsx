import React from "react";
import { Button } from "../ui/button";
import { TCandidate } from "../home/Canditates";
import user1 from "@/assets/candidates/user1.png";
import user2 from "@/assets/candidates/user2.png";
import CandidateCard from "../cards/CandidateCard";
import Link from "next/link";
import Image from "next/image";
import candidatesImg from "@/assets/candidates/candidates.png";

const FindYourDreamTeam = () => {
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
    <div className=" bg-white">
      <div className="container mx-auto px-4 py-8 lg:py-16">
        <div className="text-center mb-12">
          <h2 className="text-xl md:text-4xl font-bold text-[#362F05] mb-1">
            Find Your Dream Team
          </h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 lg:gap-6">
          {/* Left Column - Opportunities */}
          <div className={``}>
            <Image
              src={candidatesImg}
              alt="Candidates"
              className="w-full h-full xl:max-h-[1000px] object-cover rounded-2xl"
            />
          </div>

          {/* Right Column - Jobs */}
          <div className="bg-[#F7F6F2] rounded-3xl p-4 md:p-6 w-full">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                Candidates
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 mb-4">
              {candidates.map((candidate: TCandidate) => (
                <CandidateCard key={candidate.id} candidate={candidate} />
              ))}
            </div>

            <div className="flex justify-end">
              <Button className="bg-yellow-300 hover:bg-yellow-400 text-black font-semibold px-6 py-3 rounded-lg">
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
