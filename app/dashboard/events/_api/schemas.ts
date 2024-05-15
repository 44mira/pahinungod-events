import { z } from "zod";

const DATETIME_LOCAL = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/;

export const AddEventSchema = z
  .object({
    event_id: z.string().uuid(),
    admin_id: z.string().uuid(),
    name: z.string({ required_error: "Event name is required" }),
    event_start: z.string().regex(DATETIME_LOCAL, {
      message: "Event start time is required",
    }),
    event_end: z.string().regex(DATETIME_LOCAL, {
      message: "Event end time is required",
    }),
    location: z.string(),
    description: z.string().nullable(),
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