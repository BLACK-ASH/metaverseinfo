"use client";
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from "next/image";

import z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2 } from "lucide-react"


import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { toast } from "sonner"
import { useForm } from "react-hook-form"
import { registerUser } from "@/lib/auth.action";
import { useRouter } from "next/navigation";


const formSchema = z.object({
  name: z.coerce.string().min(2).max(20),
  email: z.coerce.string().email(),
  password: z.coerce.string().min(8, "Password must be at least 8 characters").max(20, "Password must be at most 20 characters"),
  confirmPassword: z.coerce.string(),
})


export function RegisterForm({
  className,
  ...props
}) {

  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  })

  async function onSubmit(values) {
    if (values.password !== values.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    const res = await registerUser(values);

    if (res.status === 200) {
      toast.success(res.message);
      form.reset();
      router.push("/");
    }
    else {
      toast.error(res.message);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={cn("flex flex-col gap-6", className)} {...props}>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-2">
            <a href="/" className="flex flex-col items-center gap-2 font-medium">
              <Image src="/logo.png" alt="logo" width={30} height={30} />
              <p className="font-bold text-lg md:text-2xl">Metaverse <span className="text-red-500">Info</span></p>
            </a>
          </div>
          <div className="flex flex-col gap-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="youremail@gmail.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type={"password"} placeholder="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input type={"password"} placeholder="confirm password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button disabled={form.formState.isSubmitting} type="submit">
              {form.formState.isSubmitting ?
                <div className="flex items-center justify-center gap-2">
                  <Loader2 className="animate-spin" />
                  Please wait
                </div>
                :
                "Register"
              }

            </Button>
          </div>

        </div>
      </form>
      <div className="text-center mt-2 text-sm">
        Already have an account?{""}
        <a href="/login" className="underline underline-offset-4">
          Login
        </a>
      </div>
      <div
        className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </Form>
  );
}
