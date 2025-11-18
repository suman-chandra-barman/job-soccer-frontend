"use client";

import React from "react";
import { MapPin, SquareCheck } from "lucide-react";
import { JobFilters } from "@/components/jobs/JobFilters";
import { TCandidate } from "@/components/home/Canditates";
import user1 from "@/assets/candidates/user1.png";
import user2 from "@/assets/candidates/user2.png";
import CandidateCard from "@/components/cards/CandidateCard";
import { JobSearch } from "@/components/search/JobSearch";

// TypeScript interfaces
interface JobDetails {
  id: number;
  title: string;
  club: string;
  location: string;
  workType: string;
  applicationDeadline: string;
  overview: string;
  position: string;
  salary: string;
  duration: string;
  experience: string;
  requirements: string;
  videoAssessment: string;
  responsibilities: string[];
  skillsQualifications: string[];
  applicationRequirements: string[];
  logo: string;
}

const JobDetailsPage = () => {
  // Sample job data - this would come from props or API
  const jobData: JobDetails = {
    id: 1,
    title: "Defence Player",
    club: "Nebula City FC",
    location: "Barcelona, Spain",
    workType: "Part-time",
    applicationDeadline: "July 30, 2025",
    overview:
      "Ajax Youth Academy is seeking a dedicated and highly skilled U21 Goalkeeper for a 3-month trial position. The role involves regular training sessions, competitive match participation, and performance evaluations. Ideal candidates should be physically fit, tactically aware, and confident in goal.",
    position: "Goalkeeper",
    salary: "$1,000/month + Performance Bonuses",
    duration: "Trial – 3 Months",
    experience: "2 years experience",
    requirements: "Video Highlight, AI Assessment",
    videoAssessment: "87% Compatible",
    responsibilities: [
      "Participate in daily training and match simulations",
      "Follow coaching feedback and tactical strategies",
      "Maintain peak physical and mental readiness",
      "Record and submit performance sessions",
      "Engage with team communication channels",
    ],
    skillsQualifications: [
      "Strong shot-stopping and positioning skills",
      "Confident in aerial duels and 1-on-1 situations",
      "Previous club or school-level experience",
      "Good communication with defenders",
      "Willing to complete AI assessment & video submission",
      "Basic English or local language understanding",
    ],
    applicationRequirements: [
      "Updated CV / Football Resume (PDF)",
      "Upload 3-5 Performance Highlight Videos",
      "Complete AI Psychological & Skill Assessment",
      "Optional: Reference Letter from Coach or Trainer",
    ],
    logo: "🏟️",
  };
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
    <div className="min-h-screen bg-gray-50">
      <div className="bg-[#F7F6F2]">
        <h2 className="text-3xl md:text-4xl text-[#362F05] text-center pt-10 mb-24">
          Find Your <span className="text-green-400">Ultimate Job</span>
          <br />
          Search Companion
        </h2>
        <JobSearch />
        <JobFilters />
      </div>
      <div className="container mx-auto px-4 md:px-0 py-16">
        <div className="flex flex-col-reverse lg:flex-row justify-between gap-4">
          {/* left column */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4">
            {candidates.map((candidate: TCandidate) => (
              <CandidateCard key={candidate.id} candidate={candidate} />
            ))}
          </div>

          <div className="flex-3 ">
            <div className="border border-gray-200 shadow-sm rounded-2xl">
              <div className="p-6">
                {/* Header Section */}
                <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-6">
                  <div className="mb-4 lg:mb-0">
                    <h1 className="text-2xl font-bold text-black mb-2">
                      {jobData.title}
                    </h1>
                    <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600">
                      <span>{jobData.club}</span>
                      <span>•</span>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span>{jobData.location}</span>
                      </div>
                      <span>•</span>
                      <span>{jobData.workType}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-gray-600">Application Deadline:</span>
                    <span className="text-gray-900 font-medium">
                      {jobData.applicationDeadline}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Left Column - Main Content */}
                  <div className="lg:col-span-2 space-y-8">
                    {/* Job Overview */}
                    <div>
                      <h2 className="text-lg font-semibold text-black mb-3">
                        Job Overview
                      </h2>
                      <p className="text-gray-700 leading-relaxed text-sm">
                        {jobData.overview}
                      </p>
                    </div>

                    {/* Job Summary - Mobile Only */}
                    <div className="lg:hidden">
                      <div className="bg-gray-50 rounded-lg p-5">
                        <h3 className="text-lg font-semibold text-black mb-4">
                          Job Summary
                        </h3>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <div className="text-xs text-gray-500 mb-1">
                              Position
                            </div>
                            <div className="text-sm font-medium text-black">
                              {jobData.position}
                            </div>
                          </div>

                          <div>
                            <div className="text-xs text-gray-500 mb-1">
                              Salary
                            </div>
                            <div className="text-sm font-medium text-black">
                              {jobData.salary}
                            </div>
                          </div>

                          <div>
                            <div className="text-xs text-gray-500 mb-1">
                              Duration
                            </div>
                            <div className="text-sm font-medium text-black">
                              {jobData.duration}
                            </div>
                          </div>

                          <div>
                            <div className="text-xs text-gray-500 mb-1">
                              Experience
                            </div>
                            <div className="text-sm font-medium text-black">
                              {jobData.experience}
                            </div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-500 mb-1">
                              Requirements
                            </div>
                            <div className="text-sm font-medium text-black">
                              {jobData.requirements}
                            </div>
                          </div>

                          <div>
                            <div className="text-xs text-gray-500 mb-1">
                              AI Match Score
                            </div>
                            <div className="flex items-center gap-2">
                              <SquareCheck className="w-4 h-4 text-green-500 " />
                              <span className="text-sm font-medium text-black">
                                {jobData.videoAssessment}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Responsibilities */}
                    <div>
                      <h2 className="text-lg font-semibold text-black mb-3">
                        Responsibilities
                      </h2>
                      <ul className="space-y-2">
                        {jobData.responsibilities.map((item, index) => (
                          <li
                            key={index}
                            className="flex items-start gap-3 text-sm text-gray-700"
                          >
                            <span className="w-1 h-1 bg-black rounded-full mt-2 flex-shrink-0"></span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Required Skills & Qualifications */}
                    <div>
                      <h2 className="text-lg font-semibold text-black mb-3">
                        Required Skills & Qualifications
                      </h2>
                      <ul className="space-y-2">
                        {jobData.skillsQualifications.map((item, index) => (
                          <li
                            key={index}
                            className="flex items-start gap-3 text-sm text-gray-700"
                          >
                            <span className="w-1 h-1 bg-black rounded-full mt-2 flex-shrink-0"></span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Application Requirements */}
                    <div>
                      <h2 className="text-lg font-semibold text-black mb-3">
                        Application Requirements
                      </h2>
                      <ul className="space-y-2">
                        {jobData.applicationRequirements.map((item, index) => (
                          <li
                            key={index}
                            className="flex items-start gap-3 text-sm text-gray-700"
                          >
                            <span className="w-1 h-1 bg-black rounded-full mt-2 flex-shrink-0"></span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Mobile Action Buttons */}
                    <div className="lg:hidden flex flex-col sm:flex-row gap-3 pt-6">
                      <button className="flex-1 px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors">
                        Save Job
                      </button>
                      <button className="flex-1 px-8 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors">
                        Apply Now
                      </button>
                    </div>
                  </div>

                  {/* Right Column - Job Summary Sidebar (Desktop Only) */}
                  <div className="hidden lg:block lg:col-span-1">
                    <div className="bg-gray-50 rounded-lg p-5 sticky top-6">
                      <h3 className="text-lg font-semibold text-black mb-4">
                        Job Summary
                      </h3>

                      <div className="space-y-4">
                        <div>
                          <div className="text-xs text-gray-500 mb-1">
                            Position
                          </div>
                          <div className="text-sm font-medium text-black">
                            {jobData.position}
                          </div>
                        </div>

                        <div>
                          <div className="text-xs text-gray-500 mb-1">
                            Salary
                          </div>
                          <div className="text-sm font-medium text-black">
                            {jobData.salary}
                          </div>
                        </div>

                        <div>
                          <div className="text-xs text-gray-500 mb-1">
                            Duration
                          </div>
                          <div className="text-sm font-medium text-black">
                            {jobData.duration}
                          </div>
                        </div>

                        <div>
                          <div className="text-xs text-gray-500 mb-1">
                            Experience
                          </div>
                          <div className="text-sm font-medium text-black">
                            {jobData.experience}
                          </div>
                        </div>

                        <div>
                          <div className="text-xs text-gray-500 mb-1">
                            Requirements
                          </div>
                          <div className="text-sm font-medium text-black">
                            {jobData.requirements}
                          </div>
                        </div>

                        <div className="pt-2">
                          <div className="text-xs text-gray-500 mb-1">
                            AI Match Score
                          </div>
                          <div className="flex items-center gap-2">
                            <SquareCheck className="w-4 h-4 text-green-500 " />
                            <span className="text-sm font-medium text-black">
                              {jobData.videoAssessment}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Desktop Action Buttons */}
                      <div className="mt-6 flex flex-col gap-3">
                        <button className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors text-sm">
                          Save Job
                        </button>
                        <button className="w-full px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors text-sm">
                          Apply Now
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailsPage;
