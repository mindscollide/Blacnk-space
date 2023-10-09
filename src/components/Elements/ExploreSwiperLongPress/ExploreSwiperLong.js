import React, { Fragment, useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Button, useLongPressClick } from "./../../../components/Elements";
import { Swiper, SwiperSlide } from "swiper/react";
import { useNavigate } from "react-router-dom";
import { StarFill, HandThumbsUpFill } from "react-bootstrap-icons";

import {
  updateFavoriteApi,
  likeUnlikeApi,
  businessDetailsMainApi,
} from "../../../store/Actions/Actions";
import { useDispatch, useSelector } from "react-redux";
import "swiper/css";
import "./ExploreSwiperLong.css";

const ExploreSwiperLong = ({ exploreListingData }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { actionReducers } = useSelector((state) => state);
  console.log(actionReducers, "actioonnnReducceer");
  const [isLongPress, setIsLongPress] = useState(false);

  // state for update Favorite
  const [updateFavorite, setUpdateFavorite] = useState({
    AddRemoveFavoriteBusinessEnum: {
      value: 1,
      errorMessage: "",
      errorStatus: false,
    },
    UserID: {
      value: "PLU_1",
      errorMessage: "",
      errorStatus: false,
    },
    Latitude: {
      value: "24.152",
      errorMessage: "",
      errorStatus: false,
    },
    Longitude: {
      value: "24.152",
      errorMessage: "",
      errorStatus: false,
    },
    BusinessListingId: {
      value: "BUL_0x3eb33eb25e826edb:0xf8830cefa06c2a7d",
      errorMessage: "",
      errorStatus: false,
    },
    OtherAvailableListings: {
      value: ["BUL_0x3eb33f7b8bf5d8d3:0x828884303c4824cf"],
      errorMessage: "",
      errorStatus: false,
    },
  });

  // state for like and dislike
  const [likeState, setLikeState] = useState({
    LikeUnLikeBusinessListingsEnum: {
      value: 2,
      errorMessage: "",
      errorStatus: false,
    },
    UserID: {
      value: "PLU_1",
      errorMessage: "",
      errorStatus: false,
    },
    Latitude: {
      value: "24.152",
      errorMessage: "",
      errorStatus: false,
    },
    Longitude: {
      value: "24.152",
      errorMessage: "",
      errorStatus: false,
    },
    BusinessListingId: {
      value: "BUL_0x3eb33f349b314d3f:0xefb5da061f2d49b",
      errorMessage: "",
      errorStatus: false,
    },
    OtherAvailableListings: {
      value: [
        "BUL_0x3eb33eb15fc7bfcf:0x4f43996895406161",
        "BUL_0x3eb3396be8e67cbb:0xc949e827008496bc1",
      ],
      errorMessage: "",
      errorStatus: false,
    },
  });

  const [longData, setLongData] = useState([]);
  console.log(longData, longData.length, "longDatalongDatalongDatalongData");
  const [activeCategory, setActiveCategory] = useState(0);

  const [clickCount, setClickCount] = useState(0);

  const onLongPress = () => {
    console.log("longpress is triggered");
    setIsLongPress(true);
    setTimeout(() => setIsLongPress(false), 800000);
  };

  //for Favorite icon toggle onclick
  const toggleIcon = (checked, CardData, favIndex) => {
    console.log(checked, "checkedcheckedchecked");
    // setStarIconVisible(!starIconVisible);
    let favoriteItem = CardData.subCategoryListingId;
    let otherIdss = [];
    longData
      .filter(
        (data, index) =>
          data.subCategoryListingId !== CardData.subCategoryListingId
      )
      .map((newData, index) => {
        otherIdss.push(newData.subCategoryListingId);
      });

    let copyCategoryInformation = [...longData];
    let getFavSubCategoryIndex = copyCategoryInformation.findIndex(
      (data, index) => index === favIndex
    );
    // this will update the each subCategory
    let updatedCategory = {
      ...copyCategoryInformation[getFavSubCategoryIndex],
    };
    console.log(updatedCategory, "updatedCategoryupdatedCategory");
    updatedCategory.isFavorite = checked;
    copyCategoryInformation[getFavSubCategoryIndex] = updatedCategory;
    setLongData(copyCategoryInformation);
    let newUpdateFavorite = {
      AddRemoveFavoriteBusinessEnum: checked === true ? 1 : 2,
      UserID: updateFavorite.UserID.value,
      Latitude: updateFavorite.Latitude.value,
      Longitude: updateFavorite.Longitude.value,
      BusinessListingId: favoriteItem,
      OtherAvailableListings: otherIdss,
    };
    dispatch(updateFavoriteApi(newUpdateFavorite));
  };

  // For Like and Dislike toggle Button
  const toggleLike = (checked, LikeData, dataIndex) => {
    console.log(checked, "checkedcheckedchecked");
    // setLikeIconVisible(!likeIconVisible);
    let likeItem = LikeData.subCategoryListingId;
    let otherLikeIds = [];

    // this long filter is for it will show other unselected items into otherAvailabledatalist
    longData
      .filter(
        (data, index) =>
          data.subCategoryListingId !== LikeData.subCategoryListingId
      )
      .map((newData, index) => {
        otherLikeIds.push(newData.subCategoryListingId);
      });
    let copyCategoryInformation = [...longData];
    let getSubCategoryIndex = copyCategoryInformation.findIndex(
      (data, index) => index === dataIndex
    );
    // this will update the each subCategory
    let updatedCategory = { ...copyCategoryInformation[getSubCategoryIndex] };
    console.log(updatedCategory, "updatedCategoryupdatedCategory");
    updatedCategory.isLiked = checked;
    copyCategoryInformation[getSubCategoryIndex] = updatedCategory;
    setLongData(copyCategoryInformation);
    let newLike = {
      LikeUnLikeBusinessListingsEnum: checked === true ? 1 : 2,
      UserID: likeState.UserID.value,
      Latitude: likeState.Latitude.value,
      Longitude: likeState.Longitude.value,
      BusinessListingId: likeItem,
      OtherAvailableListings: otherLikeIds,
    };
    dispatch(likeUnlikeApi(newLike));
  };

  const onClick = (exploreData) => {
    console.log("click is triggered");
    setClickCount(clickCount + 1);
    if (exploreData && exploreData.subCategoryListingId) {
      let newBusinessIdData = {
        BusinessListingID: exploreData.subCategoryListingId,
      };
      console.log(newBusinessIdData, "newBusinessIdDatanewBusinessIdData");
      dispatch(businessDetailsMainApi(navigate, newBusinessIdData));
    } else {
      console.error("exploreDatabusinessListingId");
    }
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
                  console.log({ newData }, "newDatanewData");
                  console.log(index, "longDatalongDatalongData");
                  return (
                    <>
                      <SwiperSlide key={newData.subCategoryListingId}>
                        <button
                          src={`data:image/jpeg;base64,${newData.subCategoryListingId}`}
                          alt="Icon"
                          id={`swiper-section ${newData.subCategoryListingId}`}
                          className={`Swipper-slide-box-Explore-category ${
                            activeCategory === newData.subCategoryListingId
                              ? "active"
                              : ""
                          }`}
                          onClick={() => {
                            onClick(newData);
                            setTimeout(() => {
                              setActiveCategory(null);
                            }, 2000);
                            setActiveCategory(newData.subCategoryListingId);
                          }}
                          {...longPressEvent}
                        >
                          <img
                            src={`data:image/jpeg;base64,${newData.subCategoryListingId}`}
                            alt="Icon"
                            className="Swipper-slide-box-Explore-category-image"
                          />
                        </button>
                        {isLongPress &&
                        activeCategory === newData.subCategoryListingId ? (
                          <>
                            <div className="longpress-box">
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
                                        <span className="main-options">
                                          Like
                                        </span>
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
                                        <span className="main-options">
                                          Like
                                        </span>
                                      </span>
                                    </>
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
                                      <span className="main-options">
                                        Direction
                                      </span>
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
                                    <>
                                      <span
                                        onClick={(checked) =>
                                          toggleIcon(false, newData, index)
                                        }
                                      >
                                        <StarFill className="icon-class" />
                                        <span className="main-options">
                                          Favorite
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
