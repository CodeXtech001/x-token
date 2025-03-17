"use client";

import { Clock } from "lucide-react";
import { useEffect, useState } from "react";

const CountdownTimer = ({ transactionId, turnOn }: { transactionId: string ,turnOn: boolean}) => {
  const [timeLeft, setTimeLeft] = useState<number | null>(null);

  useEffect(() => {
    const fetchRemainingTime = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_DJANGO_API_URL}/check-transaction/`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ transaction_id: transactionId }),
        });

        const data = await res.json();

        if (res.ok) {
          setTimeLeft(data.remaining_time);
          localStorage.setItem(`tx_deadline_${transactionId}`, String(Date.now() + data.remaining_time * 1000));
        } else {
          setTimeLeft(0);
          localStorage.removeItem(`tx_deadline_${transactionId}`); // Cleanup localStorage
        }
      } catch (err) {
        console.error("Failed to fetch transaction status", err);
      }
    };

    // Check if there's already a stored deadline for this transaction
    const storedDeadline = localStorage.getItem(`tx_deadline_${transactionId}`);
    if (storedDeadline) {
      const remaining = Math.max(0, Math.floor((parseInt(storedDeadline) - Date.now()) / 1000));
      setTimeLeft(remaining);
    } else {
      fetchRemainingTime();
    }

    // Countdown interval
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === null) return prev;
        if (prev <= 1) {
          clearInterval(interval);
          cancelTransaction(); // Call backend to cancel transaction
          localStorage.removeItem(`tx_deadline_${transactionId}`); // Remove from localStorage
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [transactionId]);

  const cancelTransaction = async () => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_DJANGO_API_URL}/cancel-transaction/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ transaction_id: transactionId }),
      });
    } catch (err) {
      console.error("Failed to cancel transaction", err);
    }
  };

  return (
    <>
     {turnOn ?<>
      <Clock className="w-5 h-5 text-yellow-500" />
      <span className="text-yellow-500 font-mono">
        {timeLeft !== null ? `Time remaining: ${Math.floor(timeLeft / 60)}m ${timeLeft % 60}s` : "Loading..."}
      </span></>: null} 
    </>
  );
};

export default CountdownTimer;
