"use client";

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { GlowingEffect } from "@/components/ui/glowing-effect";
import Link from "next/link";
import { ChevronRight, Disc3 } from "lucide-react";
import { PasswordInput } from "@/components/ui/password-input";
import { Switch } from "@/components/ui/switch"
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import { Login } from "@/lib/djangoQuery";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setUserData } from "@/app/features/userdata/usedataSlice";



const formSchema = z.object({
    emailaddress: z.string().email(),
    password: z.string().min(6),
  })
export function GlowingEffectDemo() {
  return ( <GridItem/>
 );
}


const GridItem = () => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            emailaddress: "",
            password: "",
        },
      })
    
      // 2. Define a submit handler.
      const router = useRouter();
      async function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        try {
          setLoading(true);
          const data = await Login(values);
        
          document.cookie = `user_gmail=${data.usergmail}; path=/;`; // 🔹 Sync token to cookies
          router.push("/dashboard"); // ✅ Ensure redirection happens regardless
        } catch (error) {
          toast.error("Login failed", {
            description: String(error),
          });
        } finally {
          setLoading(false);
        }
      }

      const controls = useAnimation(); // Controls the animation
      const { ref, inView } = useInView({ triggerOnce: false, threshold: 0.2 }); // Detects visibility
    
      useEffect(() => {
        if (inView) {
          controls.start("visible");
        } else {
          controls.start("hidden");
        }
      }, [controls, inView]);

  return (
    <div className={`min-h-[14rem] max-w-[450px] w-full list-none`}>
      <div className="relative h-full w-full rounded-2xl border p-1 md:p-3">
        <GlowingEffect
          spread={40}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
        />
        <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl border-0.75 p-6 dark:shadow-[0px_0px_27px_0px_#2D2D2D] md:p-6">
          <div className="relative flex flex-1 flex-col justify-between gap-3">
            <h1 className="text-3xl font-bold text-center bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Welcome Back</h1>
            <p className="mt-2 text-gray-400 text-center"> New to our platform? 
                <Link href="/sign-up" className="text-blue-400 hover:text-blue-300 transition-all duration-300 relative">{" "}Create an account</Link></p>
          <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
      <motion.section
    ref={ref}
    initial="hidden"
    animate={controls}
    variants={{
      hidden: { opacity: 0, x: 50 },
      visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
    }}><FormField
          control={form.control}
          name="emailaddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <Input placeholder="Enter your email" {...field} type="text"/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </motion.section>
    <motion.section
    ref={ref}
    initial="hidden"
    animate={controls}
    variants={{
      hidden: { opacity: 0, x: 50 * 2 },
      visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
    }}><FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
               <PasswordInput {...field} placeholder="Enter your password"/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        </motion.section>
        <FormControl>
       <div className="flex space-x-2 ">
       <Switch className="" id="Remember-me" />
       <p className="ml-2 block text-sm text-gray-300">Remember me</p>
       </div>
       </FormControl>
       <Button disabled={loading} type="submit" className="w-full text-white font-light bg-gradient-to-r from-blue-500 via-purple-500  to-blue-500 bg-[length:200%_200%] animate-gradient-move  border border-blue-300/60 hover:border-blue-300 group/button">{!loading?<><span>Sign In</span><ChevronRight className="w-6 h-6 group-hover/button:translate-x-4 transition-all duration-300 ease-in-out"/></>:<><span>Signing In</span><Disc3 className="animate-spin"/></>}</Button>
        
      </form>
    </Form>
            </div>
          </div>
        </div>
      </div>
  );
};
