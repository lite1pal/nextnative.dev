"use client";

import { usePathname } from "next/navigation";
import Container from "@/components/Container";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackgroundSVG from "@/components/BackgroundSVG";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isBlogPostPage = pathname.startsWith("/blog/");
  const mainClass = `flex relative flex-col ${isBlogPostPage ? "" : "overflow-hidden"}`;

  return (
    <main className={mainClass}>
      <BackgroundSVG />
      <Container>
        <Navbar />
        {children}
        <Footer />
      </Container>
    </main>
  );
}
