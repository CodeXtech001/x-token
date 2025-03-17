"use client"

import { ProgressDemo } from "@/components/HeroText/herotext_components/ProgressBar";
import { Card, CardContent } from "@/components/ui/card";
import { tiers } from "@/lib/contents";
import { UserDocument } from "@/lib/typescript";
import { cn } from "@/lib/utils";
import { getCookie } from "@/middleware";
import { Medal, Sparkles, Star, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";


function StatusCard() {

  
// State to ensure calculation only happens on the client
  const [clientBalance, setClientBalance] = useState<number | null>(null);
  const [userDucument, setUserDucument] = useState<UserDocument | null>(null);
  const [loading, setLoading] = useState(true);

  const [user_gmail, setUserGmail] = useState<string | null>(null);

  useEffect(() => {
    setUserGmail(getCookie("user_gmail")); // Read cookies safely after hydration
  }, []);
   
  useEffect(() => {
    if (!user_gmail) return
    const fetchUser = async() => {
        try {

          const response = await fetch(`${process.env.NEXT_PUBLIC_DJANGO_API_URL}/userdocuments/${user_gmail}`);
    
          if (!response.ok) throw new Error("Failed to fetch Documents");
    
          const data  = await response.json();
          setUserDucument(data)
          setClientBalance(data.user_balance_token)
        } catch (err: any) {
            console.error("Error receveing Documents:", err);
        } finally {
            setLoading(false);
        }
    }
    fetchUser();
    },[user_gmail]);

  
    // State to track which card is expanded
    const [openCards, setOpenCards] = useState<Record<number, boolean>>({});

    const toggleCard = (index: number) => {
      setOpenCards((prev) => ({
        ...prev,
        [index]: !prev[index], // Toggle only the clicked card
      }));
    };

    const getProgressResult = ({
      from,
      to
    }: {
      from: number;
      to: number | null;
    }) => {
      if (!clientBalance || !to) return 0; // Prevent SSR issues

      const totalRequired = to - from;
      const progress = ((clientBalance - from) / totalRequired) * 100;
      return Math.max(0, Math.min(100, Math.round(progress)));
    };

  return (
    <div className="space-y-4 mt-6">
      {tiers.map((tier, index) => (
        <div key={index}>
          {tier.name === userDucument?.user_status ? (
            <Card className="border-blue-500/20">
              <CardContent className="py-6 space-y-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-blue-500/10">
                      <Star className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-sm text-gray-400">Current Balance</h3>
                      <p className="text-2xl font-bold text-white">
                        {userDucument.user_balance_token}𝕏
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-400">Current Tier</div>
                    <p className="text-xl font-semibold text-blue-400">
                      {tier.name} Status
                    </p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">
                      Progress to {tier.progress} Status
                    </span>
                    <span className="text-blue-400 font-medium">{getProgressResult({
                      from: tier.tokens.from,
                      to: tier.tokens.to
                    })}%</span>
                  </div>
                  <ProgressDemo setprogress= {getProgressResult({
                      from: tier.tokens.from,
                      to: tier.tokens.to
                    })} colorpicker= "from-blue-500 via-purple-500 to-blue-500"/>
                  <div className="flex justify-between text-xs text-gray-400">
                    <span>{tier.tokens.from}𝕏</span>
                    <span>{tier.tokens.to && tier.tokens.to + "𝕏"}</span>
                  </div>
                  {tier.next && (
                    <div className="mt-6 p-4 rounded-xl bg-blue-500/5 border border-blue-500/10">
                      <div className="flex items-center gap-3">
                        <TrendingUp className="w-5 h-5 text-blue-400" />
                        <p className="text-sm text-gray-300">
                          <span className="text-white font-medium">
                            {tier.tokens.to + "𝕏"}{" "}
                          </span>
                          {tier.next}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card
              className="border-blue-500/40 cursor-pointer "
              onClick={() => toggleCard(index)}
            >
              <CardContent className="py-6 space-y-6 group">
                <div className="relative">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className="w-14 h-14 rounded-xl bg-black/40 flex items-center justify-center">
                        <Medal className="w-7 h-7 text-blue-400 group-hover:scale-110 transition-transform duration-300" />
                      </div>
                      {openCards[index] && <div className="absolute -right-1 -top-1 w-4 h-4 bg-blue-500 rounded-full border-2 border-black" />}
                    </div>
                    <div className="flex-grow">
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors">
                          {tier.name} Status
                        </h3>
                        <div
                          className={cn("px-2.5 py-0.5 rounded-full text-xs font-medium text-blue-40 transition-colors duration-300", openCards[index] ? "bg-blue-500/20 text-blue-400": "bg-black")}>
                          TIER
                        </div>
                      </div>
                      <p className="text-sm text-gray-400 mt-0.5">
                        {(tier.tokens.from).toLocaleString()}{" "}
                        {tier.tokens.to &&
                          "- " + (tier.tokens.to).toLocaleString()}{" "}
                        tokens
                      </p>
                    </div>
                  </div>

                  {/* Smooth Expanding Content */}
                  <div
                    className={cn(
                      "overflow-hidden transition-[max-height] duration-700 ease-in-out",
                      openCards[index] ? "max-h-[1000px]" : "max-h-0"
                    )}
                  >
                    {Array.isArray(tier.contents) &&
                      tier.contents.map((content, idx) => (
                        <div
                          key={idx}
                          className="mt-6 pt-6 border-t border-white/5"
                        >
                          <div className="grid gap-3">
                            <div className="flex items-start gap-3 group/benefit">
                              <div className="w-6 h-6 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                                <Sparkles className="w-4 h-4 text-blue-400 group-hover/benefit:scale-110 transition-transform duration-300" />
                              </div>
                              <p className="text-sm text-gray-300 leading-relaxed">
                                {content}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      ))}
    </div>
  );
}

export default StatusCard;
