
import { LucideIcon } from "lucide-react";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { PartnersProps} from "@/lib/typescript";
import Image from "next/image";

export function CompanyCard({partners}: PartnersProps) {
  return (
    <ul className="z-20 max-w-7xl w-full mx-auto grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 px-4 mt-12 md:mt-16">
     {partners?.map((partner, index) => (
        <GridItem
          key={index}
          icon={partner.icon} // Correct JSX syntax
          name={partner.name} // Assuming this should be the actual title text
        />
      ))}
    </ul>
  );
}

interface PartnerProps {
  name: string;
  icon: string;
}

const GridItem = ({icon,name }: PartnerProps) => {
  return (
    <li className={`min-h-[14rem] list-none`}>
      <div className="relative h-full rounded-2xl border p-2  md:rounded-3xl md:p-3 bg-zinc-900 group">
        <GlowingEffect
          spread={40}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
        />
        <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl border-0.75 p-6 shadow-[0px_0px_27px_0px_#2D2D2D]">
          <div className="relative flex flex-1 flex-col items-center justify-center gap-3">
            <div className="space-y-3">
              <Image src={icon} alt={name} width={500} height={500} priority className="h-20 object-contain group-hover:scale-125 group-hover:grayscale transition-all duration-500 ease-in-out"/>
              <h3 className="text-lg font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent text-center">
                {name}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

