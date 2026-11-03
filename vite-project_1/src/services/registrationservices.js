import { request } from "./api.js";

export function getRegistrations() {
  return request("/registrations");
}

export function createRegistration(registration) {
  return request("/registrations", {
    method: "POST",
    body: JSON.stringify(registration)
  });
}
