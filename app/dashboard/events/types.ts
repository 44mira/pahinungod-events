export type Event = {
  event_id: string;
  admin_id: string;
  name: string;
  location: string;
  event_start: string;
  event_end: string;
  orientation_start: string;
  orientation_end: string;
  description: string;
};

export type EventStatus = "active" | "upcoming" | "past";
