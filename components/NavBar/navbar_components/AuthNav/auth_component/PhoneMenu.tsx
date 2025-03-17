"use client"

import { useDispatch } from "react-redux";
import { setActiveSection } from "@/app/features/scroll/scrollSlice";
import { Coins, HandCoins, LayoutDashboard, LogOut, MenuIcon, TrendingUp, UserPen, Wallet } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  import { usePathname, useRouter } from "next/navigation"
import Link from "next/link";
import { cn } from "@/lib/utils";
import { getCookie } from "@/middleware";
import { useEffect, useState } from "react";
  

function PhoneMenu() {
  
  const [userGmail, setUserGmail] = useState<string | null>(null);
  const router = useRouter()

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

  const dispatch = useDispatch();
  const pathname = usePathname();
  const PathNav = "/privacy"

  // Function to scroll to a section
  const handleScroll = (sectionId: string) => {
    dispatch(setActiveSection(sectionId));
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    // @ts-ignore
    
    <DropdownMenu >
  <DropdownMenuTrigger asChild><MenuIcon className="w-8 h-8 ml-auto lg:hidden text-blue-200 m-1 "/></DropdownMenuTrigger>
  <DropdownMenuContent className="space-y-2">
  { !userGmail ? pathname.includes(PathNav)? null: <>
    <DropdownMenuItem><p className="nav_click" onClick={() => handleScroll("Home")}>Home</p></DropdownMenuItem>
    <DropdownMenuItem><p className="nav_click" onClick={() => handleScroll("Features")}>Features</p></DropdownMenuItem>
    <DropdownMenuItem><p className="nav_click" onClick={() => handleScroll("Tokenomics")}>Tokenomics</p></DropdownMenuItem>
    <DropdownMenuItem><p className="nav_click" onClick={() => handleScroll("Roadmap")}>Roadmap</p></DropdownMenuItem>
    <DropdownMenuItem><p className="nav_click" onClick={() => handleScroll("Rewards")}>Rewards</p></DropdownMenuItem>
    <DropdownMenuItem><p className="nav_click" onClick={() => handleScroll("FAQ")}>FAQ</p></DropdownMenuItem>
    </>:
<>
    <DropdownMenuItem><Link href="/dashboard" className={cn("nav_click flex space-x-1",{"text-blue-400":pathname === "/dashboard"})}><LayoutDashboard className="w-4 h-4" /><span>Dashboard</span></Link></DropdownMenuItem>
    <DropdownMenuItem><Link href="/buytoken" className={cn("nav_click flex space-x-1",{"text-blue-400":pathname === "/buytoken"})}><Coins className="w-4 h-4"/><span>Buy Token</span></Link></DropdownMenuItem>
    <DropdownMenuItem><Link href="/Profile" className={cn("nav_click flex space-x-1",{"text-blue-400":pathname === "/Profile"})}><UserPen className="w-4 h-4"/><span>Profile</span></Link></DropdownMenuItem>
    <DropdownMenuItem><Link href="/mytoken" className={cn("nav_click flex space-x-1",{"text-blue-400":pathname === "/mytoken"})}><Wallet className="w-4 h-4"/><span> My X Token</span></Link></DropdownMenuItem>
    <DropdownMenuItem><Link href="/status" className={cn("nav_click flex space-x-1",{"text-blue-400": pathname === "/status"})}><TrendingUp className="w-4 h-4"/><span>Status</span></Link></DropdownMenuItem>
    <DropdownMenuItem><Link href="/how-to-buy" className={cn("nav_click flex space-x-1",{"text-blue-400": pathname === "/how-to-buy"})}><HandCoins className="w-4 h-4"/><span>How to Buy</span></Link></DropdownMenuItem>
    <DropdownMenuItem><p onClick={()=> logoutUser()} className="nav_click flex space-x-1"><LogOut className="w-4 h-4"/> <span>Log Out</span></p></DropdownMenuItem>
</>
}
  </DropdownMenuContent>

</DropdownMenu>
  )
}

export default PhoneMenu