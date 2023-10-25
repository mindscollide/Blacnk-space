import React, { useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Button } from "./../../../components/Elements";
import { Swiper, SwiperSlide } from "swiper/react";
import { useNavigate } from "react-router-dom";
import LongPress from "../LonPress/LongPress";
import "swiper/css";
import "./FavoriteSwiperLong.css";

const FavoriteSwiperLong = ({
  favoriteListingData,
  activeCategory,
  setActiveCategory,
  parentIndex,
  setChildIndex,
  setChildIconIndex,
  setMenuPosition,
}) => {
  const navigate = useNavigate();

  const [longData, setLongData] = useState([]);

  const [clickCount, setClickCount] = useState(0);

  const [clicks, setClicks] = useState(0);

  const [dataCheck, setDataCheck] = useState([]);

  const truncateFavText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };

  const detailBusinessFav = async (favoriteData) => {
    setClickCount(clickCount + 1);
    if (favoriteData && favoriteData.businessListingId) {
      let newBusinessIdData = {
        BusinessListingID: favoriteData.businessListingId,
      };
      await localStorage.setItem(
        "newBusinessIdData",
        JSON.stringify(newBusinessIdData)
      );
      navigate("/BlankSpace/Category");
    } else {
      console.error("businessData or businessListingId is undefined.");
    }
  };

  const handleLongPress = (e, value, index) => {
    // Handle long press here
    e.preventDefault();
    const menuWidth = 290;
    const menuHeight = 48;
    const rect = e.target.getBoundingClientRect();
    const xPos = rect.left + window.scrollX + rect.width / 2;
    const yPos = rect.top + window.scrollY + rect.height;
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    let x = xPos;
    let y = yPos;
    // Check if the menu will go beyond the viewport boundaries and adjust its position
    if (x + menuWidth > viewportWidth) {
      x = (viewportWidth - menuWidth) / 2;
    } else {
    }

    if (y + menuHeight > viewportHeight) {
      y = yPos - menuHeight;
    }

    setMenuPosition({ x, y });
    setActiveCategory(value);
    setChildIndex(parentIndex);
    setChildIconIndex(index);
  };

  const handleShortPress = (e, data) => {
    // Handle short press here
    e.preventDefault();
    if (clicks === 1) {
      if (dataCheck === data) {
        // Perform the action you want to happen on the double-click here
        detailBusinessFav(data);
      } else {
        setDataCheck(data);
      }
      // Reset the click count
      setClicks(0);
    } else {
      // Increment the click count
      setClicks(clicks + 1);
      setDataCheck(data);
      // You can add a delay here to reset the click count after a certain time if needed
      setTimeout(() => {
        setClicks(0);
        setDataCheck([]);
      }, 300); // Reset after 300 milliseconds (adjust as needed)
    }
  };

  useEffect(() => {
    if (
      favoriteListingData !== null &&
      favoriteListingData !== undefined &&
      favoriteListingData.length > 0
    ) {
      setLongData(favoriteListingData);
    }
  }, [favoriteListingData]);

  // Add a click event listener to the document to handle clicks outside of swiper-longpress-box

  return (
    <Container className="backgroundBody">
      <Row>
        <Col lg={12} md={12} sm={12}>
          <Swiper
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
                slidesPerView: 4,
                spaceBetween: 7,
              },
              425: {
                slidesPerView: 4,
                spaceBetween: 7,
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
                slidesPerView: 5,
                spaceBetween: 0,
              },
              768: {
                slidesPerView: 5,
                spaceBetween: 0,
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
                let firstLetter = newData.businessListingName
                  .charAt(0)
                  .toUpperCase();
                return (
                  <SwiperSlide key={newData.businessListingId}>
                    <LongPress
                      onLongPress={(e) =>
                        handleLongPress(e, newData.businessListingId, index)
                      }
                      onPress={(e) => handleShortPress(e, newData)}
                      duration={500}
                    >
                      <Button
                        id={`swiper-section ${newData.businessListingId}`}
                        className={`Swipper-slide-box ${
                          activeCategory === newData.businessListingId
                            ? "active"
                            : ""
                        }`}
                        text={
                          newData.businessListingIcon !== "" ? (
                            <img
                              src={`data:image/jpeg;base64,${newData.businessListingIcon}`}
                              alt="Icon"
                              className="Swipper-slide-box-image"
                            />
                          ) : (
                            <span className="fav-tile-empty-letter">
                              {firstLetter}
                            </span>
                          )
                        }
                      ></Button>
                    </LongPress>
                    <p className="Fav-para-color">
                      {truncateFavText(newData.businessListingName, 15)}
                    </p>
                  </SwiperSlide>
                );
              })}
          </Swiper>
        </Col>
      </Row>
    </Container>
  );
};

export default FavoriteSwiperLong;
