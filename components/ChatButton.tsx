"use client";
import { useState, useEffect } from "react";
import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function ChatButton() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && (window as any).smartsupp) {
      (window as any).smartsupp.on("chat:open", () => setIsOpen(true));
      (window as any).smartsupp.on("chat:close", () => setIsOpen(false));
    }
  }, []);

  const toggleChat = () => {
    (window as any).smartsupp?.chat?.toggle();
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.5 }}
      className="fixed bottom-6 right-6 z-50"
    >
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleChat}
        className="bg-blue-600 text-white p-4 rounded-full shadow-lg flex items-center gap-2"
      >
        <MessageCircle size={24} />
        {isOpen ? "Close Chat" : "Chat"}
      </motion.button>
    </motion.div>
  );
}
