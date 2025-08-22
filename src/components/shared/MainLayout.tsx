"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

export function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const noHeaderFooterRoutes = ["/signin", "/signup"];
  const showHeaderFooter = !noHeaderFooterRoutes.includes(pathname);

  return (
    <>
      {showHeaderFooter && <Navbar />}
      <main>{children}</main>
      {showHeaderFooter && <Footer />}
    </>
  );
}
