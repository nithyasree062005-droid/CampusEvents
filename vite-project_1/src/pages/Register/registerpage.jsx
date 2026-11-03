import { useParams } from "react-router-dom";
import RegistrationForm from "../../components/RegistrationForm/registrationform.jsx";

export default function RegisterPage() {
  // /register/:eventId pre-selects that event in the form.
  const { eventId } = useParams();

  return (
    <section className="page container narrow">
      <RegistrationForm key={eventId ?? "none"} defaultEventId={eventId ?? ""} />
    </section>
  );
}
