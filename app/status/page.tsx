"use client"

import { TriangleAlert } from "lucide-react"
import StatusCard from "./_components/StatusCard"
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

function page() {

  const controls = useAnimation(); // Controls the animation
  const { ref, inView } = useInView({ triggerOnce: false, threshold: 0.2 }); // Detects visibility

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, inView])

  return (
    <div className="mt-8 px-4 max-w-5xl mx-auto">
    <motion.section
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: -50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
      }} className="text-center space-y-4 md:space-y-8">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-white via-white to-blue-400 bg-clip-text text-transparent">Status Tiers</h1>
        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">Explore our exclusive membership tiers and unlock premium benefits as you increase your token holdings.</p>
        </motion.section>
        <motion.section
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
      }}>
        <StatusCard/>
      </motion.section>
    <div className="flex items-start gap-4 pt-10 pb-16 ">
        <div className="p-2 rounded-lg bg-yellow-500/10">
        <TriangleAlert className="w-6 h-6 text-yellow-400" />
        </div>
        <div>
            <h3 className="text-lg font-semibold text-white">
            Important Note
            </h3>
            <p className="mt-1 text-sm text-gray-300">Token holding requirements must be maintained to keep tier status and benefits. Benefits are subject to terms and conditions.</p>
        </div>
    </div>
    </div>
  )
}

export default page