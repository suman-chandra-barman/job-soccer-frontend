import { JobSearch } from "@/components/search/JobSearch";
import { JobFilters } from "@/components/jobs/JobFilters";
import React from "react";
import { EmployerCard } from "@/components/cards/EmployerCard";

export interface TClub {
  id: number;
  name: string;
  location: string;
  logo: string;
  verified: boolean;
  clubType: TClubType;
  activeJobPosts: number;
  followers: number;
  following: number;
}

type TClubType =
  | "Amateur Club"
  | "Professional Club"
  | "Youth Academy"
  | "Semi-Professional";

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
  {
    id: 5,
    name: "Juventus FC",
    location: "Turin, Italy",
    logo: "⚫",
    verified: true,
    clubType: "Professional Club",
    activeJobPosts: 9,
    followers: 76543,
    following: 38,
  },
  {
    id: 6,
    name: "Paris Saint-Germain",
    location: "Paris, France",
    logo: "🔵",
    verified: true,
    clubType: "Professional Club",
    activeJobPosts: 6,
    followers: 92184,
    following: 71,
  },
  {
    id: 7,
    name: "Chelsea FC",
    location: "London, England",
    logo: "🔵",
    verified: true,
    clubType: "Professional Club",
    activeJobPosts: 11,
    followers: 68291,
    following: 43,
  },
  {
    id: 8,
    name: "AC Milan",
    location: "Milan, Italy",
    logo: "🔴",
    verified: true,
    clubType: "Professional Club",
    activeJobPosts: 4,
    followers: 59873,
    following: 56,
  },
  {
    id: 9,
    name: "Borussia Dortmund",
    location: "Dortmund, Germany",
    logo: "🟡",
    verified: true,
    clubType: "Professional Club",
    activeJobPosts: 8,
    followers: 45672,
    following: 94,
  },
  {
    id: 10,
    name: "Liverpool FC",
    location: "Liverpool, England",
    logo: "🔴",
    verified: true,
    clubType: "Professional Club",
    activeJobPosts: 7,
    followers: 82945,
    following: 29,
  },
  {
    id: 11,
    name: "Real Madrid CF",
    location: "Madrid, Spain",
    logo: "⚪",
    verified: true,
    clubType: "Professional Club",
    activeJobPosts: 10,
    followers: 134578,
    following: 61,
  },
  {
    id: 12,
    name: "Atlético Madrid",
    location: "Madrid, Spain",
    logo: "🔴",
    verified: true,
    clubType: "Professional Club",
    activeJobPosts: 6,
    followers: 41826,
    following: 78,
  },
];

function CompaniesPage() {
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
        {/* New Listed Jobs */}
        <div>
          <h2 className="text-3xl md:text-4xl text-red-400 font-semibold my-10">
            New Listed
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-4 mb-8">
            {clubsData.slice(0, 4).map((job) => (
              <EmployerCard key={job.id} job={job} />
            ))}
          </div>
        </div>
        {/* All Jobs */}
        <div>
          <h2 className="text-3xl md:text-4xl font-semibold my-10">All Jobs</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-4 mb-8">
            {clubsData.map((job) => (
              <EmployerCard key={job.id} job={job} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CompaniesPage;
