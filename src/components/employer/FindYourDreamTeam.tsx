import React from "react";
import { Button } from "../ui/button";
import CandidateCard from "../cards/CandidateCard";
import Link from "next/link";
import Image from "next/image";
import candidatesImg from "@/assets/candidates/candidates.png";
import { useGetCandidatesQuery } from "@/redux/features/candidate/candidateApi";
import { ICandidate } from "@/types/user";
import { CandidateCardSkeleton } from "../skeleton/CandidateCardSkeleton";

const FindYourDreamTeam = () => {
  const { data: candidatesData, isLoading } = useGetCandidatesQuery(null);

  return (
    <div className=" bg-white">
      <div className="container mx-auto px-4 py-8 lg:py-16">
        <div className="text-center mb-12">
          <h2 className="text-xl md:text-4xl font-bold text-[#362F05]">
            Find Your Dream Team
          </h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 lg:gap-6">
          {/* Left Column - Image */}
          <div className={``}>
            <Image
              src={candidatesImg}
              alt="Candidates"
              className="w-full h-full xl:max-h-[1000px] object-cover rounded-2xl"
            />
          </div>

          {/* Right Column - Candidates */}
          <div className="bg-[#F7F6F2] rounded-3xl p-4 md:p-6 w-full">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                Candidates
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 mb-4">
              {isLoading
                ? Array.from({ length: 4 }).map((_, index) => (
                    <CandidateCardSkeleton key={index} />
                  ))
                : candidatesData?.data
                    ?.slice(0, 4)
                    .map((candidate: ICandidate) => (
                      <CandidateCard
                        key={candidate._id}
                        candidate={candidate}
                      />
                    ))}
            </div>

            <div className="flex justify-end">
              <Button className="bg-yellow-300  hover:scale-105 transition-transform duration-200 font-semibold px-6 py-3">
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
