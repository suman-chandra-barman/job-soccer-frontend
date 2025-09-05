"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const formSchema = z
  .object({
    jobTitle: z.string().min(1, "Job title is required"),
    companyLocation: z.string().min(1, "Company location is required"),
    jobCategory: z.string().min(1, "Job category is required"),
    jobSubcategory: z.string().optional(),
    jobType: z.enum(["full-time", "part-time"], {
      required_error: "Job type is required",
    }),
    experienceRequired: z.string().min(1, "Experience level is required"),
    position: z.string().min(1, "Position is required"),
    contractType: z.string().min(1, "Contract type is required"),
    minSalary: z.string().min(1, "Minimum salary is required"),
    maxSalary: z.string().min(1, "Maximum salary is required"),
    weblink: z
      .string()
      .url("Please enter a valid URL")
      .optional()
      .or(z.literal("")),
    jobOverview: z.string().min(1, "Job overview is required"),
    responsibilities: z.string().min(1, "Responsibilities are required"),
    skillsQualifications: z
      .string()
      .min(1, "Skills & qualifications are required"),
    applicationRequirements: z
      .string()
      .min(1, "Application requirements are required"),
    requirements: z.string().optional(),
  })
  .refine(
    (data) => {
      const minSal = parseFloat(data.minSalary);
      const maxSal = parseFloat(data.maxSalary);
      return maxSal > minSal;
    },
    {
      message: "Maximum salary must be greater than minimum salary",
      path: ["maxSalary"],
    }
  );

export type TJobPost = z.infer<typeof formSchema>;

interface CreateJobPostModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const jobCategories = [
  { value: "professional-player", label: "Professional Player" },
  { value: "amateur-player", label: "Amateur Player" },
  { value: "high-school-player", label: "High School Player" },
  { value: "college-player", label: "College Player" },
  { value: "staff-on-field", label: "Staff on The Field" },
  { value: "office-staff", label: "Office Staff" },
];

const staffOnFieldSubcategories = [
  { value: "gk", label: "GK" },
  { value: "central-back", label: "Central back" },
  { value: "left-back", label: "Left back" },
  { value: "right-back", label: "Right back" },
  { value: "defensive-midfielder", label: "Defensive midfielder" },
  { value: "offensive-midfielder", label: "Offensive midfielder" },
  { value: "right-winger", label: "Right winger" },
  { value: "left-winger", label: "Left winger" },
  { value: "forward", label: "Forward" },
  { value: "striker", label: "Striker" },
];

const officeStaffSubcategories = [
  { value: "administrative-director", label: "Administrative Director" },
  { value: "community-manager", label: "Community Manager" },
  { value: "data-analyst", label: "Data Analyst" },
  { value: "developer", label: "Developer" },
  { value: "digital-manager", label: "Digital Manager" },
  { value: "executive-secretary", label: "Executive Secretary" },
  { value: "it", label: "IT" },
];

