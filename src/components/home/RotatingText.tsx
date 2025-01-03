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
  const [isFlashing, setIsFlashing] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsFlashing(true);
      // Wait for the fade out animation
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length);
        // Reset the flash effect
        setIsFlashing(false);
      }, 200);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <span 
      className={`
        text-primary block mt-2 min-h-[1.2em]
        ${isFlashing ? 'opacity-0' : 'opacity-100'}
        transition-opacity duration-200
        relative
        after:content-['']
        after:absolute
        after:inset-0
        after:bg-primary
        after:opacity-0
        ${isFlashing ? 'after:animate-flash' : ''}
      `}
    >
      {words[currentIndex]}
    </span>
  );
};