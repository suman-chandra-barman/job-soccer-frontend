/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { FaUser, FaEye, FaEyeSlash } from "react-icons/fa";
import { IoMdArrowBack } from "react-icons/io";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { signUpSchema, type SignUpFormData } from "@/shchemas/signupValidation";
import { useRouter } from "next/navigation";
import RoleSelect from "@/components/input/SelectRole";
import { useSignupMutation } from "@/redux/features/auth/authApi";
import { Spinner } from "@/components/ui/spinner";

export default function SignUpPage() {
  const [userRype, setUserRype] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);
  const [signup, { isLoading }] = useSignupMutation();

  const router = useRouter();

  const form = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      role: undefined,
      password: "",
    },
  });

  const onSubmit = async (formData: SignUpFormData) => {
    try {
      const payload = {
        ...formData,
        userType: userRype,
        loginProvider: "email",
      } as unknown;

      // Call the signup mutation
      const userData = await signup(payload).unwrap();

      if (userData.success) {
        console.log("User data:", userData);

        toast.success("Account created successfully!", {
          description: "Welcome to our platform",
        });
        form.reset();
        router.push(
          `/email-verification?email=${encodeURIComponent(
            formData.email
          )}&reason=account_verification`
        );
      }
    } catch (error: any) {
      toast.error(
        error?.data?.errorSources[0]?.message || "Something went wrong!",
        {
          description: "Please try again later.",
        }
      );
    }
  };

  return (
    <div className="min-h-screen md:flex relative">
      {/* Left side */}
      <div className="hidden flex-1 md:flex items-center justify-center px-2 md:px-5 lg:px-8 bg-primary">
        {/* Home navigation link */}
        <Link
          href="/"
          className="absolute top-6 left-6 flex items-center gap-2 px-4 py-2 rounded-md bg-black hover:bg-gray-800 text-white hover:text-white shadow-md hover:shadow-lg transition-all duration-300 z-10 group font-medium"
        >
          <IoMdArrowBack className="h-5 w-5 group-hover:-translate-x-1 transition-transform duration-300" />
          <span className="text-sm">Home</span>
        </Link>
        <div className="max-w-2xl">
          <h2 className="text-4xl font-bold text-[#010A18] leading-tight">
            Join the Team: Sign Up to Access Our Football Career Portal
          </h2>
          <p className="text-[#837E5B] mt-1">
            Join us to access personalized AI solutions built for productivity
            and simplicity.
          </p>
        </div>
      </div>

      {/* Right side - Sign up form */}
      <div className="flex-1 bg-gray-50 flex items-center justify-center p-2 md:p-5 lg:p-8">
        <div className="w-full max-w-md bg-white border-2 rounded-lg p-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              Create a free account
            </h2>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {/* First Name and Last Name */}
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700">
                        First Name
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            placeholder="First name"
                            className="pr-10 bg-gray-100 border-gray-200"
                            {...field}
                          />
                          <FaUser className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700">
                        Last Name
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            placeholder="Last name"
                            className="pr-10 bg-gray-100 border-gray-200"
                            {...field}
                          />
                          <FaUser className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your email"
                        className="bg-gray-100 border-gray-200"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Role Selection */}
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">
                      Role
                    </FormLabel>
                    <FormControl>
                      <RoleSelect
                        value={field.value}
                        onValueChange={field.onChange}
                        setUserRype={setUserRype}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Password */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">
                      Password
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          className="pr-10 bg-gray-100 border-gray-200"
                          {...field}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2"
                        >
                          {showPassword ? (
                            <FaEyeSlash className="h-4 w-4 text-gray-400 cursor-pointer" />
                          ) : (
                            <FaEye className="h-4 w-4 text-gray-400 cursor-pointer" />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Sign Up Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full cursor-pointer bg-primary text-[#252525] hover:bg-amber-300 py-3 rounded-md"
              >
                {isLoading ? <Spinner className="h-4 w-4" /> : "Sign up"}
              </Button>
            </form>
          </Form>

          {/* Sign in link */}
          <div className="text-center text-sm text-gray-600 mt-4">
            Already have an account?{" "}
            <Link
              href="/signin"
              className="underline text-primary-fill-primary"
            >
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
