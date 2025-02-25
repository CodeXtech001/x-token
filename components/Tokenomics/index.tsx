"use client"

import { tokenomics } from "@/lib/contents"
import SectionHeader from "../SectionHeader"
import { GlowingEffectDemo } from "./token_component/GlowingEffectDemo"
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
            dispatch(setActiveSection("Tokenomics"));
          }
        },
        { threshold: 0.5 }
      );
  
      const element = document.getElementById("Tokenomics");
      if (element) observer.observe(element);
  
      return () => {
        if (element) observer.unobserve(element);
      };
    }, [dispatch]);

  return (
    <div className='mt-32 md:mt-40 max-w-[1500px] w-full mx-auto'>
    <div id='Tokenomics' className={cn("",{"": activeSection === "Tokenomics"})}/>
    <SectionHeader {...tokenomics}/>
    <GlowingEffectDemo {...tokenomics}/>
    </div>
  )
}

export default index