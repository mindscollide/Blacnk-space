import React, { Fragment, useState, useEffect } from "react";
import BlancspaceLogo from "../../../assets/Images/blancspaceloader.gif";
import { Col, Row } from "react-bootstrap";
import styles from "./Loader.module.css";
import Typed from "react-typed";

const Loader = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Delay showing the typed content for a smooth fade-in effect
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500);

    // Clear the timer when the component unmounts
    return () => clearTimeout(timer);
  }, []);

  return (
    <Fragment>
      <Row>
        <Col sm={12} md={12} lg={12} className={styles["overlay"]}>
          <Col sm={12} md={12} lg={12} className={styles["overlay-content"]}>
            <div className="blancspacelogo-gif">
              <img
                src={BlancspaceLogo}
                width={200}
                height={250}
                alt="Blancspace Logo"
              />
            </div>
            {/* <span className={styles["loader-circle"]}></span> */}
            {/* <h2 className={styles["loading-text"]}>Loading ...</h2> */}
            {/* <div
              style={{
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                backgroundImage:
                  "linear-gradient(to right, #d00510, #ca1f1f, #c32d2c, #bb3836, #b34140, #b54747, #b84e4d, #ba5454, #c95a5a, #d95f5f, #e96565, #f96b6b)", // Gradient colors
                color: "transparent",
                fontSize: "30px",
                fontWeight: "bold",
                opacity: isVisible ? 1 : 0,
                transition: "opacity 0.5s",
              }}
            >
              {isVisible && (
                <Typed
                  strings={["Blancspace Loading . . ."]}
                  loop={true}
                  typeSpeed={30}
                  showCursor={true}
                  cursorChar="|"
                />
              )}
            </div> */}
            {/* <div className={styles["content"]}>
              <h2>Blancspace</h2>
              <h2>Blancspace</h2>
            </div> */}
          </Col>
        </Col>
      </Row>
    </Fragment>
  );
};

export default Loader;
