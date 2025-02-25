
"use clients";

import { LucideIcon } from "lucide-react";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { FAQItem, SectionHeaderProp } from "@/lib/typescript";

export function GlowingEffectDemo({questions}: {questions: FAQItem[]}) {
  return (
    <ul className=" space-y-4 px-4 mt-12 md:mt-16">
     {questions?.map((value, index) => (
        <GridItem
          key={index}
          question={value.question} // Assuming this should be the actual title text
          answer={value.answer}
        />
      ))}
    </ul>
  );
}


const GridItem = ({ question, answer }: FAQItem) => {
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
          <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent  group-hover:from-white group-hover:to-blue-300 transition-all duration-300">{question}</h3>
            <div className="relative">
              <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300 leading-relaxed">{answer}</p>
              <div className="absolute bottom-0 left-0 w-0 h-px bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-500"/>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};
