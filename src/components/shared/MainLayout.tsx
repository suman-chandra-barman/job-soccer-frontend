"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { useEffect } from "react";

export function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const noHeaderFooterRoutes = [
    "/signin",
    "/signup",
    "/email-verification",
    "/forgot-password",
    "/not-found",
  ];
  const showHeaderFooter = !noHeaderFooterRoutes.includes(pathname);

  // Debug: Log pathname to verify what's being matched
  useEffect(() => {
    console.log("Current pathname:", pathname);
  }, [pathname]);

  return (
    <>
      {showHeaderFooter && <Navbar />}
      <main>{children}</main>
      {showHeaderFooter && <Footer />}
    </>
  );
}
