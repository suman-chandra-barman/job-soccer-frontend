"use client";
import Image from "next/image";
import earth from "@/assets/home/earth.png";
import { useAppSelector } from "@/redux/hooks";
import { Button } from "../ui/button";
import Link from "next/link";

interface Feature {
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    title: "Global Access",
    description: "Connect with clubs and agents around the world",
  },
  {
    title: "Visibility",
    description: "Showcase your talent. Get scouted. Go global!",
  },
  {
    title: "Opportunities",
    description: "Discover job offers and trials worldwide",
  },
];

export function GlobalProfile() {
  const { user, token } = useAppSelector((state) => state.auth);
  const isAuthenticated = !!user && !!token;
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-2">
            Create your profile and get seen globally!
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Build your professional presence and connect with opportunities
            worldwide
          </p>
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-2 items-center">
          {/* Left Side - Earth Image */}
          <div className="order-2 md:order-1">
            <Image
              src={earth}
              alt="Global opportunities worldwide"
              className="object-contain w-full"
              priority
            />
          </div>

          {/* Right Side - Content */}
          <div className="order-1 md:order-2">
            {/* Feature Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-center mb-6">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="bg-white rounded-2xl p-4 border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-[#362F05] mb-1">
                        {feature.title}
                      </h3>
                      <p className="text-[#A19C80] text-sm leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {!isAuthenticated && (
              <div className="flex flex-row justify-center items-center gap-2 md:gap-4 ">
                <Button
                  asChild
                  className=" md:w-[200px] bg-yellow-300 hover:scale-105 transition-transform duration-200"
                >
                  <Link href="/signin">Sign In</Link>
                </Button>
                <Button
                  asChild
                  className=" md:w-[200px] bg-yellow-300 hover:scale-105 transition-transform duration-200"
                >
                  <Link href="/signup">Sign Up</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
