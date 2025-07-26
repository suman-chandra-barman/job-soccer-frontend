"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { FaUser, FaEye, FaEyeSlash, FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { signInSchema, type SignInFormData } from "@/shchemas/signinValidation";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const form = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      username: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = async (data: SignInFormData) => {
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      console.log("Sign in data:", data);
      toast.success("Welcome back!", {
        description: "You have successfully signed in to your account.",
      });
      form.reset();

      setTimeout(() => {
        router.push("/");
      }, 1500);
    } catch (error) {
      toast.error("Sign in failed!", {
        description: "Please check your credentials and try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (provider: string) => {
    toast.info(`${provider} login clicked`, {
      description: "Social login functionality would be implemented here.",
    });
  };

  const handleForgotPassword = () => {
    toast.info("Forgot password clicked", {
      description: "Password reset functionality would be implemented here.",
    });
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Dark background with text */}
      <div className="flex-1 flex items-center justify-center px-8 bg-primary">
        <div>
          <h2 className="text-4xl font-bold text-[#010A18] leading-tight">
            Welcome Back! Verify Your Email to Access Your Learning Portal!
          </h2>
          <p className="text-[#837E5B] mt-1">
            Log in to manage your smart assistant and stay in control of your AI
            tools.
          </p>
        </div>
      </div>

      {/* Right side - Sign in form */}
      <div className="flex-1 bg-gray-50 flex items-center justify-center p-8">
        <div className="w-full max-w-md bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              Sing in Account
            </h2>
            <p className="text-gray-600 text-sm">
              Don&apos;t haven Account?{" "}
              <Link href="/signup" className="underline">
                Sing Up Free
              </Link>
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {/* Username */}
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">
                      User name
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          placeholder="Enter your user name"
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
                          placeholder="Enter your Password"
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

              {/* Remember Me and Forgot Password */}
              <div className="flex items-center justify-between">
                <FormField
                  control={form.control}
                  name="rememberMe"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0  cursor-pointer">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none ">
                        <FormLabel className="text-sm text-gray-600 cursor-pointer">
                          Remember for 30 Days
                        </FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  className="text-sm text-gray-600 hover:text-gray-800  cursor-pointer"
                >
                  Forget Password?
                </button>
              </div>

              {/* Login Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-primary hover:bg-amber-300 text-[#010A18] py-3 rounded-md"
              >
                {isLoading ? "Signing in..." : "Login"}
              </Button>
            </form>
          </Form>

          {/* Divider */}
          <div className="text-center text-gray-500 text-sm my-6">
            Or Login with
          </div>

          {/* Social Login Buttons */}
          <div className="grid grid-cols-2 gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleSocialLogin("Google")}
              className="flex items-center justify-center space-x-2 py-3 bg-transparent cursor-pointer"
            >
              <FcGoogle className="w-5 h-5" />
              <span>Google</span>
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => handleSocialLogin("Facebook")}
              className="flex items-center justify-center space-x-2 py-3 bg-transparent cursor-pointer"
            >
              <FaFacebook className="w-5 h-5 text-blue-600" />
              <span>Facebook</span>
            </Button>
          </div>

          {/* Sign up link */}
          <div className="text-center text-sm text-gray-600 mt-6">
            Don&apos;t haven an account?{" "}
            <Link href="/signup" className="underline">
              Sign Up Free
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
