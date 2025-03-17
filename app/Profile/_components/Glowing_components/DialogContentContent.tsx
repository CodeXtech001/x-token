"use client"
import { Button } from "@/components/ui/button"
import { DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useForm } from "react-hook-form";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { UpdateUserPassword } from "@/lib/djangoQuery";
import { toast } from "sonner";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import { PasswordInput } from "@/components/ui/password-input";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { Disc3 } from "lucide-react";


const formSchema = z.object({
  old_password: z.string().min(6),
  new_password: z.string().min(6),
  confirm_password: z.string().min(6),
  emailaddress: z.string().email(),
  
  }).refine((data)=>{
    return data.new_password === data.confirm_password
  },{
    message:"Password do not match",
    path: ["confirm_password"],
  })
function DialogContentContent({email, closeDialog}:{email : string, closeDialog: ()=> void}) {
    
    const [loading, setLoading] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          old_password: "",
          new_password: "",
          confirm_password: "",
          emailaddress: email,
        },
      })
    

      async function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        try {
          setLoading(true)
          const data = await UpdateUserPassword(values);
          toast.success("Password Updated", {
            description: String(data.message),
          });
            closeDialog();
        } catch (error : any) {
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
          <div className="relative flex flex-1 flex-col justify-between gap-3">  
    <DialogHeader>
      <DialogTitle>Change Password</DialogTitle>
    </DialogHeader>
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
    name="old_password"
    render={({ field }) => (
      <FormItem>
        <FormLabel>Old Password</FormLabel>
        <FormControl>
         <PasswordInput {...field} placeholder=""/>
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
          name="new_password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New Password</FormLabel>
              <FormControl>
               <PasswordInput {...field} placeholder=""/>
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
          name="confirm_password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm New Password</FormLabel>
              <FormControl>
               <PasswordInput {...field} placeholder=""/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        </motion.section>
        <DialogFooter>
    <Button disabled={loading} type="submit" className="w-full text-transparent bg-gradient-to-r font-light from-blue-500 via-purple-500  to-blue-500 bg-[length:200%_200%] animate-gradient-move  border hover:border-blue-300 text-white group/button">{!loading?<span>Update Password</span>:<><span>Updating Password</span><Disc3 className="animate-spin" /></>}</Button>
    </DialogFooter>
      </form>
    </Form>
   </div>
   </div>
   </div>
   </div>
  </DialogContent>
  )
}

export default DialogContentContent