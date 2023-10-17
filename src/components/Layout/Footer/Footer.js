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
          <Col lg={4} md={4} sm={4} xs={4} className="footer-main-col">
            <span className="Operational-hour-heading">Operational Hours</span>
          </Col>

          <Col
            lg={3}
            md={3}
            sm={3}
            xs={3}
            className="d-flex justify-content-center"
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
            lg={5}
            md={5}
            sm={5}
            xs={5}
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

          {/* <Col lg={2} md={2} sm={2} xs={2}>
            <span className="Days-bullets">
              <span className="hour-title">HOURS</span>
              <span className="hour-title">HOURS</span>
              <span className="hour-title">HOURS</span>
              <span className="hour-title">HOURS</span>
              <span className="hour-title">HOURS</span>
              <span className="hour-title">HOURS</span>
              <span className="hour-title">HOURS</span>
            </span>
          </Col> */}
        </Row>
        {/* <Row className="mt-5">
          <Col lg={4} md={4} sm={3} xs={3} className="footer-main-col">
            <span className="Operational-hour-heading">Operational Hours</span>
          </Col>
          <Col
            lg={3}
            md={3}
            sm={1}
            xs={1}
            className="d-flex justify-content-start"
          >
            <div className="Days-bullets">
              <>
                {days.map((day) => (
                  <span className="Weekdays-subtitles" key={day}>
                    {day}
                  </span>
                ))}
              </>
            </div>
          </Col>
          <Col
            lg={3}
            md={3}
            sm={6}
            xs={6}
            className="d-flex justify-content-start"
          >
            <div className="hours-bullets">
              {days.map((day) => (
                <span className="Weekdays-Time-Hours-subtitles" key={day}>
                  {operationHours[day]}
                </span>
              ))}
            </div>
          </Col>

          <Col
            lg={1}
            md={1}
            sm={1}
            xs={1}
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
        </Row> */}
      </div>
    </Fragment>
  );
};

export default Footer;
