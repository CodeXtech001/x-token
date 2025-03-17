"use client"

import { RootState } from "@/app/store";
import { ProgressDemo } from "@/components/HeroText/herotext_components/ProgressBar";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import {buttonVariants } from "@/components/ui/button";
import { tiers } from "@/lib/contents";
import { UserDocument } from "@/lib/typescript";
import { Award, ChevronRight, DollarSign, Wallet } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ProgressDemo2 } from "./ProgressDemo2";
import { getCookie } from "@/middleware";
import { cn } from "@/lib/utils";


export function BackgroundGradientDemo() {

    const [userDucument, setUserDucument] = useState<UserDocument | null>(null);
    const [clientBalance, setClientBalance] = useState<number>(0);
    const [loading, setLoading] = useState(true);

    const [user_gmail, setUserGmail] = useState<string | null>(null);

    useEffect(() => {
      setUserGmail(getCookie("user_gmail")); // Read cookies safely after hydration
    }, []);
    
    useEffect(() => {

        if (!user_gmail) return;
      
        const fetchUser = async () => {
          try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_DJANGO_API_URL}/userdocuments/${user_gmail}`);
            if (!response.ok) throw new Error("Failed to fetch Documents");
      
            const data = await response.json();
            setUserDucument(data);
            setClientBalance(data.user_balance_token);
          } catch (err) {
            console.error("Error receiving Documents:", err);
          } finally {
            setLoading(false);
          }
        };
      
        fetchUser();
      }, [user_gmail]);
      

      const getProgressResult = ({
        from,
        to
      }: {
        from: number;
        to: number | null;
      }) => {
        if (!clientBalance || !to) return "0%"; // Prevent SSR issues
      
        const totalRequired = to - from;
        const progress = ((clientBalance - from) / totalRequired) * 100;
        
        return `${Math.max(0, Math.min(100, Math.round(progress)))}%`; // Ensure the value is between 0% and 100%
      };
      
        

    const userTier = tiers.find(tier => tier.name === userDucument?.user_status);

    const progressFrom = userTier?.tokens.from ?? 0;
    const progressTo = userTier?.tokens.to ?? 0;
    const nextTierName = userTier?.progress ?? "";
    
    const tokenToDollar = () => {
      if (!userDucument?.total_tokens) return null;
      const value = userDucument.total_tokens * 5.44;
      return Number(value.toFixed(2)); // Convert back to number to remove trailing zeros
    }

  return (
    <div className=" w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6 mt-6 md:mt-9">
      <BackgroundGradient className="rounded-xl p-6 bg-black w-full h-full space-y-6 ">
     <div className="flex items-center justify-between">
       <p className="text-lg font-semibold text-white ">Balance</p>
       <div className="bg-[#0A132D] rounded-full p-2">
       <Wallet className="text-[#3F6DAD] " />
       </div>
    </div> 
    <h3 className="text-5xl font-bold text-blue-400">{userDucument?.user_balance_token} 𝕏</h3>
    <p className="text-gray-400 text-sm">Your current X token balance</p>
    <Link href="/how-to-buy" className={`${buttonVariants()} text-white font-light px-8 text-transparent bg-gradient-to-r from-blue-500 via-purple-500  to-blue-500 bg-[length:200%_200%] animate-gradient-move border border-blue-300/60 hover:border-blue-300 group/button`}><span className="text-white">How to Buy?</span><ChevronRight className="w-6 h-6 group-hover/button:translate-x-4 transition-all duration-300 ease-in-out text-white"/></Link>
      </BackgroundGradient>
      <BackgroundGradient className="rounded-xl p-6 bg-black w-full h-full space-y-6">
     <div className="flex items-center justify-between">
       <div>
       <p className="text-lg font-semibold text-white ">USD Equivalent</p>
       <p className="text-gray-400 text-sm mt-2">Current value of your tokens</p>
       </div>
       <div className="bg-[#071B10] rounded-full p-2">
       <DollarSign className="text-[#49DD80] " />
       </div>
    </div> 
    <h3 className="text-5xl font-bold text-green-400 flex items-center"><DollarSign className="w-9 h-9 " /><span>{tokenToDollar()}</span></h3>
    <p className="text-gray-400 text-sm">1 𝕏 = $5.44</p>
    <p className="text-gray-400 text-sm">Stage 3 Price</p>
      </BackgroundGradient>
      <BackgroundGradient className="rounded-xl p-6 bg-black w-full h-full space-y-6 ">
     <div className="flex items-center justify-between">
       <div>
       <p className="text-lg font-semibold text-white ">Status</p>
       <p className="text-gray-400 text-sm mt-2">Based on your contribution</p>
       </div>
       <div className="bg-[#210B35] rounded-full p-2">
       <Award className="text-[#BA80F6]" />
       </div>
    </div> 
    <div className="flex items-center justify-between">
    <h3 className="text-4xl font-bold text-blue-400">{userDucument?.user_status}</h3>
    <p className="text-gray-400 text-sm mt-2">Progress to <span className="text-purple-400">{nextTierName}</span></p>
    </div>
    <div className="h-2 bg-white/10 rounded-full overflow-hidden backdrop-blur-xl border border-white/5">
  <div className="relative h-full flex">
    <div 
      className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 transition-all duration-500 ease-in-out"
      style={{ width: getProgressResult({ from: progressFrom, to: progressTo }) }} // ✅ Use inline styles
    />
  </div>
</div>                               
    <Link href="/buytoken" className={`${buttonVariants()} w-full text-center text-white font-light bg-gradient-to-r z-20 from-blue-500 via-purple-500  to-blue-500 bg-[length:200%_200%] animate-gradient-move border border-blue-300/60 hover:border-blue-300 group/button`}><span className="text-white font-light">Buy X Tokens Now</span><ChevronRight className="w-6 h-6 group-hover/button:translate-x-4 transition-all duration-300 ease-in-out text-white font-light"/></Link>
      </BackgroundGradient>
    </div>
  );
}
