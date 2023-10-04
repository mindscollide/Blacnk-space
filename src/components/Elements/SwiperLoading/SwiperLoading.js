import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import "./SwiperLoading.css";
import "swiper/css";

const SwiperLoading = ({ owner, customClass, title }) => {
  return (
    <>
      <Swiper
        breakpoints={{
          320: {
            width: 295,
            slidesPerView: 3,
            spaceBetween: 5,
          },
          375: {
            width: 350,
            slidesPerView: 4,
            spaceBetween: 2,
          },
          412: {
            width: 400,
            slidesPerView: 4,
            spaceBetween: 2,
          },
          425: {
            width: 390,
            slidesPerView: 4,
            spaceBetween: 2,
          },
          684: {
            width: 520,
            slidesPerView: 4,
            spaceBetween: 2,
          },
          734: {
            width: 680,
            slidesPerView: 5,
            spaceBetween: 0,
          },
          768: {
            width: 700,
            slidesPerView: 5,
            spaceBetween: 0,
          },
          1024: {
            width: 940,
            slidesPerView: 8,
            spaceBetween: 0,
          },
          1360: {
            width: 1250,
            slidesPerView: 9,
            spaceBetween: 0,
          },
          1440: {
            width: 1300,
            slidesPerView: 10,
            spaceBetween: 0,
          },
        }}
      >
        <SwiperSlide>
          <Row>
            <Col lg={12} md={12} sm={12}>
              <div className={`${"Swiper-Loading-Slide"} ${customClass}`}></div>
              <p
                style={{
                  display: "flex",
                  color: "white",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {owner}
              </p>
            </Col>
          </Row>
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default SwiperLoading;

export const SwiperLoadingPost = () => {
  let loadPages = [1, 2, 3, 4, 5, 6];

  return (
    <>
      <Container>
        <Row className="mt-2">
          <Col lg={12} md={12} sm={12}>
            <Swiper>
              <SwiperSlide>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    width: "100%",
                  }}
                >
                  {loadPages.map((num) => (
                    <SwiperLoading />
                  ))}
                </div>
              </SwiperSlide>
            </Swiper>
          </Col>
        </Row>
      </Container>
    </>
  );
};
