import { Navbar } from "@/components/shared/Navbar";
import { ConditionalFooter } from "@/components/shared/ConditionalFooter";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <ConditionalFooter />
    </>
  );
}
