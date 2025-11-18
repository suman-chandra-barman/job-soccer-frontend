/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import {
  Home,
  MessageCircle,
  Bell,
  Users,
  Building2,
  Briefcase,
  LogIn,
  Crown,
  Menu,
  UserSquare,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import logo from "@/assets/logo.png";
import Link from "next/link";
import NotificationModal from "../modals/NotificationModal";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useGetMeQuery } from "@/redux/features/auth/authApi";
import { useAppDispatch } from "@/redux/hooks";
import { logout } from "@/redux/features/auth/authSlice";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

// Types for notification data
interface NotificationItem {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  count: number;
}

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  const pathname = usePathname();
  const router = useRouter();

  const { data: user } = useGetMeQuery(null);
  const dispatch = useAppDispatch();

  const isLoggedIn = !!user?.data?.profileId;
  const iconLinks = isLoggedIn
    ? [
        { name: "Home", href: "/", icon: Home },
        { name: "Candidates", href: "/candidates", icon: Users },
        { name: "Employers", href: "/employers", icon: Building2 },
        { name: "Job Board", href: "jobs", icon: Briefcase },
        { name: "My Network", href: "/my-network", icon: UserSquare },
        { name: "Upgrade", href: "/upgrade", icon: Crown },
        { name: "Message", href: "/messages", icon: MessageCircle },
        {
          name: "Notification",
          href: "#",
          icon: Bell,
          onClick: () => setIsNotificationOpen(true),
        },
      ]
    : [
        { name: "Home", href: "/", icon: Home },
        { name: "Candidates", href: "/candidates", icon: Users },
        { name: "Employers", href: "/employers", icon: Building2 },
        { name: "Job Board", href: "jobs", icon: Briefcase },
        { name: "Upgrade", href: "/upgrade", icon: Crown },
        { name: "Messages", href: "/messages", icon: MessageCircle },
      ];

  const isActiveLink = (href: any) => pathname === href;

  // Mock notification data matching your design
  const mockNotifications: NotificationItem[] = [
    {
      id: "1",
      title: "You have new 4 opportunity this week",
      description:
        "This week, your AI Job-finder has discovered four exciting new Cocktail opportunities...",
      timestamp: "5h ago",
      count: 4,
    },
    {
      id: "2",
      title: "You have new 4 opportunity this week",
      description:
        "This week, your AI Job-finder has discovered four exciting new Cocktail opportunities...",
      timestamp: "5h ago",
      count: 4,
    },
    {
      id: "3",
      title: "You have new 4 opportunity this week",
      description:
        "This week, your AI Job-finder has discovered four exciting new Cocktail opportunities...",
      timestamp: "5h ago",
      count: 4,
    },
    {
      id: "4",
      title: "You have new 4 opportunity this week",
      description:
        "This week, your AI Job-finder has discovered four exciting new Cocktail opportunities...",
      timestamp: "14h ago",
      count: 4,
    },
    {
      id: "5",
      title: "You have new 4 opportunity this week",
      description:
        "This week, your AI Job-finder has discovered four exciting new Cocktail opportunities...",
      timestamp: "22h ago",
      count: 4,
    },
    {
      id: "6",
      title: "You have new 4 opportunity this week",
      description:
        "This week, your AI Job-finder has discovered four exciting new Cocktail opportunities...",
      timestamp: "1d ago",
      count: 4,
    },
    {
      id: "7",
      title: "You have new 4 opportunity this week",
      description:
        "This week, your AI Job-finder has discovered four exciting new Cocktail opportunities...",
      timestamp: "1d ago",
      count: 4,
    },
  ];

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    router.push("/signin");
  };

  const profileImageUrl = user?.data?.profileImage
    ? `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}${user?.data?.profileImage}`
    : undefined;

  return (
    <nav className="bg-[#FFF8CC] border-b sticky top-0 z-50 text-[#362F05]">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-4 justify-between py-1">
          {/* Job Soccer Logo */}
          <Link
            href="/"
            className="flex items-center bg-white p-1 rounded-full"
          >
            <Image src={logo} alt="Logo" className="w-16 h-auto" priority />
          </Link>

          {/* Hamburger Menu for Mobile */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              className=" hover:text-green-500"
              onClick={() => setIsOpen(true)}
              aria-label="Toggle menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center justify-center gap-4 lg:gap-8 w-full">
            {iconLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={link.onClick}
                className={`flex flex-col items-center transition-colors ${
                  isActiveLink(link.href)
                    ? "text-green-500"
                    : " hover:text-green-500"
                }`}
              >
                <link.icon className="h-5 w-5" />
                <span className="text-xs mt-1">{link.name}</span>
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex justify-end">
            {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="w-10 h-10 cursor-pointer">
                    {profileImageUrl && (
                      <AvatarImage
                        src={profileImageUrl}
                        alt="User Avatar"
                        className="w-full h-full object-cover"
                      />
                    )}
                    <AvatarFallback
                      className="w-full h-full bg-black text-white
                    "
                    >
                      {user?.data?.firstName?.[0]}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="start">
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => handleLogout()}>
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link
                href={"/signin"}
                className={`flex flex-col items-center flex-nowrap transition-colors`}
              >
                <Button className=" bg-black hover:bg-gray-800 text-white hover:text-white rounded-md font-medium">
                  Sign In
                </Button>
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <div className="lg:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetContent side="left" className="w-[300px] sm:w-[400px] ">
              <SheetHeader className="border-b py-2">
                <SheetTitle className="text-left">
                  {isLoggedIn && (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Avatar className="w-16 h-16 cursor-pointer">
                          {profileImageUrl && (
                            <AvatarImage
                              src={profileImageUrl}
                              alt="User Avatar"
                              className="w-full h-full object-cover"
                            />
                          )}
                          <AvatarFallback
                            className="w-full h-full bg-black text-white
                    "
                          >
                            {user?.data?.firstName?.[0]}
                          </AvatarFallback>
                        </Avatar>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-56" align="start">
                        <DropdownMenuItem>Profile</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleLogout()}>
                          Log out
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col space-y-6 mt-8 px-4">
                {iconLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={link.onClick || (() => setIsOpen(false))}
                    className={`flex items-center space-x-2 transition-colors ${
                      isActiveLink(link.href)
                        ? "text-green-500"
                        : "text-gray-600 hover:text-green-500"
                    }`}
                  >
                    <link.icon className="h-5 w-5" />
                    <span>{link.name}</span>
                  </Link>
                ))}
                <div>
                  {!isLoggedIn && (
                    <Link
                      href={"/signin"}
                      className={`flex space-x-2 items-center flex-nowrap transition-colors ${
                        isActiveLink("/signin")
                          ? "text-green-500"
                          : "text-gray-600 hover:text-green-500"
                      }`}
                    >
                      <LogIn className="h-5 w-5" />
                      <span>Log in</span>
                    </Link>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Notification Modal */}
      <NotificationModal
        isOpen={isNotificationOpen}
        onClose={() => setIsNotificationOpen(false)}
        notifications={mockNotifications}
      />
    </nav>
  );
}
