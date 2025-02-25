


import { LucideIcon } from "lucide-react";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { Privileges } from "@/lib/typescript";
import { cn } from "@/lib/utils";


export function GlowingEffectDemo({privileges}:{ privileges: Privileges[]}) {

  const lastindex = privileges.length - 1
  return (
    <ul className="max-w-7xl w-full mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4 mt-12 md:mt-16">
     {privileges?.map((privilege, index) => (
        <GridItem
          key={index}
          icon={privilege.icon? <privilege.icon size={24} /> : null} // Correct JSX syntax
          title={privilege.title} // Assuming this should be the actual title text
          description={privilege.description}
          benefits={privilege.benefits}
          isLast={index === lastindex} // Fix: Pass last item condition as a prop
        />
      ))}
    </ul>
  );
}


const GridItem = ({icon, title, description, benefits, isLast}: Privileges & { isLast: boolean }) => {
  return (
    <li className={cn("min-h-[14rem] list-none w-full",{ "md:col-span-3": isLast })}>
      <div className="relative h-full rounded-2xl border p-2 md:rounded-3xl md:p-3 group">
        <GlowingEffect
          spread={40}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
        />
        <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl border-0.75 p-6 shadow-[0px_0px_27px_0px_#2D2D2D]">
          <div className="relative flex flex-1 flex-col justify-between gap-3">
            {icon && <div className="w-fit rounded-lg border border-gray-600 p-2 text-blue-400 group-hover:text-blue-300 transition-colors duration-300">
              {icon}
            </div>}
            <div className="space-y-3">
              <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                {title}
              </h3>
              <h2
                className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300"
              >
                {description}
              </h2>
            </div>
           {Array.isArray(benefits)  && <ul className=" flex flex-col lg:flex-row gap-4">
            {benefits.map((value, index )=> <li key={index} className="flex-1 bg-zinc-900  p-3 rounded-lg border-[1px]  border-zinc-800 text-center"><h2 className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            {value} 
            </h2></li> )}
            </ul>}
          </div>
        </div>
      </div>
    </li>
  );
};
