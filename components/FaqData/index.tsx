"use client"

import SectionHeader from "../SectionHeader"
import { faqData } from '@/lib/contents'
import { GlowingEffectDemo } from "./faq_components/GlowingEffectDemo"
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
            dispatch(setActiveSection("FAQ"));
          }
        },
        { threshold: 0.5 }
      );
  
      const element = document.getElementById("FAQ");
      if (element) observer.observe(element);
  
      return () => {
        if (element) observer.unobserve(element);
      };
    }, [dispatch]);

  return (
    <div className='mt-24 md:mt-32 max-w-3xl w-full mx-auto'>
      <div id='FAQ' className={cn("",{"": activeSection === "FAQ"})}/>
        <SectionHeader {...faqData}/>
        <GlowingEffectDemo {...faqData}/>
    </div>
  )
}

export default index