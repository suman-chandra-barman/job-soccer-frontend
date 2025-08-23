"use client";

import type React from "react";
import { useState } from "react";
import {
  Search,
  Home,
  MessageCircle,
  Bell,
  CircleUserRound,
  Crown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { usePathname } from "next/navigation";
import Image from "next/image";
import logo from "@/assets/logo.png";
import Link from "next/link";

export function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const pathname = usePathname();

  const topNavLinks = [
    { name: "Candidates", href: "/candidates" },
    { name: "Employers", href: "/employers" },
    { name: "Job Board", href: "/job-board" },
    { name: "My Network", href: "/my-network" },
    { name: "Sign In", href: "/signin" },
    { name: "Register", href: "/register" },
  ];

  const handleSearch = () => {
    if (searchQuery.trim()) {
      console.log("Search query:", searchQuery);
      // router.push(`/jobs?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const isActiveLink = (href: string) => {
    return pathname === href;
  };

  return (
    <nav className="bg-white border-b mt-6">
      <div className="">
        {/* Top Navigation */}
        <div className="border-b border-gray-100">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center space-x-8 py-3">
              {topNavLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-medium transition-colors pb-1 ${
                    isActiveLink(link.href)
                      ? "text-teal-600 border-b-2 border-teal-600"
                      : "text-gray-600 border-b-2 border-transparent hover:text-teal-600"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Secondary Navigation */}
        <div className="bg-yellow-50 ">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between py-1">
              {/* Logo */}
              <Link href="/" className="flex items-center">
                <div className="flex items-center justify-center">
                  <Image src={logo} alt="Logo" className="object-cover" />
                </div>
              </Link> 
              
              {/* Search Bar */}
              <div className="flex-1 max-w-md mx-8">
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Search skills, name, skill"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="w-full py-5 pr-12 border-none bg-white rounded-full focus:border-yellow-300 focus:ring-yellow-300"
                  />
                  <Button
                    onClick={handleSearch}
                    size="lg"
                    className="absolute h-full right-0 top-1/2 -translate-y-1/2 bg-yellow-300 hover:bg-yellow-400 text-black rounded-r-full"
                  >
                    <Search className="h-6 w-6" />
                  </Button>
                </div>
              </div>

              {/* Right Icons */}
              <div className="flex items-center space-x-8">
                <Link
                  href="/"
                  className="flex flex-col items-center text-gray-600 hover:text-teal-600 transition-colors"
                >
                  <Home className="h-5 w-5" />
                  <span className="text-xs mt-1">Home</span>
                </Link>
                <Link
                  href="/messages"
                  className="flex flex-col items-center text-gray-600 hover:text-teal-600 transition-colors"
                >
                  <MessageCircle className="h-5 w-5" />
                  <span className="text-xs mt-1">Message</span>
                </Link>
                <Link
                  href="/notifications"
                  className="flex flex-col items-center text-gray-600 hover:text-teal-600 transition-colors"
                >
                  <Bell className="h-5 w-5" />
                  <span className="text-xs mt-1">Notification</span>
                </Link>
                <Link
                  href="/upgrade"
                  className="flex flex-col items-center text-gray-600 hover:text-teal-600 transition-colors"
                >
                  <Crown className="h-5 w-5" />
                  <span className="text-xs mt-1">Upgrade</span>
                </Link>
                <Link
                  href="/profile"
                  className="flex flex-col items-center text-gray-600 hover:text-teal-600 transition-colors"
                >
                  <CircleUserRound className="h-5 w-5" />
                  <span className="text-xs mt-1">Profile</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
