import { MenuIcon } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  

function PhoneMenu() {
  return (
    // @ts-ignore
    
    <DropdownMenu >
  <DropdownMenuTrigger asChild><MenuIcon className="w-8 h-8 ml-auto lg:hidden text-blue-200 m-1 "/></DropdownMenuTrigger>
  <DropdownMenuContent>
  { true ? <>
    <DropdownMenuItem><p className="nav_click">Home</p></DropdownMenuItem>
    <DropdownMenuItem><p className="nav_click">Features</p></DropdownMenuItem>
    <DropdownMenuItem><p className="nav_click">Tokenomics</p></DropdownMenuItem>
    <DropdownMenuItem><p className="nav_click">Roadmap</p></DropdownMenuItem>
    <DropdownMenuItem><p className="nav_click">Rewards</p></DropdownMenuItem>
    <DropdownMenuItem><p className="nav_click">FAQ</p></DropdownMenuItem>
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