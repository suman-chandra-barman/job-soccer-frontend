"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface FilterOption {
  label: string;
  value: string;
}

interface FilterDropdownProps {
  label: string;
  options: FilterOption[];
  value?: string;
  onValueChange?: (value: string) => void;
  isActive?: boolean;
}

function FilterDropdown({
  label,
  options,
  value,
  onValueChange,
  isActive,
}: FilterDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors",
            isActive
              ? "bg-[#6B5B3A] text-white"
              : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
          )}
        >
          {value
            ? options.find((opt) => opt.value === value)?.label || label
            : label}
          <ChevronDown className="w-4 h-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-48">
        <DropdownMenuRadioGroup value={value} onValueChange={onValueChange}>
          {options.map((option) => (
            <DropdownMenuRadioItem key={option.value} value={option.value}>
              {option.label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function JobFilters() {
  const [timeFilter, setTimeFilter] = useState("last-week");
  const [aiScoreFilter, setAiScoreFilter] = useState("");
  const [experienceFilter, setExperienceFilter] = useState("");
  const [jobTypeFilter, setJobTypeFilter] = useState("");

  const timeOptions: FilterOption[] = [
    { label: "Last Week", value: "last-week" },
    { label: "This Month", value: "this-month" },
    { label: "Any Time", value: "any-time" },
  ];

  const aiScoreOptions: FilterOption[] = [
    { label: "Low 10% - 29%", value: "10-29" },
    { label: "Medium 30% - 59%", value: "30-59" },
    { label: "Good 60% - 79%", value: "60-79" },
    { label: "High 80% - 100%", value: "80-100" },
  ];

  const experienceOptions: FilterOption[] = [
    { label: "Entry Level", value: "entry" },
    { label: "Intermediate", value: "intermediate" },
    { label: "Mid-Level", value: "mid" },
    { label: "Mid-Senior", value: "mid-senior" },
    { label: "Senior", value: "senior" },
  ];

  return (
    <div className="flex flex-wrap items-center justify-center gap-3 p-4 rounded-lg">
      <FilterDropdown
        label="Last Week"
        options={timeOptions}
        value={timeFilter}
        onValueChange={setTimeFilter}
      />

      <FilterDropdown
        label="AI Score"
        options={aiScoreOptions}
        value={aiScoreFilter}
        onValueChange={setAiScoreFilter}
      />

      <FilterDropdown
        label="Experience level"
        options={experienceOptions}
        value={experienceFilter}
        onValueChange={setExperienceFilter}
      />
    </div>
  );
}
