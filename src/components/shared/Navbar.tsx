"use client";

import React, { useState } from "react";
import {
  Home,
  MessageCircle,
  Bell,
  CircleUserRound,
  Crown,
  Menu,
  X,
} from "lucide-react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import logo from "@/assets/logo.png";
import Link from "next/link";
import NotificationModal from "../modals/NotificationModal";

// Types for notification data
interface NotificationItem {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  count: number;
}

export function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  const topNavLinks = [
    { name: "Candidates", href: "/candidates" },
    { name: "Employers", href: "/employers" },
    { name: "Job Board", href: "/job-board" },
    { name: "My Network", href: "/my-network" },
    { name: "Sign In", href: "/signin" },
    { name: "Sign Up", href: "/signup" },
  ];

  const iconLinks = [
    { name: "Home", href: "/", icon: Home },
    { name: "Message", href: "/messages", icon: MessageCircle },
    { name: "Upgrade", href: "/upgrade", icon: Crown },
    { name: "Profile", href: "/profile/candidate", icon: CircleUserRound },
  ];

  const isActiveLink = (href) => pathname === href;

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

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

  return (
    <nav className="bg-white border-b sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-4 justify-between py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src={logo}
              alt="Logo"
              className="object-cover h-14 w-auto"
              priority
            />
          </Link>

          {/* Hamburger Menu for Mobile */}
          <button
            className="lg:hidden text-gray-600 hover:text-green-500"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center justify-end gap-4 lg:gap-8 w-full">
            {/* Text Links */}
            {topNavLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm font-medium transition-colors pb-1 ${
                  isActiveLink(link.href)
                    ? "text-green-500"
                    : "text-gray-600 hover:text-green-500"
                }`}
              >
                {link.name}
              </Link>
            ))}
            {/* Icon Links */}
            {iconLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`flex flex-col items-center transition-colors ${
                  isActiveLink(link.href)
                    ? "text-green-500"
                    : "text-gray-600 hover:text-green-500"
                }`}
              >
                <link.icon className="h-5 w-5" />
                <span className="text-xs mt-1">{link.name}</span>
              </Link>
            ))}
            <button
              onClick={() => setIsNotificationOpen(true)}
              className={`flex items-center flex-col text-gray-600 hover:text-green-500`}
            >
              <Bell className="h-5 w-5" />
              <span className="text-xs mt-1">Notification</span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-yellow-50 p-4 rounded-lg">
            <div className="flex flex-col space-y-4">
              {topNavLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={toggleMobileMenu}
                  className={`text-sm font-medium transition-colors ${
                    isActiveLink(link.href)
                      ? "text-green-500"
                      : "text-gray-600 hover:text-green-500"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              {iconLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={toggleMobileMenu}
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
              <button
                onClick={() => {
                  setIsNotificationOpen(!isNotificationOpen);
                }}
                className={`flex items-center space-x-2 text-gray-600 hover:text-green-500`}
              >
                <Bell className="h-5 w-5" />
                <span>Notification</span>
              </button>
            </div>
          </div>
        )}
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
