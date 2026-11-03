import { Link } from "react-router-dom";
import EventCard from "../../components/EventCard/eventcard.jsx";
import { useEvents } from "../../context/eventcontext.jsx";
import { useFavorites } from "../../context/favouritecontext.jsx";

export default function FavoritesPage() {
  const { events, loading } = useEvents();
  const { favorites } = useFavorites();

  const favoriteEvents = events.filter(event =>
    favorites.has(String(event.id))
  );

  return (
    <section className="page container">
      <p className="eyebrow">YOUR PICKS</p>
      <h1>Favorite Events</h1>
      <p className="page-subtitle">Events you have saved for later.</p>

      {loading ? (
        <p role="status">Loading events...</p>
      ) : favoriteEvents.length === 0 ? (
        <div className="empty-box">
          <p>No favorite events yet. Open the Events page and click Add Favorite.</p>
          <Link className="btn btn-primary btn-lg" to="/events">
            Browse Events
          </Link>
        </div>
      ) : (
        <div className="event-grid">
          {favoriteEvents.map(event => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </section>
  );
}
