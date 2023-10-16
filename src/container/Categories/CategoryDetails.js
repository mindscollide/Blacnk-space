import { Fragment, useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Button, Loader, StarRating } from "./../../components/Elements";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { businessDetailsMainApi } from "../../store/Actions/Actions";
import { useDispatch, useSelector } from "react-redux";
import { Footer } from "../../components/Layout";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./CategoryDetails.css";
import { getRndomeNumber } from "../../common/Function/utils";

const CategoryDetails = () => {
  const navigate = useNavigate();
  const businessListing = useSelector(
    (state) => state.actionReducer.businessListing
  );

  const dispatch = useDispatch();
  //state for businessDetails
  const [businessDetails, setBusinessDetails] = useState([]);

  // STATE FOR LOADER
  const [showLoader, setShowLoader] = useState(false);

  // state for businessDetail page
  const [stateBusinessDetail, setStateBusinessDetails] = useState({
    BusinessListingID: {
      value: "",
      errorMessage: "",
      errorStatus: false,
    },
  });

  useEffect(() => {
    if (businessListing !== null && businessListing !== undefined) {
      setBusinessDetails(businessListing);
    }
  }, [businessListing]);

  const clickHomeHandler = () => {
    navigate("/BlankSpace/");
  };
  useEffect(() => {
    if (performance.navigation.type === performance.navigation.TYPE_RELOAD) {
      const storedData = localStorage.getItem("newBusinessIdData");
      console.log("helloooooo");
      // Parse the JSON string into an object
      const newBusinessIdData = JSON.parse(storedData);

      dispatch(businessDetailsMainApi(navigate, newBusinessIdData));
    } else {
    }
  }, []);

  return (
    <Fragment>
      {Object.keys(businessDetails).length > 0 ? (
        <>
          {Object.keys(businessDetails.listOfBase64Images).length > 0 ? (
            <Container>
              <div className="swiper-category-slider">
                <Row>
                  <Col lg={12} md={12} sm={12}>
                    <Swiper
                      spaceBetween={30}
                      centeredSlides={true}
                      autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                      }}
                      pagination={{
                        clickable: true,
                      }}
                      modules={[Autoplay, Pagination]}
                      className="carousel-swiper"
                    >
                      {Object.values(businessDetails.listOfBase64Images).map(
                        (base64Image, index) => (
                          <SwiperSlide key={getRndomeNumber()}>
                            <img
                              src={`data:image/jpeg;base64,${base64Image}`}
                              alt={`Slide ${index}`}
                              className="slide-Image"
                            />
                          </SwiperSlide>
                        )
                      )}
                    </Swiper>
                  </Col>
                </Row>
              </div>
            </Container>
          ) : (
            <></>
          )}

          <Container>
            <Row
              className={`${
                Object.keys(businessDetails.listOfBase64Images).length > 0
                  ? "mb-4 margin-top-403"
                  : "mb-4"
              }`}
            >
              <Col lg={6} md={6} sm={6} xs={6} className="mt-2">
                <span className="title-emirates-heading">
                  {businessDetails.name}
                </span>
                <Row className="mb-3">
                  <Col lg={6} md={6} sm={12} xs={12}>
                    <span className="show-inline-display">
                      <StarRating rating={businessDetails.rating} />
                      <span className="Reviews-after-star">(20 Reviews)</span>
                    </span>
                  </Col>
                </Row>
                <Row>
                  <Col lg={6} md={6} sm={6} xs={6}>
                    <Button text="TOUR" className="Tour-button" />
                  </Col>
                </Row>
              </Col>
              <Col
                lg={6}
                md={6}
                sm={6}
                xs={6}
                className="package-row-class flex-row"
              >
                <span className="verticalline"></span>
                <div className="line-height">
                  <div className="package-start-heading">PACKAGES STARTS</div>
                  <div className="package-start-heading">
                    From{" "}
                    <span className="five-dollar-title">
                      ${businessDetails.packageStarts}
                    </span>
                  </div>
                </div>
              </Col>
            </Row>

            {/* section for detail contact and location */}

            <Row>
              <Col lg={12} md={12} sm={12}>
                <p className="para-text">{businessDetails.aboutUs}</p>
              </Col>
            </Row>
            <Row>
              <Col lg={12} md={12} sm={12} className="Grourp-btn-col">
                <Button
                  icon={<i className="icon-call call-etc-icons-sizes"></i>}
                  className="buttons-call-etc"
                  onClick={() =>
                    window.open(businessDetails.contactNumber, "_blank")
                  }
                ></Button>
                <Button
                  icon={<i className="icon-location  call-etc-icons-sizes"></i>}
                  className="buttons-call-etc"
                  onClick={() =>
                    window.open(businessDetails.location, "_blank")
                  }
                >
                  {/* {businessDetails.location} */}
                </Button>
                <Button
                  icon={<i className="icon-web call-etc-icons-sizes"></i>}
                  onClick={() => window.open(businessDetails.website, "_blank")}
                  className="buttons-call-etc"
                />{" "}
                <Button
                  icon={<i className="icon-home call-etc-icons-sizes"></i>}
                  onClick={clickHomeHandler}
                  className="buttons-call-etc"
                />
              </Col>
            </Row>

            {/* section for what we offer */}

            <Row className="mt-5">
              <Col
                lg={12}
                md={12}
                sm={12}
                className="d-flex justify-content-start"
              >
                {businessDetails.offering !== "" ? (
                  <>
                    <span className="what-we-offer-heading">WHAT WE OFFER</span>
                  </>
                ) : (
                  <>
                    <Row>
                      <Col>
                        <div style={{ diplay: "none" }}></div>
                      </Col>
                    </Row>
                  </>
                )}
              </Col>
            </Row>

            <Row>
              <Col
                lg={12}
                md={12}
                sm={12}
                className="d-flex justify-content-start"
              >
                <div className="what-we-offer-bullets">
                  <span className="what-we-offer-subtitles">
                    {businessDetails.offering}
                  </span>
                </div>
              </Col>
            </Row>

            {/* section for Here's what are customers have to say */}

            <Row className="mt-5">
              <Col
                lg={12}
                md={12}
                sm={12}
                className="d-flex justify-content-start"
              >
                <span className="what-we-offer-heading">
                  Here's what are customers have to say
                </span>
              </Col>
            </Row>

            <Row>
              <Col
                lg={12}
                md={12}
                sm={12}
                className="d-flex justify-content-start"
              >
                <div className="what-we-offer-bullets ">
                  <span className="what-we-offer-subtitles">
                    {businessDetails.reviews}
                  </span>
                </div>
              </Col>
            </Row>
          </Container>

          <Row className="mt-5">
            <Col lg={12} md={12} sm={12}>
              <Footer operationHours={businessDetails.operationHours} />
            </Col>
          </Row>
        </>
      ) : (
        <></>
      )}

      {showLoader && (
        <div className="loader-overlay">
          <Loader />
        </div>
      )}
    </Fragment>
  );
};

export default CategoryDetails;
