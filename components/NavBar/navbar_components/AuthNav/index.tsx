"use client"

import { useDispatch } from "react-redux";
import { setActiveSection } from "@/app/features/counter/scrollSlice";
import { Button } from "@/components/ui/button"
import PhoneMenu from "./auth_component/PhoneMenu"

function AuthNav() {

  const dispatch = useDispatch();

  // Function to scroll to a section
  const handleScroll = (sectionId: string) => {
    dispatch(setActiveSection(sectionId));
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
    <ul className="hidden lg:flex items-center space-x-8 ml-auto">
      {true?
        <>
        <li className="nav_click" onClick={() => handleScroll("Home")}>Home</li>
        <li className="nav_click" onClick={() => handleScroll("Features")}>Features</li>
        <li className="nav_click" onClick={() => handleScroll("Tokenomics")}>Tokenomics</li>
        <li className="nav_click" onClick={() => handleScroll("Roadmap")}>Roadmap</li>
        <li className="nav_click" onClick={() => handleScroll("Rewards")}>Rewards</li>
        <li className="nav_click" onClick={() => handleScroll("FAQ")}>FAQ</li>
        <Button className="bg-transparent border border-slate-200 hover:bg-blue-400/25 text-[rgb(209,213,219,.9)]">Login</Button>
        <Button className="bg-transparent border border-slate-200 hover:bg-blue-400/25 text-[rgb(209,213,219,.9)]">Register</Button>
        </> :
        <>
        <li className="nav_click"></li>
        <li className="nav_click"></li>
        <li className="nav_click"></li>
        <li className="nav_click"></li>
        <li className="nav_click"></li>
        </>
      }
    </ul>
    {true?
    <Button className="bg-transparent border border-slate-200 mt-1 ml-auto lg:hidden hover:bg-blue-400/25 text-[rgb(209,213,219,.9)]">Participate</Button>:
    <PhoneMenu/>
    }
    
    </>
  )
}

export default AuthNav