import { JobSearch } from "@/components/search/JobSearch";
import { JobFilters } from "@/components/jobs/JobFilters";
import React from "react";
import user1 from "@/assets/candidates/user1.png";
import user2 from "@/assets/candidates/user2.png";
import user3 from "@/assets/candidates/user3.png";
import user4 from "@/assets/candidates/user4.png";
import { TNewJobPost } from "@/components/home/NewJobs";
import { JobCard } from "@/components/cards/JobCard";

function JobBoardPage() {
  const jobPosts: TNewJobPost[] = [
    {
      id: "1",
      company: "Trappes FC",
      location: "Trappes, France",
      applicantCount: 120,
      salary: "$30K",
      postedTime: "2 days ago",
      applicantImages: [user1, user2, user3, user4],
    },
    {
      id: "2",
      company: "Bordeaux AC",
      location: "Trappes, France",
      applicantCount: 120,
      salary: "$30K",
      postedTime: "2 days ago",
      applicantImages: [user1, user2, user3, user4],
    },
    {
      id: "3",
      company: "Greece FC",
      location: "Trappes, France",
      applicantCount: 120,
      salary: "$30K",
      postedTime: "2 days ago",
      applicantImages: [user1, user2, user3, user4],
    },
    {
      id: "4",
      company: "Tunis FC",
      location: "Trappes, France",
      applicantCount: 120,
      salary: "$30K",
      postedTime: "2 days ago",
      applicantImages: [user1, user2, user3, user4],
    },
    {
      id: "5",
      company: "Trappes FC",
      location: "Trappes, France",
      applicantCount: 120,
      salary: "$30K",
      postedTime: "2 days ago",
      applicantImages: [user1, user2, user3, user4],
    },
    {
      id: "6",
      company: "Bordeaux AC",
      location: "Trappes, France",
      applicantCount: 120,
      salary: "$30K",
      postedTime: "2 days ago",
      applicantImages: [user1, user2, user3, user4],
    },
    {
      id: "7",
      company: "Greece FC",
      location: "Trappes, France",
      applicantCount: 120,
      salary: "$30K",
      postedTime: "2 days ago",
      applicantImages: [user1, user2, user3, user4],
    },
    {
      id: "8",
      company: "Tunis FC",
      location: "Trappes, France",
      applicantCount: 120,
      salary: "$30K",
      postedTime: "2 days ago",
      applicantImages: [user1, user2, user3, user4],
    },
    {
      id: "9",
      company: "Trappes FC",
      location: "Trappes, France",
      applicantCount: 120,
      salary: "$30K",
      postedTime: "2 days ago",
      applicantImages: [user1, user2, user3, user4],
    },
    {
      id: "10",
      company: "Bordeaux AC",
      location: "Trappes, France",
      applicantCount: 120,
      salary: "$30K",
      postedTime: "2 days ago",
      applicantImages: [user1, user2, user3, user4],
    },
    {
      id: "11",
      company: "Greece FC",
      location: "Trappes, France",
      applicantCount: 120,
      salary: "$30K",
      postedTime: "2 days ago",
      applicantImages: [user1, user2, user3, user4],
    },
    {
      id: "12",
      company: "Tunis FC",
      location: "Trappes, France",
      applicantCount: 120,
      salary: "$30K",
      postedTime: "2 days ago",
      applicantImages: [user1, user2, user3, user4],
    },
  ];

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
        {/* New Jobs */}
        <div>
          <h2 className="text-2xl md:text-4xl text-red-400 font-semibold my-10">
            New Jobs
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-8">
            {jobPosts.slice(0, 4).map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        </div>
        {/* All Jobs */}
        <div>
          <h2 className="text-2xl md:text-4xl font-semibold my-10">All Jobs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-8">
            {jobPosts.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobBoardPage;
