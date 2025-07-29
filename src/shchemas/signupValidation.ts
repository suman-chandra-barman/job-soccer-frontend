import { z } from "zod";

const candidateRoles = [
  "Professional Player",
  "Amateur Player",
  "High School Player",
  "College Player",
  "Staff on The field",
  "Office Staff",
] as const;

const employerRoles = [
  "Club ( professional & amateur)",
  "Academy",
  "High School",
  "College [University",
  "Agent",
] as const;

// Combine all valid roles
const allRoles = [...candidateRoles, ...employerRoles] as const;

export const signUpSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z
    .string()
    .min(1, "Email is required")
    .refine(
      (value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value) || "";
      },
      {
        message: "Please enter a valid email or phone number",
      }
    ),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter"),
  role: z.enum(allRoles, {
    required_error: "Please select a role",
    invalid_type_error: "Please select a valid role",
  }),
  agreeToTerms: z.boolean().refine((value) => value === true, {
    message: "You must agree to the terms and conditions",
  }),
});

export type SignUpFormData = z.infer<typeof signUpSchema>;

// Export role arrays for use in components
export { candidateRoles, employerRoles, allRoles };
