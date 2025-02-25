"use client"

import SectionHeader from "../SectionHeader"
import { faqData } from '@/lib/contents'
import { GlowingEffectDemo } from "./faq_components/GlowingEffectDemo"
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { setActiveSection } from "@/app/features/counter/scrollSlice";
import { useEffect } from "react";
import { cn } from "@/lib/utils";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
function index() {
      
  const dispatch = useDispatch();
  const activeSection = useSelector((state: RootState) => state.scroll.activeSection); 

  const controls = useAnimation(); // Controls the animation
  const { ref, inView } = useInView({ triggerOnce: false, threshold: 0.2 }); // Detects visibility

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, inView]);
  
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
    <motion.section
    ref={ref}
    initial="hidden"
    animate={controls}
    variants={{
      hidden: { opacity: 0, y: 50 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
    }} className='mt-24 md:mt-32 max-w-3xl w-full mx-auto'>
      <div id='FAQ' className={cn("",{"": activeSection === "FAQ"})}/>
        <SectionHeader {...faqData}/>
        <GlowingEffectDemo {...faqData}/>
      </motion.section>
  )
}

export default index