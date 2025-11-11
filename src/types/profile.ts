import {
  amateurPlayerProfessionalInfoSchema,
  collegeOrUniversityPlayerProfessionalInfoSchema,
  completeProfileSchema,
  fieldStaffProfessionalInfoSchema,
  highlightsSchema,
  highSchoolPlayerProfessionalInfoSchema,
  multipleHighlightsSchema,
  officeStaffProfessionalInfoSchema,
  personalInfoSchema,
  professionalPlayerProfessionalInfoSchema,
  singleHighlightsSchema,
} from "@/shchemas/profileValidation";
import z from "zod";

export type TCandidateRole = CandidateRole;
export type THighlightsType = "single" | "multiple";
export type TSingleHighlights = z.infer<typeof singleHighlightsSchema>;
export type TMultipleHighlights = z.infer<typeof multipleHighlightsSchema>;

export type TPersonalInfo = z.infer<typeof personalInfoSchema>;
export type THighlights = z.infer<typeof highlightsSchema>;
export type TCompleteProfile = z.infer<typeof completeProfileSchema>;
export type TAmateurPlayerProfessionalInfo = z.infer<
  typeof amateurPlayerProfessionalInfoSchema
>;
export type TProfessionalPlayerProfessionalInfo = z.infer<
  typeof professionalPlayerProfessionalInfoSchema
>;
export type THighSchoolPlayerProfessionalInfo = z.infer<
  typeof highSchoolPlayerProfessionalInfoSchema
>;
export type TCollegeOrUniversityPlayerProfessionalInfo = z.infer<
  typeof collegeOrUniversityPlayerProfessionalInfoSchema
>;
export type TFieldStaffProfessionalInfo = z.infer<
  typeof fieldStaffProfessionalInfoSchema
>;
export type TOfficeStaffProfessionalInfo = z.infer<
  typeof officeStaffProfessionalInfoSchema
>;

// Role enums
export enum CandidateRole {
  PROFESSIONAL_PLAYER = "Professional Player",
  AMATEUR_PLAYER = "Amateur Player",
  HIGH_SCHOOL = "High School",
  COLLEGE_UNIVERSITY = "College/University",
  ON_FIELD_STAFF = "On field staff",
  OFFICE_STAFF = "Office Staff",
}

export enum EmployerRole {
  PROFESSIONAL_CLUB = "Professional Club",
  ACADEMY = "Academy",
  AMATEUR_CLUB = "Amateur Club",
  CONSULTING_COMPANY = "Consulting Company",
  HIGH_SCHOOL = "High School",
  COLLEGE_UNIVERSITY = "College/University",
  AGENT = "Agent",
}

