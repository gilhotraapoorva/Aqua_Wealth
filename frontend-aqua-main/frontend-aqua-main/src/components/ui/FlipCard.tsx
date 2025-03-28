// components/FlipCard.tsx
import React, { useState } from 'react';
import styles from './FlipCard.module.css'; // Assuming you are using CSS modules

interface FlipCardProps {
  title: string;
  options: { label: string; route: string }[];
}

const FlipCard: React.FC<FlipCardProps> = ({ title, options }) => {
  const [flipped, setFlipped] = useState(false);

  const handleFlip = () => {
    setFlipped((prev) => !prev);
  };

  return (
    <div className={styles.flipCard} onClick={handleFlip}>
      <div className={`${styles.inner} ${flipped ? styles.flipped : ''}`}>
        <div className={styles.front}>
          <h3>{title}</h3>
        </div>
        <div className={styles.back}>
          {options.map((option, index) => (
            <button
              key={index}
              onClick={(e) => {
                e.stopPropagation(); // Prevent card flip when clicking the button
                // Navigate to the route, e.g., using Next.js router
                window.location.href = option.route;
              }}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FlipCard;
