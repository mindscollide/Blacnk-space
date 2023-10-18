import { Fragment } from "react";
import { Col, Container, Row } from "react-bootstrap";
import "./Footer.css";

const Footer = ({ operationHours }) => {
  console.log("operationHoursoperationHours", operationHours);
  if (!operationHours) {
    return null; // Handle the case where operationHours is null or undefined
  }
  const days = Object.keys(operationHours);
  return (
    <Fragment>
      {/* section for Footer */}
      <div className="footer-background-color">
        <Row>
          <Col lg={12} md={12} sm={12} xs={12} className="footer-main-col">
            <span className="Operational-hour-heading">Operational Hours</span>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col
            lg={3}
            md={3}
            sm={3}
            xs={3}
            className="d-flex justify-content-end"
          >
            <span className="Days-bullets">
              {days.map((day) => (
                <span className="Weekdays-subtitles" key={day}>
                  {day}
                </span>
              ))}
            </span>
          </Col>

          <Col
            lg={9}
            md={9}
            sm={9}
            xs={9}
            className="d-flex justify-content-center"
          >
            <span className="hours-bullets">
              {days.map((day) => (
                <span className="Weekdays-Time-Hours-subtitles" key={day}>
                  {operationHours[day]}
                </span>
              ))}
            </span>
          </Col>
        </Row>
      </div>
    </Fragment>
  );
};

export default Footer;
