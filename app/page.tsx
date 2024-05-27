"use client";

import {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormField,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import logo from "@/public/logo.png";
const formSchema = z.object({
  username: z.string().min(6, {
    message: "Username must be at least 6 characters.",
  }),
  password: z.string().min(6, {
    message: "Password must contain at least 6 characters.",
  }),
});

export default function Home() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  const logoDimensions = 150;
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-9 fixed top-1/2 left-1/2 -translate-y-1/2
        -translate-x-1/2 bg-gradient-to-br from-slate-50 to-neutral-200
        shadow-lg p-10 w-96 rounded-lg drop-shadow-lg"
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="">
              <Image
                src={logo}
                alt={"pahinungod logo"}
                height={logoDimensions}
                width={logoDimensions}
                className="mx-auto mb-10"
              />
              <FormLabel className="font-semibold">Username</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter username"
                  {...field}
                  className=" border-slate-200 outline-none
                  focus-visible:outline-blue-400 focus-visible:ring-0 bg-white"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="">
              <FormLabel className="font-semibold">Password</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter password"
                  {...field}
                  className="border-slate-200 outline-none
                  focus-visible:outline-blue-400 focus-visible:ring-0 bg-white"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button variant={"destructive"} type="submit" className="bg-accent">
          Login
        </Button>
      </form>
    </Form>
  );
}
