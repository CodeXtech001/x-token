

import ThreeIsActive from "@/components/ThreeIsActive";
import IndustryLeaders from "@/components/IndustryLeaders";
import Tokenomics from "@/components/Tokenomics";
import RoadMap from "@/components/RoadMap";
import ExclusiveRewards from "@/components/ExclusiveRewards";
import ElitePrivileges from "@/components/ElitePrivileges";
import FaqData from "@/components/FaqData";
import Revolution from "@/components/Revolution";
import FooterBar from "@/components/FooterBar";
import HomeSec from "@/components/HomeSec";
export default async function Home() {
  
  return (
      <>
        <HomeSec/>
      <div className="lg:space-y-80 lg:mt-80 mt-28">
        <ThreeIsActive/>
        <IndustryLeaders/>
        <Tokenomics/>
        <RoadMap/>
        <ExclusiveRewards/>
        <ElitePrivileges/>
        <FaqData/>
        <Revolution/>
        <FooterBar/>
      </div>
      
   </>
  );
}
