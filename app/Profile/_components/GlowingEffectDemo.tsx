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
import {
    Dialog,
    DialogContent,
    DialogOverlay,
    DialogPortal,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
  import { Input } from "@/components/ui/input"
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { Disc3, Lock, Save } from "lucide-react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import { UpdateProfileName } from "@/lib/djangoQuery";
import { toast } from "sonner";
import DialogContentContent from "./Glowing_components/DialogContentContent";
import { UserDocument } from "@/lib/typescript";
import { getCookie } from "@/middleware";



const formSchema = z.object({
    fullname: z.string().min(4),
    emailaddress: z.string().email(),
    
  })
export function GlowingEffectDemo() {
  return ( <GridItem/>
 );
}


const GridItem = () => {

  const [userClick , setUserClick] = useState(false);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [userDucument, setUserDucument] = useState<UserDocument | null>(null);

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

  const handleClick = () => {
    if (!userClick) {
      setUserClick(true);
      setTimeout(() => setUserClick(false), 3000); // Resets after 3 seconds
    }
  };
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullname: "",
      emailaddress: "",
    },
  });

  // ✅ Reset form when user data is available
  useEffect(() => {
    if (userDucument) {
      form.reset({
        fullname: userDucument.username || "",
        emailaddress: userDucument.usergmail || "",
      });
    }
  }, [userDucument, form]);
  
    
      // 2. Define a submit handler.
      async function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        if(!userClick) return null;

        try {
          setLoading(true)
          const data = await UpdateProfileName(values);
          toast.success("Profile Updated", {
            description: String(data.message),
          });

        } catch (error) {
          toast.error("Update failed", {
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
    <div className={`min-h-[14rem]  w-full list-none mt-8`}>
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
            <h1 className="tracking-tight text-2xl font-semibold text-white text-center ">Personal Information</h1>
          <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
      <motion.section
    ref={ref}
    initial="hidden"
    animate={controls}
    variants={{
      hidden: { opacity: 0, x: 50 * 2 },
      visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
    }}><FormField
    control={form.control}
    name="fullname"
    render={({ field }) => (
      <FormItem>
        <FormLabel>Full Name</FormLabel>
        <FormControl>
          <Input placeholder="" {...field} type="text"/>
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
      hidden: { opacity: 0, x: 50 },
      visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
    }}><FormField
          disabled={true}
          control={form.control}
          name="emailaddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} type="text"/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </motion.section>
       <div className="flex flex-col sm:flex-row sm:items-center gap-4">
       <Button disabled={loading} type="submit" onClick={handleClick} className="w-full text-transparent bg-gradient-to-r text-white font-light  from-blue-500 via-purple-500  to-blue-500 bg-[length:200%_200%] animate-gradient-move  border hover:border-blue-300 group/button">{!loading?<><Save className="w-6 h-6 mr-2"/><span>Save Changes</span></>:<><span>Saving Changes</span><Disc3 className="animate-spin" /></>}</Button>
       <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="w-full text-white font-light bg-black  hover:bg-gradient-to-r hover:from-blue-500 hover:via-purple-500 hover:to-blue-500 bg-[length:200%_200%] hover:animate-gradient-move border border-blue-300/35 hover:border-blue-300 transition-colors duration-500 ease-in-out group/button">
            <Lock className="w-6 h-6 mr-2" />
            <span>Change Password</span>
          </Button>
        </DialogTrigger>
        <DialogPortal>
        <DialogTitle>
        </DialogTitle>
          <DialogOverlay className="fixed inset-0" />
          <DialogContent className="sm:max-w-[460px] border-0 bg-black rounded-2xl ">
            <DialogContentContent email={userDucument?.usergmail!} closeDialog ={()=>{setOpen(false)}} />
          </DialogContent>
        </DialogPortal>
      </Dialog>
       </div>
      </form>
    </Form>
            </div>
          </div>
        </div>
      </div>
  );
};
