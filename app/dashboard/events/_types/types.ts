import { Database } from "@/utils/database.types";

export type Event = Database["public"]["Tables"]["events"]["Row"];

export type EventStatus = "active" | "upcoming" | "past";
