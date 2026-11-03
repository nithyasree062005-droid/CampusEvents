import { useEffect, useState } from "react";

// Returns the time left until the start of the given date (YYYY-MM-DD).
function getTimeLeft(targetDate) {
  const difference = new Date(`${targetDate}T00:00:00`) - new Date();

  if (Number.isNaN(difference) || difference <= 0) {
    return null;
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60)
  };
}

export default function CountdownTimer({ targetDate }) {
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(targetDate));

  useEffect(() => {
    // The interval callback updates state every second; cleanup stops it.
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft(targetDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  if (!timeLeft) {
    return <p className="countdown-timer">This event has started or ended.</p>;
  }

  return (
    <p className="countdown-timer">
      Starts in:{" "}
      <strong>
        {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m{" "}
        {timeLeft.seconds}s
      </strong>
    </p>
  );
}
