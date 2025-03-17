"use client"

import HeroSection from "@/components/HeroSection"
import { ShootingStars } from "@/components/ui/shooting-stars";
import { StarsBackground } from "@/components/ui/stars-background";
import FloatingImage from "@/components/HeroSection/hero_section_components/GridBackgroundDemo/GridBackground_components/FloatingImage";
import HeroText from "@/components/HeroText";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { setActiveSection } from "@/app/features/scroll/scrollSlice";
import { useEffect } from "react";
import { cn } from "@/lib/utils";

function index() {
    const dispatch = useDispatch();
    const activeSection = useSelector((state: RootState) => state.scroll.activeSection); 

    useEffect(() => {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              dispatch(setActiveSection("Home"));
            }
          },
          { threshold: 0.5 }
        );
    
        const element = document.getElementById("Home");
        if (element) observer.observe(element);
    
        return () => {
          if (element) observer.unobserve(element);
        };
      }, [dispatch]);
  return (
    <div id="Home" className={cn("h-[calc(100vh-180px)] md:h-[calc(100vh-50px)]",{"": activeSection === "Home"})}>
     <FloatingImage/>
    <ShootingStars/>
    <StarsBackground/>
    <HeroSection/>
    <HeroText/>     
    </div>
  )
}

export default index