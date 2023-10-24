import React, { useState, useEffect, useRef } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Button } from "./../../../components/Elements";
import { Swiper, SwiperSlide } from "swiper/react";
import { useNavigate } from "react-router-dom";
import { StarFill, HandThumbsUpFill } from "react-bootstrap-icons";
import LongPress from "../LonPress/LongPress";
import {
  updateFavoriteApi,
  likeUnlikeApi,
} from "../../../store/Actions/Actions";
import { useDispatch, useSelector } from "react-redux";
import "swiper/css";
import "./FavoriteSwiperLong.css";
import { getRndomeNumber } from "../../../common/Function/utils";

const FavoriteSwiperLong = ({ favoriteListingData ,activeCategory, setActiveCategory}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const locationLatitude = useSelector(
    (state) => state.actionReducer.locationLatitude
  );
  const locationLongitude = useSelector(
    (state) => state.actionReducer.locationLongitude
  );

  const [longData, setLongData] = useState([]);
  
  const [clickCount, setClickCount] = useState(0);

  const FavoriteLongBoxRef = useRef(null);

  const [clicks, setClicks] = useState(0);

  const [dataCheck, setDataCheck] = useState([]);

  const truncateFavText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };

  const detailBusinessFav = async (favoriteData) => {
    console.log("click is triggered");
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

  //for Favorite icon toggle onclick
  const toggleFav = (checked, LikeData, favIndex) => {
    let likeItem = LikeData.businessListingId;
    let filterData = [...longData];
    filterData.splice(favIndex, 1);
    const businessListingOtherIds = filterData.map(
      (item) => item.businessListingId
    );
    let newLike = {
      AddRemoveFavoriteBusinessEnum: checked === true ? 1 : 2,
      UserID: "PLU_1",
      Latitude: locationLatitude,
      Longitude: locationLongitude,
      BusinessListingId: likeItem,
      OtherAvailableListings: businessListingOtherIds,
    };
    dispatch(updateFavoriteApi(newLike, likeItem));
  };

  //for like icon toggle onclick
  const toggleLike = (checked, LikeData, dataIndex) => {
    let likeItem = LikeData.businessListingId;
    let filterData = [...longData];

    filterData.splice(dataIndex, 1);
    const businessListingOtherIds = filterData.map(
      (item) => item.businessListingId
    );
    let newLike = {
      LikeUnLikeBusinessListingsEnum: checked === true ? 1 : 2,
      UserID: "PLU_1",
      Latitude: locationLatitude,
      Longitude: locationLongitude,
      BusinessListingId: likeItem,
      OtherAvailableListings: businessListingOtherIds,
    };

    dispatch(likeUnlikeApi(newLike, likeItem));
  };

  const handleLongPress = (e, value) => {
    // Handle long press here
    e.preventDefault();
    setActiveCategory(value);
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
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        FavoriteLongBoxRef.current &&
        !FavoriteLongBoxRef.current.contains(event.target)
      ) {
        setActiveCategory(0);
      }
    };
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

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
                        handleLongPress(e, newData.businessListingId)
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
                    {activeCategory === newData.businessListingId ? (
                      <>
                        <div
                          ref={FavoriteLongBoxRef}
                          className={"longpress-box"}
                        >
                          <div className="options-main-div">
                            <span className="icn-display-block">
                              {newData.isLiked ? (
                                <>
                                  <span
                                    onClick={(checked) =>
                                      toggleLike(false, newData, index)
                                    }
                                  >
                                    <HandThumbsUpFill className="icon-class" />
                                    <span className="main-options">UnLike</span>
                                  </span>
                                </>
                              ) : (
                                <>
                                  <span
                                    onClick={(checked) =>
                                      toggleLike(true, newData, index)
                                    }
                                  >
                                    <i className="icon-like icon-class"></i>
                                    <span className="main-options">Like</span>
                                  </span>
                                </>
                              )}
                            </span>
                            <span className="icn-display-block">
                              {newData.businessContactNumber ? (
                                <>
                                  <i className="icon-call icon-class"></i>
                                  <span className="main-options">Call</span>
                                </>
                              ) : (
                                <>
                                  <i className="icon-call icon-class"></i>
                                  <span className="main-options">Call</span>
                                </>
                              )}
                            </span>
                            <span className="icn-display-block">
                              {newData.businessLocation ? (
                                <>
                                  <i className="icon-location icon-class"></i>
                                  <span className="main-options">
                                    Direction
                                  </span>
                                </>
                              ) : (
                                <>
                                  <i className="icon-location icon-class"></i>
                                  <span className="main-options">
                                    Direction
                                  </span>
                                </>
                              )}
                            </span>
                            <span className="icn-display-block">
                              <i className="icon-share icon-class"></i>
                              <span className="main-options">Share</span>
                            </span>
                            <span className="icn-display-block-share">
                              {newData.isFavorite ? (
                                <>
                                  <span
                                    onClick={(checked) =>
                                      toggleFav(false, newData, index)
                                    }
                                  >
                                    <StarFill className="icon-class" />
                                    <span className="main-options">
                                      UnFavorite
                                    </span>
                                  </span>
                                </>
                              ) : (
                                <>
                                  {" "}
                                  <span
                                    onClick={(checked) =>
                                      toggleFav(true, newData, index)
                                    }
                                  >
                                    <i className="icon-star icon-Favorite"></i>
                                    <span className="main-options">
                                      Favorite
                                    </span>
                                  </span>
                                </>
                              )}
                            </span>
                          </div>
                        </div>
                      </>
                    ) : null}

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
