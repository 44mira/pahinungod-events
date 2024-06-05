import { z } from "zod";

const DATETIME_LOCAL = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/;

export const AddEventSchema = z
  .object({
    event_id: z.string().uuid(),
    admin_id: z.string().uuid(),
    name: z.string().min(1, { message: "Event name is required" }),
    event_start: z.string().regex(DATETIME_LOCAL, {
      message: "Event start time is required",
    }),
    event_end: z.string().regex(DATETIME_LOCAL, {
      message: "Event end time is required",
    }),
    location: z.string(),
    description: z.string().nullable(),
    orientation_date: z.string().date().optional().nullable(),
    volunteer_cap: z.number().min(0).optional(),
  })
  .refine(
    ({ event_start, event_end }) =>
      new Date(event_start).valueOf() < new Date(event_end).valueOf(),
    {
      message: "Event start must be before event end.",
      path: ["event_start"],
    },
  );

export type AddEventFields = z.infer<typeof AddEventSchema>;

export const UpdateEventSchema = z
  .object({
    name: z.string().min(1, { message: "Event name is required" }),
    event_start: z.string().regex(DATETIME_LOCAL, {
      message: "Event start time is required",
    }),
    event_end: z.string().regex(DATETIME_LOCAL, {
      message: "Event end time is required",
    }),
    location: z.string(),
    description: z.string().nullable(),
    orientation_date: z.string().date().optional(),
  })
  .refine(
    ({ event_start, event_end }) =>
      new Date(event_start).valueOf() < new Date(event_end).valueOf(),
    {
      message: "Event start must be before event end.",
      path: ["event_start"],
    },
  );

export type UpdateEventFields = z.infer<typeof UpdateEventSchema>;

export const CreateUserSchema = z.object({
  name: z.string(),
  nickname: z.string(),
  phone_number: z
    .string()
    .regex(/^(0|63)9\d{9}$/, { message: "Invalid phone number" }),
  birth_date: z.string().date(),
  age: z.union([z.number(), z.null()]),
  sex: z.string(),
  indigenous_affiliation: z.string(),
  address: z.string(),
  city: z.string(),
  province: z.string(),
  postal_code: z.union([z.number(), z.null()]),
  region: z.string(),
  occupation: z.enum([
    "Student",
    "Faculty",
    "Retiree",
    "Alumni",
    "Admin Staff",
  ]),
  emergency_contact: z.string(),
  emergency_contact_name: z.string(),
  emergency_contact_affiliation: z.string(),
  emergency_contact_address: z.string(),
});

export type CreateUserFields = z.infer<typeof CreateUserSchema>;
