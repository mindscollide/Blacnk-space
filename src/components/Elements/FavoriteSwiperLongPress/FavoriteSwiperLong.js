import React, { useState, useEffect } from "react";
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
import "./FavoriteSwiperLong.css";
import { getRndomeNumber } from "../../../common/Function/utils";

const FavoriteSwiperLong = ({
  favoriteListingData,
  favoriteInformation,
  setFavoriteInformation,
}) => {
  console.log(favoriteListingData, "listingDatalistingData");
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
  const [longData, setLongData] = useState([]);

  const [activeCategory, setActiveCategory] = useState(0);

  const [clickCount, setClickCount] = useState(0);

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
      value: locationLatitude,
      errorMessage: "",
      errorStatus: false,
    },
    Longitude: {
      value: locationLongitude,
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
      value: locationLatitude,
      errorMessage: "",
      errorStatus: false,
    },
    Longitude: {
      value: locationLongitude,
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

  const detailBusinessFav = (favoriteData) => {
    console.log("click is triggered");
    setClickCount(clickCount + 1);
    if (favoriteData && favoriteData.businessListingId) {
      let newBusinessIdData = {
        BusinessListingID: favoriteData.businessListingId,
      };
      console.log(newBusinessIdData, "newBusinessIdDatanewBusinessIdData");
      dispatch(businessDetailsMainApi(navigate, newBusinessIdData));
    } else {
      console.error("businessData or businessListingId is undefined.");
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
      UserID: likeState.UserID.value,
      Latitude: locationLatitude,
      Longitude: locationLongitude,
      BusinessListingId: likeItem,
      OtherAvailableListings: businessListingOtherIds,
    };
    dispatch(updateFavoriteApi(newLike, likeItem));
  };

  // UPDATE REAL TIME DATA IF API IS GOING TO SUCESS OF FAVORITE
  const toggleIsFavriote = (businessListingId) => {
    setFavoriteInformation((prevDashboardInfo) => {
      const updatedData = prevDashboardInfo
        .map((category) => {
          const updatedListings = category.favoriteByUserListings.filter(
            (listing) => listing.businessListingId !== businessListingId
          );
    
          return {
            ...category,
            favoriteByUserListings: updatedListings,
          };
        })
        .filter((category) => category.favoriteByUserListings.length > 0);
    
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
      UserID: likeState.UserID.value,
      Latitude: locationLatitude,
      Longitude: locationLongitude,
      BusinessListingId: likeItem,
      OtherAvailableListings: businessListingOtherIds,
    };

    dispatch(likeUnlikeApi(newLike, likeItem));
  };

  // UPDATE REAL TIME DATA IF API IS GOING TO SUCESS OF LIKE
  const toggleIsLiked = (businessListingId) => {
    const updatedData = favoriteInformation.map((category) => {
      const updatedListings = category.favoriteByUserListings.map((listing) => {
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
        favoriteByUserListings: updatedListings,
      };
    });

    setFavoriteInformation(updatedData);
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
    detailBusinessFav(value);
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

  return (
    <Container>
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
                          <span>{firstLetter}</span>
                        )
                      }
                    ></Button>
                  </LongPress>
                  {activeCategory === newData.businessListingId ? (
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
                                  <span className="main-options">Like</span>
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
                                <span className="main-options">No Call</span>
                              </>
                            )}
                          </span>
                          <span className="icn-display-block">
                            {newData.businessLocation ? (
                              <>
                                <i className="icon-location icon-class"></i>
                                <span className="main-options">Direction</span>
                              </>
                            ) : (
                              <>
                                <i className="icon-location icon-class"></i>
                                <span className="main-options">
                                  No Direction
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
                                  <span className="main-options">Favorite</span>
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
                                  <span className="main-options">Favorite</span>
                                </span>
                              </>
                            )}
                          </span>
                        </div>
                      </div>
                    </>
                  ) : null}

                  <p className="para-color">{newData.businessListingName}</p>
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
