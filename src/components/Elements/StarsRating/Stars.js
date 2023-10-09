import React from "react";
import "./Stars.css";

const StarRating = ({ rating }) => {
  // Calculate the number of full and half-filled stars
  const fullStars = Math.floor(rating);
  const halfStar = rating - fullStars >= 0.5;

  // Create an array of stars to render
  const stars = [];
  for (let i = 0; i < fullStars; i++) {
    stars.push(
      <span key={i} className="star-icon full">
        ☆
      </span>
    );
  }
  if (halfStar) {
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
