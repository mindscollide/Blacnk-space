import React, { Fragment, useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Button, Loader, StarRating } from "./../../components/Elements";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import {
  businessDetailsMainApi,
  businessDetailsSuccess,
} from "../../store/Actions/Actions";
import { useDispatch, useSelector } from "react-redux";
import { Footer } from "../../components/Layout";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./CategoryDetails.css";
import { getRndomeNumber } from "../../common/Function/utils";

const CategoryDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const businessListing = useSelector(
    (state) => state.actionReducer.businessListing
  );
  const Loading = useSelector((state) => state.actionReducer.Loading);
  const [businessDetails, setBusinessDetails] = useState({});
  const [showLoader, setShowLoader] = useState(true);
  const [businessDetailsID, setBusinessDetailsID] = useState(true);

  useEffect(() => {
    const storedData = localStorage.getItem("newBusinessIdData");
    if (storedData) {
      const newBusinessIdData = JSON.parse(storedData);
      console.log("helloooooo");
      dispatch(businessDetailsMainApi(navigate, newBusinessIdData));
      setBusinessDetailsID(newBusinessIdData);
      localStorage.removeItem("newBusinessIdData");
    }
    return () => {
      // Clear the businessListing state when navigating to a different page
      dispatch(businessDetailsSuccess([], "")); // Replace with your actual Redux action to clear the state
    };
  }, []);

  useEffect(() => {
    if (businessListing) {
      setBusinessDetails(businessListing);
      setShowLoader(false);
      console.log("helloooooo 1");
    }
  }, [businessListing]);

  const clickHomeHandler = () => {
    navigate("/BlankSpace/");
  };

  return (
    <Fragment>
      {showLoader || (Loading && <Loader />)}
      {Object.keys(businessDetails).length > 0 && (
        <Container className="backgroundBody" fluid>
          {Object.keys(businessDetails.listOfBase64Images).length > 0 && (
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
          )}
          <Row
            className={`${
              Object.keys(businessDetails.listOfBase64Images).length > 0
                ? "mb-4 margin-top-after-image"
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
                    <StarRating
                      className="star-font-size"
                      rating={businessDetails.rating}
                    />
                    <span className="Reviews-after-star">
                      ({businessDetails.reviewsCount} Reviews)
                    </span>
                  </span>
                </Col>
              </Row>
              <Row>
                <Col lg={6} md={6} sm={6} xs={6}>
                  <Button
                    text={businessDetails.categoryName}
                    className="Tour-button"
                  />
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
              {businessDetails.packageStarts !== "" && (
                <>
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
                </>
              )}
            </Col>
          </Row>

          <Row>
            <Col lg={12} md={12} sm={12}>
              <p className="para-text">{businessDetails.aboutUs}</p>
            </Col>
          </Row>
          <Row>
            <Col lg={12} md={12} sm={12} className="Grourp-btn-col">
              <Button
                icon={<i className="icon-home call-etc-icons-sizes"></i>}
                onClick={clickHomeHandler}
                className="buttons-call-etc"
              />
              {businessDetails.contactNumber ? (
                <Button
                  icon={<i className="icon-call call-etc-icons-sizes"></i>}
                  className="buttons-call-etc"
                  // onClick={() =>
                  //   window.open(businessDetails.contactNumber, "_blank")
                  // }
                />
              ) : (
                <Button
                  icon={<i className="icon-call call-etc-icons-sizes"></i>}
                  className="buttons-disable-etc"
                />
              )}
              {businessDetails.location ? (
                <Button
                  icon={<i className="icon-location call-etc-icons-sizes"></i>}
                  className="buttons-call-etc"
                  // onClick={() =>
                  //   window.open(businessDetails.location, "_blank")
                  // }
                />
              ) : (
                <Button
                  icon={<i className="icon-location call-etc-icons-sizes"></i>}
                  className="buttons-disable-etc"
                />
              )}
              <Button
                icon={<i className="icon-web call-etc-icons-sizes"></i>}
                onClick={() => window.open(businessDetails.website, "_blank")}
                className="buttons-call-etc"
              />
            </Col>
          </Row>

          <Row className="mt-5">
            <Col lg={12} md={12} sm={12}>
              <Footer operationHours={businessDetails.operationHours} />
            </Col>
          </Row>
        </Container>
      )}
    </Fragment>
  );
};

export default CategoryDetails;
