export type Event = {
  event_id: string;
  admin_id: string;
  name: string;
  location: string;
  event_start: string;
  event_end: string;
  description: string | null;
};

export type EventStatus = "active" | "upcoming" | "past";
