import { Link, NavLink } from "react-router-dom";
import { useFavorites } from "../../context/favouritecontext.jsx";

export default function Navbar() {
  const { favoriteCount } = useFavorites();

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <Link className="logo" to="/" aria-label="CampusConnect home">
          CampusConnect
        </Link>

        <nav className="nav-links" aria-label="Main navigation">
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/events">Events</NavLink>
          <NavLink to="/register">Register</NavLink>
          <NavLink to="/favorites" className="nav-favorites">
            Favorites ({favoriteCount})
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
