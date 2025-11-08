"use client";

import FindYourDreamTeam from "@/components/candidates/FindYourDreamTeam";
import { Button } from "@/components/ui/button";
import React from "react";
import CandidateCard from "@/components/cards/CandidateCard";
import Link from "next/link";
import { CandidateSearch } from "@/components/search/CandidateSearch";
import {
  useGetCandidateFeaturedQuery,
} from "@/redux/features/candidate/candidateApi";
import { ICandidate } from "@/types/user";


function CandidatesPage() {
  const { data: featuredCandidatesData } = useGetCandidateFeaturedQuery(null);

  console.log("featuredCandidatesData", featuredCandidatesData);
  return (
    <div>
      <div className="bg-[#F7F6F2]">
        <CandidateSearch />
      </div>
      {/* Jobs */}
      <div className="container mx-auto px-4 md:px-0">
        <FindYourDreamTeam />

        {/* High School Players */}
        <div className="my-8">
          <div className="flex items-center justify-between py-4">
            <span className="text-xl md:text-2xl font-bold">
              High School Players
            </span>
            <Button variant="link" className="text-black">
              <Link href="/job-board"> See All</Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            {featuredCandidatesData?.data?.HighSchool?.map(
              (candidate: ICandidate) => (
                <CandidateCard key={candidate._id} candidate={candidate} />
              )
            )}
          </div>
        </div>

        {/* College/University Players */}
        <div className="my-8">
          <div className="flex items-center justify-between py-4">
            <span className="text-xl md:text-2xl font-bold">
              College/University Players
            </span>
            <Button variant="link" className="text-black">
              <Link href="/job-board"> See All</Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            {featuredCandidatesData?.data?.["College/University"]?.map(
              (candidate: ICandidate) => (
                <CandidateCard key={candidate._id} candidate={candidate} />
              )
            )}
          </div>
        </div>

        {/* Professional Players */}
        <div className="my-8">
          <div className="flex items-center justify-between py-4">
            <span className="text-xl md:text-2xl font-bold">
              Professional Players
            </span>
            <Button variant="link" className="text-black">
              <Link href="/job-board"> See All</Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            {featuredCandidatesData?.data?.ProfessionalPlayer?.map(
              (candidate: ICandidate) => (
                <CandidateCard key={candidate._id} candidate={candidate} />
              )
            )}
          </div>
        </div>

        {/* Amateur Players */}
        <div className="my-8">
          <div className="flex items-center justify-between py-4">
            <span className="text-xl md:text-2xl font-bold">
              Amateur Players
            </span>
            <Button variant="link" className="text-black">
              <Link href="/job-board"> See All</Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            {featuredCandidatesData?.data?.AmateurPlayer?.map(
              (candidate: ICandidate) => (
                <CandidateCard key={candidate._id} candidate={candidate} />
              )
            )}
          </div>
        </div>

        {/* On-field Staff */}
        <div className="my-8">
          <div className="flex items-center justify-between py-4">
            <span className="text-xl md:text-2xl font-bold">
              On-field Staff
            </span>
            <Button variant="link" className="text-black">
              <Link href="/job-board"> See All</Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            {featuredCandidatesData?.data?.Onfieldstaff?.map(
              (candidate: ICandidate) => (
                <CandidateCard key={candidate._id} candidate={candidate} />
              )
            )}
          </div>
        </div>

        {/* Office Staff */}
        <div className="my-8">
          <div className="flex items-center justify-between py-4">
            <span className="text-xl md:text-2xl font-bold">Office Staff</span>
            <Button variant="link" className="text-black">
              <Link href="/job-board"> See All</Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            {featuredCandidatesData?.data?.OfficeStaff?.map(
              (candidate: ICandidate) => (
                <CandidateCard key={candidate._id} candidate={candidate} />
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CandidatesPage;
