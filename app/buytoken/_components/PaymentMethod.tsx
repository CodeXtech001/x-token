"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pagination, PaginationContent, PaginationItem, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { cryptocurrencies, tiers } from "@/lib/contents";
import { cn } from "@/lib/utils";
import { ArrowUpDown, Check, ChevronRight, CircleX, Copy, Grid3x3, Link, List, LoaderCircle, Lock, Search, Wallet } from "lucide-react";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation";
import { getCookie } from "@/middleware";

function PaymentMethod() {
  const [buttonCard, setButtonCard] = useState<string>("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [clicked, setClicked] = useState<string | null>(null);
  const [ xValue, setxValue] = useState(""); // X input value
  const [cValue, setcValue] = useState(""); // Crypto input value
  const [switchToCrpto, setSwitchToCrpto] = useState("X"); // Default to X
  const [level, setLevel] = useState({ name: "Basic", bonus: 0 }); //
  const [bgclass, setBgclass] = useState("w-0");
  const [switchId, setIdSwitch] = useState(false); //
  const [bonusToken, setBonusesToken] = useState<number>(0); //
  const [waitingPayment, setWaitingPayment] = useState(false);
  const [copiedAmount, setCopiedAmount] = useState(false);
  const [copiedAddress, setCopiedAddress] = useState(false);
  const [openDialogPay, setOpenDialogPay] = useState(false);
  const [address, setAddress] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showLoadingPayment, setShowLoadingPayment] = useState(false);
  


  const router = useRouter()


  // getting the user

  const [userGmail, setUserGmail] = useState<string | null>(null);

  useEffect(() => {
    setUserGmail(getCookie("user_gmail")); // Read cookies safely after hydration
  }, []);

  // addresses fetching
  const fetchAddress = async () => {
    setLoading(true);
    setError(null);
    await new Promise(resolve => setTimeout(resolve, 4000)); // Wait for 4 seconds
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_DJANGO_API_URL}/get-address/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cryptocurrency: clicked}),
      });

      if (!response.ok) throw new Error("Failed to fetch address");

      const data = await response.json();
      setAddress(data.walletAddress); // Backend should return { "walletAddress": "0x..." }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
 

  // copying the amount and address
  const copyToClipboard = async (text: string, setCopied: (value: boolean) => void) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  // creting unique Oder
  const uniqueHash = useMemo(() => uuidv4(), []);

  
  // Finding the selected currency
  const cryptocurrency = cryptocurrencies.find((currency) => currency.name === clicked);
 
  const controls = useAnimation();
  const { ref, inView } = useInView({ triggerOnce: false, threshold: 0.2 }); // Detects visibility

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, inView])  
  
