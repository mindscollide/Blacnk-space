import { Fragment } from "react";
import { Col, Container, Row } from "react-bootstrap";
import "./Footer.css";

const Footer = ({ categoryListing }) => {
  return (
    <Fragment>
      {/* section for Footer */}
      <div className="footer-background-color">
        <Row className="mt-5">
          <Col lg={4} md={4} sm={4} xs={4} className="footer-main-col">
            <span className="Operational-hour-heading">Operational Hours</span>
          </Col>
          <Col
            lg={2}
            md={2}
            sm={2}
            xs={2}
            className="d-flex justify-content-start"
          >
            <div className="Days-bullets">
              {/* {categoryListing.operationHours.Friday}
              {categoryListing.operationHours.Monday}
              {categoryListing.operationHours.Monday}
              {categoryListing.operationHours.Monday}
              {categoryListing.operationHours.Monday}
              {categoryListing.operationHours.Monday} */}

              <span className="Weekdays-subtitles">Monday.</span>
              <span className="Weekdays-subtitles">Tuesday.</span>
              <span className="Weekdays-subtitles">Wednesday.</span>
              <span className="Weekdays-subtitles">Thursday.</span>
              <span className="Weekdays-subtitles">Friday.</span>
              <span className="Weekdays-subtitles">Saturday.</span>
              <span className="Weekdays-subtitles">Sunday.</span>
            </div>
          </Col>
          <Col
            lg={2}
            md={2}
            sm={2}
            xs={2}
            className="d-flex justify-content-start"
          >
            <div className="hours-bullets">
              <span className="Weekdays-Time-Hours-subtitles">09:00</span>
              <span className="Weekdays-Time-Hours-subtitles">09:00</span>
              <span className="Weekdays-Time-Hours-subtitles">09:00</span>
              <span className="Weekdays-Time-Hours-subtitles">09:00</span>
              <span className="Weekdays-Time-Hours-subtitles">09:00</span>
              <span className="Weekdays-Time-Hours-subtitles">09:00</span>
              <span className="Weekdays-Time-Hours-subtitles">09:00</span>
            </div>
          </Col>
          <Col
            lg={2}
            md={2}
            sm={2}
            xs={2}
            className="d-flex justify-content-start"
          >
            <div className="hours-bullets">
              <span className="Weekdays-Time-Hours-subtitles">18:00</span>
              <span className="Weekdays-Time-Hours-subtitles">18:00</span>
              <span className="Weekdays-Time-Hours-subtitles">18:00</span>
              <span className="Weekdays-Time-Hours-subtitles">18:00</span>
              <span className="Weekdays-Time-Hours-subtitles">18:00</span>
              <span className="Weekdays-Time-Hours-subtitles">18:00</span>
              <span className="Weekdays-Time-Hours-subtitles">18:00</span>
            </div>
          </Col>
          <Col
            lg={2}
            md={2}
            sm={2}
            xs={2}
            className="d-flex justify-content-start"
          >
            <div className="hours-bullets">
              <span className="Weekdays-Time-Hours-subtitles">HOURS</span>
              <span className="Weekdays-Time-Hours-subtitles">HOURS</span>
              <span className="Weekdays-Time-Hours-subtitles">HOURS</span>
              <span className="Weekdays-Time-Hours-subtitles">HOURS</span>
              <span className="Weekdays-Time-Hours-subtitles">HOURS</span>
              <span className="Weekdays-Time-Hours-subtitles">HOURS</span>
              <span className="Weekdays-Time-Hours-subtitles">HOURS</span>
            </div>
          </Col>
        </Row>
      </div>
    </Fragment>
  );
};

export default Footer;
