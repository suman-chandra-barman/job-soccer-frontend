import { Button } from "@/components/ui/button";
import React from "react";
import FindYourDreamTeam from "@/components/employer/FindYourDreamTeam";
import { TClub } from "../all-employer/page";
import { EmployerCard } from "@/components/cards/EmployerCard";
import { Link } from "lucide-react";
import { EmployerSearch } from "@/components/search/EmploerSearch";

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

function EmployersPage() {
  return (
    <div>
      <div className="bg-[#F7F6F2]">
        <EmployerSearch />
      </div>
      {/* Jobs */}
      <div className="container mx-auto px-4 md:px-0">
        <FindYourDreamTeam />

        {/* Employer */}
        <div className="my-8">
          <div className="flex items-center justify-between py-4">
            <span className="text-2xl font-bold">Consulting Company</span>
            <Button variant="link" className="text-black">
              <Link href="/job-board">See All</Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            {clubsData.map((job) => (
              <EmployerCard key={job.id} job={job} />
            ))}
          </div>
        </div>
        {/* Club */}
        <div className="my-8">
          <div className="flex items-center justify-between py-4">
            <span className="text-2xl font-bold">Club</span>
            <Button variant="link" className="text-black">
              See All
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            {clubsData.map((job) => (
              <EmployerCard key={job.id} job={job} />
            ))}
          </div>
        </div>

        {/* Agent */}
        <div className="my-8">
          <div className="flex items-center justify-between py-4">
            <span className="text-2xl font-bold">Agent</span>
            <Button variant="link" className="text-black">
              See All
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            {clubsData.map((job) => (
              <EmployerCard key={job.id} job={job} />
            ))}
          </div>
        </div>

        {/* College & University */}
        <div className="my-8">
          <div className="flex items-center justify-between py-4">
            <span className="text-2xl font-bold">College & University</span>
            <Button variant="link" className="text-black">
              See All
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            {clubsData.map((job) => (
              <EmployerCard key={job.id} job={job} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployersPage;
