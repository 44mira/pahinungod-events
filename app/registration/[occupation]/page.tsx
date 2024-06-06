"use client";

import { Button } from "@/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useRouter, useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import useCreateAlumni from "@/hooks/use-create-user-alumni";
import useCreateFaculty from "@/hooks/use-create-user-faculty";
import useCreateStudent from "@/hooks/use-create-user-student";
import useCreateRetiree from "@/hooks/use-create-user-retiree";
import useCreateAdminStaff from "@/hooks/use-create-user-admin-staff";

import {
  StudentSchema,
  StudentDefaults,
  AlumniSchema,
  AlumniDefaults,
  FacultySchema,
  FacultyDefaults,
  AdminStaffSchema,
  AdminStaffDefaults,
  RetireeSchema,
  RetireeDefaults,
} from "./_types/schemas";

export default function OccupationPage() {
  const { occupation: occupationParam } = useParams();
  const router = useRouter();

  const { mutate: updateStudent } = useCreateStudent();
  const { mutate: updateAlumni } = useCreateAlumni();
  const { mutate: updateFaculty } = useCreateFaculty();
  const { mutate: updateAdminStaff } = useCreateAdminStaff();
  const { mutate: updateRetiree } = useCreateRetiree();

  const studentForm = useForm<z.infer<typeof StudentSchema>>({
    resolver: zodResolver(StudentSchema),
    defaultValues: StudentDefaults,
  });

  const alumniForm = useForm<z.infer<typeof AlumniSchema>>({
    resolver: zodResolver(AlumniSchema),
    defaultValues: AlumniDefaults,
  });

  const facultyForm = useForm<z.infer<typeof FacultySchema>>({
    resolver: zodResolver(FacultySchema),
    defaultValues: FacultyDefaults,
  });

  const adminStaffForm = useForm<z.infer<typeof AdminStaffSchema>>({
    resolver: zodResolver(AdminStaffSchema),
    defaultValues: AdminStaffDefaults,
  });

  const retireeForm = useForm<z.infer<typeof RetireeSchema>>({
    resolver: zodResolver(RetireeSchema),
    defaultValues: RetireeDefaults,
  });

  return (
    <div className="min-w-full min-h-screen flex justify-center items-center">
      <Card>
        <CardHeader>
          <h1 className="text-lg font-bold">
            {(occupationParam as string).replace(/_/, " ").toUpperCase()}
          </h1>
        </CardHeader>
        <CardContent>
          {/* Title: Form {{{ */}
          {occupationParam === "student" && (
            <Form {...studentForm}>
              <form
                onSubmit={studentForm.handleSubmit((formData) => {
                  updateStudent(formData, {
                    onSuccess: () => router.push("/volunteers/dashboard"),
                  });
                })}
              >
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <FormField
                      control={studentForm.control}
                      name="college"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>College</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              value={field.value ?? undefined}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="space-y-2">
                    <FormField
                      control={studentForm.control}
                      name="degree"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Year & Degree</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              value={field.value ?? undefined}
                            />
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
                      control={studentForm.control}
                      name="fam_first_college"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Are you the first in the family to go to college?
                          </FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={(value) =>
                                field.onChange(value === "true")
                              }
                            >
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="true" />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  Yes
                                </FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="false" />
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
                      control={studentForm.control}
                      name="fam_first_up"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Are you the first in the family to study in
                            University of the Philippines?
                          </FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={(value) =>
                                field.onChange(value === "true")
                              }
                            >
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="true" />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  Yes
                                </FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="false" />
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
                <div className="flex flex-row-reverse mt-5">
                  <Button type="submit">Submit</Button>
                </div>
              </form>
            </Form>
          )}
          {occupationParam === "alumni" && (
            <Form {...alumniForm}>
              <form
                onSubmit={alumniForm.handleSubmit((formData) => {
                  updateAlumni(formData, {
                    onSuccess: () => router.push("/volunteers/dashboard"),
                  });
                })}
              >
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <FormField
                      control={alumniForm.control}
                      name="alumni_constituent"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>UP Constituent Unit</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              value={field.value ?? undefined}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="space-y-2">
                    <FormField
                      control={alumniForm.control}
                      name="alumni_college"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>College</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              value={field.value ?? undefined}
                            />
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
                      control={alumniForm.control}
                      name="alumni_course"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Course</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              value={field.value ?? undefined}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="space-y-2">
                    <FormField
                      control={alumniForm.control}
                      name="alumni_graduatedYr"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Year Graduated</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              value={field.value ?? undefined}
                            />
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
                      control={alumniForm.control}
                      name="alumni_occupation"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>UP Constituent Unit</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              value={field.value ?? undefined}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="space-y-2">
                    <FormField
                      control={alumniForm.control}
                      name="alumni_office"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Office/Department/Unit</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              value={field.value ?? undefined}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div className="flex flex-row-reverse mt-5">
                  <Button type="submit">Submit</Button>
                </div>
              </form>
            </Form>
          )}

          {occupationParam === "faculty" && (
            <Form {...facultyForm}>
              <form
                onSubmit={facultyForm.handleSubmit((formData) => {
                  updateFaculty(formData, {
                    onSuccess: () => router.push("/volunteers/dashboard"),
                  });
                })}
              >
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <FormField
                      control={facultyForm.control}
                      name="faculty_collegeDep"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>College Department</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              value={field.value ?? undefined}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div className="flex flex-row-reverse mt-5">
                  <Button type="submit">Submit</Button>
                </div>
              </form>
            </Form>
          )}

          {occupationParam === "admin_staff" && (
            <Form {...adminStaffForm}>
              <form
                onSubmit={adminStaffForm.handleSubmit((formData) => {
                  updateAdminStaff(formData, {
                    onSuccess: () => router.push("/volunteers/dashboard"),
                  });
                })}
              >
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <FormField
                      control={adminStaffForm.control}
                      name="adminStaff_office"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Office/Department/Unit</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              value={field.value ?? undefined}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="space-y-2">
                    <FormField
                      control={adminStaffForm.control}
                      name="adminStaff_position"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Position/Designation</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              value={field.value ?? undefined}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div className="flex flex-row-reverse mt-5">
                  <Button type="submit">Submit</Button>
                </div>
              </form>
            </Form>
          )}
          {occupationParam === "retiree" && (
            <Form {...retireeForm}>
              <form
                onSubmit={retireeForm.handleSubmit((formData) => {
                  updateRetiree(formData, {
                    onSuccess: () => router.push("/volunteers/dashboard"),
                  });
                })}
              >
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <FormField
                      control={retireeForm.control}
                      name="retiree_designation"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Designation while in UP</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              value={field.value ?? undefined}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="space-y-2">
                    <FormField
                      control={retireeForm.control}
                      name="retiree_office"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Office/Department/Unit</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              value={field.value ?? undefined}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div className="flex flex-row-reverse mt-5">
                  <Button type="submit">Submit</Button>
                </div>
              </form>
            </Form>
          )}

          {/* }}} */}
        </CardContent>
      </Card>
    </div>
  );
}
