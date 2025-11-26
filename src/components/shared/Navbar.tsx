"use client";

import React, { useState, useCallback, useMemo } from "react";
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
  LucideIcon,
  LogOut,
  User,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import logo from "@/assets/logo.png";
import NotificationModal from "../modals/NotificationModal";
import LogoutModal from "../modals/LogoutModal";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { useGetMeQuery } from "@/redux/features/auth/authApi";
import { useAppDispatch } from "@/redux/hooks";
import { logout } from "@/redux/features/auth/authSlice";

// ==================== Types ====================
interface NotificationItem {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  count: number;
}

interface NavLink {
  name: string;
  href: string;
  icon: LucideIcon;
  onClick?: () => void;
}

interface UserProfileMenuProps {
  profileImageUrl?: string;
  userName?: string;
  userType?: "candidate" | "employer";
  onLogout: () => void;
  size?: "sm" | "md";
}

// ==================== Constants ====================
const MOCK_NOTIFICATIONS: NotificationItem[] = [
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

// ==================== Subcomponents ====================
const UserProfileMenu: React.FC<UserProfileMenuProps> = ({
  profileImageUrl,
  userName = "U",
  userType,
  onLogout,
  size = "md",
}) => {
  const router = useRouter();
  const avatarSize = size === "sm" ? "w-11 h-11" : "w-13 h-13";

  const handleProfileClick = () => {
    if (userType === "candidate") {
      router.push("/profile/candidate");
    } else if (userType === "employer") {
      router.push("/profile/employer");
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 rounded-full">
          {profileImageUrl ? (
            <div
              className={`${avatarSize} rounded-full overflow-hidden cursor-pointer border-2 border-transparent hover:border-green-500 transition-colors`}
            >
              <Image
                src={profileImageUrl}
                alt="User Avatar"
                width={56}
                height={56}
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <Avatar
              className={`${avatarSize} cursor-pointer hover:ring-2 hover:ring-green-500 transition-all`}
            >
              <AvatarFallback className="bg-black text-white text-base font-semibold">
                {userName[0]?.toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuItem
          onClick={handleProfileClick}
          className="cursor-pointer"
        >
          <User className="h-4 w-4" />
          My Profile
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={onLogout}
          className="cursor-pointer text-red-600 hover:text-red-700 hover:bg-red-50 focus:text-red-700 focus:bg-red-50"
        >
          <LogOut className="h-4 w-4" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

interface NavLinkItemProps {
  link: NavLink;
  isActive: boolean;
  onMobileClick?: () => void;
  isMobile?: boolean;
}

const NavLinkItem: React.FC<NavLinkItemProps> = ({
  link,
  isActive,
  onMobileClick,
  isMobile = false,
}) => {
  const handleClick = (e: React.MouseEvent) => {
    if (link.onClick) {
      e.preventDefault();
      link.onClick();
    }
    if (onMobileClick) {
      onMobileClick();
    }
  };

  const baseClasses = "transition-colors duration-200";
  const activeClasses = isActive
    ? "text-green-500"
    : "text-gray-700 hover:text-green-500";

  if (isMobile) {
    return (
      <Link
        href={link.href}
        onClick={handleClick}
        className={`flex items-center gap-3 py-2 ${baseClasses} ${activeClasses}`}
      >
        <link.icon className="h-5 w-5" />
        <span className="font-medium">{link.name}</span>
      </Link>
    );
  }

  return (
    <Link
      href={link.href}
      onClick={link.onClick}
      className={`flex flex-col items-center gap-1 ${baseClasses} ${activeClasses}`}
    >
      <link.icon className="h-5 w-5" />
      <span className="text-sm font-medium">{link.name}</span>
    </Link>
  );
};

// ==================== Helpers ====================
const getNavLinks = (
  isLoggedIn: boolean,
  onNotificationClick: () => void
): NavLink[] => {
  const commonLinks: NavLink[] = [
    { name: "Home", href: "/", icon: Home },
    { name: "Candidates", href: "/candidates", icon: Users },
    { name: "Employers", href: "/employers", icon: Building2 },
    { name: "Job Board", href: "/jobs", icon: Briefcase },
  ];

  if (isLoggedIn) {
    return [
      ...commonLinks,
      { name: "My Network", href: "/my-network", icon: UserSquare },
      { name: "Upgrade", href: "/upgrade", icon: Crown },
      { name: "Message", href: "/messages", icon: MessageCircle },
      {
        name: "Notification",
        href: "#",
        icon: Bell,
        onClick: onNotificationClick,
      },
    ];
  }

  return [
    ...commonLinks,
    { name: "Upgrade", href: "/upgrade", icon: Crown },
    { name: "Messages", href: "/messages", icon: MessageCircle },
  ];
};

const getProfileImageUrl = (profileImage?: string): string | undefined => {
  if (!profileImage) return undefined;
  return `${process.env.NEXT_PUBLIC_BASE_URL}${profileImage}`;
};

// ==================== Main Component ====================
export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { data: user } = useGetMeQuery(null);

  const isLoggedIn = !!user?.data?.profileId;
  const navLinks = useMemo(
    () => getNavLinks(isLoggedIn, () => setIsNotificationOpen(true)),
    [isLoggedIn]
  );
  const profileImageUrl = useMemo(
    () => getProfileImageUrl(user?.data?.profileImage),
    [user?.data?.profileImage]
  );

  const isActiveLink = useCallback(
    (href: string) => {
      if (href === "/") return pathname === href;
      return pathname.startsWith(href);
    },
    [pathname]
  );

  const handleLogoutClick = useCallback(() => {
    setIsLogoutModalOpen(true);
  }, []);

  const confirmLogout = useCallback(() => {
    dispatch(logout());
    localStorage.removeItem("token");
    setIsLogoutModalOpen(false);
    router.push("/signin");
  }, [dispatch, router]);

  const cancelLogout = useCallback(() => {
    setIsLogoutModalOpen(false);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  return (
    <nav className="bg-[#FFF8CC] sticky top-0 z-50 text-[#362F05]">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-4 justify-between py-2">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center bg-white p-1 rounded-full hover:shadow-md transition-shadow"
            aria-label="Job Soccer Home"
          >
            <Image
              src={logo}
              alt="Job Soccer Logo"
              className="w-16 h-auto"
              priority
            />
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden hover:text-green-500 transition-colors p-2 rounded-md hover:bg-white/50"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open navigation menu"
          >
            <Menu className="h-6 w-6" />
          </button>

          {/* Desktop Navigation */}
          <nav
            className="hidden lg:flex items-center justify-center gap-4 lg:gap-8 w-full"
            aria-label="Main navigation"
          >
            {navLinks.map((link) => (
              <NavLinkItem
                key={link.name}
                link={link}
                isActive={isActiveLink(link.href)}
              />
            ))}
          </nav>

          {/* Desktop User Menu */}
          <div className="hidden lg:flex justify-end">
            {isLoggedIn ? (
              <UserProfileMenu
                profileImageUrl={profileImageUrl}
                userName={user?.data?.firstName}
                userType={user?.data?.userType}
                onLogout={handleLogoutClick}
                size="sm"
              />
            ) : (
              <Link href="/signin">
                <Button className="bg-black hover:bg-gray-800 text-white rounded-md font-medium">
                  Sign In
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
        <SheetContent side="left" className="w-[300px] sm:w-[400px]">
          <SheetHeader className="border-b">
            <SheetTitle className="text-left">
              {isLoggedIn ? (
                <UserProfileMenu
                  profileImageUrl={profileImageUrl}
                  userName={user?.data?.firstName}
                  userType={user?.data?.userType}
                  onLogout={handleLogoutClick}
                  size="md"
                />
              ) : (
                <span className="text-xl font-bold text-gray-900">Menu</span>
              )}
            </SheetTitle>
          </SheetHeader>

          <nav
            className="flex flex-col space-y-4 px-4"
            aria-label="Mobile navigation"
          >
            {navLinks.map((link) => (
              <NavLinkItem
                key={link.name}
                link={link}
                isActive={isActiveLink(link.href)}
                onMobileClick={closeMobileMenu}
                isMobile
              />
            ))}

            {!isLoggedIn && (
              <Link
                href="/signin"
                onClick={closeMobileMenu}
                className="flex items-center gap-3 py-2 text-gray-700 hover:text-green-500 transition-colors"
              >
                <LogIn className="h-5 w-5" />
                <span className="font-medium">Log in</span>
              </Link>
            )}
          </nav>
        </SheetContent>
      </Sheet>

      {/* Notification Modal */}
      <NotificationModal
        isOpen={isNotificationOpen}
        onClose={() => setIsNotificationOpen(false)}
        notifications={MOCK_NOTIFICATIONS}
      />

      {/* Logout Confirmation Modal */}
      <LogoutModal
        isOpen={isLogoutModalOpen}
        onConfirm={confirmLogout}
        onCancel={cancelLogout}
      />
    </nav>
  );
}
