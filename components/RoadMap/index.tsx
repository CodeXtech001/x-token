"use client"

import { RoadMap } from '@/lib/contents'
import SectionHeader from "../SectionHeader"
import { GlowingEffectDemo } from './roadmap_component/GlowingEffectDemo'
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { setActiveSection } from "@/app/features/scroll/scrollSlice";
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
    <motion.section
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
      }} className='mt-24 md:mt-32 max-w-[1800px] w-full mx-auto'>
     <div id='Roadmap' className={cn("",{"": activeSection === "Roadmap"})}/> 
    <SectionHeader {...RoadMap}/>
       <GlowingEffectDemo {...RoadMap}/>
      </motion.section>
  )
}

export default index