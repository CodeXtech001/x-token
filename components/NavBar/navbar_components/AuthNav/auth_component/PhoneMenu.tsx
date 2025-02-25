"use client"

import { useDispatch } from "react-redux";
import { setActiveSection } from "@/app/features/counter/scrollSlice";
import { MenuIcon } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  

function PhoneMenu() {
  
  const dispatch = useDispatch();

  // Function to scroll to a section
  const handleScroll = (sectionId: string) => {
    dispatch(setActiveSection(sectionId));
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    // @ts-ignore
    
    <DropdownMenu >
  <DropdownMenuTrigger asChild><MenuIcon className="w-8 h-8 ml-auto lg:hidden text-blue-200 m-1 "/></DropdownMenuTrigger>
  <DropdownMenuContent>
  { true ? <>
    <DropdownMenuItem><p className="nav_click" onClick={() => handleScroll("Home")}>Home</p></DropdownMenuItem>
    <DropdownMenuItem><p className="nav_click" onClick={() => handleScroll("Features")}>Features</p></DropdownMenuItem>
    <DropdownMenuItem><p className="nav_click" onClick={() => handleScroll("Tokenomics")}>Tokenomics</p></DropdownMenuItem>
    <DropdownMenuItem><p className="nav_click" onClick={() => handleScroll("Roadmap")}>Roadmap</p></DropdownMenuItem>
    <DropdownMenuItem><p className="nav_click" onClick={() => handleScroll("Rewards")}>Rewards</p></DropdownMenuItem>
    <DropdownMenuItem><p className="nav_click" onClick={() => handleScroll("FAQ")}>FAQ</p></DropdownMenuItem>
    </>:
<>
    <DropdownMenuItem><p className="nav_click"></p></DropdownMenuItem>
    <DropdownMenuItem><p className="nav_click"></p></DropdownMenuItem>
    <DropdownMenuItem><p className="nav_click"></p></DropdownMenuItem>
    <DropdownMenuItem><p className="nav_click"></p></DropdownMenuItem>
    <DropdownMenuItem><p className="nav_click"></p></DropdownMenuItem>
    <DropdownMenuItem><p className="nav_click"></p></DropdownMenuItem>
</>
}
  </DropdownMenuContent>

</DropdownMenu>
  )
}

export default PhoneMenu