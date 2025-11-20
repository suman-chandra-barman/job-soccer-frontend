"use client";

import { Button } from "@/components/ui/button";
import { StaticImageData } from "next/image";
import Link from "next/link";
import { useGetNewFourJobsQuery } from "@/redux/features/job/jobApi";
import { TJob } from "@/types/job";
import { CardSkeleton } from "../skeleton/CardSkeleton";
import { JobCard } from "../cards/JobCard";

export interface TNewJobPost {
  id: string;
  company: string;
  location: string;
  applicantCount: number;
  salary: string;
  postedTime: string;
  applicantImages: StaticImageData[];
}

export function NewJobs() {
  const { data: jobsData, isLoading } = useGetNewFourJobsQuery(undefined);
  const jobs: TJob[] = jobsData?.data || [];

  return (
    <div className="bg-[#F7F6F2] rounded-3xl p-4 md:p-8">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl md:4xl font-bold text-gray-900">New Jobs</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-8">
        {isLoading ? (
          Array.from({ length: 4 }).map((_, index) => (
            <CardSkeleton key={index} />
          ))
        ) : jobs.length > 0 ? (
          jobs.map((job) => <JobCard key={job._id} job={job} />)
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No new jobs available
          </p>
        )}
      </div>

      <div className="flex justify-end">
        <Button className="bg-yellow-300 hover:bg-yellow-400 text-black font-semibold px-6 py-3 rounded-lg">
          <Link href="jobs">See All Jobs</Link>
        </Button>
      </div>
    </div>
  );
}
