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
import { useEffect, useState} from "react";
import { RegisterUser } from "@/lib/djangoQuery";
import { toast } from "sonner"
import { useRouter } from "next/navigation";


const formSchema = z.object({
    fullname: z.string().min(4),
    emailaddress: z.string().email(),
    password: z.string().min(6),
    confirmPassword: z.string().min(6),
    rememberMe: z.boolean(),
  }).refine((data)=>{
    return data.password === data.confirmPassword
  },{
    message:"Password do not match",
    path: ["confirmPassword"],
  }).refine((data)=>{
     return data.rememberMe === true
  },{
    message:"you must agree to the policy",
    path: ["rememberMe"],
  })
export function GlowingEffectDemo() {
  return ( <GridItem/>
 );
}


const GridItem = () => {

  const [loading, setLoading] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            fullname:"",
            emailaddress: "",
            password: "",
            confirmPassword:"",
            rememberMe: false,
        },
      })
    
      // 2. Define a submit handler.
      const router = useRouter();
      async function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        try {
          setLoading(true);
          const data = await RegisterUser(values); // Await the async function
          console.log("Registered>>>", data)

          toast.success("Registration successful!", {
            description: "Your account has been created.",
          });
          setTimeout(() => {
            router.push("/sign-in"); // Ensure smooth navigation
          }, 2000);
        } catch (error) {
          toast.error("Registration failed", {
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
        <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl border-0.75 p-6  dark:shadow-[0px_0px_27px_0px_#2D2D2D] md:p-6">
          <div className="relative flex flex-1 flex-col justify-between gap-3">
            <p className="mt-2 text-gray-400 text-center"> Already have an account? 
                <Link href="/sign-in" className="text-blue-400 hover:text-blue-300 transition-all duration-300 ">{" "}Sign in</Link></p>
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
          name="fullname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your full name" {...field} type="text"/>
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
      hidden: { opacity: 0, x: 50 * 3 },
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
           <motion.section
    ref={ref}
    initial="hidden"
    animate={controls}
    variants={{
      hidden: { opacity: 0, x: 50 * 4  },
      visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
    }}><FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
               <PasswordInput {...field} placeholder="Confirm your password"/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        </motion.section>
        <FormField
          control={form.control}
          name="rememberMe"
          render={({ field }) => (
        <FormItem>
        <FormControl>
       <div className="flex space-x-2 ">
       <Switch className="" id="Remember-me" checked ={field.value} onCheckedChange={field.onChange} />
       <p className="ml-2 block text-sm text-gray-300">I agree to the</p>
       <Link href="/privacy" className="text-blue-400 hover:text-blue-300 transition-all duration-300  text-sm ">Privacy Policy</Link>
       </div>
       </FormControl>
       <FormMessage />
       </FormItem> )} />
       <Button disabled={loading} type="submit" className="w-full text-white font-light bg-gradient-to-r from-blue-500 via-purple-500  to-blue-500 bg-[length:200%_200%] animate-gradient-move  border border-blue-300/60 hover:border-blue-300 group/button ">{!loading?<><span>Create Account</span> <ChevronRight className="w-6 h-6 group-hover/button:translate-x-4 transition-all duration-300 ease-in-out"/></>:<><span>Creating Account</span> <Disc3 className="animate-spin"/></>} </Button>
        
      </form>
    </Form>
            </div>
          </div>
        </div>
      </div>
  );
};
