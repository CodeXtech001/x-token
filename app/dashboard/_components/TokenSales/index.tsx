"use client"

import { ProgressDemo } from "@/components/HeroText/herotext_components/ProgressBar"
import { buttonVariants } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronRight } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

function index() {

  const initialAmount = 5318158; // Default starting amount

  const [amount, setAmount] = useState(initialAmount); // Default amount first

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Get saved amount from localStorage after client-side render
      const savedAmount = localStorage.getItem("raisedAmount");
      if (savedAmount) {
        setAmount(parseInt(savedAmount, 10));
      }
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setAmount((prev) => {
        const newAmount = prev + 1; // Increment by 1
        localStorage.setItem("raisedAmount", newAmount.toString()); // Save to localStorage
        return newAmount;
      });
    }, 10000); // Every 10 seconds

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  return (
    <Card>
        <CardContent className="py-6 space-y-6">
            <h3 className="tracking-tight text-lg font-semibold text-white text-center">Token Sales Progress</h3>
            <div className='flex flex-row justify-between'>
                <p className="text-xs text-gray-400">Raised Amount: {amount.toLocaleString()} 𝕏</p>
                <p className="text-xs text-gray-400">Total Token: 6,475,000 𝕏</p>
            </div>
            <div>
            <ProgressDemo setprogress= {82} colorpicker= "from-blue-500 via-purple-500 to-blue-500"/>
            <p className="text-blue-400 text-sm mt-2">82.13% Complete</p>
            </div>
            <div className="w-full flex justify-center">
            <Link href="/buytoken" className={`${buttonVariants()} text-white font-light px-8 text-transparent bg-gradient-to-r from-blue-500 via-purple-500  to-blue-500 bg-[length:200%_200%] animate-gradient-move border border-blue-300/60 hover:border-blue-300 z-20 group/button`}><span className="text-white">Buy X Tokens Now</span><ChevronRight className="w-6 h-6 group-hover/button:translate-x-4 transition-all duration-300 ease-in-out text-white"/></Link>
            </div>
        </CardContent>
    </Card>
  )
}

export default index