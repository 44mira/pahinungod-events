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

export type EventVolunteer = {
  volunteer_id: string;
  event_id: string;
  status: EventVolunteerStatus;
  time_logged: number;
};

export type EventVolunteerStatus = "accepted" | "rejected";
