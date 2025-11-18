"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MoreVertical, Bookmark, X, Check } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

// Type definitions
interface Job {
  id: number;
  title: string;
  date: string;
  salary: string;
  location: string;
  status: "shortlisted" | "saved" | "applied";
}

interface JobCardProps {
  job: Job;
  onSave: (jobId: number) => void;
  onApply: (jobId: number) => void;
  onRemove: (jobId: number) => void;
  showActions?: boolean;
}

// Mock API functions - replace with your actual API calls
const mockAPI = {
  async getJobs(): Promise<Job[]> {
    return [
      {
        id: 1,
        title: "Defence Player",
        date: "22/08/2024",
        salary: "$30/mo",
        location: "1901 Thornridge Cir. Shiloh, Hawaii 81063",
        status: "shortlisted",
      },
      {
        id: 2,
        title: "Defence Player",
        date: "22/08/2024",
        salary: "$30/mo",
        location: "1901 Thornridge Cir. Shiloh, Hawaii 81063",
        status: "shortlisted",
      },
      {
        id: 3,
        title: "Defence Player",
        date: "22/08/2024",
        salary: "$30/mo",
        location: "1901 Thornridge Cir. Shiloh, Hawaii 81063",
        status: "applied",
      },
      {
        id: 4,
        title: "Defence Player",
        date: "22/08/2024",
        salary: "$30/mo",
        location: "1901 Thornridge Cir. Shiloh, Hawaii 81063",
        status: "saved",
      },
      {
        id: 5,
        title: "Defence Player",
        date: "22/08/2024",
        salary: "$30/mo",
        location: "1901 Thornridge Cir. Shiloh, Hawaii 81063",
        status: "shortlisted",
      },
    ];
  },

  async saveJob(jobId: number): Promise<{ success: boolean }> {
    console.log("Saving job:", jobId);
    return { success: true };
  },

  async applyJob(jobId: number): Promise<{ success: boolean }> {
    console.log("Applying for job:", jobId);
    return { success: true };
  },

  async removeJob(jobId: number): Promise<{ success: boolean }> {
    console.log("Removing job:", jobId);
    return { success: true };
  },
};

const JobCard: React.FC<JobCardProps> = ({
  job,
  onSave,
  onApply,
  onRemove,
  showActions = true,
}) => {
  const [isRemoving, setIsRemoving] = useState(false);

  const getStatusBadge = () => {
    switch (job.status) {
      case "saved":
        return (
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-md text-sm font-medium">
              Saved
            </span>
          </div>
        );
      case "applied":
        return (
          <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-md text-sm font-medium">
            Applied
          </span>
        );
      default:
        return null;
    }
  };

  const getActionButtons = () => {
    if (job.status === "shortlisted") {
      return (
        <div className="flex gap-2">
          <Button
            size="sm"
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md"
            onClick={() => onApply(job.id)}
          >
            Apply Now
          </Button>
        </div>
      );
    }
    return null;
  };

  if (isRemoving) {
    return null;
  }

  return (
    <Card className="w-full mb-4 hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h3 className="font-semibold text-lg text-gray-900 mb-1">
              {job.title}
            </h3>
            <p className="text-sm text-gray-500 mb-2">{job.date}</p>
            <p className="text-sm text-gray-700 mb-1">{job.salary}</p>
            <p className="text-sm text-gray-600">{job.location}</p>
          </div>

          <div className="flex items-center gap-2">
            {getStatusBadge()}
            {getActionButtons()}

            {showActions && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="p-2">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-32">
                  {job.status === "shortlisted" && (
                    <>
                      <DropdownMenuItem
                        onClick={() => onSave(job.id)}
                        className="cursor-pointer"
                      >
                        <Bookmark className="mr-2 h-4 w-4" />
                        Save
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => onRemove(job.id)}
                        className="cursor-pointer text-red-600"
                      >
                        <X className="mr-2 h-4 w-4" />
                        Remove
                      </DropdownMenuItem>
                    </>
                  )}
                  {(job.status === "saved" || job.status === "applied") && (
                    <DropdownMenuItem
                      onClick={() => onRemove(job.id)}
                      className="cursor-pointer text-red-600"
                    >
                      <X className="mr-2 h-4 w-4" />
                      Remove
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const JobsList: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [activeTab, setActiveTab] = useState<"all" | "saved" | "applied">(
    "all"
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    try {
      setLoading(true);
      const jobsData = await mockAPI.getJobs();
      setJobs(jobsData);
    } catch (error) {
      console.error("Error loading jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveJob = async (jobId: number) => {
    try {
      await mockAPI.saveJob(jobId);
      setJobs(
        jobs.map((job) =>
          job.id === jobId ? { ...job, status: "saved" } : job
        )
      );
    } catch (error) {
      console.error("Error saving job:", error);
    }
  };

  const handleApplyJob = async (jobId: number) => {
    try {
      await mockAPI.applyJob(jobId);
      setJobs(
        jobs.map((job) =>
          job.id === jobId ? { ...job, status: "applied" } : job
        )
      );
    } catch (error) {
      console.error("Error applying for job:", error);
    }
  };

  const handleRemoveJob = async (jobId: number) => {
    try {
      await mockAPI.removeJob(jobId);
      setJobs(jobs.filter((job) => job.id !== jobId));
    } catch (error) {
      console.error("Error removing job:", error);
    }
  };

  const getFilteredJobs = (): Job[] => {
    switch (activeTab) {
      case "saved":
        return jobs.filter((job) => job.status === "saved");
      case "applied":
        return jobs.filter((job) => job.status === "applied");
      case "all":
      default:
        return jobs;
    }
  };

  const filteredJobs = getFilteredJobs();

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-4">
        <div className="animate-pulse">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-gray-200 h-24 rounded-lg mb-4"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full p-4 border rounded-2xl">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Jobs list</h1>
        <Button className="bg-green-500 hover:bg-green-600 text-white">
          <Link href="jobss"> Find More Job</Link>
        </Button>
      </div>

      {/* Tabs */}
      <div className=" bg-white border-b border-gray-200">
        <div className="px-6">
          <div className="flex space-x-8">
            {[
              { key: "all", label: "All" },
              { key: "saved", label: "Save" },
              { key: "applied", label: "Applied" },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() =>
                  setActiveTab(tab.key as "all" | "saved" | "applied")
                }
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.key
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Jobs List */}
      <div className="space-y-4 px-6 py-4">
        {filteredJobs.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">
              {activeTab === "saved" && "No saved jobs found."}
              {activeTab === "applied" && "No applied jobs found."}
              {activeTab === "all" && "No jobs found."}
            </p>
          </div>
        ) : (
          filteredJobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              onSave={handleSaveJob}
              onApply={handleApplyJob}
              onRemove={handleRemoveJob}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default JobsList;
