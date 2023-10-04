import { Fragment, useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { SwiperLongpress } from "../../components/Elements";
import { ArrowUpSquareFill } from "react-bootstrap-icons";
import { Loader } from "./../../components/Elements";

import {
  Header,
  UserInfo,
  SettingHeader,
  SettingUser,
} from "../../components/Layout";
import "swiper/css";
import "./SettingPage.css";

const SettingPage = () => {
  // const navigate = useNavigate();

  //state for loader
  const [showLoader, setShowLoader] = useState(false);

  const [isHome, setIsHome] = useState(false);
  // for back to top state
  const [isVisible, setIsVisible] = useState(false);

  // To Scroll back to Top
  const handleScrollToTop = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  window.addEventListener("scroll", handleScrollToTop);

  useEffect(() => {
    setShowLoader(true);

    setTimeout(() => {
      setShowLoader(false);
    }, 3000);
  }, []);

  // const onClickSearch = () => {
  //   navigate("/SearchPage");
  // };

  return (
    <Fragment>
      <Row>
        <Col>
          {isHome ? (
            <>
              <Header />
              <UserInfo />
            </>
          ) : (
            <>
              <div className="Explore-header">
                <Container>
                  <SettingHeader />
                  <SettingUser />
                </Container>
              </div>
            </>
          )}
        </Col>
      </Row>
      <Container>
        <Row className="Setting-page">
          <Col
            lg={12}
            md={12}
            sm={12}
            className="d-flex justify-content-between"
          >
            <label className="Category-User-Sub-Heading">System Settings</label>
          </Col>
        </Row>
        <Row>
          <Col lg={12} md={12} sm={12}>
            <SwiperLongpress />
          </Col>
        </Row>

        <Row className="mt-5">
          <Col
            lg={12}
            md={12}
            sm={12}
            className="d-flex justify-content-between"
          >
            <label className="Category-User-Sub-Heading">
              Permission & Payments
            </label>
          </Col>
        </Row>
        <Row>
          <Col lg={12} md={12} sm={12}>
            <SwiperLongpress />
          </Col>
        </Row>

        <Row className="mt-5">
          <Col
            lg={12}
            md={12}
            sm={12}
            className="d-flex justify-content-between"
          >
            <label className="Category-User-Sub-Heading">Learn</label>
          </Col>
        </Row>
        <Row>
          <Col lg={12} md={12} sm={12}>
            <SwiperLongpress />
          </Col>
        </Row>

        <Row className="mt-5">
          <Col
            lg={12}
            md={12}
            sm={12}
            className="d-flex justify-content-between"
          >
            <label className="Category-User-Sub-Heading">Title</label>
          </Col>
        </Row>
        <Row>
          <Col lg={12} md={12} sm={12}>
            <SwiperLongpress />
          </Col>
        </Row>

        <Row className="mt-5">
          <Col
            lg={12}
            md={12}
            sm={12}
            className="d-flex justify-content-between"
          >
            <label className="Category-User-Sub-Heading">Title</label>
          </Col>
        </Row>
        <Row>
          <Col lg={12} md={12} sm={12}>
            <SwiperLongpress />
          </Col>
        </Row>

        <Row className="mt-5">
          <Col
            lg={12}
            md={12}
            sm={12}
            className="d-flex justify-content-between"
          >
            <label className="Category-User-Sub-Heading">Tours</label>
          </Col>
        </Row>
        <Row>
          <Col lg={12} md={12} sm={12}>
            <SwiperLongpress />
          </Col>
        </Row>

        <Row className="mt-5">
          <Col
            lg={12}
            md={12}
            sm={12}
            className="d-flex justify-content-between"
          >
            <label className="Category-User-Sub-Heading">Hotels</label>
          </Col>
        </Row>
        <Row>
          <Col lg={12} md={12} sm={12}>
            <SwiperLongpress />
          </Col>
        </Row>

        <Row className="mt-5">
          <Col
            lg={12}
            md={12}
            sm={12}
            className="d-flex justify-content-between"
          >
            <label className="Category-User-Sub-Heading">Laundry</label>
          </Col>
        </Row>
        <Row>
          <Col lg={12} md={12} sm={12}>
            <SwiperLongpress />
          </Col>
        </Row>

        <button
          className={`back-to-top-button ${isVisible ? "visible" : ""}`}
          onClick={scrollToTop}
        >
          <ArrowUpSquareFill style={{ color: "#d00510", fontSize: "45px" }} />
        </button>
      </Container>

      {showLoader && (
        <div className="loader-overlay">
          <Loader />
        </div>
      )}
    </Fragment>
  );
};

export default SettingPage;
