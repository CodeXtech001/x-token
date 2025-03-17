
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { Mail} from "lucide-react";
import Link from "next/link";

export function ContactCard() {
  return (
    <div className=" mt-12 md:mt-16">
        <GridItem // Assuming this should be the actual title text
        />
    </div>
  );
}


const GridItem = () => {
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
        <div className="relative flex h-full flex-col gap-6 overflow-hidden rounded-xl border-0.75 p-6 shadow-[0px_0px_27px_0px_#2D2D2D]">
          <div className="relative flex flex-1 flex-col gap-3">
            <div className="space-y-3">
              <h3 className="text-2xl font-bold text-blue-400">
              Contact us
              </h3>
              <p className="text-gray-300">If you have any questions or concerns about this policy or our privacy practices, please contact us at:</p>
              <Link href={""} className="flex space-x-2 text-blue-400 hover:text-blue-300 transition-colors"> <span><Mail className="ml-2 w-6 h-6"/> </span><span>support@tokensale.com</span></Link>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

