"use client";

import React, { useState } from "react";
import user1 from "@/assets/candidates/user1.png";
import user2 from "@/assets/candidates/user2.png";
import CandidateCard from "@/components/cards/CandidateCard";
import { TCandidate } from "@/components/home/Canditates";
import { TClub } from "../all-employer/page";
import { EmployerCard } from "@/components/cards/EmployerCard";
import { Search, Settings2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

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

function MyNetworkPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");

  return (
    <div className="container mx-auto px-4 md:px-0 py-16">
      <div className=" flex items-center justify-between mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">My Network</h2>
        <div className="flex gap-4 items-center">
          {/* Search Bar */}
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <Input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
          </div>
          {/* Filter Select */}
          <Select value={selectedFilter} onValueChange={setSelectedFilter}>
            <SelectTrigger className="w-32 h-12 rounded-xl border-gray-300">
              <Settings2 className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="player">Player</SelectItem>
              <SelectItem value="club">Club</SelectItem>
              <SelectItem value="agent">Agent</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Clubs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {clubsData.map((job) => (
          <EmployerCard key={job.id} job={job} />
        ))}
      </div>
      {/* Players */}
      <div className="my-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {candidates.map((candidate: TCandidate) => (
            <CandidateCard key={candidate.id} candidate={candidate} />
          ))}
        </div>
      </div>
      {/* Clubs */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {clubsData.map((job) => (
          <EmployerCard key={job.id} job={job} />
        ))}
      </div>
      {/* Players */}
      <div className="my-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {candidates.map((candidate: TCandidate) => (
            <CandidateCard key={candidate.id} candidate={candidate} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default MyNetworkPage;
