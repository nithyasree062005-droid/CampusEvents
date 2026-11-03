import { useState } from "react";
import { Link } from "react-router-dom";
import { useEvents } from "../../context/eventcontext.jsx";
import { useFavorites } from "../../context/favouritecontext.jsx";

// onEdit and onDelete are optional: the Favorites page leaves them out.
function EventCard({ event, onEdit, onDelete }) {
  const [actionError, setActionError] = useState("");
  const { getRegistrationCount } = useEvents();
  const { favorites, toggleFavorite } = useFavorites();
  const isFavorite = favorites.has(String(event.id));

  async function handleFavorite() {
    setActionError("");
    try {
      await toggleFavorite(event.id);
    } catch (error) {
      setActionError(error.message || "Could not update favorites.");
    }
  }

  async function handleDelete() {
    if (!window.confirm(`Delete "${event.title}"?`)) {
      return;
    }

    setActionError("");
    try {
      await onDelete(event.id);
    } catch (error) {
      setActionError(error.message || "Could not delete the event.");
    }
  }

  return (
    <article className="event-card">
      <div className="event-banner">{event.category}</div>

      <div className="event-details">
        <span className="category">{event.category}</span>
        <h2>{event.title}</h2>
        <p className="event-description">{event.description}</p>

        <p><strong>Date:</strong> {event.date}</p>
        <p><strong>Venue:</strong> {event.venue}</p>
        <p><strong>Registrations:</strong> {getRegistrationCount(event.id)}</p>
        <p><strong>Event ID:</strong> {event.id}</p>

        {actionError && (
          <p className="form-error" role="alert">{actionError}</p>
        )}

        <div className="event-actions">
          <Link className="btn btn-primary" to={`/register/${event.id}`}>
            Register
          </Link>

          <button
            type="button"
            className={`btn btn-favorite ${isFavorite ? "active" : ""}`}
            onClick={handleFavorite}
          >
            {isFavorite ? "Favorited" : "Add Favorite"}
          </button>
        </div>

        <div className="event-actions">
          <Link className="btn btn-dark" to={`/events/${event.id}`}>
            View Details
          </Link>

          {onEdit && (
            <button
              type="button"
              className="btn btn-edit"
              onClick={() => onEdit(event)}
            >
              Edit Event
            </button>
          )}

          {onDelete && (
            <button
              type="button"
              className="btn btn-delete"
              onClick={handleDelete}
            >
              Delete Event
            </button>
          )}
        </div>
      </div>
    </article>
  );
}

export default EventCard;
