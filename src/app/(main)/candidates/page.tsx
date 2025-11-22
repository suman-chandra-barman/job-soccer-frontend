"use client";

import FindYourDreamTeam from "@/components/candidates/FindYourDreamTeam";
import { Button } from "@/components/ui/button";
import React, { useMemo } from "react";
import CandidateCard from "@/components/cards/CandidateCard";
import Link from "next/link";
import { CandidateSearch } from "@/components/search/CandidateSearch";
import { useGetCandidateFeaturedQuery } from "@/redux/features/candidate/candidateApi";
import { ICandidate } from "@/types/user";
import { Skeleton } from "@/components/ui/skeleton";
import { CardSkeletonGrid } from "@/components/skeleton/CardSkeleton";
import { CandidateRole } from "@/types/profile";

// Types for better type safety
interface CandidateSection {
  title: string;
  dataKey: keyof FeaturedCandidatesData;
  searchRole: string;
}

interface FeaturedCandidatesData {
  HighSchool?: ICandidate[];
  "College/University"?: ICandidate[];
  ProfessionalPlayer?: ICandidate[];
  AmateurPlayer?: ICandidate[];
  Onfieldstaff?: ICandidate[];
  OfficeStaff?: ICandidate[];
}

// Loading skeleton component
const LoadingSection = () => (
  <div className="my-8">
    <div className="flex items-center justify-between py-4">
      <Skeleton className="h-8 w-48" />
      <Skeleton className="h-8 w-20" />
    </div>
    <CardSkeletonGrid className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4" />
  </div>
);

// Candidate section component for reusability
interface CandidateSectionProps {
  title: string;
  candidates?: ICandidate[];
  searchRole: string;
}

const CandidateSection: React.FC<CandidateSectionProps> = ({
  title,
  candidates,
  searchRole,
}) => {
  if (!candidates || candidates.length === 0) return null;

  return (
    <section className="my-8">
      <div className="flex items-center justify-between py-4">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900">{title}</h2>
        <Button variant="link" className="text-black hover:text-green-500">
          <Link
            href={`/candidates/search?role=${encodeURIComponent(searchRole)}`}
          >
            See All
          </Link>
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        {candidates.map((candidate) => (
          <CandidateCard key={candidate._id} candidate={candidate} />
        ))}
      </div>
    </section>
  );
};

function CandidatesPage() {
  const { data: featuredCandidatesData, isLoading } =
    useGetCandidateFeaturedQuery(null);

  // Define sections configuration for better maintainability
  const candidateSections: CandidateSection[] = useMemo(
    () => [
      {
        title: "High School Players",
        dataKey: "HighSchool",
        searchRole: CandidateRole.HIGH_SCHOOL,
      },
      {
        title: "College/University Players",
        dataKey: "College/University",
        searchRole: CandidateRole.COLLEGE_UNIVERSITY,
      },
      {
        title: "Professional Players",
        dataKey: "ProfessionalPlayer",
        searchRole: CandidateRole.PROFESSIONAL_PLAYER,
      },
      {
        title: "Amateur Players",
        dataKey: "AmateurPlayer",
        searchRole: CandidateRole.AMATEUR_PLAYER,
      },
      {
        title: "On field Staff",
        dataKey: "Onfieldstaff",
        searchRole: CandidateRole.ON_FIELD_STAFF,
      },
      {
        title: "Office Staff",
        dataKey: "OfficeStaff",
        searchRole: CandidateRole.OFFICE_STAFF,
      },
    ],
    []
  );

  const featuredData = featuredCandidatesData?.data as
    | FeaturedCandidatesData
    | undefined;

  // Loading state
  if (isLoading) {
    return (
      <div>
        <div className="bg-[#F7F6F2]">
          <CandidateSearch />
        </div>
        <div className="container mx-auto px-4 md:px-0">
          <FindYourDreamTeam />
          {Array.from({ length: 6 }).map((_, index) => (
            <LoadingSection key={index} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Search Section */}
      <div className="bg-[#F7F6F2]">
        <CandidateSearch />
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 md:px-0">
        <FindYourDreamTeam />

        {/* Candidate Sections */}
        {candidateSections.map((section) => (
          <CandidateSection
            key={section.dataKey}
            title={section.title}
            candidates={featuredData?.[section.dataKey]}
            searchRole={section.searchRole}
          />
        ))}

        {/* Empty State */}
        {!isLoading && !featuredData && (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">
              No candidates available at the moment.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default CandidatesPage;
