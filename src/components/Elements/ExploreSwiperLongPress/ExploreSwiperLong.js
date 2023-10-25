import React, { useEffect, useState, useRef } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Button } from "./../../../components/Elements";
import { Swiper, SwiperSlide } from "swiper/react";
import { useNavigate } from "react-router-dom";
import { StarFill, HandThumbsUpFill } from "react-bootstrap-icons";
import LongPress from "../LonPress/LongPress";
import {
  updateFavoriteApi,
  likeUnlikeApi,
  businessDetailsMainApi,
  cleareLikeResponce,
  cleareFavResponce,
} from "../../../store/Actions/Actions";
import { useDispatch, useSelector } from "react-redux";
import "swiper/css";
import "./ExploreSwiperLong.css";
import { getRndomeNumber } from "../../../common/Function/utils";

const ExploreSwiperLong = ({
  exploreListingData,
  activeInneryCategory,
  setActiveInneryCategory,
  setMenuPosition,
  setChildIconIndex,
  setChildIndex,
  parentIndex
}) => {
  const navigate = useNavigate();
  const [longData, setLongData] = useState([]);
  const [clicks, setClicks] = useState(0);
  const [dataCheck, setDataCheck] = useState([]);
  useEffect(() => {
    if (exploreListingData) {
      setLongData(exploreListingData);
    }
  }, [exploreListingData]);

  const truncateExploreText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };

  const onExploreCat = async (exploreData) => {
    if (exploreData && exploreData.subCategoryListingId) {
      let newBusinessIdData = {
        BusinessListingID: exploreData.subCategoryListingId,
      };
      await localStorage.setItem(
        "newBusinessIdData",
        JSON.stringify(newBusinessIdData)
      );
      navigate("/BlankSpace/Category");
    } else {
      console.error("exploreDatabusinessListingId");
    }
  };

  const handleLongPress = async(e, value,index) => {
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

    await setMenuPosition({ x, y });
    await setChildIconIndex(index)
    await setChildIndex(parentIndex)
    await setActiveInneryCategory(value);
  };

  const handleShortPress = (e, data) => {
    e.preventDefault();
    if (clicks === 1) {
      if (dataCheck === data) {
        // Perform the action you want to happen on the double-click here
        onExploreCat(data);
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



  return (
    <Container className="backgroundBody">
      <Row>
        <Col lg={12} md={12} sm={12}>
          <Swiper
            direction="horizontal"
            breakpoints={{
              320: { slidesPerView: 3, spaceBetween: 5 },
              375: { slidesPerView: 3, spaceBetween: 0 },
              412: { slidesPerView: 4, spaceBetween: 7 },
              425: { slidesPerView: 4, spaceBetween: 7 },
              667: { slidesPerView: 5, spaceBetween: 0 },
              684: { slidesPerView: 5, spaceBetween: 0 },
              734: { slidesPerView: 5, spaceBetween: 0 },
              768: { slidesPerView: 5, spaceBetween: 0 },
              1024: { slidesPerView: 8, spaceBetween: 2 },
              1360: { slidesPerView: 8, spaceBetween: 0 },
              1440: { slidesPerView: 8, spaceBetween: 0 },
              2560: { slidesPerView: 18, spaceBetween: 0 },
            }}
          >
            {longData.length > 0 &&
              longData.map((newData, index) => {
                let firstLetter = newData.subCategoryListingName
                  .charAt(0)
                  .toUpperCase();
                return (
                  <SwiperSlide key={getRndomeNumber()}>
                    <LongPress
                      onLongPress={(e) =>
                        handleLongPress(e, newData.subCategoryListingId,index)
                      }
                      onPress={(e) => handleShortPress(e, newData)}
                      duration={500}
                    >
                      <Button
                        id={`swiper-section ${newData.subCategoryListingId}`}
                        className={`Swipper-slide-box ${
                          activeInneryCategory === newData.subCategoryListingId
                            ? "active"
                            : ""
                        }`}
                        text={
                          newData.subCategoryListingIcon !== "" ? (
                            <img
                              src={`data:image/jpeg;base64,${newData.subCategoryListingIcon}`}
                              alt="Icon"
                              className="Swipper-slide-box-image"
                            />
                          ) : (
                            <span className="explore-tile-empty-letter">
                              {firstLetter}
                            </span>
                          )
                        }
                      />
                    </LongPress>
                    <p className="explore-para-color">
                      {truncateExploreText(newData.subCategoryListingName, 15)}
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

export default ExploreSwiperLong;
