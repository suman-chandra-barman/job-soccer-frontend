"use client";

import type React from "react";
import { useState } from "react";
import { Search, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import RoleSelect from "../input/SelectRole";
import SelectJobCategory from "../input/SelectJobCategory";

const popularSearches = [
  "Goal Kipper",
  "Defence Player",
  "Midfielder",
  "Forward",
  "Goalkeeper",
];

const locations = [
  "Paris, France",
  "Lyon, France",
  "Marseille, France",
  "Toulouse, France",
  "Nice, France",
  "Nantes, France",
  "Strasbourg, France",
  "Montpellier, France",
];

export function JobSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchTerm) params.set("search", searchTerm);
    if (selectedCategory) params.set("category", selectedCategory);
    if (selectedLocation) params.set("location", selectedLocation);

    router.push(`/jobs?${params.toString()}`);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="bg-[#F7F6F2]  px-4 py-8">
      {/* Main Search Container */}
      <div className="container mx-auto pb-4 flex items-center justify-center">
        <div className="flex flex-col p-2 md:flex-row gap-2 items-center justify-center rounded-2xl border border-gray-100 bg-white">
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Search by job title"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={handleKeyPress}
              className="pl-12 h-12 border-none shadow-none bg-transparent text-gray-700 placeholder:text-gray-400 focus-visible:ring-0"
            />
          </div>

          {/* Category Select */}
          <div className="w-full md:w-64">
            <SelectJobCategory
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            />
          </div>

          {/* Location Select */}
          <div className="w-full md:w-64 relative">
            <Select
              value={selectedLocation}
              onValueChange={setSelectedLocation}
            >
              <SelectTrigger className="w-full !h-12 bg-white text-gray-500 border-0 shadow-none">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <SelectValue placeholder="Select location" />
                </div>
              </SelectTrigger>
              <SelectContent>
                {locations.map((location) => (
                  <SelectItem
                    key={location}
                    value={location
                      .toLowerCase()
                      .replace(", ", "-")
                      .replace(" ", "-")}
                  >
                    {location}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Search Button */}
          <Button
            onClick={handleSearch}
            className="h-12 px-8 bg-black hover:bg-gray-800 text-white rounded-xl font-medium"
          >
            <Search className="w-4 h-4 mr-1" />
            Search
          </Button>
        </div>
      </div>

      {/* Popular Searches */}
      <div className="flex flex-wrap items-center justify-center gap-4">
        <span className="text-gray-600 font-medium">Popular Searches:</span>
        <div className="flex flex-wrap gap-2">
          {popularSearches.map((search) => (
            <button
              key={search}
              onClick={() => setSearchTerm(search)}
              className="px-4 py-1 border bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full text-sm transition-colors"
            >
              {search}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
