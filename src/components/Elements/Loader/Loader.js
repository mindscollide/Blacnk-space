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
                className={styles["Loader-width-class"]}
                // width={200}
                // height={250}
                alt="Blancspace Logo"
              />
            </div>
          </Col>
        </Col>
      </Row>
    </Fragment>
  );
};

export default Loader;
