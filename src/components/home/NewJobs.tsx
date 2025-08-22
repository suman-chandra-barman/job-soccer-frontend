import { Button } from "@/components/ui/button";
import { NewJobCard } from "../cards/NewJobCard";
import user1 from "@/assets/user/user1.png";
import user2 from "@/assets/user/user2.png";
import user3 from "@/assets/user/user3.png";
import user4 from "@/assets/user/user4.png";
import { StaticImageData } from "next/image";

export interface TNewJobPost {
  id: string;
  company: string;
  location: string;
  applicantCount: number;
  salary: string;
  postedTime: string;
  applicantImages: StaticImageData[];
}

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
];

export function NewJobs() {
  return (
    <div className="bg-[#F7F6F2] rounded-3xl p-8">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-gray-900">New Jobs</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {jobPosts.map((job) => (
          <NewJobCard key={job.id} job={job} />
        ))}
      </div>

      <div className="flex justify-end">
        <Button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-6 py-2 rounded-xl">
          See All Jobs
        </Button>
      </div>
    </div>
  );
}
