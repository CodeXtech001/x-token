"use client"
import { industryLeaders } from "@/lib/contents"
import SectionHeader from "../SectionHeader"
import { CompanyCard } from "./Industry_components/CompanyCard"
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

function index() {

  const controls = useAnimation(); // Controls the animation
  const { ref, inView } = useInView({ triggerOnce: false, threshold: 0.2 }); // Detects visibility

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, inView]);
  
  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
      }} className='mt-32 md:mt-40 max-w-[1500px] w-full mx-auto'> 
        <SectionHeader {...industryLeaders}/>
        <CompanyCard {...industryLeaders}/>
    </motion.section>
  )
}

export default index