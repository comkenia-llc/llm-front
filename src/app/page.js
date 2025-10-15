import Image from "next/image";
import Hero from "./components/Hero";
import DisciplineGrid from "./components/sections/DisciplineGrid";
import ScholarshipsSection from "./components/sections/ScholarshipsSection";
import ScholarRecipientsSection from "./components/sections/ScholarshipRecipientSection";
import FeaturedProgrammesSection from "./components/sections/FeaturedProgrammeSection";
import FeaturedUniversitiesSection from "./components/sections/FeaturedUniversitySection";
import FeaturedArticlesSection from "./components/sections/FeaturedArticlesSection";
import LatestNewsSection from "./components/sections/LatestNewsSection";
import FeaturedLocationsSection from "./components/sections/FeaturedLocationsSection";

export default function Home() {
  return (
    <>
      <Hero />
      <DisciplineGrid />
      <FeaturedLocationsSection/>
      <FeaturedUniversitiesSection />
      <ScholarshipsSection />
      {/* <ScholarRecipientsSection /> */}
      <FeaturedProgrammesSection />
    
      <FeaturedArticlesSection />
      <LatestNewsSection/>
    </>
  );
}
