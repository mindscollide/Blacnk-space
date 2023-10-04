import { Fragment } from "react";
import { Col, Row } from "react-bootstrap";
import { Button } from "../../Elements";
import "./CategoryUser.css";
import { useNavigate } from "react-router-dom";

const CategoryUser = () => {
  const navigate = useNavigate();

  const onClickGoBack = () => {
    navigate("/");
  };
  return (
    <Fragment>
      <Row className="mt-2">
        <Col
          lg={8}
          md={8}
          sm={8}
          xs={8}
          className="d-flex justify-content-start m-0"
        >
          <div className="Category-User-Sub-Heading">Categories</div>
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
            onClick={onClickGoBack}
          />
        </Col>
      </Row>
    </Fragment>
  );
};

export default CategoryUser;
