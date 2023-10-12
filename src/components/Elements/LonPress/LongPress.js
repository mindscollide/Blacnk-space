import React, { useEffect, useRef } from "react";

function LongPress({ onLongPress, onPress, duration = 500, children }) {
  const elementRef = useRef(null);
  let mouseDownTime;
  let timeout;

  const handleMouseDown = (e) => {
    mouseDownTime = new Date().getTime();
    timeout = setTimeout(() => {
      onLongPress(e);
    }, duration);
  };

  const handleMouseUp = (e) => {
    const pressTime = new Date().getTime() - mouseDownTime;
    if (pressTime < duration) {
      clearTimeout(timeout);
      onPress(e);
    }
  };

  const handleMouseMove = () => {
    clearTimeout(timeout);
  };

  useEffect(() => {
    const element = elementRef.current;
    element.addEventListener("mousedown", handleMouseDown);
    element.addEventListener("mouseup", handleMouseUp);
    element.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("touchstart", handleMouseDown);
    element.addEventListener("touchend", handleMouseUp);
    element.addEventListener("touchmove", handleMouseMove);

    return () => {
      element.removeEventListener("mousedown", handleMouseDown);
      element.removeEventListener("mouseup", handleMouseUp);
      element.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("touchstart", handleMouseDown);
      element.removeEventListener("touchend", handleMouseUp);
      element.removeEventListener("touchmove", handleMouseMove);
    };
  }, [onLongPress, onPress, duration]);

  return (
    <div ref={elementRef}>
      {children}
    </div>
  );
}

export default LongPress;
