import { industryLeaders } from "@/lib/contents"
import SectionHeader from "../SectionHeader"
import { CompanyCard } from "./Industry_components/CompanyCard"

function index() {
  return (
    <div className='mt-32 md:mt-40 max-w-[1500px] w-full mx-auto'>
        <SectionHeader {...industryLeaders}/>
        <CompanyCard {...industryLeaders}/>
    </div>
  )
}

export default index