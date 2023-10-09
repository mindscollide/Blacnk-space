import React from "react";

const HighlightedText = ({ text, searchQuery }) => {
  // Use regular expression to find and highlight the search query
  const highlightedText = text.replace(
    new RegExp(`(${searchQuery})`, "gi"),
    (match, key) => <span className="highlighted">{match}</span>
  );

  return <div className="highlighted-text">{highlightedText}</div>;
};

export default HighlightedText;
