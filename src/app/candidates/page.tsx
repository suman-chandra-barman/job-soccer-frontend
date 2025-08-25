import FindYourDreamTeam from "@/components/candidates/FindYourDreamTeam";
import { TCandidate } from "@/components/home/Canditates";
import { JobSearch } from "@/components/home/JobSearch";
import { JobFilters } from "@/components/jobs/JobFilters";
import { Button } from "@/components/ui/button";
import React from "react";
import user1 from "@/assets/candidates/user1.png";
import user2 from "@/assets/candidates/user2.png";
import CandidateCard from "@/components/cards/CandidateCard";

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
function CandidatesPage() {
  return (
    <div>
      <div className="bg-[#F7F6F2]">
        <h2 className="text-3xl md:text-4xl text-[#362F05] text-center pt-10 mb-24">
          Find Your <span className="text-green-400">Ultimate Job</span>
          <br />
          Search Companion
        </h2>
        <JobSearch />
        <JobFilters />
      </div>
      {/* Jobs */}
      <div className="container mx-auto px-4 md:px-0">
        <FindYourDreamTeam />

        {/* Players */}
        <div className="my-8">
          <div className="flex items-center justify-between py-4">
            <span className="text-2xl font-bold">Player</span>
            <Button variant="link" className="text-black">
              All Jobs
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {candidates.map((candidate: TCandidate) => (
              <CandidateCard key={candidate.id} candidate={candidate} />
            ))}
          </div>
        </div>
        {/* Staff on The Field */}
        <div className="my-8">
          <div className="flex items-center justify-between py-4">
            <span className="text-2xl font-bold">Staff on The Field</span>
            <Button variant="link" className="text-black">
              All Jobs
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {candidates.map((candidate: TCandidate) => (
              <CandidateCard key={candidate.id} candidate={candidate} />
            ))}
          </div>
        </div>

        {/* Office Staff */}
        <div className="my-8">
          <div className="flex items-center justify-between py-4">
            <span className="text-2xl font-bold">Office Staff</span>
            <Button variant="link" className="text-black">
              All Jobs
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {candidates.map((candidate: TCandidate) => (
              <CandidateCard key={candidate.id} candidate={candidate} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CandidatesPage;
