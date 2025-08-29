import { Button } from "@/components/ui/button";
import Link from "next/link";
import user1 from "@/assets/candidates/user1.png";
import user2 from "@/assets/candidates/user2.png";
import CandidateCard from "../cards/CandidateCard";
import { StaticImageData } from "next/image";

export interface TCandidate {
  id: number;
  name: string;
  role: string;
  location: string;
  nationality: string;
  avatar: StaticImageData;
}

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

export function Candidates() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#362F05] mb-4">
            Find Your Dream Team
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Build your Dream Team and we connect you with the talent that fits
            your vision
          </p>
        </div>

        {/* Candidates Container */}
        <div className="bg-gray-50 rounded-2xl p-4 md:p-8">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900">Candidates</h3>
            <Button
              asChild
              className="bg-yellow-300 hover:bg-yellow-400 text-black font-medium px-6"
            >
              <Link href="/candidates">See All</Link>
            </Button>
          </div>

          {/* Candidates Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {candidates.map((candidate: TCandidate) => (
              <CandidateCard key={candidate.id} candidate={candidate} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
