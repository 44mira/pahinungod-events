import { z } from "zod";

export const StudentSchema = z.object({
  college: z.string().nullable(),
  degree: z.string().nullable(),
  fam_first_college: z.boolean(),
  fam_first_up: z.boolean(),
});

export const AlumniSchema = z.object({
  alumni_constituent: z.string().nullable(),
  alumni_college: z.string().nullable(),
  alumni_course: z.string().nullable(),
  alumni_graduatedYr: z.string().nullable(),
  alumni_occupation: z.string().nullable(),
  alumni_office: z.string().nullable(),
});

export const FacultySchema = z.object({
  faculty_collegeDep: z.string().nullable(),
});

export const AdminStaffSchema = z.object({
  adminStaff_office: z.string().nullable(),
  adminStaff_position: z.string().nullable(),
});

export const RetireeSchema = z.object({
  retiree_designation: z.string().nullable(),
  retiree_office: z.string().nullable(),
});

export const AlumniDefaults = {
  alumni_constituent: "",
  alumni_college: "",
  alumni_course: "",
  alumni_graduatedYr: "",
  alumni_occupation: "",
  alumni_office: "",
};

export const StudentDefaults = {
  college: "",
  degree: "",
  fam_first_college: false,
  fam_first_up: false,
};

export const FacultyDefaults = {
  faculty_collegeDep: "",
};

export const AdminStaffDefaults = {
  adminStaff_office: "",
  adminStaff_position: "",
};

export const RetireeDefaults = {
  retiree_designation: "",
  retiree_office: "",
};
