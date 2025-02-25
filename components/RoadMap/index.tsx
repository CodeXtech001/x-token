"use client"

import { RoadMap } from '@/lib/contents'
import SectionHeader from "../SectionHeader"
import { GlowingEffectDemo } from './roadmap_component/GlowingEffectDemo'
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { setActiveSection } from "@/app/features/counter/scrollSlice";
import { useEffect } from "react";
import { cn } from "@/lib/utils";
function index() {
  
  const dispatch = useDispatch();
  const activeSection = useSelector((state: RootState) => state.scroll.activeSection); 

  useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            dispatch(setActiveSection("Roadmap"));
          }
        },
        { threshold: 0.5 }
      );
  
      const element = document.getElementById("Roadmap");
      if (element) observer.observe(element);
  
      return () => {
        if (element) observer.unobserve(element);
      };
    }, [dispatch]);

  return (
    <div className='mt-24 md:mt-32 max-w-[1800px] w-full mx-auto'>
     <div id='Roadmap' className={cn("",{"": activeSection === "Roadmap"})}/> 
    <SectionHeader {...RoadMap}/>
       <GlowingEffectDemo {...RoadMap}/>
    </div>
  )
}

export default index