import React, { Fragment, useState, useEffect, useRef } from "react";
import { Col, Container, Row } from "react-bootstrap";
import {
  Button,
  Loader,
  HeadingHoldPU,
  SwiperLongpress,
  LongPress,
} from "./../../components/Elements";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Spinner } from "react-bootstrap";
import {
  getdashboardApi,
  CleareblockUnBlockSuccess,
  categoryRoute,
  cleareLikeResponce,
  cleareFavResponce,
  likeUnlikeApi,
  updateFavoriteApi,
} from "../../store/Actions/Actions";
import { HandThumbsUpFill, StarFill } from "react-bootstrap-icons";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Redux state variables
  const {
    locationLatitude,
    locationLongitude,
    blockUnBlockCategory,
    dashBoardListings,
    LoadingCheck,
    Loading,
  } = useSelector((state) => state.actionReducer);

  // Local state
  const [loadingAuto, setLoadingAuto] = useState(true);
  const [autoApiCallCheck, setAutoApiCallCheck] = useState(false);
  const [dashboardInformation, setDashboardInformation] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [lazyLoadingCheck, setLazyLoadingCheck] = useState(false);
  const [activeChildCategory, setActiveChildCategory] = useState(null);
  const [childIndex, setChildIndex] = useState(null);
  const [childIconIndex, setChildIconIndex] = useState(null);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const swiperLongPressBoxRef = useRef(null);
  const [dashboardData, setDashboardData] = useState({
    userID: {
      value: "PLU_1",
      errorMessage: "",
      errorStatus: false,
    },
    pageNumber: {
      value: 1,
      errorMessage: "",
      errorStatus: false,
    },
    UserLatitude: {
      value: "",
      errorMessage: "",
      errorStatus: false,
    },
    UserLongitude: {
      value: "",
      errorMessage: "",
      errorStatus: false,
    },
    isAutomatic: {
      value: false,
      errorMessage: "",
      errorStatus: false,
    },
  });

  const onClickExploreCategory = async (categoryID) => {
    await localStorage.setItem("categoryID", categoryID);
    navigate("/BlankSpace/ExploreCategory");
  };

  useEffect(() => {
    setDashboardInformation([]);
  }, []);

  useEffect(() => {
    const handleOutsideClick = () => {
      if (activeCategory !== null) {
        setActiveCategory(null);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [activeCategory]);

  const apiCallingForFirstTime = async () => {
    await dispatch(categoryRoute(true));
    console.log("Hello, dashboardData first", LoadingCheck);
    let Data = {
      UserID: "PLU_1",
      pageNumber: dashboardData.pageNumber.value,
      isAutomatic: dashboardData.isAutomatic.value,
      UserLatitude: locationLatitude,
      UserLongitude: locationLongitude,
    };
    setAutoApiCallCheck(false);
    await setDashboardData({
      ...dashboardData,
      UserLatitude: {
        value: locationLatitude,
      },
      UserLongitude: {
        value: locationLongitude,
      },
    });
    await dispatch(getdashboardApi(Data, setLoadingAuto, true));
  };

  useEffect(() => {
    if (LoadingCheck && locationLatitude && locationLongitude) {
      apiCallingForFirstTime();
    }
  }, [locationLatitude, locationLongitude]);

  const apiCallingForAuto = async () => {
    console.log("Hello, LoadingCheck auto", LoadingCheck);
    let Data = {
      UserID: "PLU_1",
      pageNumber: dashboardData.pageNumber.value,
      isAutomatic: dashboardData.isAutomatic.value,
      UserLatitude: locationLatitude,
      UserLongitude: locationLongitude,
    };

    console.log("Hello, dashboardData auto");
    await setAutoApiCallCheck(true);
    await setLazyLoadingCheck(true);
    await dispatch(getdashboardApi(Data, setLoadingAuto, false));
    await setDashboardData({
      ...dashboardData,
      UserLatitude: {
        value: locationLatitude,
      },
      UserLongitude: {
        value: locationLongitude,
      },
    });
  };

  useEffect(() => {
    if (locationLatitude && locationLongitude && !LoadingCheck) {
      apiCallingForAuto();
    }
  }, [locationLatitude, locationLongitude]);

  // Update data from reducer
  useEffect(() => {
    if (dashBoardListings) {
      if (autoApiCallCheck) {
        // For auto hit
        setDashboardInformation(dashBoardListings);
        console.log("Hello");
      } else if (lazyLoadingCheck) {
        // For lazy loading
        let newData = [...dashboardInformation, dashBoardListings];
        setDashboardInformation(newData);
        console.log("Hello");
      } else {
        console.log("Hello");
        // For coming from a different page
        setDashboardInformation(dashBoardListings);
      }
    }
  }, [dashBoardListings]);

  // UPDATE REAL TIME DATA IF API IS GOING TO SUCCESS OF Block
  const blockCategory = (categoryID) => {
    setDashboardInformation((prevDashboardInfo) => {
      return prevDashboardInfo.filter((item) => item.categoryID !== categoryID);
    });
  };

  // UPDATE CALL REAL TIME DATA IF API IS GOING TO SUCCESS OF Block
  useEffect(() => {
    if (blockUnBlockCategory) {
      console.log("Block check home clear", blockUnBlockCategory);
      blockCategory(blockUnBlockCategory);
      dispatch(CleareblockUnBlockSuccess());
    }
  }, [blockUnBlockCategory]);

  const handleLongPress = (e, index) => {
    e.preventDefault();
    setActiveCategory(index);
  };

  const handleShortPress = (e) => {
    e.preventDefault();
  };

  const likeUnlikeBusiness = useSelector(
    (state) => state.actionReducer.likeUnlikeBusiness
  );
  const favoriteListing = useSelector(
    (state) => state.actionReducer.favoriteListing
  );

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
      console.log("toggleIsLiked");
      toggleIsLiked(likeUnlikeBusiness);
      dispatch(cleareLikeResponce());
    }
  }, [likeUnlikeBusiness]);

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
    if (favoriteListing) {
      console.log("toggleIsLiked favoriteListing");
      toggleIsFavriote(favoriteListing);
      dispatch(cleareFavResponce());
    }
  }, [favoriteListing]);

  useEffect(() => {
    if (loadingAuto) {
      setLoadingAuto(false);
    }
  }, [dashboardInformation]);

  //for Favorite icon toggle onclick
  const toggleFav = (checked, LikeData, favIndex) => {
    let likeItem = LikeData.businessListingId;
    let filterData = [...dashboardInformation[childIndex].dashBoardListings];
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
    setMenuPosition({ x: 0, y: 0 });
    setActiveChildCategory(null);
    setChildIndex(null);
    setChildIconIndex(null);
  };

  const toggleLike = (checked, LikeData, dataIndex) => {
    let likeItem = LikeData.businessListingId;
    let filterData = [...dashboardInformation[childIndex].dashBoardListings];

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
    setMenuPosition({ x: 0, y: 0 });
    setActiveChildCategory(null);
    setChildIndex(null);
    setChildIconIndex(null);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        swiperLongPressBoxRef.current &&
        !swiperLongPressBoxRef.current.contains(event.target)
      ) {
        setMenuPosition({ x: 0, y: 0 });
        setActiveChildCategory(null);
        setChildIndex(null);
        setChildIconIndex(null);
      }
    };
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <Container className="backgroundBody">
      {dashboardInformation.map((listing, index) => {
        return (
          <Fragment key={listing.categoryID}>
            {/* Food Section */}
            <Row className="mt-5">
              <Col
                lg={12}
                md={12}
                sm={12}
                className="d-flex justify-content-between"
              >
                <LongPress
                  onLongPress={(e) => handleLongPress(e, index)}
                  onPress={handleShortPress}
                  duration={500}
                >
                  <label
                    id={`food-label ${listing.categoryID}`}
                    className={`heading-title-h1 mouse-cursor-heading ${
                      activeCategory === index ? "active" : ""
                    }`}
                  >
                    {listing.categoryName}
                  </label>
                </LongPress>

                {activeCategory === index ? (
                  <HeadingHoldPU
                    listing={listing}
                    parentIndex={index}
                    parentcategoryID={listing.categoryID}
                    setDashboardInformation={setDashboardInformation}
                    dashboardInformation={dashboardInformation}
                    setActiveCategory={setActiveCategory}
                  />
                ) : null}

                {listing.categoryID && (
                  <Button
                    id={listing.categoryID}
                    text="Explore Category"
                    className="Explore-Home-Button"
                    onClick={() => onClickExploreCategory(listing.categoryID)}
                  />
                )}
              </Col>
            </Row>
            <Row>
              <Col lg={12} md={12} sm={12}>
                {listing.dashBoardListings !== null &&
                  listing.dashBoardListings !== undefined &&
                  listing.dashBoardListings.length > 0 && (
                    <>
                      {activeChildCategory && (
                        <div
                          ref={swiperLongPressBoxRef}
                          className="swiper-longpress-box"
                          style={{
                            position: "relative", // Use fixed positioning
                            top: `${menuPosition.y}px`, // Set the top position
                            left: `${menuPosition.x}px`, // Set the left position
                            zIndex: 33,
                            display: "block",
                          }}
                        >
                          <div className="options-main-div">
                            <span className="icn-display-block">
                              {dashboardInformation[childIndex]
                                .dashBoardListings[childIconIndex].isLiked ? (
                                <>
                                  <span
                                    onClick={() =>
                                      toggleLike(
                                        false,
                                        dashboardInformation[childIndex]
                                          .dashBoardListings[childIconIndex],
                                        index
                                      )
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
                                      toggleLike(
                                        true,
                                        dashboardInformation[childIndex]
                                          .dashBoardListings[childIconIndex],
                                        index
                                      )
                                    }
                                  >
                                    <i className="icon-like icon-class"></i>
                                    <span className="main-options">Like</span>
                                  </span>
                                </>
                              )}
                            </span>
                            <span className="icn-display-block">
                              {dashboardInformation[childIndex]
                                .dashBoardListings[childIconIndex]
                                .businessContactNumber ? (
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
                              {dashboardInformation[childIndex]
                                .dashBoardListings[childIconIndex]
                                .businessLocation ? (
                                <>
                                  <a
                                    href={
                                      dashboardInformation[childIndex]
                                        .dashBoardListings[childIconIndex]
                                        .businessLocation
                                    }
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
                              {dashboardInformation[childIndex]
                                .dashBoardListings[childIconIndex]
                                .isFavorite ? (
                                <span
                                  onClick={() =>
                                    toggleFav(
                                      false,
                                      dashboardInformation[childIndex]
                                        .dashBoardListings[childIconIndex],
                                      index
                                    )
                                  }
                                >
                                  <StarFill className="icon-class" />
                                  {/* <i className="icon-star icon-Favorite"></i> */}
                                  <span className="main-options">
                                    UnFavorite
                                  </span>
                                </span>
                              ) : (
                                <span
                                  onClick={() =>
                                    toggleFav(
                                      true,
                                      dashboardInformation[childIndex]
                                        .dashBoardListings[childIconIndex],
                                      index
                                    )
                                  }
                                >
                                  <i className="icon-star icon-Favorite"></i>
                                  <span className="main-options">Favorite</span>
                                </span>
                              )}
                            </span>
                          </div>
                        </div>
                      )}
                      <SwiperLongpress
                        dashboardData={dashboardData}
                        listingDataIndex={index}
                        setDashboardInformation={setDashboardInformation}
                        dashboardInformation={dashboardInformation}
                        setActiveChildCategory={setActiveChildCategory}
                        activeChildCategory={activeChildCategory}
                        setChildIndex={setChildIndex}
                        setChildIconIndex={setChildIconIndex}
                        setMenuPosition={setMenuPosition}
                      />
                    </>
                  )}
              </Col>
            </Row>
          </Fragment>
        );
      })}
      {LoadingCheck ? (
        <Loader />
      ) : Loading ? (
        <Row>
          <Col className="d-flex justify-content-center align-Item-center mt-4">
            <Spinner className="spinner-instead-Loader" />
          </Col>
        </Row>
      ) : null}
    </Container>
  );
};

export default Home;
