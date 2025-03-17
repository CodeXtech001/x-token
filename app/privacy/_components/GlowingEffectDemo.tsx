
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { PrivacyPolicySection } from "@/lib/typescript";
import { DotIcon } from "lucide-react";

export function GlowingEffectDemo({section}: {section: PrivacyPolicySection[]}) {
  return (
    <ul className=" space-y-4 mt-12 md:mt-16">
     {section?.map((value, index) => (
        <GridItem
          key={index}
          title={value.title} // Assuming this should be the actual title text
          purpose={value.purpose}
          dotcontent={value.dotcontent}
        />
      ))}
    </ul>
  );
}


const GridItem = ({ title, purpose, dotcontent }: PrivacyPolicySection) => {
  return (
    <li className={` list-none`}>
      <div className="relative h-full rounded-2xl border p-2  md:rounded-3xl md:p-3 group">
        <GlowingEffect
          spread={40}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
        />
        <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl border-0.75 p-6 shadow-[0px_0px_27px_0px_#2D2D2D]">
          <div className="relative flex flex-1 flex-col justify-between gap-3">
          <h3 className="text-2xl font-bold text-blue-400">{title}</h3>
          <p className="text-gray-300 whitespace-pre-line leading-relaxed">{purpose}</p>
          <div className="">
          {dotcontent?.map((content, index) => 
        <p key={index} className="text-gray-300 whitespace-pre-line leading flex "><span><DotIcon className="w-6 h-6 mt-1"/></span><span>{content}</span></p>)}
        </div>
          </div>
        </div>
      </div>
    </li>
  );
};
