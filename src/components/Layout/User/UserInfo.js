import { useState, useEffect } from "react";
import { Fragment } from "react";
import { Col, Row } from "react-bootstrap";
import { Button } from "../../Elements";
import { useNavigate, useLocation } from "react-router-dom";
import "./UserInfo.css";

const UserInfo = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [showExploreUser, setShowExploreUser] = useState(false);
  const [showFavoriteUser, setShowFavoriteUser] = useState(false);
  const [showSwitchCategory, setShowSwitchCategory] = useState(false);
  const [showSubSwitchCategory, setShowSubSwitchCategory] = useState(false);

  // to show Explore userInfo
  useEffect(() => {
    // Check if the current location is the ExplorePage
    setShowExploreUser(location.pathname === "/ExploreCategory");
  }, [location.pathname]);

  //To Show Favorite UserInfo
  useEffect(() => {
    setShowFavoriteUser(location.pathname === "/Favourite");
  }, [location.pathname]);

  //To show Switch Main Category User Info
  useEffect(() => {
    setShowSwitchCategory(location.pathname === "/Categories");
  }, [location.pathname]);

  //To show Sub category switch User Info
  useEffect(() => {
    setShowSubSwitchCategory(location.pathname === "/SubCategories");
  }, [location.pathname]);

  const onClickSettingIcon = () => {
    navigate("/SettingPage");
  };
  return (
    <Fragment>
      {showExploreUser ? (
        <>
          <Row className="mt-4">
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
                onClick={() => navigate("/")}
              />
            </Col>
          </Row>
        </>
      ) : showFavoriteUser ? (
        <>
          <Row className="mt-4">
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
                onClick={() => navigate("/")}
              />
            </Col>
          </Row>
        </>
      ) : showSwitchCategory ? (
        <>
          <Row className="mt-3">
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
                onClick={() => navigate("/")}
              />
            </Col>
          </Row>
        </>
      ) : showSubSwitchCategory ? (
        <>
          <Row className="mt-3">
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
                onClick={() => navigate("/Categories")}
              />
            </Col>
          </Row>
        </>
      ) : (
        <>
          <Row className="mt-3">
            <Col lg={8} md={8} sm={12} className="d-flex justify-content-start">
              <div className="User-heading">GOOD MORNING KHIZAR</div>
            </Col>
            <Col lg={4} md={4} sm={12} className="d-flex justify-content-end ">
              <i
                className="icon-setting setting-icon-size"
                // onClick={onClickSettingIcon}
              ></i>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col
              lg={12}
              md={12}
              sm={12}
              className="d-flex justify-content-start"
            >
              <div className="User-Sub-Heading">
                HERE'S OUR TOP PICKS FOR YOU TODAY!
              </div>
            </Col>
          </Row>
        </>
      )}
    </Fragment>
  );
};

export default UserInfo;
