import React, { Fragment } from "react";
import { Col, Container, Row } from "react-bootstrap";
import "./HeadingHoldPU.css";

const HeadingHoldPU = () => {
  return (
    <Fragment>
      <div className="heading-long-press-popup">
        <div className="heading-long-press-main">
          <span className="heading-long-pressdisplay-block">
            <i className="icon-plus icon-class"></i>
            <span className="heading-long-main-options">Add Business</span>
          </span>

          <span className="heading-long-pressdisplay-block-category">
            <i className="icon-disabled icon-class"></i>
            <span className="heading-long-main-options">Block Category</span>
          </span>
        </div>
      </div>
    </Fragment>
  );
};

export default HeadingHoldPU;
