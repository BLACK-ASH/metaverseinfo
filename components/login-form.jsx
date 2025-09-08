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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { toast } from "sonner"
import { useForm } from "react-hook-form"
import { loginUser } from "@/lib/auth.action";
import { useRouter } from "next/navigation";


const formSchema = z.object({
  email: z.string().email(),
  password: z.string(),
})


export function LoginForm({
  className,
  ...props
}) {

  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmit(values) {
    const res = await loginUser(values);

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
            <Button disabled={form.formState.isSubmitting} type="submit">
              {form.formState.isSubmitting ?
                <div className="flex items-center justify-center gap-2">
                  <Loader2 className="animate-spin" />
                  Please wait
                </div>
                :
                "Login"
              }

            </Button>
          </div>

        </div>
      </form>
      <div className="text-center mt-2 text-sm">
        Don&apos;t have an account?{" "}
        <a href="/register" className="underline underline-offset-4">
          Register
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
