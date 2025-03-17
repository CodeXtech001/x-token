"use client"

import { EvervaultCard } from "@/components/ui/evervault-card"
import { DollarSign, Wallet } from "lucide-react"
import { getCookie } from "@/middleware";
import { useEffect, useState } from "react";
import { UserDocument } from "@/lib/typescript";

function index() {
    const [clientBalance, setClientBalance] = useState<number>(0);
    const [userDucument, setUserDucument] = useState<UserDocument | null>(null);
    const [loading, setLoading] = useState(true);

    const [user_gmail, setUserGmail] = useState<string | null>(null);

    useEffect(() => {
      setUserGmail(getCookie("user_gmail")); // Read cookies safely after hydration
    }, []);
        
    useEffect(() => {
      
        if (!user_gmail) return;
      
        const fetchUser = async () => {
          try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_DJANGO_API_URL}/userdocuments/${user_gmail}`);
            if (!response.ok) throw new Error("Failed to fetch Documents");
      
            const data = await response.json();
            setClientBalance(data.user_balance_token);
            setUserDucument(data);
          } catch (err) {
            console.error("Error receiving Documents:", err);
          } finally {
            setLoading(false);
          }
        };
      
        fetchUser();
      }, [user_gmail]);
 
    const tokenToDollar = () => {
      if (!userDucument?.total_tokens) return null;
      const value = userDucument.total_tokens * 5.44;
      return Number(value.toFixed(2)); // Convert back to number to remove trailing zeros
    }
  return (
    <>
    <EvervaultCard className="h-[10rem]" color="bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl" text="Token Balance" amount={clientBalance + " 𝕏"} suffix={<Wallet className="w-8 h-8 text-blue-400"/>}/>
    <EvervaultCard className="h-[10rem]" color="bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-3xl" text="USD Value" amount={`$${tokenToDollar()}`} suffix={<DollarSign className="w-8 h-8 text-green-400"/>}/>
    </>
  )
}

export default index