"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Image from "next/image";
// Icon Imports
import pencil_icon from "@/public/pencil_icon.svg";
import eye_close from "@/public/eye_close.svg";
import eye_open from "@/public/eye_open.svg";

// Define form schema with password match validation
const formSchema = z
  .object({
    email: z.string().min(2, {
      message: "Email must be at least 2 characters.",
    }),
    password: z.string().min(6, {
      message: "Password must be at least 6 characters.",
    }),
    retypePassword: z.string().min(6, {
      message: "Password must be at least 6 characters.",
    }),
    name: z.string().min(6, {
      message: "Name must be at least 6 characters.",
    }),
  })
  /*  Custom logic 
      if retypePassword does not match password.*/
  .refine((val) => val.password === val.retypePassword, {
    message: "Passwords do not match.",
    path: ["retypePassword"], // Set the path of the error to the retypePassword field
  });

// Define submit handler
function onSubmit(values: z.infer<typeof formSchema>) {
  // Do something with the form values.
  // ✅ This will be type-safe and validated.
  console.log(values);
}

// Edit State logic
export default function ProfileForm() {
  // Toggle between profile view & edit view.
  const [editProfileState, setEditProfileState] = useState(false);

  // Show and Hide password state.
  const [pwVisibility, setPwVisibility] = useState(false);

  /* Form Types */
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      retypePassword: "",
      name: "",
    },
  });

  const profile = [
    {
      name: "Owen Young Cariño",
      password: "random90",
      email: "admin1234",
    },
  ];

  return (
    <>
      <span className="text-end text-white">
        <Button
          size={"xs"}
          className=""
          onClick={() => setEditProfileState(!editProfileState)}
          variant={"accent"}
        >
          <Image src={pencil_icon} alt="pencil_icon" className="me-2" />
          Edit Profile
        </Button>
      </span>

      {/* Profile View */}
      {!editProfileState && (
        <div className="grid grid-cols-2">
          <div className="bg-neutral-100 rounded-md py-3 px-5 space-y-8 drop-shadow-lg shadow-lg">
            <div className="flex justify-between">
              <p className="font-semibold">Name</p>
              <p className="text-end">Owen Young Cariño</p>
            </div>
            <div className="flex justify-between">
              <p className="font-semibold">Email</p>
              <p className="text-end">oycarino@up.edu.ph</p>
            </div>
            <div className="flex justify-between">
              <p className="font-semibold">Password</p>
              <div className="flex space-x-2">
                <input
                  type={pwVisibility ? "text" : "password"}
                  readOnly
                  value={"admin123"}
                  className="border-0 outline-none bg-neutral-100 w-auto text-end"
                />
                <Image
                  src={pwVisibility ? eye_open : eye_close}
                  alt="eye open"
                  onClick={() => setPwVisibility(!pwVisibility)}
                  className="cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Profile */}
      {editProfileState && (
        <div className="grid grid-cols-3 ">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        {...field}
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
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter your password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="retypePassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Re-type Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Re-type your password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" variant={"accent"}>
                Save
              </Button>
            </form>
          </Form>
        </div>
      )}
    </>
  );
}
