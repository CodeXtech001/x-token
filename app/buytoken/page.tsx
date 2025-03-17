"use client"

import { ArrowRight } from "lucide-react"
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import Link from "next/link";
import PaymentMethod from "./_components/PaymentMethod";

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
    <div className="mt-8 p-4 max-w-6xl mx-auto space-y-12 md:space-y-16">
    <motion.section
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: -50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
      }} className="text-center space-y-4 md:space-y-8">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-white via-white to-blue-400 bg-clip-text text-transparent">Buy X Tokens</h1>
        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">Join the future of finance. Select your preferred currency and calculate your potential rewards.
            <br />
            <Link href= "/how-to-buy" className="relative inline-flex items-center text-blue-500 hover:text-blue-400 text-sm transition-all duration-200 z-20 group"><span>New to crypto? Learn how to get started</span><ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" /></Link>
        </p>
        </motion.section>
        <motion.section
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
      }}>
       <PaymentMethod/>
      </motion.section>
      <div className="text-center text-gray-500 text-sm">Need help? Contact our support team 24/7</div>
    </div>
  )
}

export default page