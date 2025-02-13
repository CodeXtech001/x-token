"use client"

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function FloatingImage() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: any) => {
      const { innerWidth, innerHeight } = window;
      const x = (event.clientX - innerWidth / 2) / 20;
      const y = (event.clientY - innerHeight / 2) / 20;
      setPosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="absolute w-full h-screen flex items-center justify-center overflow-hidden z-20 opacity-70 translate-y-2 md:-translate-y-9">
      <motion.img
        src="/assets/images/Flux_Schnell_A_bold_metallic_X_seamlessly_combined_with_a_futu_3-removebg-preview.png" // Replace with your PNG file
        alt="Floating Image"
        className="w-80 h-80 absolute pointer-events-none"
        animate={{ x: position.x, y: position.y }}
        transition={{ type: "spring", stiffness: 50, damping: 10 }}
      />
    </div>
  );
}
