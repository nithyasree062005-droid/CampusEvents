import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <section className="page container">
      <p className="eyebrow">404</p>
      <h1>Page not found</h1>
      <p className="page-subtitle">The page you requested does not exist.</p>
      <Link to="/" className="btn btn-primary btn-lg">Return home</Link>
    </section>
  );
}
