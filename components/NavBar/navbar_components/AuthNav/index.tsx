import { Button } from "@/components/ui/button"
import PhoneMenu from "./auth_component/PhoneMenu"

function AuthNav() {
  return (
    <>
    <ul className="hidden lg:flex items-center space-x-8 ml-auto">
      { true?
        <>
        <li className="nav_click">Home</li>
        <li className="nav_click">Features</li>
        <li className="nav_click">Tokenomics</li>
        <li className="nav_click">Roadmap</li>
        <li className="nav_click">Rewards</li>
        <li className="nav_click">FAQ</li>
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