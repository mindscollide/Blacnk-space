import React, { Fragment, useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Button, useLongPressClick } from "./../../../components/Elements";
import { Swiper, SwiperSlide } from "swiper/react";
import { useNavigate } from "react-router-dom";
import "swiper/css";
import "./ExploreSwiperLong.css";

const ExploreSwiperLong = ({ exploreListingData }) => {
  const navigate = useNavigate();
  const [isLongPress, setIsLongPress] = useState(false);

  const [longData, setLongData] = useState([]);
  console.log(longData, longData.length, "longDatalongDatalongDatalongData");
  const [activeCategory, setActiveCategory] = useState(0);

  const [clickCount, setClickCount] = useState(0);

  const onLongPress = () => {
    console.log("longpress is triggered");
    setIsLongPress(true);
    setTimeout(() => setIsLongPress(false), 3000);
  };

  const onClick = () => {
    console.log("click is triggered");
    setClickCount(clickCount + 1);
    navigate("/Category");
  };
  useEffect(() => {
    if (
      exploreListingData !== null &&
      exploreListingData !== undefined &&
      exploreListingData.length > 0
    ) {
      setLongData(exploreListingData);
    }
  }, [exploreListingData]);
  const defaultOptions = {
    shouldPreventDefault: true,
    delay: 500,
  };
  const longPressEvent = useLongPressClick(
    onLongPress,
    onClick,
    defaultOptions
  );

  return (
    <Container>
      <>
        <Row>
          <Col lg={12} md={12} sm={12}>
            <Swiper
              direction="horizontal"
              onSlideChange={() => console.log("onSlideChange", "slide change")}
              onSwiper={(swiper) => console.log("onSlideChange", swiper)}
              breakpoints={{
                320: {
                  slidesPerView: 3,
                  spaceBetween: 5,
                },
                375: {
                  slidesPerView: 3,
                  spaceBetween: 0,
                },
                412: {
                  slidesPerView: 5,
                  spaceBetween: 0,
                },
                425: {
                  slidesPerView: 4,
                  spaceBetween: 0,
                },
                667: {
                  slidesPerView: 5,
                  spaceBetween: 0,
                },
                684: {
                  slidesPerView: 5,
                  spaceBetween: 0,
                },
                734: {
                  slidesPerView: 7,
                  spaceBetween: 4,
                },
                768: {
                  slidesPerView: 7,
                  spaceBetween: 5,
                },
                1024: {
                  slidesPerView: 8,
                  spaceBetween: 2,
                },
                1360: {
                  slidesPerView: 8,
                  spaceBetween: 0,
                },
                1440: {
                  slidesPerView: 8,
                  spaceBetween: 0,
                },
                2560: {
                  slidesPerView: 18,
                  spaceBetween: 0,
                },
              }}
            >
              {longData.length > 0 &&
                longData.map((newData, index) => {
                  console.log(index, "longDatalongDatalongData");
                  return (
                    <>
                      <SwiperSlide key={newData.subCategoryListingId}>
                        <button
                          id={`swiper-section ${newData.subCategoryListingId}`}
                          className={`Swipper-slide-box ${
                            activeCategory === newData.subCategoryListingId
                              ? "active"
                              : ""
                          }`}
                          onClick={() => {
                            setTimeout(() => {
                              setActiveCategory(null);
                            }, 2000);
                            setActiveCategory(newData.subCategoryListingId);
                          }}
                          {...longPressEvent}
                        ></button>
                        {isLongPress &&
                        activeCategory === newData.subCategoryListingId ? (
                          <>
                            <div className="longpress-box">
                              <div className="options-main-div">
                                <span className="icn-display-block">
                                  <i className="icon-like icon-class"></i>
                                  <span className="main-options">Like</span>
                                </span>
                                <span className="icn-display-block">
                                  <i className="icon-call icon-class"></i>
                                  <span className="main-options">Call</span>
                                </span>
                                <span className="icn-display-block">
                                  <i className="icon-location icon-class"></i>
                                  <span className="main-options">
                                    Direction
                                  </span>
                                </span>
                                <span className="icn-display-block">
                                  <i className="icon-share icon-class"></i>
                                  <span className="main-options">Share</span>
                                </span>
                                <span className="icn-display-block-share">
                                  <i className="icon-star icon-class"></i>
                                  <span className="main-options">Favorite</span>
                                </span>
                              </div>
                            </div>
                          </>
                        ) : null}

                        <p className="para-color">
                          {newData.subCategoryListingName}
                        </p>
                      </SwiperSlide>
                    </>
                  );
                })}
            </Swiper>
          </Col>
        </Row>
      </>
    </Container>
  );
};

export default ExploreSwiperLong;
