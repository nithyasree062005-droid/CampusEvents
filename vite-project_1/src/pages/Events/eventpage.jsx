import { useEffect, useState } from "react";
import EventCard from "../../components/EventCard/eventcard.jsx";
import EventForm from "../../components/EventForm/eventform.jsx";
import { useEvents } from "../../context/eventcontext.jsx";
import { useFavorites } from "../../context/favouritecontext.jsx";

export default function EventsPage() {
  const { events, loading, error, retry, addEvent, editEvent, removeEvent } =
    useEvents();
  const { dropFavorite } = useFavorites();

  const [editingEvent, setEditingEvent] = useState(null);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [category, setCategory] = useState("All");

  // Debounce: wait 300ms after typing stops before filtering.
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search.trim().toLowerCase());
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  // Build the category dropdown from the loaded events.
  const categories = [
    "All",
    ...new Set(events.map(event => event.category).filter(Boolean))
  ];

  const filteredEvents = events.filter(event => {
    const matchesText =
      String(event.title ?? "").toLowerCase().includes(debouncedSearch) ||
      String(event.venue ?? "").toLowerCase().includes(debouncedSearch);

    const matchesCategory = category === "All" || event.category === category;

    return matchesText && matchesCategory;
  });

  function resetFilters() {
    setSearch("");
    setDebouncedSearch("");
    setCategory("All");
  }

  function handleEdit(event) {
    setEditingEvent(event);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleSubmit(eventData) {
    if (editingEvent) {
      await editEvent(editingEvent.id, eventData);
      setEditingEvent(null);
    } else {
      await addEvent(eventData);
    }
  }

  async function handleDelete(eventId) {
    await removeEvent(eventId);
    dropFavorite(eventId);

    if (editingEvent && String(editingEvent.id) === String(eventId)) {
      setEditingEvent(null);
    }
  }

  return (
    <section className="page container">
      <p className="eyebrow">DISCOVER YOUR CAMPUS</p>
      <h1>Upcoming Events</h1>
      <p className="page-subtitle">
        Find opportunities to learn, connect, and participate.
      </p>

      <EventForm
        key={editingEvent ? editingEvent.id : "new"}
        initialValues={editingEvent}
        onSubmit={handleSubmit}
        onCancel={() => setEditingEvent(null)}
      />

      {error && (
        <div className="error-box" role="alert">
          <p>{error}</p>
          <button type="button" className="btn btn-primary" onClick={retry}>
            Retry
          </button>
        </div>
      )}

      {loading ? (
        <p role="status">Loading events...</p>
      ) : (
        !error && (
          <>
            <div className="filter-bar">
              <input
                type="search"
                value={search}
                onChange={event => setSearch(event.target.value)}
                placeholder="Search events by title or venue..."
                aria-label="Search events by title or venue"
              />

              <select
                value={category}
                onChange={event => setCategory(event.target.value)}
                aria-label="Filter by category"
              >
                {categories.map(item => (
                  <option key={item} value={item}>
                    {item === "All" ? "All Categories" : item}
                  </option>
                ))}
              </select>

              <button
                type="button"
                className="btn btn-secondary btn-lg"
                onClick={resetFilters}
              >
                Reset Filters
              </button>
            </div>

            {filteredEvents.length === 0 ? (
              <p className="empty-text">No matching events found.</p>
            ) : (
              <div className="event-grid">
                {filteredEvents.map(event => (
                  <EventCard
                    key={event.id}
                    event={event}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                ))}
              </div>
            )}
          </>
        )
      )}
    </section>
  );
}
