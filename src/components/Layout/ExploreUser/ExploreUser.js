import { Fragment } from "react";
import { Col, Row } from "react-bootstrap";
import { Button } from "../../Elements";
import "./ExploreUser.css";
import { useNavigate } from "react-router-dom";

const ExploreUser = () => {
  const navigate = useNavigate();

  const onClickExplore = () => {
    navigate("/");
  };
  return (
    <Fragment>
      <Row>
        <Col
          lg={8}
          md={8}
          sm={8}
          xs={8}
          className="d-flex justify-content-start m-0"
        >
          <div className="User-heading">EXPLORE CATEGORY TITLE</div>
        </Col>
        <Col
          lg={4}
          md={4}
          sm={4}
          xs={4}
          className="d-flex justify-content-end "
        >
          <Button
            text="Go Back"
            className="Go-Back-Button"
            onClick={onClickExplore}
          />
        </Col>
      </Row>
    </Fragment>
  );
};

export default ExploreUser;
