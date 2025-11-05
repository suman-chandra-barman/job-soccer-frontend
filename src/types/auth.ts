export interface EmailVerificationPayload {
  email: string;
  reason: "account_verification" | "password_reset";
  oneTimeCode: string;
}
