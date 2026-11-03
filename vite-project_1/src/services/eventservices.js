import { request } from "./api.js";

export function getEvents() {
  return request("/events");
}

export function createEvent(eventData) {
  return request("/events", {
    method: "POST",
    body: JSON.stringify(eventData)
  });
}

export function updateEvent(eventId, eventData) {
  return request(`/events/${eventId}`, {
    method: "PATCH",
    body: JSON.stringify(eventData)
  });
}

// _dependent also removes this event's registrations and favorites.
export function deleteEvent(eventId) {
  return request(
    `/events/${eventId}?_dependent=registrations&_dependent=favorites`,
    { method: "DELETE" }
  );
}
