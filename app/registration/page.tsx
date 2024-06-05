"use client";

import useSingleUserQuery from "@/hooks/use-single-user-query";
import useCreateUser from "@/hooks/use-create_user-mutation";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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

export default function RegisterForm() {
  const { data: volunteer, isLoading, isError } = useSingleUserQuery();
  const { mutate: updateUser } = useCreateUser();
  const router = useRouter();
  // const isNewUser = !volunteer;

  const form = useForm<CreateUserFields>({
    resolver: zodResolver(CreateUserSchema),
    defaultValues: {
      name: "",
      nickname: "",
      phone_number: "",
      birth_date: "",
      age: null,
      sex: "",
      indigenous_affiliation: "",
      address: "",
      city: "",
      province: "",
      postal_code: null,
      region: "",
      occupation: undefined,
    },
  });

  const onSubmit = (formData: CreateUserFields) => {
    updateUser(formData, {
      onSuccess: () => {
        router.push("/volunteers/dashboard"); // Change this to your desired success redirect URL
      },
      onError: () => {
        alert("Error updating user. Please try again.");
      },
    });
  };

  // useEffect(() => {
  //   if (!isLoading && !isError && !isNewUser) {
  //     router.push("/volunteers/dashboard");

  //     return;
  //   }
  // }, [isLoading, isError, isNewUser, router]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading user data.</div>;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <pre>{JSON.stringify(volunteer, null, 2)}</pre>
        <div className="flex justify-center items-center min-h-screen">
          <Tabs defaultValue="basic" className="w-full max-w-2xl">
            <TabsList className="grid grid-cols-2 border-b border-gray-200 dark:border-gray-800">
              <TabsTrigger value="basic">Basic Information</TabsTrigger>
              <TabsTrigger value="address">Address</TabsTrigger>
            </TabsList>
            <TabsContent value="basic">
              <Card>
                <CardHeader>
                  <CardTitle>Basic Information</CardTitle>
                  <CardDescription>
                    Enter your personal details to create an account.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input {...field} />
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
                            <Input {...field} />
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
                        name="birth_date"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Birth Date</FormLabel>
                            <FormControl>
                              <Input type="date" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="space-y-2">
                      <FormField
                        control={form.control}
                        name="age"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Age</FormLabel>
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
                    <div className="space-y-2">
                      <FormField
                        control={form.control}
                        name="sex"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Gender</FormLabel>
                            <FormControl>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select Gender" />
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
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <FormField
                        control={form.control}
                        name="indigenous_affiliation"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Indigenous Affiliation</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="space-y-2">
                      <FormField
                        control={form.control}
                        name="phone_number"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <FormField
                        control={form.control}
                        name="occupation"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Occupation</FormLabel>
                            <FormControl>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select Occupation" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="Student">
                                    {" "}
                                    Student{" "}
                                  </SelectItem>
                                  <SelectItem value="Alumni">
                                    {" "}
                                    Alumni{" "}
                                  </SelectItem>
                                  <SelectItem value="Faculty">
                                    {" "}
                                    Faculty{" "}
                                  </SelectItem>
                                  <SelectItem value="Admin Staff">
                                    {" "}
                                    Admin Staff
                                  </SelectItem>
                                  <SelectItem value="Retiree">
                                    {" "}
                                    Retiree{" "}
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
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
                            <Input {...field} />
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
                              <Input {...field} />
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
                              <Input {...field} />
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
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select Region" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="NCR">
                                    National Capital Region (NCR)
                                  </SelectItem>
                                  <SelectItem value="CAR">
                                    Cordillera Administrative Region (CAR)
                                  </SelectItem>
                                  <SelectItem value="Region 1">
                                    Ilocos Region (Region I)
                                  </SelectItem>
                                  <SelectItem value="Region 2">
                                    Cagayan Valley (Region II)
                                  </SelectItem>
                                  <SelectItem value="Region 3">
                                    Central Luzon (Region III)
                                  </SelectItem>
                                  <SelectItem value="Region 4">
                                    Calabarzon (Region IV-A/Southern Tagalog
                                    Mainland)
                                  </SelectItem>
                                  <SelectItem value="Region 5">
                                    Bicol Region (Region V)
                                  </SelectItem>
                                  <SelectItem value="Region 6">
                                    Western Visayas (Region VI)
                                  </SelectItem>
                                  <SelectItem value="Region 7">
                                    Central Visayas (Region VII)
                                  </SelectItem>
                                  <SelectItem value="Region 8">
                                    Eastern Visayas (Region VIII)
                                  </SelectItem>
                                  <SelectItem value="Region 9">
                                    Zamboanga Peninsula (Region IX)
                                  </SelectItem>
                                  <SelectItem value="Region 10">
                                    Northern Mindanao (Region X)
                                  </SelectItem>
                                  <SelectItem value="Region 11">
                                    Davao Region (Region XI)
                                  </SelectItem>
                                  <SelectItem value="Region 12">
                                    Soccsksargen (Region XII)
                                  </SelectItem>
                                  <SelectItem value="Region 13">
                                    Caraga Region (Region XIII)
                                  </SelectItem>
                                  <SelectItem value="BARMM">
                                    Bangsamoro Autonomous Region in Muslim
                                    Mindanao (BARMM)
                                  </SelectItem>
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
