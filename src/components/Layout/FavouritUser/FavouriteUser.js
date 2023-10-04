import { Fragment } from "react";
import { Col, Row } from "react-bootstrap";
import { Button } from "../../Elements";
import "./FavouriteUser.css";
import { useNavigate } from "react-router-dom";

const FavouriteUser = () => {
  const navigate = useNavigate();

  const onClickFavourite = () => {
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
          <div className="User-heading">Your Favourites</div>
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
            onClick={onClickFavourite}
          />
        </Col>
      </Row>
    </Fragment>
  );
};

export default FavouriteUser;
