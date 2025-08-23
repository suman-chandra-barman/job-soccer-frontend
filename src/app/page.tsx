import { Discover } from "@/components/home/Discover";
import { Features } from "@/components/home/Features";
import FindYourNextJob from "@/components/home/FindYourNextJob";
import { HeroSection } from "@/components/home/HeroSection";
import { JobCategories } from "@/components/home/JobCategories";
import { JobSearch } from "@/components/home/JobSearch";

export default function HomePage() {
  return (
    <div>
      <HeroSection />
      <JobSearch />
      <FindYourNextJob />
      <Discover />
      <JobCategories />
      <Features />
    </div>
  );
}
