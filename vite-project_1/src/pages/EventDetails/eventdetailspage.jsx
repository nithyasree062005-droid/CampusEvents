import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import CountdownTimer from "../../components/countdowntimer/countdowntimer.jsx";
import { useEvents } from "../../context/eventcontext.jsx";
import { useFavorites } from "../../context/favouritecontext.jsx";

export default function EventDetailsPage() {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const { events, loading } = useEvents();
  const { favorites, toggleFavorite } = useFavorites();
  const [actionError, setActionError] = useState("");

  const event = events.find(item => String(item.id) === eventId);

  if (loading) {
    return <p className="page container" role="status">Loading event...</p>;
  }

  if (!event) {
    return (
      <section className="page container">
        <h1>Event not found</h1>
        <Link className="btn btn-primary btn-lg" to="/events">
          Browse all events
        </Link>
      </section>
    );
  }

  const isFavorite = favorites.has(String(event.id));

  async function handleFavorite() {
    setActionError("");
    try {
      await toggleFavorite(event.id);
    } catch (error) {
      setActionError(error.message || "Could not update favorites.");
    }
  }

  return (
    <section className="page container narrow">
      <button
        type="button"
        className="btn btn-secondary btn-lg back-button"
        onClick={() => navigate("/events")}
      >
        Back to Events
      </button>

      <article className="form-card detail-card">
        <div className="detail-top">
          <span className="chip">{event.category}</span>
          <span className="detail-id">Event ID: #{event.id}</span>
        </div>

        <h1>{event.title}</h1>
        <p className="detail-description">{event.description}</p>

        <div className="detail-box">
          <p><strong>Date:</strong> {event.date}</p>
          <p><strong>Venue:</strong> {event.venue}</p>
          {event.date && <CountdownTimer targetDate={event.date} />}
        </div>

        {actionError && (
          <p className="form-error" role="alert">{actionError}</p>
        )}

        <div className="event-actions">
          <Link className="btn btn-primary btn-lg" to={`/register/${event.id}`}>
            Register for this Event
          </Link>
          <button
            type="button"
            className={`btn btn-secondary btn-lg ${isFavorite ? "active" : ""}`}
            onClick={handleFavorite}
          >
            {isFavorite ? "Favorited" : "Add Favorite"}
          </button>
        </div>
      </article>
    </section>
  );
}
