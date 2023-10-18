import React, { Fragment, useEffect, useState, useRef } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Button } from "./../../../components/Elements";
import { Swiper, SwiperSlide } from "swiper/react";
import { useNavigate } from "react-router-dom";
import {
  updateFavoriteApi,
  likeUnlikeApi,
  businessDetailsMainApi,
  getdashboardApi,
  cleareLikeResponce,
  cleareFavResponce,
} from "../../../store/Actions/Actions";
import { useDispatch, useSelector } from "react-redux";
import {
  StarFill,
  HandThumbsUpFill,
  TelephoneXFill,
} from "react-bootstrap-icons";
import "swiper/css";
import "./SwiperLongPress.css";
import { getRndomeNumber } from "../../../common/Function/utils";
import LongPress from "../LonPress/LongPress";

const SwiperLongpress = ({
  listingData,
  dashboardData,
  setDashboardInformation,
  dashboardInformation,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const likeUnlikeBusiness = useSelector(
    (state) => state.actionReducer.likeUnlikeBusiness
  );
  const locationLatitude = useSelector(
    (state) => state.actionReducer.locationLatitude
  );
  const locationLongitude = useSelector(
    (state) => state.actionReducer.locationLongitude
  );
  const favoriteListing = useSelector(
    (state) => state.actionReducer.favoriteListing
  );
  const [longData, setLongData] = useState(listingData);
  const [activeCategory, setActiveCategory] = useState(0);
  // Create a ref for the swiper-longpress-box element
  const swiperLongPressBoxRef = useRef(null);

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };

  const detailBusiness = async (businessData) => {
    if (businessData && businessData.businessListingId) {
      let newBusinessIdData = {
        BusinessListingID: businessData.businessListingId,
      };
      await localStorage.setItem(
        "newBusinessIdData",
        JSON.stringify(newBusinessIdData)
      );
      navigate("/BlankSpace/Category");
      // dispatch(businessDetailsMainApi(navigate, newBusinessIdData));
    } else {
    }
  };

  //for Favorite icon toggle onclick
  const toggleIcon = (checked, LikeData, favIndex) => {
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
  // UPDATE REAL TIME DATA IF API IS GOING TO SUCESS OF FAVORITE
  const toggleIsFavriote = (businessListingId) => {
    setDashboardInformation((prevDashboardInfo) => {
      const updatedData = prevDashboardInfo.map((category) => {
        const updatedListings = category.dashBoardListings.map((listing) => {
          if (listing.businessListingId === businessListingId) {
            // Toggle isFavorite value
            return {
              ...listing,
              isFavorite: !listing.isFavorite,
            };
          }
          return listing;
        });

        return {
          ...category,
          dashBoardListings: updatedListings,
        };
      });

      return updatedData;
    });
  };
  // UPDATE CALL REAL TIME DATA IF API IS GOING TO SUCESS OF FAVORITE
  useEffect(() => {
    if (favoriteListing != null) {
      toggleIsFavriote(favoriteListing);
      dispatch(cleareFavResponce());
    }
  }, [favoriteListing]);

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
  // UPDATE REAL TIME DATA IF API IS GOING TO SUCESS OF LIKE
  const toggleIsLiked = (businessListingId) => {
    setDashboardInformation((prevDashboardInfo) => {
      const updatedData = prevDashboardInfo.map((category) => {
        const updatedListings = category.dashBoardListings.map((listing) => {
          if (listing.businessListingId === businessListingId) {
            // Toggle isLiked value
            return {
              ...listing,
              isLiked: !listing.isLiked,
            };
          }
          return listing;
        });

        return {
          ...category,
          dashBoardListings: updatedListings,
        };
      });

      return updatedData;
    });
  };
  // UPDATE CALL REAL TIME DATA IF API IS GOING TO SUCESS OF LIKE
  useEffect(() => {
    if (likeUnlikeBusiness != null) {
      toggleIsLiked(likeUnlikeBusiness);
      dispatch(cleareLikeResponce());
    }
  }, [likeUnlikeBusiness]);

  const handleLongPress = (e, value) => {
    // Handle long press here
    e.preventDefault();
    setActiveCategory(value);
  };

  const handleShortPress = (e, value) => {
    // Handle short press here
    e.preventDefault();
    detailBusiness(value);
  };

  // Add a click event listener to the document to handle clicks outside of swiper-longpress-box
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        swiperLongPressBoxRef.current &&
        !swiperLongPressBoxRef.current.contains(event.target)
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
    <Container>
      <Fragment>
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
              {longData.map((newData, index) => {
                let firstLetter = newData.businessListingName
                  .charAt(0)
                  .toUpperCase();
                return (
                  <SwiperSlide key={getRndomeNumber()}>
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
                            <span className="tile-empty-letter">
                              {firstLetter}
                            </span>
                          )
                        }
                      ></Button>
                    </LongPress>

                    {activeCategory === newData.businessListingId ? (
                      <>
                        <div
                          ref={swiperLongPressBoxRef}
                          className="swiper-longpress-box"
                        >
                          <div className="options-main-div">
                            <span className="icn-display-block">
                              {newData.isLiked ? (
                                <>
                                  <span
                                    onClick={() =>
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
                                    onClick={() =>
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
                                  <i className="icon-call Icon-disabled-Call"></i>
                                  <span className="disable-main-options">
                                    {" "}
                                    Call
                                  </span>
                                </>
                              )}
                            </span>
                            <span className="icn-display-block">
                              {newData.businessLocation ? (
                                <>
                                  <a
                                    href={newData.businessLocation}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="underLine_Text"
                                  >
                                    <i className="icon-location icon-class"></i>
                                  </a>
                                  <span className="main-options">
                                    Direction
                                  </span>
                                </>
                              ) : (
                                <>
                                  <i className="icon-location Icon-disabled-Direction"></i>
                                  <span className="disable-main-options">
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
                                      toggleIcon(false, newData, index)
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
                                      toggleIcon(true, newData, index)
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

                    <p className="para-color">
                      {truncateText(newData.businessListingName, 15)}
                    </p>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </Col>
        </Row>
      </Fragment>
    </Container>
  );
};

export default SwiperLongpress;
