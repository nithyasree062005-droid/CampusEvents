import Hero from './components/hero.jsx';
import Header from "./components/Header.jsx";
import Events from './components/Events.jsx';
import Categories from './components/categories.jsx';
import Schedule from './components/schedule.jsx';
import Register from './components/Register.jsx';
import Footer from './components/Footer.jsx';
import './index.css';

export default function App() {
  return (
    <div className="app-container">
      <main className="container">
        <Hero />
        <Events />
        <Categories />
        <Schedule />
        <Register />
      </main>
      <Footer />
    </div>
  );
}