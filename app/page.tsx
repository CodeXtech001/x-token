
import {TokenFetch} from "../lib/djangoQuery";
import HeroSection from "../components/HeroSection"
import { ShootingStars } from "@/components/ui/shooting-stars";
import { StarsBackground } from "@/components/ui/stars-background";
import FloatingImage from "@/components/HeroSection/hero_section_components/GridBackgroundDemo/GridBackground_components/FloatingImage";
import HeroText from "@/components/HeroText";
import ThreeIsActive from "@/components/ThreeIsActive";

export default async function Home() {
  
  return (
      <>
      <div className="hero_container">
        <FloatingImage/>
        <ShootingStars/>
        <StarsBackground />
        <HeroSection/>
        <HeroText/>
      </div>
      <div>
        <ThreeIsActive/>
      </div>
      
   </>
  );
}
