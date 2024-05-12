import { z } from "zod";

export const AddEventSchema = z
  .object({
    event_id: z.string().uuid(),
    admin_id: z.string().uuid(),
    name: z.string({ required_error: "Event name is required" }),
    event_start: z
      .string()
      .datetime({ message: "Event start time is required" }),
    event_end: z.string().datetime({ message: "Event end time is required" }),
    location: z.string(),
    description: z.string().nullable(),
  })
  .refine(
    ({ event_start, event_end }) => new Date(event_start) < new Date(event_end),
    {
      message: "Event start must be before Event end.",
      path: ["event_start", "event_end"],
    },
  );

export type AddEventFields = z.infer<typeof AddEventSchema>;
