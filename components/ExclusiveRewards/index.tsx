"use client"

import SectionHeader from "../SectionHeader"
import { exclusiveRewards } from '@/lib/contents'
import { GlowingEffectDemo } from "./exclusive_components/GlowingEffectDemo"
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
            dispatch(setActiveSection("Rewards"));
          }
        },
        { threshold: 0.5 }
      );
  
      const element = document.getElementById("Rewards");
      if (element) observer.observe(element);
  
      return () => {
        if (element) observer.unobserve(element);
      };
    }, [dispatch]);

  return (
    <div className='mt-24 md:mt-32 max-w-[1500px] w-full mx-auto'>
      <div id='Rewards' className={cn("",{"": activeSection === "Rewards"})}/>
        <SectionHeader {...exclusiveRewards}/>
        <GlowingEffectDemo {...exclusiveRewards}/>
    </div>
  )
}

export default index