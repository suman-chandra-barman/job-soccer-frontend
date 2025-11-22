"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { employerRoles } from "@/shchemas/signupValidation";

interface SelectEmployerCategoryProps {
  value?: string;
  onValueChange?: (value: string) => void;
}

export default function SelectEmployerCategory({
  value,
  onValueChange,
}: SelectEmployerCategoryProps) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="w-full h-12 border-none shadow-none">
        <SelectValue placeholder="Select employer category" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {employerRoles.map((role) => (
            <SelectItem key={role} value={role}>
              {role}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
