import { Fragment } from "react";
import { Col, Row } from "react-bootstrap";
import { Person } from "react-bootstrap-icons";
import "./SettingUser.css";

const SettingUser = () => {
  return (
    <Fragment>
      <Row className="mt-3">
        <Col
          lg={10}
          md={10}
          sm={10}
          className="d-flex justify-content-start align-items-center"
        >
          <div className="User-heading-setting">Hello, Khizar !</div>
        </Col>
        <Col lg={2} md={2} sm={2} className="d-flex justify-content-end">
          <Person className="person-profile" />
        </Col>
      </Row>
    </Fragment>
  );
};

export default SettingUser;
