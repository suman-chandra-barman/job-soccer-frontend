"use client";

import React, { useState } from "react";
import { MoreVertical, Download, MessageCircle, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import CreateJobPostModal from "@/components/modals/CreateJobPostModal";
import { set } from "zod";

// Types
interface Applicant {
  id: string;
  name: string;
  aiScore: number;
  resumeUrl: string;
  profileImage?: string;
}

interface Job {
  id: string;
  title: string;
  datePosted: string;
  salary: string;
  location: string;
  status: "active" | "closed";
  applicants: Applicant[];
}

// Mock data
const mockJobs: Job[] = [
  {
    id: "1",
    title: "Defence Player",
    datePosted: "22/08/2024",
    salary: "$30/mo",
    location: "1801 Thornridge Cir. Shiloh, Hawaii 81063",
    status: "active",
    applicants: [
      {
        id: "1",
        name: "Zayden",
        aiScore: 50,
        resumeUrl: "#",
      },
      {
        id: "2",
        name: "Kairo",
        aiScore: 70,
        resumeUrl: "#",
      },
      {
        id: "3",
        name: "Lian",
        aiScore: 93,
        resumeUrl: "#",
      },
      {
        id: "4",
        name: "Tavion",
        aiScore: 28,
        resumeUrl: "#",
      },
    ],
  },
  {
    id: "2",
    title: "Defence Player",
    datePosted: "22/08/2024",
    salary: "$30/mo",
    location: "1801 Thornridge Cir. Shiloh, Hawaii 81063",
    status: "active",
    applicants: [
      {
        id: "5",
        name: "Alex",
        aiScore: 85,
        resumeUrl: "#",
      },
    ],
  },
  {
    id: "3",
    title: "Midfielder Player",
    datePosted: "20/08/2024",
    salary: "$35/mo",
    location: "2972 Westheimer Rd. Santa Ana, Illinois 85486",
    status: "closed",
    applicants: [
      {
        id: "6",
        name: "Sarah",
        aiScore: 76,
        resumeUrl: "#",
      },
      {
        id: "7",
        name: "Mike",
        aiScore: 42,
        resumeUrl: "#",
      },
    ],
  },
  {
    id: "4",
    title: "Forward Player",
    datePosted: "18/08/2024",
    salary: "$40/mo",
    location: "8502 Preston Rd. Inglewood, Maine 98380",
    status: "active",
    applicants: [
      {
        id: "8",
        name: "David",
        aiScore: 88,
        resumeUrl: "#",
      },
    ],
  },
];

const JobsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"active" | "closed">("active");
  const [jobs, setJobs] = useState<Job[]>(mockJobs);
  const [selectedJob, setSelectedJob] = useState<Job | null>(
    jobs.find((job) => job.status === "active") || null
  );
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
  const [isCreateJobPostModalOpen, setIsCreateJobPostModalOpen] =
    useState(false);

  // Filter jobs based on active tab
  const filteredJobs = jobs.filter((job) => job.status === activeTab);

  // Handle tab change
  const handleTabChange = (tab: "active" | "closed") => {
    setActiveTab(tab);
    const firstJobInTab = jobs.find((job) => job.status === tab);
    setSelectedJob(firstJobInTab || null);
    setOpenDropdownId(null);
  };

  // Handle job selection
  const handleJobSelect = (job: Job) => {
    setSelectedJob(job);
  };

  // Handle job status change
  const handleJobStatusChange = (
    jobId: string,
    newStatus: "active" | "closed"
  ) => {
    setJobs((prevJobs) =>
      prevJobs.map((job) =>
        job.id === jobId ? { ...job, status: newStatus } : job
      )
    );
    setOpenDropdownId(null);

    // If the current selected job was closed/activated, update selection
    if (selectedJob?.id === jobId && newStatus !== activeTab) {
      const remainingJobs = jobs.filter(
        (job) => job.id !== jobId && job.status === activeTab
      );
      setSelectedJob(remainingJobs[0] || null);
    }
  };

  // Handle job deletion
  const handleJobDelete = (jobId: string) => {
    setJobs((prevJobs) => prevJobs.filter((job) => job.id !== jobId));
    setOpenDropdownId(null);

    // If the current selected job was deleted, select another
    if (selectedJob?.id === jobId) {
      const remainingJobs = jobs.filter(
        (job) => job.id !== jobId && job.status === activeTab
      );
      setSelectedJob(remainingJobs[0] || null);
    }
  };

  // Toggle dropdown
  const toggleDropdown = (jobId: string) => {
    setOpenDropdownId(openDropdownId === jobId ? null : jobId);
  };

  // Get AI score color
  const getAIScoreColor = (score: number) => {
    if (score >= 80) return "text-green-500";
    if (score >= 60) return "text-blue-500";
    if (score >= 40) return "text-yellow-500";
    return "text-red-500";
  };

  return (
    <div className="min-h-screen w-full p-4 md:p-6 border rounded-2xl">
      <div>
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h1 className="text-2xl font-bold text-gray-900">Jobs</h1>
          <Button
            variant="outline"
            className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors"
            onClick={() => setIsCreateJobPostModalOpen(true)}
          >
            <Plus size={20} />
            Job Post
          </Button>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 space-x-8 mb-6 p-1 rounded-lg w-fit">
          <button
            onClick={() => handleTabChange("active")}
            className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === "active"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Active
          </button>
          <button
            onClick={() => handleTabChange("closed")}
            className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === "closed"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Closed
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Job Cards Section */}
          <div className="flex-1 lg:max-w-sm">
            <div className="space-y-4">
              {filteredJobs.length > 0 ? (
                filteredJobs.map((job) => (
                  <div
                    key={job.id}
                    onClick={() => handleJobSelect(job)}
                    className={`relative bg-white rounded-lg border p-4 cursor-pointer transition-all ${
                      selectedJob?.id === job.id
                        ? "border-blue-500 shadow-md"
                        : "border-gray-200 hover:border-gray-300 hover:shadow-sm"
                    }`}
                  >
                    {/* Three dots menu */}
                    <div className="absolute top-4 right-4">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleDropdown(job.id);
                        }}
                        className="p-1 hover:bg-gray-100 rounded transition-colors"
                      >
                        <MoreVertical size={16} className="text-gray-500" />
                      </button>

                      {/* Dropdown menu */}
                      {openDropdownId === job.id && (
                        <div className="absolute right-0 top-8 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-10 min-w-[120px]">
                          {job.status === "active" ? (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleJobStatusChange(job.id, "closed");
                              }}
                              className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                            >
                              Close
                            </button>
                          ) : (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleJobStatusChange(job.id, "active");
                              }}
                              className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                            >
                              Activate
                            </button>
                          )}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleJobDelete(job.id);
                            }}
                            className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </div>

                    <div className="pr-8">
                      <h3 className="font-semibold text-gray-900 mb-1">
                        {job.title}
                      </h3>
                      <p className="text-sm text-gray-500 mb-2">
                        {job.datePosted}
                      </p>
                      <p className="text-sm text-gray-600 mb-2">
                        Salary: {job.salary}
                      </p>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {job.location}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
                  <p className="text-gray-500">No {activeTab} jobs found</p>
                </div>
              )}
            </div>
          </div>

          {/* Applicants Section */}
          <div className="flex-1">
            {selectedJob ? (
              <div className="bg-white rounded-lg border border-gray-200">
                {/* Applicants Header */}
                <div className="border-b border-gray-200 p-6">
                  <h2 className="text-lg font-semibold text-gray-900">
                    Applicants
                  </h2>
                </div>

                {/* Table Header */}
                <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-gray-50 text-sm font-medium text-gray-700 border-b border-gray-200">
                  <div className="col-span-4">Name</div>
                  <div className="col-span-2 text-center">AI scores</div>
                  <div className="col-span-3 text-center">Resume</div>
                  <div className="col-span-3 text-center">Connect</div>
                </div>

                {/* Applicants List */}
                <div className="divide-y divide-gray-200">
                  {selectedJob.applicants.length > 0 ? (
                    selectedJob.applicants.map((applicant) => (
                      <div
                        key={applicant.id}
                        className="grid grid-cols-12 gap-4 px-6 py-4 hover:bg-gray-50 transition-colors"
                      >
                        {/* Name */}
                        <div className="col-span-4 flex items-center gap-3">
                          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                            <span className="text-sm font-medium text-gray-600">
                              {applicant.name.charAt(0)}
                            </span>
                          </div>
                          <span className="text-sm text-gray-900">
                            {applicant.name}
                          </span>
                        </div>

                        {/* AI Score */}
                        <div className="col-span-2 flex justify-center">
                          <span
                            className={`text-sm font-medium ${getAIScoreColor(
                              applicant.aiScore
                            )}`}
                          >
                            {applicant.aiScore}%
                          </span>
                        </div>

                        {/* Resume Download */}
                        <div className="col-span-3 flex justify-center">
                          <button className="flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm transition-colors">
                            <Download size={16} />
                            Download
                          </button>
                        </div>

                        {/* Message Button */}
                        <div className="col-span-3 flex justify-center">
                          <button className="flex items-center gap-2 bg-blue-100 text-blue-600 hover:bg-blue-200 px-3 py-1 rounded-full text-sm transition-colors">
                            <MessageCircle size={16} />
                            Message
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="px-6 py-12 text-center">
                      <p className="text-gray-500">No applicants yet</p>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg border border-gray-200 p-8">
                <div className="text-center">
                  <p className="text-gray-500">
                    Select a job to view applicants
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Add Job Post Modal (Placeholder) */}
      {isCreateJobPostModalOpen && (
        <CreateJobPostModal
          isOpen={isCreateJobPostModalOpen}
          onClose={() => setIsCreateJobPostModalOpen(false)}
        />
      )}
    </div>
  );
};

export default JobsPage;
