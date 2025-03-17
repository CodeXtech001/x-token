"use client"

import { Button, buttonVariants } from "@/components/ui/button"
import { ArrowUpRight, ChevronRight, LoaderCircle, Plus, Wallet } from "lucide-react"
import Link from "next/link"
import { GlowingEffectDemo } from "./_components/GlowingEffectDemo"
import { TransactionEffectDemo } from "./_components/TransactionEffectDemo"
import { useEffect, useState } from "react"
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { GlowingEffect } from "@/components/ui/glowing-effect"
import { UserDocument } from "@/lib/typescript"
import { getCookie } from "@/middleware"

function page() {

  const [userDucument, setUserDucument] = useState<UserDocument | null>(null);
  const [loading, setLoading] = useState(true);
  const [user_gmail, setUserGmail] = useState<string | null>(null);

  const controls = useAnimation(); // Controls the animation
  const { ref, inView } = useInView({ triggerOnce: false, threshold: 0.2 }); // Detects visibility
  
    useEffect(() => {
      if (inView) {
        controls.start("visible");
      } else {
        controls.start("hidden");
      }
    }, [controls, inView])

      
    useEffect(() => {
      setUserGmail(getCookie("user_gmail")); // Read cookies safely after hydration
    }, []);
    
    useEffect(() => {

        if (!user_gmail) return;
      
        const fetchUser = async () => {
          try {
             // Wait for 4 seconds
            const response = await fetch(`${process.env.NEXT_PUBLIC_DJANGO_API_URL}/userdocuments/${user_gmail}`);
            if (!response.ok) throw new Error("Failed to fetch Documents");
      
            const data = await response.json();
            setUserDucument(data);
          } catch (err) {
            console.error("Error receiving Documents:", err);
          }
        };
      
        fetchUser();
      }, [user_gmail]);

      const clickGenerate = async () => {
        await new Promise(resolve => setTimeout(resolve, 4000)); // Wait for 2 seconds
        if(!userDucument) return
        setLoading(false);
      } 
    
    return (
      <div className="max-w-7xl mx-auto px-4 py-6">
         <div className="space-y-10">
         <motion.section
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: -50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
      }} className="flex flex-col md:flex-row md:items-center md:justify-between space-y-6 md:space-y-0">
            <h1 className="text-3xl font-extrabold text-transparent bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text">
            My X Token
            </h1>
            <div className="flex flex-col md:flex-row items-center gap-4">
            <Link href="/buytoken" className={`${buttonVariants()}inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary hover:bg-primary/90 h-9 bg-gradient-to-r from-green-500 to-teal-600 text-white px-6 py-4 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-500 ease-in-out`}>
            <Plus className="w-5 h-5 text-white" /><span className="text-white">Buy More Token</span></Link>
            
            <Dialog >
        <DialogTrigger asChild>
        <Button onClick={()=>clickGenerate()} className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary hover:bg-primary/90 h-9 bg-gradient-to-r from-yellow-500 to-orange-600 text-white px-6 py-4 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-500 ease-in-out">
            <ArrowUpRight className="w-5 h-5 mr-2" />Withdraw Token
         </Button>
        </DialogTrigger>
      <DialogContent className="sm:max-w-[450px] p-0 border-0 bg-black rounded-2xl" >
      
     <div className={`h-full w-full list-none px-4`}>
      <div className="relative h-full w-full rounded-2xl border p-1 md:p-3">
        <GlowingEffect
          spread={40}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
        />
        <div className="relative flex h-full flex-col justify-between overflow-hidden space-y-6 rounded-xl p-6 border-0.75 dark:shadow-[0px_0px_27px_0px_#2D2D2D]">
        <DialogTitle></DialogTitle>
        {Number(userDucument?.user_balance_token) === 0 &&
         <div className=" text-center ">
         <h2 className="tracking-tight text-lg font-bold text-white">
         Empty Balance
         </h2>
        </div>
        }
         <div className="flex flex-col items-center text-center space-y-4 ">
            <div className="p-4 rounded-full bg-blue-500/20">
            <Wallet className="w-8 h-8 text-blue-400"/>
            </div>
            {loading ? 
             <div className="flex flex-col justify-center items-center ">
            <LoaderCircle className="w-8 h-8 animate-spin text-blue-400" />
            <p className="text-gray-300">Checking withdrawal availability...</p>
            </div>: Number(userDucument?.user_balance_token) == 0 ?
            <>
            <p className="text-gray-300">
            Your balance is empty. Purchase some tokens first to make a withdrawal.
            </p>
            <div className="bg-black/20 rounded-lg p-4 w-full mt-4">
            <p className="text-sm text-gray-400">
            Head over to the token purchase page to get started!
            </p>
            <Link href="/buytoken" className={`${buttonVariants()} w-full text-center text-white font-light bg-gradient-to-r z-20 from-blue-500 via-purple-500  to-blue-500 bg-[length:200%_200%] animate-gradient-move border border-blue-300/60 hover:border-blue-300 group/button mt-4`}><span className="text-white font-light">Buy Tokens</span></Link>
           </div>
           </>:
           <p className="text-gray-300">
           You can only withdraw when we get to the fourth stage, so stay tuned.
           </p>
            } 
         </div>
      </div>

   </div>
   </div>
  </DialogContent>
           </Dialog>
            </div>
            </motion.section>
            <motion.section
            ref={ref}
            initial="hidden"
            animate={controls}
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
            }}>
            <GlowingEffectDemo/>
            </motion.section>
            <TransactionEffectDemo/>
         </div>
      </div>     
    )
  }
  
  export default page