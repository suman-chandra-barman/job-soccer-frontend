"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import CandidateCard from "../cards/CandidateCard";
import { useGetCandidateFeaturedQuery } from "@/redux/features/candidate/candidateApi";
import { ICandidate } from "@/types/user";
import { Skeleton } from "../ui/skeleton";

export function Candidates() {
  const {
    data: candidatesData,
    isLoading,
    isError,
  } = useGetCandidateFeaturedQuery(undefined);

  // Extract Professional Players from the grouped data
  const professionalPlayers: ICandidate[] =
    candidatesData?.data?.ProfessionalPlayer || [];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-4xl font-bold text-[#362F05] mb-3">
            Find Your Dream Team
          </h2>
          <p className=" text-[#504A20] max-w-3xl mx-auto">
            Build your Dream Team and we will connect you with the talent that
            matches your vision
          </p>
        </div>

        {/* Candidates Container */}
        <div className="bg-[#F7F6F2] rounded-2xl p-4 md:p-8">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900">Candidates</h3>
            <Button
              asChild
              className="bg-yellow-300  hover:scale-105 transition-transform duration-200 font-semibold px-6 py-3"
            >
              <Link href="/candidates">See All</Link>
            </Button>
          </div>

          {/* Candidates Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {isLoading ? (
              Array.from({ length: 4 }).map((_, index) => (
                <Skeleton
                  key={`skeleton-${index}`}
                  className="h-[400px] rounded-lg"
                />
              ))
            ) : isError ? (
              <div className="col-span-full text-center py-8 text-gray-500">
                Failed to load candidates. Please try again later.
              </div>
            ) : professionalPlayers.length === 0 ? (
              <div className="col-span-full text-center py-8 text-gray-500">
                No professional players available at the moment.
              </div>
            ) : (
              professionalPlayers.map((candidate: ICandidate) => (
                <CandidateCard key={candidate._id} candidate={candidate} />
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
