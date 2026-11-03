// Base URL of json-server (started with: npm run server).
export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

// Shared helper: sends a request to json-server and returns the JSON result.
export async function request(path, options = {}) {
  let response;

  try {
    response = await fetch(`${API_URL}${path}`, {
      headers: { "Content-Type": "application/json" },
      ...options
    });
  } catch {
    throw new Error(
      "Cannot reach the server. Start it with: npm run server"
    );
  }

  if (!response.ok) {
    throw new Error(`Request failed (status ${response.status}).`);
  }

  return response.json();
}
