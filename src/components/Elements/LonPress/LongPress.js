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

    // Use { passive: true } to make the event listeners passive
    element.addEventListener("mousedown", handleMouseDown, { passive: true });
    element.addEventListener("mouseup", handleMouseUp, { passive: true });
    element.addEventListener("mousemove", handleMouseMove, { passive: true });
    element.addEventListener("touchstart", handleMouseDown, { passive: true });
    element.addEventListener("touchend", handleMouseUp, { passive: true });
    element.addEventListener("touchmove", handleMouseMove, { passive: true });

    return () => {
      element.removeEventListener("mousedown", handleMouseDown);
      element.removeEventListener("mouseup", handleMouseUp);
      element.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("touchstart", handleMouseDown);
      element.removeEventListener("touchend", handleMouseUp);
      element.removeEventListener("touchmove", handleMouseMove);
    };
  }, [onLongPress, onPress, duration]);

  return <div ref={elementRef}>{children}</div>;
}

export default LongPress;
