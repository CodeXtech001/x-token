"use client"

import { useDispatch } from "react-redux";
import { setActiveSection } from "@/app/features/scroll/scrollSlice";
import { Button, buttonVariants } from "@/components/ui/button"
import PhoneMenu from "./auth_component/PhoneMenu"
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation"
import Link from "next/link";
import { Coins, HandCoins, LayoutDashboard, LogOut, TrendingUp, UserPen, Wallet } from "lucide-react";
import { cn } from "@/lib/utils";
import { getCookie } from "@/middleware";
import { useEffect, useState } from "react";
import Chatbot from "@/components/Chatbot";

function AuthNav() {

  const [userGmail, setUserGmail] = useState<string | null>(null);
  const router = useRouter()
  const dispatch = useDispatch();

  // Function to get the user email from the cookie
  useEffect(() => {
    const interval = setInterval(() => {
      setUserGmail(getCookie("user_gmail")); // Re-fetch every few seconds
    }, 1000); // Runs every 1 second (adjust as needed)
  
    return () => clearInterval(interval); // Cleanup on unmount
  }, []); 

  // 🔹 Logout function with state update
  const logoutUser = () => {
    document.cookie = "user_gmail=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    setUserGmail(null); // Update state to trigger re-render
    router.push("/"); // Redirect user after logout
  };



  // Function to scroll to a section
  const handleScroll = (sectionId: string) => {
    dispatch(setActiveSection(sectionId));
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
  };

   const pathname = usePathname()
    const listPath = ["/sign-in", "/sign-up"]
    const PathNav = "/privacy"

    if (listPath.some(path => pathname.includes(path))) return null;


  return (
    <>
    <ul className="hidden lg:flex items-center space-x-8 ml-auto">
      {!userGmail ?
      pathname.includes(PathNav)? null:
        <>
        <li className="nav_click" onClick={() => handleScroll("Home")}>Home</li>
        <li className="nav_click" onClick={() => handleScroll("Features")}>Features</li>
        <li className="nav_click" onClick={() => handleScroll("Tokenomics")}>Tokenomics</li>
        <li className="nav_click" onClick={() => handleScroll("Roadmap")}>Roadmap</li>
        <li className="nav_click" onClick={() => handleScroll("Rewards")}>Rewards</li>
        <li className="nav_click" onClick={() => handleScroll("FAQ")}>FAQ</li>
        <Link href="/sign-in" className={`${buttonVariants({ variant: "outline" })} bg-transparent border border-slate-200 hover:bg-blue-500 hover:text-[rgb(209,213,219,.9)] text-[rgb(209,213,219,.9)]`}>Login</Link>
        <Link href="/sign-up" className={`${buttonVariants({ variant: "outline" })} bg-transparent border border-slate-200 hover:bg-blue-500 hover:text-[rgb(209,213,219,.9)] text-[rgb(209,213,219,.9)]`}>Register</Link>
        </> :
        <>
        <Link href="/dashboard" className={ cn("nav_click flex space-x-1",{"text-blue-400":pathname === "/dashboard"})}><LayoutDashboard className="w-4 h-4"/><span>Dashboard</span></Link>
        <Link href="/buytoken" className={cn("nav_click flex space-x-1",{"text-blue-400":pathname === "/buytoken"})}><Coins className="w-4 h-4"/><span>Buy Token</span></Link>
        <Link href="/Profile" className={cn("nav_click flex space-x-1",{"text-blue-400":pathname === "/Profile"})}><UserPen className="w-4 h-4"/><span>Profile</span></Link>
        <Link href="/mytoken" className={cn("nav_click flex space-x-1",{"text-blue-400":pathname === "/mytoken"})}><Wallet className="w-4 h-4"/><span> My X Token</span></Link>
        <Link href="/status" className={cn("nav_click flex space-x-1",{"text-blue-400": pathname === "/status"})}><TrendingUp className="w-4 h-4"/><span>Status</span></Link>
        <Link href="/how-to-buy" className={cn("nav_click flex space-x-1",{"text-blue-400": pathname === "/how-to-buy"})}><HandCoins className="w-4 h-4"/><span>How to Buy</span></Link>
        <p onClick={()=> logoutUser()} className="nav_click flex space-x-1"><LogOut className="w-4 h-4"/> <span>Log Out</span></p>
        </>
      }
    </ul>
    {!userGmail?
    <Button className="bg-transparent border border-slate-200 mt-1 ml-auto lg:hidden hover:bg-blue-500 text-[rgb(209,213,219,.9)]" onClick={()=> {router.push("/sign-in")}}>Participate</Button>:
    <PhoneMenu/>
    }
    {/* {userGmail && <Chatbot usergmail={userGmail} />} */}
    </>
  )
}

export default AuthNav