useEffect(() => {
  if (!xValue) return; // Ensure xValue is defined

  const foundTier = tiers.find(
    (status) => Number(xValue) >= status.tokens.from && Number(xValue) < status.tokens?.to
  );

  if (foundTier) {
    setLevel({ name: foundTier.name, bonus: foundTier.bonus });
  } else {
    setLevel({ name: "Basic", bonus: 0 }); // Default if no tier matches
  };

  if(Number(xValue) >= 100000){
    setBgclass("w-[100%]")
  }else if(Number(xValue) >= 50000){
    setBgclass("w-[83.335%]")
  }else if(Number(xValue) >= 10000){
    setBgclass("w-[66.668%]")
  }else if(Number(xValue) >= 2000){
    setBgclass("w-[50.001%]")
  }else if(Number(xValue) >= 500){
    setBgclass("w-[33.33%]")
  }else if(Number(xValue) >= 200){
    setBgclass("w-[16.667%]")
  }else{setBgclass("w-[0]")}
  
}, [xValue]);
 
  const switchcurrency = () => {
    if (!clicked || !cryptocurrency) return;
    
    setSwitchToCrpto((prev) => {
      const newCurrency = prev === "X" ? clicked : "X"; // Toggle currency
  
      if (prev === "X") {
        // Convert from X to Crypto
        const btcToXRate = parseFloat(cryptocurrency.rate.split(" = ")[1].split(" ")[0]); 
        const xToBtcRate = 1 / btcToXRate;
        setcValue((parseFloat(xValue) * xToBtcRate).toFixed(8));
      } else {
        // Convert from Crypto to X
        const btcToXRate = parseFloat(cryptocurrency.rate.split(" = ")[1].split(" ")[0]); 
        setxValue((parseFloat(cValue) * btcToXRate).toFixed(0));
      }
  
      return newCurrency; // Update switch state
    });
  };


  const topRef = useRef<HTMLDivElement | null>(null);

  const handleCardClick = (name: string) => {
    setClicked(name);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const filteredCryptos = cryptocurrencies.filter((crypto) =>
    crypto.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const totalPages = Math.ceil(filteredCryptos.length / itemsPerPage);

  const startIdx = (currentPage - 1) * itemsPerPage;
  const paginatedCryptos = filteredCryptos.slice(startIdx, startIdx + itemsPerPage);

  const handlePageChange = (direction: "next" | "prev") => {
    setCurrentPage((prev) => {
      if (direction === "next") return Math.min(prev + 1, totalPages);
      return Math.max(prev - 1, 1);
    });
  };
  

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
  
    // Remove any non-numeric characters except "."
    value = value.replace(/[^0-9.]/g, "");
  
    // Prevent multiple dots (e.g., "12.34.56" should not be valid)
    if ((value.match(/\./g) || []).length > 1) {
      return;
    }
  
    if (switchToCrpto === "X") {
      setxValue(value);
      if (cryptocurrency) {
        const btcToXRate = parseFloat(cryptocurrency.rate.split(" = ")[1].split(" ")[0]);
        setcValue(value ? (parseFloat(value) / btcToXRate).toFixed(8) : ""); // Handle empty input
      }
    } else {
      setcValue(value);
      if (cryptocurrency) {
        const btcToXRate = parseFloat(cryptocurrency.rate.split(" = ")[1].split(" ")[0]);
        setxValue(value ? (parseFloat(value) * btcToXRate).toFixed(0) : ""); // Handle empty input
      }
    }
  };
  
  useEffect(() => {
    if (!level.bonus) {
      setBonusesToken(0);
    } else {
      const value = (level.bonus * Number(xValue)) / 100;
      setBonusesToken(value);
    }
  }, [level.bonus, xValue]);
  
  // Function to calculate Total Token Value
  const checkingTokenTotals = () => {
    return Number(xValue) + bonusToken;
  };

  // submitting for transcations
  const paymentSubmit = async() =>{
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_DJANGO_API_URL}/cryptotransaction/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userGmail, order:uniqueHash,
           crypto_type:clicked, wallet_address:address, amount:cValue,
            tokens:xValue, bonus_tokens:bonusToken, total_tokens:checkingTokenTotals()}),
      });
     
      if (!response.ok) throw new Error("Failed to create transaction");

      await response.json();
      setShowLoadingPayment(true);
      await new Promise(resolve => setTimeout(resolve, 2000)); // Wait for 2 seconds
      router.push(`/dashboard/order/${uniqueHash}/`)
  
    } catch (err) {
      console.error("Error submitting transaction:", err);
    }
  }

  return (
    <div className="space-y-8">
      <div ref={topRef} />
      {!!!clicked?
       <div className="text-center space-y-3">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Select Payment Method
        </h2>
        <p className="text-gray-400 text-sm">
          Choose your preferred cryptocurrency for secure and instant transactions
        </p>
      </div>:
      <div className="relative py-8 rounded-3xl overflow-hidden">
        <div className="relative">
          <div className="space-y-6">
             <div className="relative">
              <div className="flex flex-col sm:flex-row items-start gap-4">
                <div className="flex w-full items-center gap-4">
                  <div className="flex-grow relative">
                  <input 
                        type="number"
                        className="flex py-1 shadow-sm file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground outline-none ring-1 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm text-2xl h-14 sm:h-16 px-4 sm:px-6 w-full bg-black/40 backdrop-blur-xl border rounded-2xl placeholder:text-gray-500 border-blue-500/50 focus:ring-2 ring-blue-500/20 transition-all duration-300 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" 
                        placeholder="Enter amount"
                        value={switchToCrpto === "X" ? xValue : cValue} 
                        onChange={handleInputChange}
                      />
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                    <div className="px-3 py-1.5 rounded-lg bg-white/5 text-sm font-medium text-gray-400">
                    {switchToCrpto}
                    </div>
                    </div>
                  </div>
                  <Button onClick={switchcurrency} className="h-14 sm:h-16 px-4 rounded-2xl w-auto bg-black/40 backdrop-blur-xl border border-white/5 hover:border-blue-500/50 transition-all duration-300 flex items-center justify-center group">
                  <ArrowUpDown className="w-5 h-5 text-blue-400 group-hover:scale-110 transition-transform"/></Button>
                </div>
              </div>
             </div>
             {xValue && Number(xValue) >= 50 &&  Number(xValue) <= 200000 ? 
                          <motion.section
                          ref={ref}
                          initial="hidden"
                          animate={controls}
                          variants={{
                            hidden: { opacity: 0, y: 50 },
                            visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
                          }} className="space-y-6">
                          <div className="relative space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-gray-400">Progress to next tier</span>
                              <div className="flex items-center gap-2">
                                <span className="text-2xl font-bold text-white">{Number(xValue).toLocaleString()}𝕏</span>
                                <span className="text-blue-400">{level.name}</span>
                              </div>
                            </div>
                            <div className="flex items-center justify-between text-sm text-gray-400 mb-2">
                              <div className="flex items-center gap-2">
                                <span>Min:</span>
                                <div className="px-2 py-0.5 rounded-lg bg-white/5 font-medium">
                                50 𝕏</div>
                              </div>
                              <div className="flex items-center gap-2">
                                <span>Max:</span>
                                <div className="px-2 py-0.5 rounded-lg bg-white/5 font-medium">
                                200,000 𝕏
                                </div>
                              </div>
                            </div>
                            <div className="h-3 bg-black/40 rounded-full overflow-hidden backdrop-blur-xl border border-white/5">
                                <div className="relative h-full flex">
                                  <div className="h-full border-r border-white/10 flex-grow last:border-0">
                                  </div>
                                  <div className="h-full border-r border-white/10 flex-grow last:border-0">
                                  </div>
                                  <div className="h-full border-r border-white/10 flex-grow last:border-0">
                                  </div>
                                  <div className="h-full border-r border-white/10 flex-grow last:border-0">
                                  </div>
                                  <div className="h-full border-r border-white/10 flex-grow last:border-0">
                                  </div>
                                  <div className="h-full border-r border-white/10 flex-grow last:border-0">
                                  </div>
                                  <div className={cn("absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 transition-all duration-500 ease-in-out", bgclass)}></div>
                                </div>
                            </div>
                            <div className="flex justify-between text-xs text-gray-400 px-1">
                              <div className={cn("text-center",{"text-blue-400":Number(xValue) >= 200})}>200</div>
                              <div className={cn("text-center",{"text-blue-400":Number(xValue) >= 500})}>500</div>
                              <div className={cn("text-center",{"text-blue-400":Number(xValue) >= 2000})}>2,000</div>
                              <div className={cn("text-center",{"text-blue-400":Number(xValue) >= 10000})}>10,000</div>
                              <div className={cn("text-center",{"text-blue-400":Number(xValue) >= 50000})}>50,000</div>
                              <div className={cn("text-center",{"text-blue-400":Number(xValue) >= 100000})}>100,000</div>
                            </div>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="relative overflow-hidden bg-black/40 backdrop-blur-xl border border-white/5 rounded-2xl p-4 sm:p-5 hover:border-blue-500/20 transition-all duration-300">
                            <p className="text-sm text-gray-400">
                            You Pay
                            </p>
                            <div className="flex items-baseline mt-2">
                              <span className="text-xl sm:text-2xl font-bold text-white">{cValue}</span>
                              <span className="ml-2 text-blue-400 font-medium">{clicked}</span>
                            </div>
                            </div>
                            <div className="relative overflow-hidden bg-black/40 backdrop-blur-xl border border-white/5 rounded-2xl p-4 sm:p-5 hover:border-blue-500/20 transition-all duration-300">
                            <p className="text-sm text-gray-400">You Receive</p>
                            <div className="flex items-baseline mt-2">
                              <span className="text-xl sm:text-2xl font-bold text-white">{Number(xValue).toLocaleString()}</span>
                              <span className="text-blue-400 font-medium text-xl sm:text-2xl">𝕏</span>
                            </div>
                            </div>
                          </div>
                          <div className="relative overflow-hidden rounded-2xl bg-black/40 backdrop-blur-xl border border-blue-500/20 p-4 sm:p-6">
                          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 relative">
                            <div>
                              <div className="flex items-center gap-2 flex-wrap">
                                <h3 className="text-gray-400">Status Level</h3>
                                <div className="px-2 py-0.5 rounded-full bg-blue-500/20 text-xs font-medium text-blue-400">
                                {level.bonus}% Bonus</div>
                              </div>
                              <p className="text-2xl sm:text-3xl font-bold text-white mt-2">{level.name}</p>
                            </div>
                          </div>
                          </div>
                          </motion.section> : xValue &&  Number(xValue) >= 200000 ? 
                       <div className="w-full text-center text-red-500 font-semibold">
                         You Can&apos;t buy more than 200,000𝕏 token
                       </div> : null
                       }
          </div>
          <div className="py-8 flex justify-center">
            <Dialog open={openDialogPay} onOpenChange={setOpenDialogPay}>
      <DialogTrigger asChild>
      <Button disabled={!xValue || Number(xValue) <= 49 || Number(xValue) >= 200000} className="text-white font-light px-12 text-transparent bg-gradient-to-r from-blue-500 via-purple-500  to-blue-500 bg-[length:200%_200%] animate-gradient-move border border-blue-300/60 hover:border-blue-300 z-20 group/button">
      <Wallet className="w-5 h-5 text-white transition-all duration-500 ease-in-out group-hover/button:scale-125" /> <span className="text-white">{!xValue || Number(xValue) <= 49 || Number(xValue) >= 200000 ? "Minimum is 50 X Tokens":"Make Payment"}</span></Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[460px] p-0 border-0 bg-black rounded-2xl" >
     <div className={`h-full w-full list-none px-4`}>
      <div className="relative h-full w-full rounded-2xl border p-1 md:p-3">
        <GlowingEffect
          spread={40}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
        />
        <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl border-0.75 p-6 dark:shadow-[0px_0px_27px_0px_#2D2D2D] md:p-6">
          {!waitingPayment ?<div className="relative flex flex-1 flex-col justify-between gap-3">  
    <DialogHeader>
      <DialogTitle className="font-semibold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 text-2xl">Secure Payment Process</DialogTitle>
    </DialogHeader>
      <div className="space-y-6 mb-4">
        <div className="p-6 bg-black/50 backdrop-blur-lg border border-blue-500/10 rounded-2xl space-y-4 shadow-inner">
        <div className="flex items-center space-x-3 text-blue-400">
        <Lock className="text-blue-400 w-5 h-5" />
        <h3 className="font-medium text-lg">Transaction Details</h3>
        </div>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Payment Amount:</span>
            <span className="font-mono font-bold">
            {cValue}{" "}{clicked}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-400">your Tokens:</span>
            <span className="font-mono font-bold text-yellow-400">{Number(xValue).toLocaleString()}𝕏</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Bonus Tokens:</span>
            <span className="font-mono font-bold text-purple-400">
              {bonusToken.toLocaleString()}𝕏
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Tokens to Receive:</span>
            <span className="font-mono font-bold text-green-400">
              {checkingTokenTotals().toLocaleString()}𝕏
            </span>
          </div>
          
        </div>
        </div>
        <div className="flex items-center space-x-3 p-4 bg-blue-500/10 rounded-lg">
        <Switch className="" id="Remember-me" onCheckedChange={()=>setIdSwitch((prev)=> !prev)} />
        <Label className="text-sm text-gray-300 text-start">I agree to the token purchase agreement and sale terms</Label>
        </div>
      </div>
      <DialogFooter >
      <Button disabled={!switchId} onClick={()=>{setWaitingPayment(true), fetchAddress()}} className="text-white font-light w-full text-transparent bg-gradient-to-r from-blue-500 via-purple-500  to-blue-500 bg-[length:200%_200%] animate-gradient-move border border-blue-300/60 hover:border-blue-300 z-20 group/button">
       <span className="text-white">Proceed with Purchase</span> </Button>
      </DialogFooter>

          </div>:
          loading ? 
            <div className="h-[400px] w-full flex justify-center items-center text-sm font-light text-white">
            <span className="flex items-center gap-2">
            Please wait...
            <LoaderCircle className="w-4 h-4 text-blue-400 animate-spin" />
            </span>
            </div>:
            error ?
            <div className="h-[400px] w-full flex justify-center items-center text-sm font-light text-white"><CircleX className="w-4 h-4 text-red-400 mr-1"/>{error}</div>:
            showLoadingPayment ?
            <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-black to-black text-white text-center px-4 py-6">
            <div className="relative mb-8">
            <LoaderCircle className="w-16 h-16 animate-spin text-blue-500" />
            </div>
            <h3 className="text-2xl font-semibold mb-4">
            Waiting for Payment
            </h3>
            <p className="text-gray-400 ">
            Order{" "}#{uniqueHash}{" "}is processing...
            </p>
           </div>
           </div>:
          <div className="relative flex flex-1 flex-col justify-between gap-3">
            <DialogHeader>
            <DialogTitle className="font-semibold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 text-2xl">Waiting for Payment</DialogTitle>
            </DialogHeader>
            <div className="space-y-6 w-full px-4 md:px-0">
              <div className="relative p-4 md:p-6 bg-black/70 backdrop-blur-xl rounded-2xl md:rounded-3xl space-y-4 md:space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-base md:text-lg font-semibold text-white">
                Order #{uniqueHash}
                </h3>
              </div>
              <div className="space-y-3 md:space-y-4">
              <p className="text-xs md:text-sm text-gray-300">
              Send exactly
              <span className="font-mono font-bold text-base md:text-lg text-white">{" "}{cValue}</span> {clicked}:
              </p>
              <div className="p-3 md:p-4 bg-black rounded-lg md:rounded-xl border border-gray-700 flex justify-between items-center">
              <p className="font-mono text-xs md:text-sm text-gray-300 break-all mr-2">{cValue}</p>
              <Button
              className="p-1.5 md:p-2 bg-black rounded-lg transition-transform hover:scale-105 flex-shrink-0"
              onClick={() => copyToClipboard(cValue, setCopiedAmount)}
              >
              {copiedAmount ? (
              <Check className="w-4 h-4 md:w-5 md:h-5 text-green-400" />
              ) : (
              <Copy className="w-4 h-4 md:w-5 md:h-5 text-gray-400" />
              )}
              </Button>
              </div>
              </div>
              <div className="space-y-3 md:space-y-4">
              <p className="text-xs md:text-sm text-gray-300">To the address below:</p>
              <div className="p-3 md:p-4 bg-black rounded-lg md:rounded-xl border border-gray-700 flex justify-between items-center">
              <p className="font-mono text-xs md:text-sm text-gray-300 break-all mr-2">{address}</p>
              <Button
              className="p-1.5 md:p-2 bg-black rounded-lg transition-transform hover:scale-105 flex-shrink-0"
              onClick={() => copyToClipboard(address, setCopiedAddress)}
              >
              {copiedAddress ? (
              <Check className="w-4 h-4 md:w-5 md:h-5 text-green-400" />
              ) : (
              <Copy className="w-4 h-4 md:w-5 md:h-5 text-gray-400" />
              )}
              </Button>
              </div>
              </div>
              <div className="space-y-1.5 md:space-y-2 text-2xs md:text-xs text-gray-400">
                <p>• A minimum of 12 confirmations is required to process this payment.</p>
                <p>• Ensure the exact amount is sent to avoid discrepancies.</p>
                <p>• Your tokens will be credited once payment is confirmed.</p>
              </div>
              </div>
              <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-4">
                <Button onClick={paymentSubmit} className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-9 px-4 w-full md:flex-1 py-3 md:py-4 bg-black border border-green-700 rounded-xl text-white text-sm md:text-base hover:bg-green-800 shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-transform hover:scale-105">
                Confirm & Proceed
                </Button>
                <Button onClick={()=>{setOpenDialogPay(false), setWaitingPayment(false), setIdSwitch(false) }} className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-9 px-4 w-full md:flex-1 py-3 md:py-4 bg-black border border-red-500 rounded-xl text-white-400 text-sm md:text-base hover:bg-red-800 shadow-[0_0_15px_rgba(255,0,0,0.1)] transition-transform hover:scale-105">
                Cancel Orders
                </Button>
              </div>
            </div>
          </div>
          }
   </div>
   </div>
   </div>
  </DialogContent>
    </Dialog>
          </div>
        </div>
      </div>}
      <div className="flex flex-row gap-4">
        <div className="relative flex-grow group">
          <Input
            className="flex px-3 py-1 text-base shadow-sm file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm w-full h-12 pl-12 bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:border-blue-500/50 transition-all group-hover:border-white/20"
            type="text"
            placeholder="Search cryptocurrency..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute top-0 left-0 mt-3 ml-3 text-gray-500" />
        </div>

        <div className="hidden sm:flex items-center gap-2 bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl p-1 hover:border-white/20 transition-colors">
          <Button
            onClick={() => setButtonCard("grid")}
            className={cn("p-2 rounded-lg transition-all ", {
              "bg-blue-500/20 text-blue-400 shadow-lg shadow-blue-500/10": buttonCard === "grid",
              "text-gray-400 hover:text-gray-300": buttonCard !== "grid",
            })}
          >
            <Grid3x3 className="w-5 h-5" />
          </Button>
          <Button
            onClick={() => setButtonCard("list")}
            className={cn("p-2 rounded-lg transition-all ", {
              "bg-blue-500/20 text-blue-400 shadow-lg shadow-blue-500/10": buttonCard === "list",
              "text-gray-400 hover:text-gray-300": buttonCard !== "list",
            })}
          >
            <List className="w-5 h-5" />
          </Button>
        </div>
      </div>

      <div
        className={cn("grid gap-4 transition-all grid-cols-1", {
          "sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4": buttonCard === "grid",
          "sm:grid-cols-1": buttonCard === "list",
        })}
      >
        {paginatedCryptos.map((crypto) => (
          <div
            key={crypto.name}
            className={cn(
              "group relative bg-black/40 backdrop-blur-xl border border-white/5 rounded-2xl cursor-pointer overflow-hidden hover:border-blue-500/50 transition-all duration-300",
              { "border-blue-500/50": clicked === crypto.name }
            )}
            onClick={() => handleCardClick(crypto.name)}
          >
            <div className="relative flex items-center gap-4 p-5">
              <div className="relative">
                <div className="rounded-xl bg-black/40 flex items-center justify-center w-14 h-14">
                  <Image
                    alt={crypto.name}
                    loading="lazy"
                    width={32}
                    height={32}
                    decoding="async"
                    className="group-hover:scale-110 transition-transform duration-300 rounded-full"
                    src={crypto.icon}
                  />
                </div>
                {clicked === crypto.name && (
                  <div className="absolute -right-1 -top-1 w-4 h-4 bg-blue-500 rounded-full border-2 border-black" />
                )}
              </div>
              <div className="flex-grow min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-semibold text-white truncate">{crypto.name}</h3>
                </div>
                <p className="text-sm text-gray-400 mt-0.5 truncate">{crypto.rate}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="relative flex justify-center my-6">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious onClick={() => handlePageChange("prev")} disabled={currentPage === 1} className="cursor-pointer hover:bg-blue-500 hover:text-white transition-colors duration-300 ease-in-out"/>
            </PaginationItem>
            <PaginationItem>
              <p className="text-gray-400 text-sm mx-4">
                Page {currentPage} of {totalPages}
              </p>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext onClick={() => handlePageChange("next")} disabled={currentPage === totalPages} className="cursor-pointer hover:bg-blue-500 hover:text-white transition-colors duration-300 ease-in-out"/>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}

export default PaymentMethod;
