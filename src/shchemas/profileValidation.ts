import { countryList } from "@/constants/selectOptions";
import {
  CandidateRole,
  TCandidateRole,
  THighlightsType,
} from "@/types/profile";
import { z } from "zod";

// Personal Information Schema
export const personalInfoSchema = z.object({
  image: z.instanceof(File),
  dateOfBirth: z
    .string()
    .refine(
      (date) => {
        const parsedDate = new Date(date);
        return !isNaN(parsedDate.getTime()) && parsedDate < new Date();
      },
      {
        message: "Date of birth must be a valid date in the past",
      }
    )
    .transform((date) => new Date(date)),
  placeOfBirth: z.string().trim().min(1, "Place of birth is required"),
  nationality: z.string().trim().min(1, "Nationality is required"),
  phoneNumber: z.string().optional(),
});

// Amateur player Professional Information Schema
export const amateurPlayerProfessionalInfoSchema = z.object({
  gender: z.enum(["Male", "Female", "Other"]),
  availability: z.enum(["Now", "Soon", "Later"]),
  height: z.object({
    size: z.string().min(1, "Height is required"),
    unit: z.enum(["cm", "m", "in", "ft"]),
  }),
  weight: z.object({
    size: z.string().min(1, "Weight is required"),
    unit: z.enum(["kg", "lb"]),
  }),
  currentClub: z.string().min(1, "Current club is required"),
  nationalTeamCategory: z.enum([
    "U14",
    "U15",
    "U16",
    "U17",
    "U18",
    "U19",
    "U20",
    "U21",
  ]),
  foot: z.enum(["Right", "Left", "Both"]),
  position: z.enum([
    "GK",
    "Central back",
    "Left back",
    "Right back",
    "Defensive midfielder",
    "Offensive midfielder",
    "Right winger",
    "Left winger",
    "Forward",
    "Striker",
  ]),
  league: z.string().min(1, "League is required"),
  agent: z.string().min(1, "Agent is required"),
  socialMedia: z.string().min(1, "Social media is required"),
});

// College or University player Professional Information Schema
export const collegeOrUniversityPlayerProfessionalInfoSchema = z.object({
  gender: z.string().min(1, "Gender is required"),
  availability: z.string().min(1, "Availability is required"),
  height: z.object({
    size: z.string().min(1, "Height is required"),
    unit: z.enum(["cm", "m", "in", "ft"]),
  }),
  weight: z.object({
    size: z.string().min(1, "Weight is required"),
    unit: z.enum(["kg", "lb"]),
  }),
  currentClub: z.string().min(1, "Current club is required"),
  socialMedia: z.string().min(1, "Social Media is required"),
  category: z.string().optional(),
  foot: z.string().min(1, "Foot is required"),
  position: z.string().min(1, "Position is required"),
  league: z.string().min(1, "League is required"),
  agent: z.string().optional(),
  schoolName: z.string().min(1, "School Name is required"),
  collegeOrUniversity: z.string().min(1, "College or University is required"),
  diploma: z.string().min(1, "Diploma is required"),
  satOrAct: z.string().optional(),
  gpa: z.string().optional(),
  country: z.string().min(1, "Country is required"),
});

// High School player Professional Information Schema
export const highSchoolPlayerProfessionalInfoSchema = z.object({
  gender: z.string().min(1, "Gender is required"),
  height: z.object({
    size: z.string().min(1, "Height is required"),
    unit: z.enum(["cm", "m", "in", "ft"]),
  }),
  weight: z.object({
    size: z.string().min(1, "Weight is required"),
    unit: z.enum(["kg", "lb"]),
  }),
  availability: z.string().min(1, "Availability is required"),
  currentClub: z.string().min(1, "Current club is required"),
  socialMedia: z.string().min(1, "Social Media is required"),
  category: z.string().optional(),
  foot: z.string().min(1, "Foot is required"),
  position: z.string().min(1, "Position is required"),
  league: z.string().min(1, "League is required"),
  agent: z.string().optional(),
  schoolName: z.string().min(1, "School Name is required"),
  diploma: z.string().min(1, "Diploma is required"),
  satOrAct: z.string().optional(),
  gpa: z.string().optional(),
  country: z.string().min(1, "Country is required"),
});

// Professional player Professional Information Schema
export const professionalPlayerProfessionalInfoSchema = z.object({
  gender: z.string().min(1, "Gender is required"),
  height: z.object({
    size: z.string().min(1, "Height is required"),
    unit: z.enum(["cm", "m", "in", "ft"]),
  }),
  weight: z.object({
    size: z.string().min(1, "Weight is required"),
    unit: z.enum(["kg", "lb"]),
  }),
  nationalTeamCategory: z.string().min(1, "National Team Category is required"),
  currentClub: z.string().min(1, "Current club is required"),
  division: z.string().trim().min(1, "Division is required"),
  position: z.string().min(1, "Position is required"),
  agent: z.string().optional(),
  country: z.string().min(1, "Country is required"),
  availability: z.string().min(1, "Availability is required"),
  socialMedia: z.string().min(1, "Social Media is required"),
  foot: z.string().min(1, "Foot is required"),
  nationalTeamGames: z.string().min(1, "National Team Games is required"),
  teamsJoined: z.string().min(1, "Team's Joined is required"),
  contractExpires: z.string().min(1, "Contract expires is required"),
});

// Field staff Professional Information Schema
export const fieldStaffProfessionalInfoSchema = z.object({
  currentClub: z.string().min(1, "Current employer is required"),
  availability: z.string().min(1, "Availability is required"),
  country: z.string().min(1, "Country is required"),
  gender: z.string().min(1, "Gender is required"),
  socialMedia: z.string().min(1, "Social Media is required"),
  position: z.string().min(1, "Position is required"),
  agent: z.string().optional(),
});

// Office staff Professional Information Schema
export const officeStaffProfessionalInfoSchema = z.object({
  country: z.enum(countryList).describe("Please select a valid country"),
  position: z.string().min(1, "Position is required"),
  languages: z.string().min(1, "Languages is required"),
  availability: z.string().min(1, "Availability is required"),
  socialMedia: z.string().min(1, "Social Media is required"),
  agent: z.string().optional(),
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
  [CandidateRole.PROFESSIONAL_PLAYER]: {
    professionalSchema: professionalPlayerProfessionalInfoSchema,
    highlightsType: "single",
    highlightsSchema: singleHighlightsSchema,
  },
  [CandidateRole.AMATEUR_PLAYER]: {
    professionalSchema: amateurPlayerProfessionalInfoSchema,
    highlightsType: "single",
    highlightsSchema: singleHighlightsSchema,
  },
  [CandidateRole.HIGH_SCHOOL]: {
    professionalSchema: highSchoolPlayerProfessionalInfoSchema,
    highlightsType: "single",
    highlightsSchema: singleHighlightsSchema,
  },
  [CandidateRole.COLLEGE_UNIVERSITY]: {
    professionalSchema: collegeOrUniversityPlayerProfessionalInfoSchema,
    highlightsType: "single",
    highlightsSchema: singleHighlightsSchema,
  },
  [CandidateRole.ON_FIELD_STAFF]: {
    professionalSchema: fieldStaffProfessionalInfoSchema,
    highlightsType: "single",
    highlightsSchema: singleHighlightsSchema,
  },
  [CandidateRole.OFFICE_STAFF]: {
    professionalSchema: fieldStaffProfessionalInfoSchema,
    highlightsType: "single",
    highlightsSchema: singleHighlightsSchema,
  },
};
