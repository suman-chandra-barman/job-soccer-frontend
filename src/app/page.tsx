import FindYourNextJob from "@/components/home/FindYourNextJob";
import { HeroSection } from "@/components/home/HeroSection";
import { JobSearch } from "@/components/home/JobSearch";

export default function HomePage() {
  return (
    <div>
      <HeroSection />
      <JobSearch />
      <FindYourNextJob />
    </div>
  );
}
