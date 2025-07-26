"use client";

import type React from "react";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function EmailVerificaion() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [resendTimer, setResendTimer] = useState(56);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

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

  const handleResendCode = () => {
    setResendTimer(56);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel */}
      <div className="hidden md:block flex-1 bg-primary p-2 md:px-5 lg:px-8">
        <div className="flex items-center justify-center h-full">
          <h1 className="text-4xl font-bold text-[#010A18] leading-tight">
            Confirm Your Email to Access Your Learning Resources!
          </h1>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 bg-gray-50 flex items-center justify-center p-2 md:px-5 lg:px-8">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                Verify Your E-mail
              </h2>
              <button className="text-sm text-gray-500 hover:text-gray-700">
                Change your E-mail
              </button>
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
                disabled={resendTimer > 0}
                className="text-sm text-gray-400 hover:text-gray-600 cursor-pointer disabled:cursor-not-allowed"
              >
                Resend Code {resendTimer > 0 && `${resendTimer}s`}
              </button>
            </div>

            {/* Verify Button */}
            <Button
              className="w-full bg-primary text-[#252525] py-3 rounded-lg text-base font-medium mb-4 cursor-pointer"
              disabled={otp.some((digit) => !digit)}
            >
              Verify
            </Button>

            {/* Back Link */}
            <Link href="/signup" className="text-center">
              <button className="flex items-center justify-center gap-2 text-sm text-gray-500 hover:text-gray-700 mx-auto cursor-pointer">
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
