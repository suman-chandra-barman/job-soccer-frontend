export interface EmailVerificationPayload {
  email: string;
  reason: "account_verification" | "password_reset";
  oneTimeCode: string;
}

export type TUser = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  profileImage: string | null;
  bannerImage?: string | null;
  profileId: string | null;
  authId: string;
  isVerified: boolean;
  role: string;
  userType: "candidate" | "employer";
  isDeleted: boolean;
  profileAIScore: number | null;
  createdAt: string;
  updatedAt: string;
  profile: any | null;
};
