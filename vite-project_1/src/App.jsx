import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/navbar.jsx";
import Footer from "./components/Footer/footer.jsx";
import { EventProvider } from "./context/eventcontext.jsx";
import { FavoritesProvider } from "./context/favouritecontext.jsx";
import EventDetailsPage from "./pages/EventDetails/eventdetailspage.jsx";
import EventsPage from "./pages/Events/eventpage.jsx";
import FavoritesPage from "./pages/Favorites/favoritespage.jsx";
import HomePage from "./pages/Home/homepage.jsx";
import NotFoundPage from "./pages/Notfound/notfoundpage.jsx";
import RegisterPage from "./pages/Register/registerpage.jsx";
import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      <EventProvider>
        <FavoritesProvider>
          <div className="app-shell">
            <Navbar />
            <main>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/events" element={<EventsPage />} />
                <Route path="/events/:eventId" element={<EventDetailsPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/register/:eventId" element={<RegisterPage />} />
                <Route path="/favorites" element={<FavoritesPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </FavoritesProvider>
      </EventProvider>
    </BrowserRouter>
  );
}
