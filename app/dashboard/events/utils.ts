import { EventStatus } from "./_api/types";

/**
 * Returns a string depicting the day difference from now to an event.
 *
 * @param event_start The start date of the event
 * @param event_end The end date of the event
 * @returns The day difference of now and an event in string format.
 */
export function deltaDate(event_start: string, event_end: string): string {
  // Convert strings into milliseconds
  const [eventStartMs, eventEndMs] = [event_start, event_end].map((x) =>
    new Date(x).valueOf(),
  );
  const timeNowMs = new Date().valueOf();

  // Calculate the difference from `start -  now` (upDifference), and
  // `now - end` (downDifference) in days
  const BY_DAY = 1000 * 60 * 60 * 24;
  const upDifference = Math.floor((eventStartMs - timeNowMs) / BY_DAY);
  const downDifference = Math.floor((timeNowMs - eventEndMs) / BY_DAY);

  switch (calculateStatus(event_start, event_end)) {
    case "active":
      return "Currently ongoing";
    case "upcoming":
      return `${upDifference} ${upDifference === 1 ? "day" : "days"}`;
    case "past":
      return `${downDifference} ${downDifference === 1 ? "day" : "days"} ago`;
  }
}

/**
 * Calculates for the status of an event.
 *
 * @param event_start The start date of the event
 * @param event_end The end date of the event
 * @returns The status of the event
 */
export function calculateStatus(
  event_start: string,
  event_end: string,
): EventStatus {
  // Convert strings into milliseconds
  const [eventStartMs, eventEndMs] = [event_start, event_end].map((x) =>
    new Date(x).valueOf(),
  );
  const timeNowMs = new Date().valueOf();

  if (eventStartMs < timeNowMs && timeNowMs < eventEndMs) return "active";
  else if (timeNowMs < eventStartMs) return "upcoming";
  else return "past";
}