export default function CreateJobPostModal({
  isOpen,
  onClose,
}: CreateJobPostModalProps) {
  const [showSubcategory, setShowSubcategory] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      jobTitle: "",
      companyLocation: "",
      jobCategory: "",
      jobSubcategory: "",
      jobType: undefined,
      experienceRequired: "",
      position: "",
      contractType: "",
      minSalary: "",
      maxSalary: "",
      weblink: "",
      jobOverview: "",
      responsibilities: "",
      skillsQualifications: "",
      applicationRequirements: "",
      requirements: "",
    },
  });

  const selectedJobCategory = form.watch("jobCategory");

  // Handle job category change
  const handleJobCategoryChange = (value: string) => {
    form.setValue("jobCategory", value);
    if (value === "staff-on-field" || value === "office-staff") {
      setShowSubcategory(true);
      form.setValue("jobSubcategory", "");
    } else {
      setShowSubcategory(false);
      form.setValue("jobSubcategory", "");
    }
  };

  const getSubcategoryOptions = () => {
    if (selectedJobCategory === "staff-on-field") {
      return staffOnFieldSubcategories;
    }
    if (selectedJobCategory === "office-staff") {
      return officeStaffSubcategories;
    }
    return [];
  };
  const onSubmit = (data: TJobPost) => {
    console.log("Job post data:", data);
    form.reset();
    setShowSubcategory(false);
    onClose();
  };

  const handleClose = () => {
    form.reset();
    setShowSubcategory(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[700px] md:max-w-[800px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-semibold">
              Create a Job Post
            </DialogTitle>
          </div>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column - Job Details */}
              <div className="space-y-6">
                <h3 className="text-lg font-medium text-gray-900">
                  Job details
                </h3>

                {/* Job Title */}
                <FormField
                  control={form.control}
                  name="jobTitle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700">
                        Job title
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Ex: Mid field player"
                          {...field}
                          className="mt-1"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Company Location */}
                <FormField
                  control={form.control}
                  name="companyLocation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700">
                        Company location
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Company location"
                          {...field}
                          className="mt-1"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Job Category */}
                <FormField
                  control={form.control}
                  name="jobCategory"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700">
                        Job Category
                      </FormLabel>
                      <Select
                        onValueChange={handleJobCategoryChange}
                        defaultValue={field.value}
                      >
                        <FormControl className="w-full">
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select Category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {jobCategories.map((category) => (
                            <SelectItem
                              key={category.value}
                              value={category.value}
                            >
                              {category.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Job Subcategory */}
                {showSubcategory && (
                  <FormField
                    control={form.control}
                    name="jobSubcategory"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-gray-700">
                          Subcategory
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl className="w-full">
                            <SelectTrigger className="mt-1">
                              <SelectValue placeholder="Select Subcategory" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {getSubcategoryOptions().map((subcategory) => (
                              <SelectItem
                                key={subcategory.value}
                                value={subcategory.value}
                              >
                                {subcategory.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                {/* Job Type */}
                <FormField
                  control={form.control}
                  name="jobType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700">
                        Job Type
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl className="w-full">
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select one" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="full-time">Full Time</SelectItem>
                          <SelectItem value="part-time">Part Time</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Contract Type */}
                <FormField
                  control={form.control}
                  name="contractType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700">
                        Contract Type
                      </FormLabel>
                      <Input
                        placeholder="Contract type"
                        {...field}
                        className="mt-1"
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Experience Required & Position */}
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="experienceRequired"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-gray-700">
                          Experience required
                        </FormLabel>
                        <Input
                          placeholder="Experience required"
                          {...field}
                          className="mt-1"
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="position"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-gray-700">
                          Position
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Position"
                            {...field}
                            className="mt-1"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Salary Range */}
                <div>
                  <FormLabel className="text-sm font-medium text-gray-700 mb-2 block">
                    Salary
                  </FormLabel>
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="minSalary"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="Min salary"
                              {...field}
                              className="mt-1"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="maxSalary"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="Max salary"
                              {...field}
                              className="mt-1"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* Weblink */}
                <FormField
                  control={form.control}
                  name="weblink"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700">
                        Weblink
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Post your web link"
                          {...field}
                          className="mt-1"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Right Column - Job Descriptions */}
              <div className="space-y-6">
                <h3 className="text-lg font-medium text-gray-900">
                  Job descriptions
                </h3>

                {/* Job Overview */}
                <FormField
                  control={form.control}
                  name="jobOverview"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700">
                        Job Overview
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Write something about your job..."
                          className="mt-1 min-h-[80px] resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Responsibilities */}
                <FormField
                  control={form.control}
                  name="responsibilities"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700">
                        Responsibilities
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Write something about your job..."
                          className="mt-1 min-h-[80px] resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Required Skills & Qualifications */}
                <FormField
                  control={form.control}
                  name="skillsQualifications"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700">
                        Required Skills & Qualifications
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Write something about your job..."
                          className="mt-1 min-h-[80px] resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Application Requirements */}
                <FormField
                  control={form.control}
                  name="applicationRequirements"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700">
                        Application Requirements
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Write something about your job..."
                          className="mt-1 min-h-[80px] resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Requirements (Optional) */}
                <FormField
                  control={form.control}
                  name="requirements"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700">
                        Requirements
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Write requirements..."
                          className="mt-1 min-h-[80px] resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-3 pt-4 border-t">
              <Button type="button" variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-black hover:bg-gray-800 text-white"
              >
                Create Job Post
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
