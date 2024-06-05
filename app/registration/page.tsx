"use client";

import useSingleUserQuery from "@/hooks/use-single-user-query";
import useCreateUser from "@/hooks/use-create-user-mutation";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function RegisterForm() {
  const { data: volunteer, isLoading, isError } = useSingleUserQuery();
  const { mutate: updateUser } = useCreateUser();
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState("");

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
      emergency_contact: "",
      emergency_contact_name: "",
      emergency_contact_affiliation: "",
      emergency_contact_address: "",

      college: "",
      degree: "",
      fam_first_college: "",
      fam_first_up: "",

      alumni_constituent: "",
      alumni_college: "",
      alumni_course: "",
      alumni_graduatedYr: "",
      alumni_occupation: "",
      alumni_office: "",

      faculty_collegeDep: "",

      adminStaff_office: "",
      adminStaff_position: "",

      retiree_designation: "",
      retiree_office: "",
    },
  });

  const onSubmit = (formData: CreateUserFields) => {
    updateUser(formData, {
      onSuccess: () => {
        router.push("/volunteers/dashboard");
      },
      onError: () => {
        alert("Error updating user. Please try again.");
      },
    });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading user data.</div>;
  }

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

  const occupation = ["Student", "Alumni", "Faculty", "Admin Staff", "Retiree"];
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
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
                            <FormLabel>Assigned Sex on Birth</FormLabel>
                            <FormControl>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select option" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="M"> Male </SelectItem>
                                  <SelectItem value="F">Female</SelectItem>
                                  <SelectItem value="Prefer Not to Say">
                                    Prefer Not to Say
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
                                onValueChange={setSelectedRole}
                                defaultValue={field.value}
                                value={selectedRole}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select Occupation" />
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
                    </div>
                  </div>
                  {selectedRole === "Student" && (
                    <div className="hidden-div">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <FormField
                            control={form.control}
                            name="college"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>College</FormLabel>
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
                            name="degree"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Year & Degree</FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 mt-4">
                        <div className="space-y-2">
                          <FormField
                            control={form.control}
                            name="fam_first_college"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>
                                  Are you the first in the family to go to
                                  college?
                                </FormLabel>
                                <FormControl>
                                  <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                  >
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                      <FormControl>
                                        <RadioGroupItem value="yes" />
                                      </FormControl>
                                      <FormLabel className="font-normal">
                                        Yes
                                      </FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                      <FormControl>
                                        <RadioGroupItem value="no" />
                                      </FormControl>
                                      <FormLabel className="font-normal">
                                        No
                                      </FormLabel>
                                    </FormItem>
                                  </RadioGroup>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <div className="space-y-2">
                          <FormField
                            control={form.control}
                            name="fam_first_up"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>
                                  Are you the first in the family to study in
                                  University of the Philippines?
                                </FormLabel>
                                <FormControl>
                                  <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                  >
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                      <FormControl>
                                        <RadioGroupItem value="yes" />
                                      </FormControl>
                                      <FormLabel className="font-normal">
                                        Yes
                                      </FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                      <FormControl>
                                        <RadioGroupItem value="no" />
                                      </FormControl>
                                      <FormLabel className="font-normal">
                                        No
                                      </FormLabel>
                                    </FormItem>
                                  </RadioGroup>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                  {selectedRole === "Alumni" && (
                    <div className="hidden-div">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <FormField
                            control={form.control}
                            name="alumni_constituent"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>UP Constituent Unit</FormLabel>
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
                            name="alumni_college"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>College</FormLabel>
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
                            name="alumni_course"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Course</FormLabel>
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
                            name="alumni_graduatedYr"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Year Graduated</FormLabel>
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
                            name="alumni_occupation"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>UP Constituent Unit</FormLabel>
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
                            name="alumni_office"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Office/Department/Unit</FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {selectedRole === "Faculty" && (
                    <div className="hidden-div">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <FormField
                            control={form.control}
                            name="faculty_collegeDep"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>College Department</FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {selectedRole === "Admin Staff" && (
                    <div className="hidden-div">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <FormField
                            control={form.control}
                            name="adminStaff_office"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Office/Department/Unit</FormLabel>
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
                            name="adminStaff_position"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Position/Designation</FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                  {selectedRole === "Retiree" && (
                    <div className="hidden-div">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <FormField
                            control={form.control}
                            name="retiree_designation"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Designation while in UP</FormLabel>
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
                            name="retiree_office"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Office/Department/Unit</FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {selectedRole === "" && <span></span>}
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
                            <Input {...field} />
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
                        name="emergency_contact"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Contact Number</FormLabel>
                            <FormControl>
                              <Input {...field} />
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
                                <Input {...field} />
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
