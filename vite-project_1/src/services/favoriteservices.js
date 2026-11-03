import { request } from "./api.js";

export function getFavorites() {
  return request("/favorites");
}

export function addFavorite(eventId) {
  return request("/favorites", {
    method: "POST",
    body: JSON.stringify({ eventId })
  });
}

export function removeFavorite(favoriteId) {
  return request(`/favorites/${favoriteId}`, { method: "DELETE" });
}
