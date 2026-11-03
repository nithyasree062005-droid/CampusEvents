import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <section className="hero">
      <p className="eyebrow">YOUR CAMPUS, YOUR COMMUNITY</p>
      <h1>
        Make Your Campus
        <br />
        <span>Experience Count.</span>
      </h1>
      <p className="hero-text">
        Discover exciting events, meet new people, and make the most of your
        college life.
      </p>
      <div className="hero-buttons">
        <Link to="/events" className="btn btn-primary btn-lg">
          Explore Events
        </Link>
        <Link to="/register" className="btn btn-primary btn-lg">
          Register for an Event
        </Link>
      </div>
    </section>
  );
}
