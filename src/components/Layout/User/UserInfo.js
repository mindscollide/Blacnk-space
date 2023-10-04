import { Fragment } from "react";
import { Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./UserInfo.css";

const UserInfo = () => {
  const navigate = useNavigate();

  const onClickSettingIcon = () => {
    navigate("/SettingPage");
  };
  return (
    <Fragment>
      <Row className="mt-3">
        <Col lg={8} md={8} sm={12} className="d-flex justify-content-start">
          <div className="User-heading">GOOD MORNING KHIZAR</div>
        </Col>
        <Col lg={4} md={4} sm={12} className="d-flex justify-content-end ">
          <i
            className="icon-setting setting-icon-size"
            onClick={onClickSettingIcon}
          ></i>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col lg={12} md={12} sm={12} className="d-flex justify-content-start">
          <div className="User-Sub-Heading">
            HERE'S OUR TOP PICKS FOR YOU TODAY!
          </div>
        </Col>
      </Row>
    </Fragment>
  );
};

export default UserInfo;
