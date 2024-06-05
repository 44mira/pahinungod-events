"use client";

import { Label } from "@/components/ui/label";
import useSingleUserQuery from "@/hooks/use-single-user-query";
import Image from "next/image";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import pencil_icon from "@/public/pencil_icon.svg";
import { useState } from "react";

// Define form schema with password match validation
const formSchema = z.object({
  name: z.string(),
  nickname: z.string(),
  email: z.string(),
  occupation: z.string().optional(),
  phone_number: z.string().optional(),
  sex: z.string().optional(),
  age: z.string().optional(),
});

type ProfileDataKey =
  | "name"
  | "nickname"
  | "email"
  | "occupation"
  | "phone_number"
  | "sex"
  | "age";

export default function Profile() {
  const { data: volunteer, isLoading, isError } = useSingleUserQuery();

  const [editProfileState, setEditProfileState] = useState(true);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const ProfileDataTemplate: {
    label: string;
    valueKey?: string | number | null;
    column: ProfileDataKey;
  }[] = [
    { label: "Full name", valueKey: volunteer?.name, column: "name" },
    { label: "Nickname", valueKey: volunteer?.nickname, column: "nickname" },
    { label: "E-mail", valueKey: volunteer?.email, column: "email" },
    {
      label: "Occupation",
      valueKey: volunteer?.occupation,
      column: "occupation",
    },
    {
      label: "Phone No.",
      valueKey: volunteer?.phone_number,
      column: "phone_number",
    },
    { label: "Sex", valueKey: volunteer?.sex, column: "sex" },
    { label: "Age", valueKey: volunteer?.age, column: "age" },
  ];

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading user data.</div>;
  }

  const userMetaData = volunteer?.userData.user.user_metadata;

  const profilePicDimesnsion = 250;

  return (
    <>
      <div className="w-32 h-32 bg-gray-500 rounded-full mx-auto">
        <Image
          src={userMetaData?.picture}
          alt="profile picture"
          width={profilePicDimesnsion}
          height={profilePicDimesnsion}
          className="rounded-full"
        />
      </div>
      <span className=" text-white">
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
      <div className="pt-10 space-y-7">
        <Form {...form}>
          <form
            /* onSubmit={form.handleSubmit((data) => {
                mutate(data);
                setEditProfileState(false);
              })} */
            className="space-y-8"
          >
            {ProfileDataTemplate.map(({ label, valueKey, column }) => (
              <FormField
                key={column}
                control={form.control}
                name={column}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                      <Input
                        disabled={editProfileState}
                        placeholder={valueKey?.toString()}
                        {...field}
                        className="bg-slate-200 disabled:bg-slate-200 placeholder:text-black placeholder:bg-slate-200 disabled:cursor-default"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
          </form>
        </Form>
      </div>
      <Button type="submit" variant={"outline"}>
        Save
      </Button>
    </>
  );
}
