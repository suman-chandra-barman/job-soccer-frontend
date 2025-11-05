/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import type React from "react";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import {
  useEmailVerifyMutation,
  useResendOtpMutation,
} from "@/redux/features/auth/authApi";
import { toast } from "sonner";

export default function EmailVerificationPage() {
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [resendTimer, setResendTimer] = useState(120);

  const [emailVerify, { isLoading }] = useEmailVerifyMutation();
  const [resendOtp, { isLoading: isResending }] = useResendOtpMutation();

  const searchParams = useSearchParams();
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const router = useRouter();

  const email = searchParams.get("email");
  const reason: "account_verification" | "password_reset" = searchParams.get(
    "reason"
  ) as any;

  // Redirect if no email is provided
  useEffect(() => {
    if (!email || !reason) {
      router.replace("/signup");
    }
  }, [email, router, reason]);

  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);

  const handleOtpChange = (index: number, value: string) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Auto-focus next input
      if (value && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleResendCode = async () => {
    if (!email || !reason) return;

    try {
      await resendOtp({ email, reason }).unwrap();
      setResendTimer(120);
      toast.success("Verification code resent successfully!");
    } catch (error) {
      toast.error("Failed to resend verification code. Please try again.");
    }
  };

  const handleVerify = async () => {
    if (!email || !reason) {
      toast.error("Email and reason are required");
      return;
    }

    const stringOtp = otp.join("");
    if (stringOtp.length !== 6) {
      toast.error("Please enter a complete verification code");
      return;
    }

    const payload = {
      email,
      reason,
      oneTimeCode: stringOtp,
    };

    try {
      const res = await emailVerify(payload).unwrap();

      if (res.success) {
        toast.success("Email verified successfully!");
        localStorage.setItem("accessToken", res.data.accessToken);

        // Redirect based on the verification reason or default to success page
        if (reason === "account_verification") {
          router.push("/signin");
        } else {
          router.push("/success-message");
        }
      }
    } catch (error) {
      toast.error("Failed to verify email. Please try again.");
      // Clear OTP fields on error
      setOtp(["", "", "", "", "", ""]);
      // Focus first input
      inputRefs.current[0]?.focus();
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel */}
      <div className="hidden flex-1 md:flex items-center justify-center px-2 md:px-5 lg:px-8 bg-primary">
        <div className="max-w-2xl">
          <h2 className="text-4xl font-bold text-[#010A18] leading-tight">
            Confirm Your Email to Activate Your Football Job Profile.
          </h2>
          <p className="text-[#837E5B] mt-1">
            We’ve sent a verification code to your email — enter it below to
            continue.
          </p>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 bg-gray-50 flex items-center justify-center p-2 md:px-5 lg:px-8">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                Verify Your Email
              </h2>
            </div>

            {/* OTP Input */}
            <div className="flex gap-3 justify-center mb-6">
              {otp.map((digit, index) => (
                <Input
                  key={index}
                  ref={(el) => {
                    inputRefs.current[index] = el;
                  }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-12 h-12 text-center text-lg font-medium border-gray-200 rounded-lg focus:border-blue-500 focus:ring-blue-500"
                />
              ))}
            </div>

            {/* Resend Code */}
            <div className="text-center mb-6">
              <p className="text-sm text-gray-500 mb-1">
                {"Didn't get OTP Code?"}
              </p>
              <button
                onClick={handleResendCode}
                disabled={resendTimer > 0 || isResending || !email}
                className="text-sm text-gray-400 hover:text-gray-600 cursor-pointer disabled:cursor-not-allowed"
              >
                {isResending
                  ? "Resending..."
                  : `Resend Code ${resendTimer > 0 ? `(${resendTimer}s)` : ""}`}
              </button>
            </div>

            {/* Verify Button */}
            <Button
              className="w-full bg-primary text-[#252525] py-3 rounded-lg text-base font-medium mb-4 cursor-pointer disabled:opacity-50"
              disabled={otp.some((digit) => !digit) || isLoading || !email}
              onClick={handleVerify}
            >
              {isLoading ? "Verifying..." : "Verify"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
