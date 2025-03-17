"use client"
import { Button } from "@/components/ui/button";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { UserDocument } from "@/lib/typescript";
import { getCookie } from "@/middleware";
import { Coins, CreditCard, DollarSign, Gift, Link, LoaderCircle, Wallet } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch} from 'react-redux'
import { setOpenDialogPay } from "@/app/features/transactionstate/transactionstateSlice";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";


export const GlowingEffectDemo =() => {

      const dispatch = useDispatch();

      const [userDucument, setUserDucument] = useState<UserDocument | null>(null);
      const [loading, setLoading] = useState(true);
      const [loadingGerate, setLoadingGerate] = useState(true);

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
        const tokenToDollarTotal = () => {
          if(!userDucument?.total_tokens) return null;
          const value = userDucument.total_tokens * 5.44
          return Number(value.toFixed(2)); // Convert back to number to
        }
    const clickGenerate = async () => {
      await new Promise(resolve => setTimeout(resolve, 4000)); // Wait for 2 seconds
      setLoadingGerate(false);
    }    
  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    <li className={`min-h-[14rem] list-none`}>
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
            <div className="flex justify-between items-start">
                <div className="p-3 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl shadow-inner">
                <Wallet className="w-6 h-6 text-blue-400" />
                </div>
            </div>
            <div className="mt-6">
                <p className="text-sm text-gray-400">
                Token Balance
                </p>
                <p className="text-3xl font-extrabold text-white mt-2">
                {userDucument?.user_balance_token} 𝕏
                </p>
            </div>
          </div>
        </div>
      </div>
    </li>
    <li className={`min-h-[14rem] list-none`}>
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
            <div className="flex justify-between items-start">
                <div className="p-3 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl shadow-inner">
                <DollarSign className="w-6 h-6 text-blue-400" />
                </div>
            </div>
            <div className="mt-6">
                <p className="text-sm text-gray-400">
                Equivalent in USD
                </p>
                <p className="text-3xl font-extrabold text-white mt-2">
                 ${tokenToDollar()}
                </p>
                <p className="text-sm text-gray-400 mt-1">1 𝕏 = $5.44</p>
            </div>
          </div>
        </div>
      </div>
    </li>
    <li className={`min-h-[14rem] list-none`}>
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
            <div className="flex justify-between items-start">
                <div className="p-3 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl shadow-inner">
                <Coins className="w-6 h-6 text-blue-400" />
                </div>
            </div>
            <div className="mt-6">
                <p className="text-sm text-gray-400">
                Purchased Tokens
                </p>
                <p className="text-3xl font-extrabold text-white mt-2">
                {userDucument?.total_tokens} 𝕏
                </p>
                <p className="text-sm text-gray-400 mt-1">Total purchases</p>
            </div>
          </div>
        </div>
      </div>
    </li>
    <li className={`min-h-[14rem] list-none`}>
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
            <div className="flex justify-between items-start">
                <div className="p-3 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl shadow-inner">
                <Gift className="w-6 h-6 text-blue-400" />
                </div>
            </div>
            <div className="mt-6">
                <p className="text-sm text-gray-400">
                Bonus Tokens
                </p>
                <p className="text-3xl font-extrabold text-white mt-2">
                {userDucument?.bonus_tokens} 𝕏
                </p>
                <p className="text-sm text-gray-400 mt-1">From referrals and loyalty</p>
            </div>
          </div>
        </div>
      </div>
    </li>
    <li className={`min-h-[14rem] list-none`}>
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
            <div className="flex justify-between items-start">
                <div className="p-3 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl shadow-inner">
                <CreditCard className="w-6 h-6 text-blue-400" />
                </div>
            </div>
            <div className="mt-6">
                <p className="text-sm text-gray-400">
                Total Contributed
                </p>
                <p className="text-3xl font-extrabold text-white mt-2">
                ${tokenToDollarTotal()}
                </p>
                <p className="text-sm text-gray-400 mt-1">All time investment</p>
            </div>
          </div>
        </div>
      </div>
    </li>
    <li className={`min-h-[14rem] list-none`}>
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
            <div className="flex flex-col space-y-1.5 p-6 px-6 py-4">
                <div className="tracking-tight text-xl font-semibold text-white">
                Quick Actions
                </div>
            </div>
            <div className="p-6 pt-0 space-y-4 px-6 pb-6-6">
            <Button onClick={() => {dispatch(setOpenDialogPay())}}className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary hover:bg-primary/90 h-9 w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-4 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-transform">
            View Transaction History
            </Button>
            
            <Dialog >
        <DialogTrigger asChild>
        <Button onClick={()=>clickGenerate()} className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary hover:bg-primary/90 h-9 w-full bg-gradient-to-r from-gray-600 to-gray-700 text-white px-6 py-4 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-transform">
            Generate Referral Link
        </Button>
        </DialogTrigger>
      <DialogContent className="sm:max-w-[450px] p-0 border-0 bg-black rounded-2xl" >
      
     <div className={`h-full w-full list-none px-4`}>
      <div className="relative h-full w-full rounded-2xl border p-1 md:p-3">
        <GlowingEffect
          spread={40}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
        />
        <div className="relative flex h-full flex-col justify-between overflow-hidden space-y-6 rounded-xl p-6 border-0.75 dark:shadow-[0px_0px_27px_0px_#2D2D2D]">
        <DialogTitle></DialogTitle>

         <div className="flex flex-col items-center text-center space-y-4 ">
            <div className="p-4 rounded-full bg-blue-500/20">
            <Link className="w-8 h-8 text-blue-400"/>
            </div>
            {loadingGerate ? 
             <div className="flex flex-col justify-center items-center ">
            <LoaderCircle className="w-8 h-8 animate-spin text-blue-400" />
            <p className="text-gray-300">Generate Referral Link...</p>
            </div>:
            <p className="text-gray-300">
           You can only Generate Referral Link when we get to the fourth stage, so stay tuned.
           </p>
            } 
         </div>
      </div>

   </div>
   </div>
  </DialogContent>
           </Dialog>
            </div>
          </div>
        </div>
      </div>
    </li>
 </ul>
  );
};
