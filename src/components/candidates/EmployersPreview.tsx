"use client";

import React from "react";
import { useGetEmployersQuery } from "@/redux/features/employer/employerApi";
import { EmployerCard } from "../cards/EmployerCard";
import { IEmployer } from "@/types/user";
import { CardSkeletonGrid } from "../skeleton/CardSkeleton";
export default function EmployersPreview() {
  const {
    data: employersData,
    isLoading,
    isError,
  } = useGetEmployersQuery(null);

  if (isLoading) return <CardSkeletonGrid className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 "/>;

  if (isError || !employersData?.data?.length) {
    return <div className="text-sm text-gray-500">No employers available</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 mb-4">
      {employersData.data.slice(0, 4).map((employer: IEmployer) => (
        <EmployerCard key={employer._id} employer={employer} />
      ))}
    </div>
  );
}
