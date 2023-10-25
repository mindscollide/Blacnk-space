import React from "react";
import "./Stars.css";

const StarRating = ({ rating }) => {
  // Calculate the number of full stars, half-filled stars, and empty stars
  let fullStars = Math.floor(rating);
  let decimalPart = rating - fullStars;

  // Determine whether to show a full or half-filled star
  let showHalfStar = false;

  if (decimalPart > 0.5 || (decimalPart === 0.5 && fullStars % 1 !== 0)) {
    fullStars += 1;
  } else if (decimalPart <= 0.5) {
    showHalfStar = true;
  }

  // Limit the total number of stars to a maximum of 5
  fullStars = Math.min(fullStars, 5);

  // Create an array of stars to render
  const stars = [];
  for (let i = 0; i < fullStars; i++) {
    stars.push(
      <span key={i} className="star-icon full">
        ☆
      </span>
    );
  }
  if (showHalfStar && fullStars < 5) {
    stars.push(
      <span key="half" className="star-icon half">
        ☆
      </span>
    );
  }
  const emptyStars = 5 - stars.length;
  for (let i = 0; i < emptyStars; i++) {
    stars.push(
      <span key={`empty-${i}`} className="star-icon">
        ☆
      </span>
    );
  }

  return <div className="star-rating">{stars}</div>;
};

export default StarRating;
