"use client"

import { Card, CardContent } from "@/components/ui/card"
import EvervaultCards from "./_components/EvervaultCards"
import { GlowingEffectDemo } from "./_components/GlowingEffectDemo"
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
  }, [controls, inView]);
 
  return (
    <div className="p-4 max-w-5xl mx-auto space-y-8 md:space-y-10 mt-8">
      <motion.section
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: -50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
      }}>
        <h1 className="text-4xl font-bold text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text">My Profile</h1>
        </motion.section>
        <motion.section
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
      }}>
        <Card>
        <CardContent className="py-6 space-y-4">
           <p className="tracking-tight text-2xl font-semibold text-white">
            Wallet Balance
            </p>
            <div className="relative flex flex-col md:flex-row gap-8">
            <EvervaultCards/>
            </div>
        </CardContent>
        </Card>
        <GlowingEffectDemo/>
        </motion.section>
    </div>
  )
}

export default page