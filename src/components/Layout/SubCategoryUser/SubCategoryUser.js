import { Fragment } from "react";
import { Col, Row } from "react-bootstrap";
import { Button } from "../../Elements";
import "./SubCategoryUser.css";
import { useNavigate } from "react-router-dom";

const SubCategoryUser = () => {
  const navigate = useNavigate();

  const onClickGoBackCategory = () => {
    navigate("/Categories");
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
          <div className="Sub-Categories-Switch-title">Sub Categories</div>
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
            onClick={onClickGoBackCategory}
          />
        </Col>
      </Row>
    </Fragment>
  );
};

export default SubCategoryUser;
