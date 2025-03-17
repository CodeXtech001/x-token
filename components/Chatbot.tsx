// "use client"

// import { useState, useEffect, useRef } from "react";
// import { motion } from "framer-motion";
// import { Card, CardContent } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Send } from "lucide-react";
// import { useDispatch, useSelector } from "react-redux";
// import { RootState } from "@/app/store";
// import { fetchMessages, sendMessage } from "@/app/features/chatbot/chatbotSlice"

// const Chatbot = ({ usergmail }: { usergmail: string }) => {
//     const dispatch = useDispatch();
//     // const messages = useSelector((state: RootState) => state.chatbot.messages);
//     // const status = useSelector((state: RootState) => state.chatbot.status);
//     const [input, setInput] = useState("");
//     const messagesEndRef = useRef<HTMLDivElement | null>(null);
//     const [isTyping, setIsTyping] = useState(false);
  
//     // useEffect(() => {
//     //   if (usergmail) {
//     //     dispatch(fetchMessages(usergmail));
//     //   }
//     // }, [dispatch, usergmail]);
  
//     // useEffect(() => {
//     //   messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//     // }, [messages]);
  
//     const handleSendMessage = async () => {
//       if (!input.trim()) return;
//       dispatch(sendMessage({ usergmail, message: input }));
//       setInput("");
//       setIsTyping(true);
      
//       setTimeout(() => setIsTyping(false), 1000); // Simulating bot response delay
//     };
  
//     return (
//       <motion.div 
//         initial={{ opacity: 0, scale: 0.8 }}
//         animate={{ opacity: 1, scale: 1 }}
//         className="fixed bottom-4 right-4 w-full max-w-xs md:max-w-sm bg-black text-white p-4 rounded-2xl shadow-lg"
//       >
//         <Card className="bg-black border border-blue-500">
//           <CardContent className="h-80 overflow-y-auto p-2">
//             {messages.map((msg, index) => (
//               <motion.div 
//                 key={index}
//                 initial={{ opacity: 0, x: msg.sender === "user" ? 50 : -50 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 className={`p-2 my-1 rounded-lg ${msg.sender === "user" ? "bg-gray-700 ml-auto" : "bg-blue-500"}`}
//               >
//                 <span className="text-xs block text-gray-400">{new Date(msg.timestamp).toLocaleTimeString()}</span>
//                 {msg.message}
//               </motion.div>
//             ))}
//             {isTyping && <div className="text-gray-400 text-sm">Bot is typing...</div>}
//             <div ref={messagesEndRef} />
//           </CardContent>
//           <div className="flex items-center p-2 border-t border-blue-500">
//             <Input 
//               className="flex-1 bg-black text-white border-blue-500" 
//               placeholder="Type a message..." 
//               value={input} 
//               onChange={(e) => setInput(e.target.value)}
//             />
//             <Button onClick={handleSendMessage} disabled={status === "loading"} className="ml-2 bg-gray-700 hover:bg-gray-600">
//               <Send size={20} />
//             </Button>
//           </div>
//         </Card>
//       </motion.div>
//     );
//   };
  
//   export default Chatbot;
  