import {
  MapPin,
  MessageCircle,
  ShieldCheck,
  Star,
  UserRoundPlus,
  Users,
} from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";
import { TClub } from "@/app/employers/page";
import employerLogo from "@/assets/employers/compony logo.png";

export function EmployerCard({ job }: { job: TClub }) {
  return (
    <div className="bg-gradient-to-br from-white to-[#FDF9E3] rounded-xl p-4 shadow-sm border border-gray-100">
      <div className="border-b border-gray-200 pb-4">
        <div className="flex items-center gap-3 mb-4 ">
          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center border border-gray-200 bg-white`}
          >
            <Image
              src={employerLogo}
              alt="Logo"
              width={40}
              height={40}
              className="object-contain rounded-xl"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 text-lg">{job.name}</h3>
            <div className="flex items-center gap-1 text-gray-500 text-sm mt-1">
              <MapPin className="w-4 h-4" />
              <span>{job.location}</span>
            </div>
          </div>
        </div>

        <div className="flex gap-4 items-center">
          <Button
            variant="outline"
            className="flex-1 bg-transparent rounded-full text-green-500 border border-green-500"
          >
            <ShieldCheck className="w-6 h-6" />
            Verified
          </Button>
          <Button
            variant="outline"
            className="flex-1 rounded-full bg-transparent border-black"
          >
            {job.clubType}
          </Button>
        </div>
      </div>

      {/* Bottom section with applicant count, salary, and time */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-4 py-4">
          <div className="text-gray-600 text-sm">
            <Star className="w-4 h-4 inline-block text-yellow-500 mr-2" />
            <span className="font-bold">Active Job Posts:</span>{" "}
            {job.activeJobPosts}
          </div>
          <div className="text-gray-600 text-sm">
            <Users className="w-4 h-4 inline-block text-gray-500 mr-2" />
            <span className="font-bold">Followers:</span>{" "}
            {job.followers.toLocaleString()}
          </div>
        </div>
      </div>
      <div className="border-t border-gray-200 pt-4 flex gap-4 items-center">
        <Button variant="outline" className="flex-1 bg-transparent">
          <UserRoundPlus className="w-6 h-6" />
          Follow
        </Button>
        <Button className="flex-1">
          <MessageCircle className="w-6 h-6" />
          Message
        </Button>
      </div>
    </div>
  );
}
