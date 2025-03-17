
"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { CryptoOrder } from "@/lib/typescript";
import { getCookie } from "@/middleware";
import { Check, Clock, LoaderCircle, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Countdown from "@/components/CountDown";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/app/store'
import { setOpenDialogPay } from "@/app/features/transactionstate/transactionstateSlice";


export const TransactionEffectDemo =() => {

    const dispatch = useDispatch();
    const openDialogPay = useSelector((state: RootState) => state.transactionstateSlice.openDialogPay); 

    const [transactions, setTransactions] =useState<CryptoOrder[]>([])
    const [loading, setLoading] =useState(true)
    
    const [userGmail, setUserGmail] = useState<string | null>(null);

    useEffect(() => {
      setUserGmail(getCookie("user_gmail")); // Read cookies safely after hydration
    }, []);

    useEffect(() => {
     if (!userGmail) return
    const fetchTransactions = async() => {
        try {

          const response = await fetch(`${process.env.NEXT_PUBLIC_DJANGO_API_URL}/get-transactions/${userGmail}/`);
    
          if (!response.ok) throw new Error("Failed to fetch Transactions");
    
          const data  = await response.json();
          setTransactions(data)
        } catch (err: any) {
            console.error("Error receveing Transactions:", err);
        } finally {
            setLoading(false);
        }
    }
    fetchTransactions();
    },[userGmail]);

    const formatDate = (timestamp: string) => {
        const date = new Date(timestamp);
        return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`; // MM/DD/YYYY
      };
    
      const formatTime = (timestamp: string) => {
        return new Intl.DateTimeFormat("en-US", {
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
          hour12: true,
        }).format(new Date(timestamp)); // HH:MM:SS AM/PM
      };
    
      const getStatusBadge = (status: string) => {
        const statusStyles = {
          approved: "bg-green-500/20 text-green-400",
          canceled: "bg-red-500/20 text-red-400",
          pending: "bg-yellow-500/20 text-yellow-400",
        };
    
        const icons = {
          approved: <Check className="w-4 h-4" />,
          canceled: <X className="w-4 h-4" />,
          pending: <Clock className="w-4 h-4" />,
        };
    
        return (
          <span className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${statusStyles[status]}`}>
            {icons[status]} {status.charAt(0).toUpperCase() + status.slice(1)}
          </span>
        );
      };
  return (
    <div className={`list-none`}>
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
           <div className="flex-col space-y-1.5 p-6 flex items-center justify-between px-6 py-4">
            <div className="tracking-tight text-xl font-semibold text-white">
            Recent Activity
            </div>
            
            <Dialog open={openDialogPay} onOpenChange={() => {dispatch(setOpenDialogPay())}}>
        <DialogTrigger asChild>
        <Button className="bg-transparent hover:bg-transparent vara inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-9 px-4 py-2 text-blue-400 hover:text-blue-300">
              View All
        </Button>
        </DialogTrigger>
      <DialogContent className="max-w-[760px] p-0 border-0 bg-black rounded-2xl" >
      
     <div className={`h-full w-full list-none `}>
      <div className="relative h-full w-full rounded-2xl border p-1 md:p-3">
        <GlowingEffect
          spread={40}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
        />
        <div className="relative flex h-[450px] flex-col justify-between gap-6 overflow-hidden rounded-xl border-0.75 dark:shadow-[0px_0px_27px_0px_#2D2D2D]">
        <DialogTitle></DialogTitle>
        <PerfectScrollbar 
          options={{
            suppressScrollX: true, // Disable horizontal scroll
            wheelPropagation: false,
          }}
          className="h-full ">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-1/4">Date</TableHead>
              <TableHead className="w-1/4">Amount</TableHead>
              <TableHead className="w-1/4">Status</TableHead>
              <TableHead className="w-1/4">ID</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.length > 0 ? (
              transactions.map((transaction) => (
                <TableRow key={transaction.order} className="hover:bg-black/20">
                  <Countdown transactionId={transaction.order} turnOn={false}/>
                  <TableCell>{formatDate(transaction.created_at)}</TableCell>
                  <TableCell>{transaction.amount} {transaction.crypto_type} → {transaction.total_tokens} 𝕏</TableCell>
                  <TableCell>{getStatusBadge(transaction.status)}</TableCell>
                  <TableCell>
                    <a href={`/dashboard/order/${transaction.order}`} className="text-blue-400 hover:underline">
                      {transaction.order}
                    </a>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center text-gray-400 py-6">
                  No transactions found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        </PerfectScrollbar> 
      </div>

   </div>
   </div>
  </DialogContent>
    </Dialog>
           </div>
           {loading && 
           <div className="h-[400px] w-full flex justify-center items-center text-sm font-light text-white">
           <span className="flex items-center gap-2">
           Loading Transactions...
           <LoaderCircle className="w-4 h-4 text-blue-400 animate-spin" />
           </span>
           </div>}
           <div className=" pt-0 space-y-4 pb-6">
            {Array.isArray(transactions) && transactions.length > 0 ? transactions.slice(0,5).map((transaction, idx)=>
              <div key={idx} className="flex items-center justify-between p-4 rounded-lg bg-black/20 hover:bg-black/30 transition">
              <Link href={`/dashboard/order/${transaction.order}`} className="flex flex-1 items-center justify-between hover:-translate-y-2 transition-all duration-300 ease-in-out">
              <Countdown transactionId={transaction.order} turnOn={false}/>
              <div className=" flex items-center">
              {transaction.status === "canceled" ?
              <div className="p-3 rounded-full bg-red-500/20 mr-2 ">
              <X className="w-5 h-5 text-red-400 "/> 
              </div>
              : transaction.status === "approved" ?
              <div className="p-3 rounded-full bg-green-500/20 mr-2 ">
                  <Check className="w-5 h-5 text-green-400 "/> 
              </div>:
              <div className="p-3 rounded-full bg-yellow-500/20 mr-2">
              <Clock className="w-5 h-5 text-yellow-400 "/> 
          </div>
              }
              <div>
                  <p className="font-semibold text-white">{transaction.status === "canceled" ? "Declined" : transaction.status === "approved" ? "Approved" :"Pending"}</p>
                  <p className="text-sm text-gray-400">{transaction.amount}{" "}{transaction.crypto_type}{" "} →{" "}{transaction.total_tokens.toString()} 𝕏</p>
              </div>
              </div>
              <div className="text-right">
                  <p className="text-sm text-gray-400">{formatDate(transaction.created_at)}</p>
                  <p className="text-xs text-gray-500">{formatTime(transaction.created_at)}</p>
              </div>
              </Link>
              </div>):
              <div className="h-[200px] w-full flex justify-center items-center text-sm font-light text-white">
              <p className="items-center">
              No transactions found
              </p>
              </div> }
           </div>
          </div>
        </div>
      </div>
    </div>
  );
};
