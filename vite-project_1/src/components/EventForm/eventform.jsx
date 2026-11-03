import { useEffect, useRef, useState } from "react";

const emptyForm = {
  title: "",
  category: "Tech",
  date: "",
  venue: "",
  description: ""
};

const categories = ["Tech", "Culture", "Sports", "Design", "Workshop", "General"];

// Used for both adding a new event and editing an existing one.
// Pass initialValues (an event) to start in edit mode.
export default function EventForm({ initialValues, onSubmit, onCancel }) {
  const isEdit = Boolean(initialValues);

  const [formData, setFormData] = useState(() =>
    initialValues
      ? {
          title: initialValues.title ?? "",
          category: initialValues.category ?? "Tech",
          date: initialValues.date ?? "",
          venue: initialValues.venue ?? "",
          description: initialValues.description ?? ""
        }
      : emptyForm
  );
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const titleRef = useRef(null);
  const categoryRef = useRef(null);
  const dateRef = useRef(null);
  const venueRef = useRef(null);
  const descriptionRef = useRef(null);

  // When editing, put the cursor in the first field.
  useEffect(() => {
    if (isEdit) {
      titleRef.current?.focus();
    }
  }, [isEdit]);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData(previous => ({ ...previous, [name]: value }));
  }

  // Press Enter to move to the next field.
  function handleNext(event, nextRef) {
    if (event.key === "Enter") {
      event.preventDefault();
      nextRef.current?.focus();
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage("");
    setError("");

    if (
      !formData.title.trim() ||
      !formData.description.trim() ||
      !formData.date ||
      !formData.venue.trim()
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    try {
      setSaving(true);

      await onSubmit({
        title: formData.title.trim(),
        category: formData.category,
        date: formData.date,
        venue: formData.venue.trim(),
        description: formData.description.trim()
      });

      if (!isEdit) {
        setFormData(emptyForm);
        setMessage("Event added successfully!");
        titleRef.current?.focus();
      }
    } catch (submitError) {
      setError(submitError.message || "Could not save the event.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <section className="form-card" aria-label={isEdit ? "Edit event" : "Add event"}>
      <h2>{isEdit ? "Edit Event" : "Add a New Event"}</h2>
      <p className="form-subtitle">Fill in the event details below.</p>

      <form className="form-grid" onSubmit={handleSubmit} noValidate>
        <div className="field">
          <label htmlFor="event-title">Event title *</label>
          <input
            ref={titleRef}
            id="event-title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            onKeyDown={event => handleNext(event, categoryRef)}
            placeholder="e.g. React Workshop"
          />
        </div>

        <div className="field">
          <label htmlFor="event-category">Category *</label>
          <select
            ref={categoryRef}
            id="event-category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            onKeyDown={event => handleNext(event, dateRef)}
          >
            {categories.map(item => (
              <option key={item} value={item}>{item}</option>
            ))}
          </select>
        </div>

        <div className="field">
          <label htmlFor="event-date">Date *</label>
          <input
            ref={dateRef}
            id="event-date"
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            onKeyDown={event => handleNext(event, venueRef)}
          />
        </div>

        <div className="field">
          <label htmlFor="event-venue">Venue *</label>
          <input
            ref={venueRef}
            id="event-venue"
            name="venue"
            value={formData.venue}
            onChange={handleChange}
            onKeyDown={event => handleNext(event, descriptionRef)}
            placeholder="e.g. Seminar Hall"
          />
        </div>

        <div className="field full-width">
          <label htmlFor="event-description">Description *</label>
          <textarea
            ref={descriptionRef}
            id="event-description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe the event"
            rows={3}
          />
        </div>

        {message && (
          <p className="form-success full-width" role="status">{message}</p>
        )}
        {error && (
          <p className="form-error full-width" role="alert">{error}</p>
        )}

        <div className="form-actions full-width">
          <button type="submit" className="btn btn-primary btn-lg" disabled={saving}>
            {saving ? "Saving..." : isEdit ? "Save Changes" : "Add Event"}
          </button>

          {isEdit && (
            <button
              type="button"
              className="btn btn-secondary btn-lg"
              onClick={onCancel}
              disabled={saving}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </section>
  );
}
