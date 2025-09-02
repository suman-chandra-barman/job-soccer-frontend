import {
  amateurPlayerProfessionalInfoSchema,
  collegePlayerProfessionalInfoSchema,
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

export type TCandidateRole =
  | "professional-player"
  | "amateur-player"
  | "high-school-player"
  | "college-player"
  | "field-staff"
  | "office-staff";
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
export type TCollegePlayerProfessionalInfo = z.infer<
  typeof collegePlayerProfessionalInfoSchema
>;
export type TFieldStaffProfessionalInfo = z.infer<
  typeof fieldStaffProfessionalInfoSchema
>;
export type TOfficeStaffProfessionalInfo = z.infer<
  typeof officeStaffProfessionalInfoSchema
>;

