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

const ExploreSwiperLong = ({ exploreListingData, setExploreInformation }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const locationLatitude = useSelector(
    (state) => state.actionReducer.locationLatitude
  );
  const locationLongitude = useSelector(
    (state) => state.actionReducer.locationLongitude
  );
  const favoriteListing = useSelector(
    (state) => state.actionReducer.favoriteListing
  );
  const likeUnlikeBusiness = useSelector(
    (state) => state.actionReducer.likeUnlikeBusiness
  );

  const ExploreLongBoxRef = useRef(null);

  const [longData, setLongData] = useState([]);
  const [activeCategory, setActiveCategory] = useState(0);

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

  const toggleIcon = (checked, LikeData, favIndex) => {
    let likeItem = LikeData.subCategoryListingId;
    let filterData = [...longData];
    filterData.splice(favIndex, 1);
    const businessListingOtherIds = filterData.map(
      (item) => item.subCategoryListingId
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

  const toggleIsFavriote = (businessListingId) => {
    setExploreInformation((prevDashboardInfo) => {
      return prevDashboardInfo.map((category) => {
        const updatedListings = category.subCategoryListings.map((listing) => {
          if (listing.subCategoryListingId === businessListingId) {
            return {
              ...listing,
              isFavorite: !listing.isFavorite,
            };
          }
          return listing;
        });
        return {
          ...category,
          subCategoryListings: updatedListings,
        };
      });
    });
    setActiveCategory(0);
  };

  useEffect(() => {
    if (favoriteListing != null) {
      toggleIsFavriote(favoriteListing);
      dispatch(cleareFavResponce());
    }
  }, [favoriteListing]);

  const toggleLike = (checked, LikeData, dataIndex) => {
    let likeItem = LikeData.subCategoryListingId;
    let filterData = [...longData];
    filterData.splice(dataIndex, 1);
    const businessListingOtherIds = filterData.map(
      (item) => item.subCategoryListingId
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

  const toggleIsLiked = (businessListingId) => {
    setExploreInformation((prevDashboardInfo) => {
      return prevDashboardInfo.map((category) => {
        const updatedListings = category.subCategoryListings.map((listing) => {
          if (listing.subCategoryListingId === businessListingId) {
            return {
              ...listing,
              isLiked: !listing.isLiked,
            };
          }
          return listing;
        });
        return {
          ...category,
          subCategoryListings: updatedListings,
        };
      });
    });
    setActiveCategory(0);
  };

  useEffect(() => {
    if (likeUnlikeBusiness != null) {
      toggleIsLiked(likeUnlikeBusiness);
      dispatch(cleareLikeResponce());
    }
  }, [likeUnlikeBusiness]);

  const onExploreCat = async (exploreData) => {
    if (exploreData && exploreData.subCategoryListingId) {
      let newBusinessIdData = {
        BusinessListingID: exploreData.subCategoryListingId,
      };
      await localStorage.setItem(
        "newBusinessIdData",
        JSON.stringify(newBusinessIdData)
      );
      dispatch(businessDetailsMainApi(navigate, newBusinessIdData));
    } else {
      console.error("exploreDatabusinessListingId");
    }
  };

  const handleLongPress = (e, value) => {
    e.preventDefault();
    setActiveCategory(value);
  };

  const handleShortPress = (e, value) => {
    e.preventDefault();
    onExploreCat(value);
  };

  // Add a click event listener to the document to handle clicks outside of swiper-longpress-box
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        ExploreLongBoxRef.current &&
        !ExploreLongBoxRef.current.contains(event.target)
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
                        handleLongPress(e, newData.subCategoryListingId)
                      }
                      onPress={(e) => handleShortPress(e, newData)}
                      duration={500}
                    >
                      <Button
                        id={`swiper-section ${newData.subCategoryListingId}`}
                        className={`Swipper-slide-box ${
                          activeCategory === newData.subCategoryListingId
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
                    {activeCategory === newData.subCategoryListingId ? (
                      <div
                        ref={ExploreLongBoxRef}
                        className="Explore-longpress-box"
                      >
                        <div className="options-main-div">
                          <span className="icn-display-block">
                            {newData.isLiked ? (
                              <span
                                onClick={() =>
                                  toggleLike(false, newData, index)
                                }
                              >
                                <HandThumbsUpFill className="icon-class" />
                                <span className="main-options">UnLike</span>
                              </span>
                            ) : (
                              <span
                                onClick={() => toggleLike(true, newData, index)}
                              >
                                <i className="icon-like icon-class"></i>
                                <span className="main-options">Like</span>
                              </span>
                            )}
                          </span>
                          <span className="icn-display-block">
                            {newData.subCategoryContactNumber ? (
                              <>
                                <i className="icon-call icon-class"></i>
                                <span className="main-options">Call</span>
                              </>
                            ) : (
                              <>
                                <i className="icon-call IconExplore-disabled-Call"></i>
                                <span className="disable-Exploremain-options">
                                  Call
                                </span>
                              </>
                            )}
                          </span>
                          <span className="icn-display-block">
                            {newData.subCategoryLocation ? (
                              <>
                                <a
                                  href={newData.subCategoryLocation}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="underLine_Text"
                                >
                                  <i className="icon-location icon-class"></i>
                                </a>
                                <span className="main-options">Direction</span>
                              </>
                            ) : (
                              <>
                                <i className="icon-location IconExplore-disabled-Direction"></i>
                                <span className="disable-Exploremain-options">
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
                              <span
                                onClick={() =>
                                  toggleIcon(false, newData, index)
                                }
                              >
                                <StarFill className="icon-class" />
                                <span className="main-options">UnFavorite</span>
                              </span>
                            ) : (
                              <span
                                onClick={() => toggleIcon(true, newData, index)}
                              >
                                <i className="icon-star icon-Favorite"></i>
                                <span className="main-options">Favorite</span>
                              </span>
                            )}
                          </span>
                        </div>
                      </div>
                    ) : null}
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
