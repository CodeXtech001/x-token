"use client"

import { useDispatch } from "react-redux";
import { setActiveSection } from "@/app/features/counter/scrollSlice";

function index() {
  
  const dispatch = useDispatch();

  // Function to scroll to a section
  const handleScroll = (sectionId: string) => {
    dispatch(setActiveSection(sectionId));
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative mt-24 md:mt-32 px-6 ">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent"/>
        <div className="max-w-7xl mx-auto relative ">
        <div className="flex flex-col md:flex-row gap-12 ">
        <div className="flex flex-col mt-6 space-y-3">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">𝕏 Token</h3>
            <p className="text-gray-400/90 relative group-hover:text-gray-300/90 transition-colors duration-300">
            Building the future of digital transactions</p>
        </div>
        <div className="flex flex-col space-y-3 mt-6">
            <h4 className="font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Quick Links
            </h4>
            <ul className="flex flex-col justify-start space-y-2">
                <div onClick={() => handleScroll("Home")} className="text-gray-400/90 hover:text-blue-400 transition-all duration-300 relative group cursor-pointer">Home</div>
                <div onClick={() => handleScroll("Features")} className="text-gray-400/90 hover:text-blue-400 transition-all duration-300 relative group cursor-pointer">Features</div>
                <div onClick={() => handleScroll("Tokenomics")} className="text-gray-400/90 hover:text-blue-400 transition-all duration-300 relative group cursor-pointer">Tokenomics</div>
                <div onClick={() => handleScroll("Roadmap")} className="text-gray-400/90 hover:text-blue-400 transition-all duration-300 relative group cursor-pointer">Roadmap</div>
                <div onClick={() => handleScroll("Rewards")} className="text-gray-400/90 hover:text-blue-400 transition-all duration-300 relative group cursor-pointer">Rewards</div>
                <div onClick={() => handleScroll("FAQ")} className="text-gray-400/90 hover:text-blue-400 transition-all duration-300 relative group cursor-pointer">FAQ</div>
            </ul>
        </div>
        </div>
        <div className="relative mt-12 md:mt-20">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-800 to-transparent" />
          <p className="w-full text-gray-400/90 group relative inline-block my-6 text-center">© 2025 X Token. All rights reserved.</p>
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-800 to-transparent" />
        </div>
        </div>
    </div>
  )
}

export default index