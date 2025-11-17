import {
  amateurPlayerProfessionalInfoSchema,
  collegeOrUniversityPlayerProfessionalInfoSchema,
  fieldStaffProfessionalInfoSchema,
  highSchoolPlayerProfessionalInfoSchema,
  officeStaffProfessionalInfoSchema,
  personalInfoSchema,
  professionalPlayerProfessionalInfoSchema,
  videoSchema,
  academyEmployerProfileSchema,
  agentEmployerProfileSchema,
  amateurClubEmployerProfileSchema,
  collegeOrUniversityEmployerProfileSchema,
  consultingCompanyEmployerProfileSchema,
} from "@/shchemas/profileValidation";
import z from "zod";

export type TCandidateRole = CandidateRole;
export type TPersonalInfo = z.infer<typeof personalInfoSchema>;
export type TVideo = z.infer<typeof videoSchema>;
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

export type TAcademyEmployerProfile = z.infer<
  typeof academyEmployerProfileSchema
>;

export type TAgentEmployerProfile = z.infer<typeof agentEmployerProfileSchema>;

export type TAmateurClubEmployerProfile = z.infer<
  typeof amateurClubEmployerProfileSchema
>;

export type TCollegeOrUniversityEmployerProfile = z.infer<
  typeof collegeOrUniversityEmployerProfileSchema
>;

export type TConsultingCompanyEmployerProfile = z.infer<
  typeof consultingCompanyEmployerProfileSchema
>;

export interface IVideoFormProps {
  onNext: (data: TVideo) => void;
  onPrev: () => void;
  initialData?: Partial<TVideo>;
  steps?: Array<{
    id: number;
    label: string;
    completed?: boolean;
    active?: boolean;
  }>;
}
// Internal video map structure
export interface IVideoMap {
  [key: string]: File | null;
}

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
