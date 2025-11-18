"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import FindYourDreamTeam from "@/components/employer/FindYourDreamTeam";
import { EmployerCard } from "@/components/cards/EmployerCard";
import { Link } from "lucide-react";
import { EmployerSearch } from "@/components/search/EmploerSearch";
import { IEmployer } from "@/types/user";
import { useGetEmployerFeaturedQuery } from "@/redux/features/employer/employerApi";
import { Skeleton } from "@/components/ui/skeleton";
import { CardSkeletonGrid } from "@/components/skeleton/CardSkeleton";

function EmployersPage() {
  const { data: featuredEmployersData, isLoading } =
    useGetEmployerFeaturedQuery(null);

  const LoadingSection = () => (
    <div className="my-8">
      <div className="flex items-center justify-between py-4">
        <div className="w-48">
          <Skeleton className="h-8" />
        </div>
        <div className="w-20">
          <Skeleton className="h-8" />
        </div>
      </div>
      <CardSkeletonGrid className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 " />
    </div>
  );

  if (isLoading) {
    return (
      <div>
        <div className="bg-[#F7F6F2]">
          <EmployerSearch />
        </div>
        <div className="container mx-auto px-4 md:px-0">
          <FindYourDreamTeam />
          <LoadingSection />
          <LoadingSection />
          <LoadingSection />
        </div>
      </div>
    );
  }
  return (
    <div>
      <div className="bg-[#F7F6F2]">
        <EmployerSearch />
      </div>
      {/* Jobs */}
      <div className="container mx-auto px-4 md:px-0">
        <FindYourDreamTeam />

        {/* Academy */}
        <div className="my-8">
          <div className="flex items-center justify-between py-4">
            <span className="text-2xl font-bold">Academy</span>
            <Button variant="link" className="text-black">
              <Link href="jobs">See All</Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            {featuredEmployersData?.data?.Academy?.map(
              (employer: IEmployer) => (
                <EmployerCard key={employer._id} employer={employer} />
              )
            )}
          </div>
        </div>

        {/* High School */}
        <div className="my-8">
          <div className="flex items-center justify-between py-4">
            <span className="text-2xl font-bold">High School</span>
            <Button variant="link" className="text-black">
              <Link href="jobs">See All</Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            {featuredEmployersData?.data?.HighSchool?.map(
              (employer: IEmployer) => (
                <EmployerCard key={employer._id} employer={employer} />
              )
            )}
          </div>
        </div>

        {/* College/University */}
        <div className="my-8">
          <div className="flex items-center justify-between py-4">
            <span className="text-2xl font-bold">College/University</span>
            <Button variant="link" className="text-black">
              <Link href="jobs">See All</Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            {featuredEmployersData?.data?.CollegeUniversity?.map(
              (employer: IEmployer) => (
                <EmployerCard key={employer._id} employer={employer} />
              )
            )}
          </div>
        </div>

        {/* Professional Club */}
        <div className="my-8">
          <div className="flex items-center justify-between py-4">
            <span className="text-2xl font-bold">Professional Club</span>
            <Button variant="link" className="text-black">
              <Link href="jobs">See All</Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            {featuredEmployersData?.data?.ProfessionalClub?.map(
              (employer: IEmployer) => (
                <EmployerCard key={employer._id} employer={employer} />
              )
            )}
          </div>
        </div>

        {/* Amateur Club */}
        <div className="my-8">
          <div className="flex items-center justify-between py-4">
            <span className="text-2xl font-bold">Amateur Club</span>
            <Button variant="link" className="text-black">
              <Link href="jobs">See All</Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            {featuredEmployersData?.data?.AmateurClub?.map(
              (employer: IEmployer) => (
                <EmployerCard key={employer._id} employer={employer} />
              )
            )}
          </div>
        </div>

        {/* Agent */}
        <div className="my-8">
          <div className="flex items-center justify-between py-4">
            <span className="text-2xl font-bold">Agent</span>
            <Button variant="link" className="text-black">
              <Link href="jobs">See All</Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            {featuredEmployersData?.data?.Agent?.map((employer: IEmployer) => (
              <EmployerCard key={employer._id} employer={employer} />
            ))}
          </div>
        </div>

        {/* Consulting Company */}
        <div className="my-8">
          <div className="flex items-center justify-between py-4">
            <span className="text-2xl font-bold">Consulting Company</span>
            <Button variant="link" className="text-black">
              <Link href="jobs">See All</Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            {featuredEmployersData?.data?.ConsultingCompany?.map(
              (employer: IEmployer) => (
                <EmployerCard key={employer._id} employer={employer} />
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployersPage;
