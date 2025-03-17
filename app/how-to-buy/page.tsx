"use client" 

import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import HowToBuyCard from "./_components/HowToBuyCard";
import SecondBuyCard from "./_components/SecondBuyCard";
import CryptoExchanges from "./_components/CryptoExchanges";
import PurchaseGuide from "./_components/PurchaseGuide";
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
    <div className="my-10 px-4 max-w-6xl mx-auto space-y-8">
    <motion.section
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: -50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
      }} className="text-center space-y-6 md:space-y-8">
        <h1 className="text-4xl font-extrabold text-transparent bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text">How to Buy X Tokens</h1>
        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">Follow these simple steps to purchase X Tokens and join our growing community. New to crypto? Check out our guide for beginners below.</p>
        </motion.section>
        <motion.section
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
      }}>
        <HowToBuyCard/>
        </motion.section>
        <CryptoExchanges/>
      <SecondBuyCard/>
      <PurchaseGuide/>
    </div>
  )
}

export default page