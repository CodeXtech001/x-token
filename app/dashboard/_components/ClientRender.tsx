"use client"

import { BackgroundGradientDemo } from "./BackgroundGradientDemo";
import  ElonComment  from "./ElonComment"
import  TokenSales  from "./TokenSales"
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

    function ClientRender() {
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
          <div className="p-4 max-w-6xl w-full mx-auto space-y-8 md:space-y-10 mt-8">
            <motion.section
            ref={ref}
            initial="hidden"
            animate={controls}
            variants={{
              hidden: { opacity: 0, y: -50 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
            }}>
              <h1 className="bg-clip-text text-transparent text-5xl text-center font-bold
                         bg-gradient-to-r from-white via-blue-400 to-white
                         bg-[length:200%_200%] animate-gradient-move mb-16 md:mb-20">Dashboard Overview</h1>
              </motion.section>
              <motion.section
            ref={ref}
            initial="hidden"
            animate={controls}
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
            }}>
              <div className="w-full"><BackgroundGradientDemo/></div>
              <ElonComment/>
              </motion.section>
              <TokenSales/>
          </div>
        )
    }
    
    export default ClientRender