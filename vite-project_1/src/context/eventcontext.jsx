import { createContext, useContext, useEffect, useState } from "react";
import {
  createEvent,
  deleteEvent,
  getEvents,
  updateEvent
} from "../services/eventservices.js";
import {
  createRegistration,
  getRegistrations
} from "../services/registrationservices.js";

const EventContext = createContext(null);

export function EventProvider({ children }) {
  const [events, setEvents] = useState([]);
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [reloadKey, setReloadKey] = useState(0);

  // Load events and registrations from db.json (through json-server).
  useEffect(() => {
    async function loadData() {
      try {
        const [eventData, registrationData] = await Promise.all([
          getEvents(),
          getRegistrations()
        ]);
        setEvents(eventData);
        setRegistrations(registrationData);
        setError("");
      } catch (loadError) {
        setError(loadError.message || "Could not load events.");
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [reloadKey]);

  function retry() {
    setLoading(true);
    setReloadKey(previous => previous + 1);
  }

  async function addEvent(eventData) {
    const saved = await createEvent(eventData);
    setEvents(previous => [...previous, saved]);
  }

  async function editEvent(eventId, eventData) {
    const saved = await updateEvent(eventId, eventData);
    setEvents(previous =>
      previous.map(event =>
        String(event.id) === String(eventId) ? saved : event
      )
    );
  }

  async function removeEvent(eventId) {
    await deleteEvent(eventId);
    setEvents(previous =>
      previous.filter(event => String(event.id) !== String(eventId))
    );
    setRegistrations(previous =>
      previous.filter(item => String(item.eventId) !== String(eventId))
    );
  }

  async function addRegistration(registration) {
    const saved = await createRegistration(registration);
    setRegistrations(previous => [...previous, saved]);
    return saved;
  }

  function getRegistrationCount(eventId) {
    return registrations.filter(
      item => String(item.eventId) === String(eventId)
    ).length;
  }

  const value = {
    events,
    registrations,
    loading,
    error,
    retry,
    addEvent,
    editEvent,
    removeEvent,
    addRegistration,
    getRegistrationCount
  };

  return (
    <EventContext.Provider value={value}>
      {children}
    </EventContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useEvents() {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error("useEvents must be used within an EventProvider.");
  }
  return context;
}
