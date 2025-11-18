"use client";

import {
  Users,
  UserCheck,
  GraduationCap,
  Building,
  Trophy,
} from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

const jobCategories = [
  {
    id: "professional-player",
    name: "Professional Player",
    jobCount: 120,
    icon: Trophy,
  },
  {
    id: "amateur-player",
    name: "Amateur Player",
    jobCount: 80,
    icon: Users,
  },
  {
    id: "high-school-player",
    name: "High School Player",
    jobCount: 80,
    icon: Users,
  },
  {
    id: "college-player",
    name: "College Player",
    jobCount: 80,
    icon: GraduationCap,
  },
  {
    id: "staff-on-field",
    name: "Staff on The Field",
    jobCount: 80,
    icon: UserCheck,
  },
  {
    id: "office-staff",
    name: "Office Staff",
    jobCount: 80,
    icon: Building,
  },
];

export function JobCategories() {
  return (
    <section className="py-16  bg-[#F7F6F2]">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-12 gap-8">
          <h2 className="text-2xl md:text-4xl font-bold text-[#362F05] leading-tight max-w-2xl">
            Your complete hub for soccer talents jobs and connections
          </h2>
          <Button className="bg-yellow-300 hover:bg-yellow-400 text-black font-semibold px-6 py-3 rounded-lg">
            <Link href="jobs">See All Jobs</Link>
          </Button>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {jobCategories.map((category) => {
            const IconComponent = category.icon;
            return (
              <Link
                key={category.id}
                href={`jobs?category=${category.id}`}
                className="group bg-white rounded-full p-3 border border-gray-200 hover:bg-[#504A20] hover:text-white transition-all duration-200 cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                      <IconComponent className="w-6 h-6 text-gray-600 group-hover:text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 group-hover:text-white">
                        {category.name}
                      </h3>
                      <p className="text-sm text-gray-500 group-hover:text-gray-200">
                        {category.jobCount} jobs available
                      </p>
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    <svg
                      className="w-5 h-5 text-gray-400 group-hover:text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
