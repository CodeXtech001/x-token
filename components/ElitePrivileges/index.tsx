import { elitePrivileges } from "@/lib/contents"
import SectionHeader from "../SectionHeader"
import { GlowingEffectDemo } from "./elite_components/GlowingEffectDemo"
function index() {
  return (
    <div className='mt-24 md:mt-32 w-full mx-auto'>
        <SectionHeader {...elitePrivileges}/>
        <GlowingEffectDemo {...elitePrivileges}/>
    </div>
  )
}

export default index