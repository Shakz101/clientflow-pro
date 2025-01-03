import { useEffect, useState } from "react";

const words = [
  "Client Onboarding",
  "Team Collaboration",
  "Project Management",
  "Task Automation",
  "Client Success",
];

export const RotatingText = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <span className="text-primary block mt-2 min-h-[1.2em] transition-opacity duration-500">
      {words[currentIndex]}
    </span>
  );
};