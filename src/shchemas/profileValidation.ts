import { TCandidateRole, THighlightsType } from "@/types/profile";
import { z } from "zod";

// Personal Information Schema
export const personalInfoSchema = z.object({
  image: z.instanceof(File).optional(),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  placeOfBirth: z.string().min(1, "Place of birth is required"),
  nationality: z.string().min(1, "Nationality is required"),
  phoneNumber: z.string().min(10, "Phone number must be at least 10 digits"),
});

// Amateur player Professional Information Schema
export const amateurPlayerProfessionalInfoSchema = z.object({
  gender: z.string().min(1, "Gender is required"),
  availability: z.string().min(1, "Availability is required"),
  height: z.string().min(1, "Height is required"),
  weight: z.string().min(1, "Weight is required"),
  currentClub: z.string().min(1, "Current club is required"),
  category: z.string().min(1, "Category is required"),
  foot: z.string().min(1, "Foot is required"),
  position: z.string().min(1, "Position is required"),
  league: z.string().min(1, "League is required"),
  agent: z.string().min(1, "Agent is required"),
  socialMedia: z.string().min(1, "Social media is required"),
});

// Professional player Professional Information Schema
export const professionalPlayerProfessionalInfoSchema = z.object({
  gender: z.string().min(1, "Gender is required"),
  availability: z.string().min(1, "Availability is required"),
  height: z.string().min(1, "Height is required"),
  weight: z.string().min(1, "Weight is required"),
  nationalTeamCategory: z.string().min(1, "National Team Category is required"),
  nationalTeamGames: z.string().min(1, "National Team Games is required"),
  currentClub: z.string().min(1, "Current club is required"),
  socialMedia: z.string().min(1, "Social Media is required"),
  foot: z.string().min(1, "Foot is required"),
  position: z.string().min(1, "Position is required"),
  divisionLevel: z.string().min(1, "Division Level is required"),
  teamsJoined: z.string().min(1, "Team's Joined is required"),
  agent: z.string().min(1, "Agent is required"),
  contractExpires: z.string().min(1, "Contract expires is required"),
});

// High School player Professional Information Schema
export const highSchoolPlayerProfessionalInfoSchema = z.object({
  gender: z.string().min(1, "Gender is required"),
  availability: z.string().min(1, "Availability is required"),
  height: z.string().min(1, "Height is required"),
  weight: z.string().min(1, "Weight is required"),
  currentClub: z.string().min(1, "Current club is required"),
  socialMedia: z.string().min(1, "Social Media is required"),
  category: z.string().min(1, "Category is required"),
  foot: z.string().min(1, "Foot is required"),
  position: z.string().min(1, "Position is required"),
  league: z.string().min(1, "League is required"),
  agent: z.string().min(1, "Agent is required"),
  schoolName: z.string().min(1, "School Name is required"),
  satOrAct: z.string().optional(),
  gpa: z.string().optional(),
});

// High School player Professional Information Schema
export const collegePlayerProfessionalInfoSchema = z.object({
  gender: z.string().min(1, "Gender is required"),
  availability: z.string().min(1, "Availability is required"),
  height: z.string().min(1, "Height is required"),
  weight: z.string().min(1, "Weight is required"),
  currentClub: z.string().min(1, "Current club is required"),
  socialMedia: z.string().min(1, "Social Media is required"),
  category: z.string().min(1, "Category is required"),
  foot: z.string().min(1, "Foot is required"),
  position: z.string().min(1, "Position is required"),
  league: z.string().min(1, "League is required"),
  agent: z.string().min(1, "Agent is required"),
  schoolName: z.string().min(1, "School Name is required"),
  diploma: z.string().min(1, "Diploma is required"),
  satOrAct: z.string().optional(),
  gpa: z.string().optional(),
});

// Field staff Professional Information Schema
export const fieldStaffProfessionalInfoSchema = z.object({
  availability: z.string().min(1, "Availability is required"),
  currentClub: z.string().min(1, "Current club is required"),
  socialMedia: z.string().min(1, "Social Media is required"),
  category: z.string().min(1, "Category is required"),
  licenses: z.string().min(1, "License is required"),
  position: z.string().min(1, "Position is required"),
  league: z.string().min(1, "League is required"),
  agent: z.string().min(1, "Agent is required"),
  country: z.string().min(1, "Country is required"),
});

// Office staff Professional Information Schema
export const officeStaffProfessionalInfoSchema = z.object({
  availability: z.string().min(1, "Availability is required"),
  currentClub: z.string().min(1, "Current club is required"),
  socialMedia: z.string().min(1, "Social Media is required"),
  category: z.string().min(1, "Category is required"),
  licenses: z.string().min(1, "License is required"),
  position: z.string().min(1, "Position is required"),
  league: z.string().min(1, "League is required"),
  agent: z.string().min(1, "Agent is required"),
  country: z.string().min(1, "Country is required"),
  boysOrGirls: z.string().min(1, "Boys or Girls is required"),
});

// Highlights Schema
export const highlightsSchema = z.object({
  videos: z.array(z.instanceof(File)).min(1, "At least one video is required"),
});

// Combined Schema
export const completeProfileSchema = z.object({
  personalInfo: personalInfoSchema,
  professionalInfo: amateurPlayerProfessionalInfoSchema,
  highlights: highlightsSchema,
});

// Single Highlights schemas
export const singleHighlightsSchema = z.object({
  videos: z.array(z.instanceof(File)).min(1, "At least one video is required"),
});

// Multipole Highlights schemas
export const multipleHighlightsSchema = z.object({
  preInterviewVideos: z
    .array(z.instanceof(File))
    .min(1, "Pre-interview video is required"),
  technicalVideos: z
    .array(z.instanceof(File))
    .min(1, "Technical video is required"),
  practicalVideos: z
    .array(z.instanceof(File))
    .min(1, "Practical video is required"),
  gamePrinciplesVideos: z
    .array(z.instanceof(File))
    .min(1, "Game principles video is required"),
});

// Role configuration
export const candidateRoleConfig: Record<
  TCandidateRole,
  {
    professionalSchema: z.ZodSchema;
    highlightsType: THighlightsType;
    highlightsSchema: z.ZodSchema;
  }
> = {
  "professional-player": {
    professionalSchema: professionalPlayerProfessionalInfoSchema,
    highlightsType: "single",
    highlightsSchema: singleHighlightsSchema,
  },
  "amateur-player": {
    professionalSchema: amateurPlayerProfessionalInfoSchema,
    highlightsType: "single",
    highlightsSchema: singleHighlightsSchema,
  },
  "high-school-player": {
    professionalSchema: highSchoolPlayerProfessionalInfoSchema,
    highlightsType: "single",
    highlightsSchema: singleHighlightsSchema,
  },
  "college-player": {
    professionalSchema: collegePlayerProfessionalInfoSchema,
    highlightsType: "single",
    highlightsSchema: singleHighlightsSchema,
  },
  "field-staff": {
    professionalSchema: fieldStaffProfessionalInfoSchema,
    highlightsType: "single",
    highlightsSchema: singleHighlightsSchema,
  },
  "office-staff": {
    professionalSchema: fieldStaffProfessionalInfoSchema,
    highlightsType: "single",
    highlightsSchema: singleHighlightsSchema,
  },
};

