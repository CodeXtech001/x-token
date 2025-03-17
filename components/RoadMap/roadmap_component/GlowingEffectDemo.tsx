
"use client";

import { GlowingEffect } from "@/components/ui/glowing-effect";
import { RoadmapItem, RoadmapItems } from "@/lib/typescript";
import { ChevronRight } from "lucide-react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

export function GlowingEffectDemo({roadmap2025}: RoadmapItems) {
  return (
    <ul className="w-full mx-auto grid grid-cols-1  md:grid-cols-3 lg:grid-cols-4 gap-8 px-4 mt-12 md:mt-16">
     {roadmap2025?.map((roadmap, index) => (
        <GridItem
        key={index}
        quarter ={roadmap.quarter}
        title ={roadmap.title}
        details ={roadmap.details}
        />
      ))}
    </ul>
  );
}

const GridItem = ({quarter, title, details}:RoadmapItem ) => {

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
    <li className={`min-h-[14rem] list-none`}>
      <div className="relative h-full rounded-2xl border p-2  md:rounded-3xl md:p-3 group">
        <GlowingEffect
          spread={40}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
        />
        <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl border-0.75 p-6 shadow-[0px_0px_27px_0px_#2D2D2D]">
          <div className="relative flex flex-1 flex-col justify-between gap-3">
          <div className="text-blue-400 font-bold mb-4 group-hover:text-blue-300 transition-colors duration-300">{quarter}</div>
          <h3 className="text-xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">{title}</h3>
          <ul className="space-y-4">
            {details.map((text, index) =>
            <div className="relative overflow-hidden w-full" key={index}>
            <motion.section
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, translateX: 50 * index },
        visible: { opacity: 1, translateX: 0, transition: { duration: 0.8, ease: "easeOut" } },
      }} className="flex items-start">
            <ChevronRight className="w-5 h-5 text-blue-400 mt-[2px] flex-shrink-0 group-hover/item:text-blue-300 group-hover/item:translate-x-1 transition-all duration-300" />
             <span className="text-gray-300 group-hover/item:text-gray-200 transition-colors duration-300">{text}</span>
            </motion.section>
            </div>)}
          </ul>
          </div>
        </div>
      </div>
    </li>
  );
};
