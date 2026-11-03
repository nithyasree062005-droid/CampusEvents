
import { useState } from "react";
import { useEvents } from "../../context/eventcontext";
import { Button, Input, Select, TextArea } from "../common";
import "./registrationform.css";

function StudentRegistration() {
  const { events, registrations, addRegistration } = useEvents();

  const initialForm = {
    name: "",
    email: "",
    department: "",
    year: "",
    password: "",
    attendance: "In person",
    eventId: "",
    accessibility: false,
    message: ""
  };

  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");
  const [summary, setSummary] = useState(null);
  const [saving, setSaving] = useState(false);

  const departments = [
    { value: "Computer Science", label: "Computer Science" },
    { value: "Information Technology", label: "Information Technology" },
    { value: "Electronics", label: "Electronics" },
    { value: "Mechanical Engineering", label: "Mechanical Engineering" }
  ];

  const eventOptions = events.map((event) => ({
    value: String(event.id),
    label: event.title
  }));

  // Handle changes in form fields
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: ""
    }));

    setSubmitError("");
    setSummary(null);
  };

  // Validate form details
  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Please enter your name.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Please enter your email.";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())
    ) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!formData.department) {
      newErrors.department = "Please select your department.";
    }

    if (!formData.year) {
      newErrors.year = "Please enter your year of study.";
    } else if (
      Number(formData.year) < 1 ||
      Number(formData.year) > 6
    ) {
      newErrors.year = "Enter a valid year between 1 and 6.";
    }

    if (formData.password.length < 6) {
      newErrors.password = "Password must contain at least 6 characters.";
    }

    if (!formData.eventId) {
      newErrors.eventId = "Choose an event.";
    }

    const selectedEvent = events.find(
      (event) => String(event.id) === String(formData.eventId)
    );

    // Supports both old and new registration records
    const alreadyRegistered = registrations.some((registration) => {
      const registeredEvent = registration.event
        ? registration.event
        : events.find(
            (event) =>
              String(event.id) === String(registration.eventId)
          )?.title;

      return (
        registeredEvent === selectedEvent?.title &&
        registration.email?.toLowerCase() ===
          formData.email.trim().toLowerCase()
      );
    });

    if (alreadyRegistered) {
      newErrors.email = "You have already registered for this event.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // Submit registration using POST
  const handleSubmit = async (e) => {
    e.preventDefault();

    setSummary(null);
    setSubmitError("");

    if (!validate()) {
      return;
    }

    const selectedEvent = events.find(
      (event) => String(event.id) === String(formData.eventId)
    );

    if (!selectedEvent) {
      setSubmitError("Selected event was not found.");
      return;
    }

    // This is the JSON structure sent to the server
    const registrationData = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      department: formData.department,
      year: formData.year,
      event: selectedEvent.title,
      attendance: formData.attendance,
      accessibilitySupport: formData.accessibility,
      message: formData.message.trim(),
      createdAt: new Date().toISOString()
    };

    try {
      setSaving(true);

      // Save registration through POST request
      const savedRegistration = await addRegistration(registrationData);

      // Show success details after the server responds
      setSummary({
        id: savedRegistration.id,
        name: savedRegistration.name,
        email: savedRegistration.email,
        department: savedRegistration.department,
        event: savedRegistration.event,
        attendance: savedRegistration.attendance
      });

      setFormData(initialForm);
      setErrors({});
    } catch (error) {
      setSubmitError(
        error.message || "Registration failed. Please try again."
      );
    } finally {
      setSaving(false);
    }
  };

  // Reset form
  const handleReset = () => {
    setFormData(initialForm);
    setErrors({});
    setSubmitError("");
    setSummary(null);
  };

  return (
    <section className="form-card register-card">
      <p className="eyebrow">JOIN THE EVENT</p>

      <h2>Student Registration Form</h2>

      <p className="form-subtitle">
        Fill in your details to register for a campus event.
      </p>

      <form onSubmit={handleSubmit}>
        <div className="form-grid">

          {/* Student Name */}
          <div className="field">
            <label htmlFor="name">Student Name</label>

            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
            />

            {errors.name && (
              <small className="field-error">{errors.name}</small>
            )}
          </div>

          {/* Email */}
          <div className="field">
            <label htmlFor="email">Email Address</label>

            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />

            {errors.email && (
              <small className="field-error">{errors.email}</small>
            )}
          </div>

          {/* Department */}
          <div className="field">
            <label htmlFor="department">Department</label>

            <Select
              id="department"
              name="department"
              value={formData.department}
              onChange={handleChange}
              options={departments}
              placeholder="Select your department"
            />

            {errors.department && (
              <small className="field-error">
                {errors.department}
              </small>
            )}
          </div>

          {/* Year */}
          <div className="field">
            <label htmlFor="year">Year of Study</label>

            <Input
              id="year"
              name="year"
              type="number"
              min="1"
              max="6"
              value={formData.year}
              onChange={handleChange}
              placeholder="Enter your year"
            />

            {errors.year && (
              <small className="field-error">{errors.year}</small>
            )}
          </div>

          {/* Password */}
          <div className="field">
            <label htmlFor="password">Password</label>

            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
            />

            {errors.password && (
              <small className="field-error">
                {errors.password}
              </small>
            )}

            <small className="field-hint">
              Demo field only. Password is not sent to the server.
            </small>
          </div>

          {/* Event */}
          <div className="field">
            <label htmlFor="eventId">Choose an Event</label>

            <Select
              id="eventId"
              name="eventId"
              value={formData.eventId}
              onChange={handleChange}
              options={eventOptions}
              placeholder="Select a campus event"
            />

            {errors.eventId && (
              <small className="field-error">
                {errors.eventId}
              </small>
            )}
          </div>

          {/* Attendance */}
          <div className="field full-width">
            <label>Attendance Mode</label>

            <div className="radio-group">
              <label className="radio-option">
                <input
                  type="radio"
                  name="attendance"
                  value="In person"
                  checked={formData.attendance === "In person"}
                  onChange={handleChange}
                />
                In person
              </label>

              <label className="radio-option">
                <input
                  type="radio"
                  name="attendance"
                  value="Online"
                  checked={formData.attendance === "Online"}
                  onChange={handleChange}
                />
                Online
              </label>
            </div>
          </div>

          {/* Accessibility Support */}
          <div className="field full-width">
            <label className="checkbox-option">
              <input
                type="checkbox"
                name="accessibility"
                checked={formData.accessibility}
                onChange={handleChange}
              />

              I would like the team to contact me about accessibility support.
            </label>
          </div>

          {/* Message */}
          <div className="field full-width">
            <label htmlFor="message">Message (optional)</label>

            <TextArea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={4}
              placeholder="Any questions or notes for the event team?"
            />
          </div>
        </div>

        {/* Server Error */}
        {submitError && (
          <p className="form-error">{submitError}</p>
        )}

        {/* Submit and Reset Buttons */}
        <div className="form-actions">
          <Button
            type="submit"
            className="btn-primary btn-lg"
            disabled={saving}
          >
            {saving ? "Submitting..." : "Submit Registration"}
          </Button>

          <Button
            type="button"
            className="btn-secondary btn-lg"
            onClick={handleReset}
          >
            Reset Form
          </Button>
        </div>

        {/* Success Message */}
        {summary && (
          <div className="registration-summary">
            <h3>Registration submitted successfully!</h3>

            <p>
              Your registration details have been saved successfully.
            </p>

            <ul>
              <li>
                <strong>Student:</strong> {summary.name}
              </li>
              <li>
                <strong>Email:</strong> {summary.email}
              </li>
              <li>
                <strong>Department:</strong> {summary.department}
              </li>
              <li>
                <strong>Event:</strong> {summary.event}
              </li>
              <li>
                <strong>Attendance:</strong> {summary.attendance}
              </li>
              <li>
                <strong>Registration ID:</strong> {summary.id}
              </li>
            </ul>
          </div>
        )}
      </form>
    </section>
  );
}

export default StudentRegistration;
