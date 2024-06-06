"use client";

import type { Database } from "@/utils/database.types";
import useCreateVolunteer from "@/hooks/use-create-volunteer-mutation";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  CreateUserFields,
  CreateUserSchema,
} from "@/app/dashboard/events/_types/schemas";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Form,
  FormItem,
  FormField,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectContent,
  SelectValue,
} from "@/components/ui/select";
import BasicTab from "./BasicTab";

type Volunteer = Database["public"]["Tables"]["volunteer"]["Row"];

export default function RegisterForm() {
  const { mutate: updateUser } = useCreateVolunteer();
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState("");

  const form = useForm<CreateUserFields>({
    resolver: zodResolver(CreateUserSchema),
    defaultValues: {
      name: "",
      nickname: "",
      phone_number: "",
      birth_date: "",
      age: 0,
      sex: "",
      indigenous_affiliation: "",
      address: "",
      city: "",
      province: "",
      postal_code: 1000,
      region: "",
      occupation: undefined,
      emergency_contact: "",
      emergency_contact_name: "",
      emergency_contact_affiliation: "",
      emergency_contact_address: "",
    },
  });

  const onSubmit = (
    formData: Omit<
      Volunteer,
      "volunteer_id" | "hours_rendered" | "email" | "picture"
    >,
  ) => {
    updateUser(
      { ...(formData as any) },
      {
        onSuccess: () => {
          router.push(
            `/registration/${selectedRole.toLowerCase().replace(/\s/, "_")}`,
          );
        },
        // onError: () => {
        //   alert("Error updating user. Please try again.");
        // },
      },
    );
  };

  const regions = [
    { value: "NCR", label: "National Capital Region (NCR)" },
    { value: "CAR", label: "Cordillera Administrative Region (CAR)" },
    { value: "Region 1", label: "Ilocos Region (Region I)" },
    { value: "Region 2", label: "Cagayan Valley (Region II)" },
    { value: "Region 3", label: "Central Luzon (Region III)" },
    {
      value: "Region 4",
      label: "Calabarzon (Region IV-A/Southern Tagalog Mainland)",
    },
    { value: "Region 5", label: "Bicol Region (Region V)" },
    { value: "Region 6", label: "Western Visayas (Region VI)" },
    { value: "Region 7", label: "Central Visayas (Region VII)" },
    { value: "Region 8", label: "Eastern Visayas (Region VIII)" },
    { value: "Region 9", label: "Zamboanga Peninsula (Region IX)" },
    { value: "Region 10", label: "Northern Mindanao (Region X)" },
    { value: "Region 11", label: "Davao Region (Region XI)" },
    { value: "Region 12", label: "Soccsksargen (Region XII)" },
    { value: "Region 13", label: "Caraga Region (Region XIII)" },
    {
      value: "BARMM",
      label: "Bangsamoro Autonomous Region in Muslim Mindanao (BARMM)",
    },
  ];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit((formData) => onSubmit(formData))}>
        <div className="flex justify-center items-center min-h-screen">
          <Tabs defaultValue="basic" className="w-full max-w-2xl">
            <TabsList className="grid grid-cols-3 border-b border-gray-200 dark:border-gray-800">
              <TabsTrigger value="basic">Basic Information</TabsTrigger>
              <TabsTrigger value="address">Address</TabsTrigger>
              <TabsTrigger value="emergencyContact">
                Emergency Contact
              </TabsTrigger>
            </TabsList>
            <TabsContent value="basic">
              <BasicTab
                form={form}
                roleState={{ selectedRole, setSelectedRole }}
              />
            </TabsContent>
            <TabsContent value="address">
              <Card>
                <CardHeader>
                  <CardTitle>Address</CardTitle>
                  <CardDescription>Enter your address details.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Address</FormLabel>
                          <FormControl>
                            <Input {...field} value={field.value!} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>City</FormLabel>
                            <FormControl>
                              <Input {...field} value={field.value!} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="space-y-2">
                      <FormField
                        control={form.control}
                        name="province"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Province</FormLabel>
                            <FormControl>
                              <Input {...field} value={field.value!} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="space-y-2">
                      <FormField
                        control={form.control}
                        name="region"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Region</FormLabel>
                            <FormControl>
                              <Select
                                onValueChange={field.onChange}
                                value={field.value!}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select Region" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {regions.map(({ value, label }, index) => (
                                    <SelectItem key={index} value={value}>
                                      {label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <FormField
                          control={form.control}
                          name="postal_code"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Zip Code</FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  {...field}
                                  value={field.value || ""}
                                  onChange={(e) => {
                                    const value =
                                      e.target.value === ""
                                        ? null
                                        : Number(e.target.value);
                                    field.onChange(value);
                                  }}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="emergencyContact">
              <Card>
                <CardHeader>
                  <CardTitle>Emergency Contact</CardTitle>
                  <CardDescription>
                    Person to Contact in Case of Emergency
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 gap-4">
                    <FormField
                      control={form.control}
                      name="emergency_contact_name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input {...field} value={field.value!} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <FormField
                        control={form.control}
                        name="emergency_contact_affiliation"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Relationship</FormLabel>
                            <FormControl>
                              <Input {...field} value={field.value!} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="space-y-2">
                      <FormField
                        control={form.control}
                        name="emergency_contact"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Contact Number</FormLabel>
                            <FormControl>
                              <Input {...field} value={field.value!} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-2">
                      <FormField
                        control={form.control}
                        name="emergency_contact_address"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Present Address</FormLabel>
                            <FormControl>
                              <FormControl>
                                <Input {...field} value={field.value!} />
                              </FormControl>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button type="submit">Create Account</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </form>
    </Form>
  );
}
