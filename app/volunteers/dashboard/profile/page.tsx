"use client";

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
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectContent,
  SelectValue,
} from "@/components/ui/select";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import pencil_icon from "@/public/pencil_icon.svg";
import { useEffect, useState } from "react";
import useVolunteerUpdateMutation from "@/hooks/use-volunteer-update-mutation";
import { Database } from "@/utils/database.types";
import { Label } from "@radix-ui/react-label";

// Define form schema with password match validation
const formSchema = z.object({
  name: z.string(),
  nickname: z.string().optional(),
  occupation: z.string().optional(),
  phone_number: z
    .string()
    .regex(/^(0|63)9\d{9}$/, { message: "Invalid phone number" })
    .optional(),
  sex: z.string().optional(),
  age: z.number(),
});

type ProfileDataKey =
  | "name"
  | "nickname"
  | "occupation"
  | "phone_number"
  | "sex"
  | "age";

type Volunteer = Pick<
  Database["public"]["Tables"]["volunteer"]["Row"],
  ProfileDataKey
>;

export default function Profile() {
  const { data: volunteer, status } = useSingleUserQuery();
  const { mutate } = useVolunteerUpdateMutation();

  const [editProfileState, setEditProfileState] = useState(true);
  const form = useForm<Volunteer>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      nickname: "",
      occupation: "Student",
      phone_number: "",
      sex: "M",
      age: 0,
    },
  });

  useEffect(() => {
    form.setValue("name", volunteer?.name ?? "No name provided");
    form.setValue("nickname", volunteer?.nickname ?? "No nickname provided");
    form.setValue("occupation", volunteer?.occupation ?? "Student");
    form.setValue("phone_number", volunteer?.phone_number ?? "");
    form.setValue("sex", volunteer?.sex ?? "M");
    form.setValue("age", volunteer?.age ?? 0);
  }, [form, volunteer]);

  const occupation = ["Student", "Alumni", "Faculty", "Admin Staff", "Retiree"];

  if (status === "pending") {
    return <div>Loading...</div>;
  }

  if (status === "error") {
    return <div>Error loading user data.</div>;
  }

  const userMetaData = volunteer?.userData.user.user_metadata;
  const profilePicDimesnsion = 250;

  return (
    <div className="flex flex-col gap-5">
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
      <div className="space-y-7">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((data) => {
              mutate(data);
              setEditProfileState(true);
            })}
            className="space-y-8"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={editProfileState}
                      {...field}
                      className="bg-background disabled:bg-slate-200 placeholder:text-black disabled:cursor-default"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="nickname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nickname</FormLabel>
                  <FormControl>
                    <Input
                      disabled={editProfileState}
                      {...field}
                      value={field.value!}
                      className="bg-background disabled:bg-slate-200 placeholder:text-black disabled:cursor-default"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-col gap-2">
              <Label>Email</Label>
              <Input disabled value={volunteer.email} />
            </div>
            <FormField
              control={form.control}
              name="occupation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Occupation</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      disabled={editProfileState}
                    >
                      <FormControl>
                        <SelectTrigger className="bg-background disabled:bg-slate-200">
                          <SelectValue placeholder={field.value} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {occupation.map((value, index) => (
                          <SelectItem key={index} value={value}>
                            {value}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone_number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone No.</FormLabel>
                  <FormControl>
                    <Input
                      disabled={editProfileState}
                      {...field}
                      className="bg-background disabled:bg-slate-200 placeholder:text-black disabled:cursor-default"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="sex"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gender</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      disabled={editProfileState}
                    >
                      <FormControl>
                        <SelectTrigger className="bg-background disabled:bg-slate-200">
                          <SelectValue placeholder={field.value} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="M"> Male </SelectItem>
                        <SelectItem value="F">Female</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Age</FormLabel>
                  <FormControl>
                    <Input
                      disabled={editProfileState}
                      {...field}
                      value={field.value!}
                      onChange={(e) => field.onChange(+e.target.value)}
                      className="bg-background disabled:bg-slate-200 placeholder:text-black disabled:cursor-default"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-col gap-2">
              <Label>Hours Rendered</Label>
              <Input disabled value={volunteer.hours_rendered} />
            </div>

            <Button type="submit" variant={"outline"} className="w-fit">
              Save
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
