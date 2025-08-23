"use client";

import React, { useState } from "react";
import {
  Search,
  Home,
  MessageCircle,
  Bell,
  CircleUserRound,
  Crown,
  Menu,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import logo from "@/assets/logo.png"; 
import Link from "next/link";

export function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for mobile menu
  const pathname = usePathname();
  const router = useRouter();

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
      router.push(`/jobs?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const isActiveLink = (href: string) => pathname === href;

  return (
    <nav className="bg-white border-b mt-6">
      <div>
        {/* Top Navigation */}
        <div className="border-b border-gray-100">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center py-3">
              {/* Hamburger Menu Button (visible on mobile) */}
              <button
                className="md:hidden text-gray-600 focus:outline-none"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>

              {/* Top Navigation Links */}
              <div
                className={`${
                  isMenuOpen ? "flex" : "hidden"
                } md:flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8 absolute md:static top-16 left-0 right-0 bg-white md:bg-transparent p-4 md:p-0 z-10`}
              >
                {topNavLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`text-sm font-medium transition-colors pb-1 ${
                      isActiveLink(link.href)
                        ? "text-teal-600 border-b-2 border-teal-600"
                        : "text-gray-600 border-b-2 border-transparent hover:text-teal-600"
                    }`}
                    onClick={() => setIsMenuOpen(false)} // Close menu on link click
                  >
                    {link.name}
                  </Link>
                ))}
              </div>

              {/* Spacer to keep links centered on desktop */}
              <div className="md:block hidden w-6" />
            </div>
          </div>
        </div>

        {/* Secondary Navigation */}
        <div className="bg-yellow-50">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between py-3 space-y-4 md:space-y-0">
              {/* Logo */}
              <Link href="/" className="flex items-center">
                <div className="flex items-center justify-center">
                  <Image src={logo} alt="Logo" className="object-cover" />
                </div>
              </Link>

              {/* Search Bar */}
              <div className="flex-1 w-full md:max-w-md md:mx-8">
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Search skills, name, skill"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="w-full py-2 md:py-5 pr-12 border-none bg-white rounded-full focus:border-yellow-300 focus:ring-yellow-300"
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
              <div className="flex items-center space-x-4 md:space-x-8">
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