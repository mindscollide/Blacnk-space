import React, { Fragment, useState, useEffect } from "react";
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
} from "../../store/Actions/Actions";

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
    // e.preventDefault();
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
      console.log("toggleIsLiked")
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
      console.log("toggleIsLiked favoriteListing")
      toggleIsFavriote(favoriteListing);
      dispatch(cleareFavResponce());
    }
  }, [favoriteListing]);
  useEffect(() => {
    if (loadingAuto) {
      setLoadingAuto(false);
    }
  }, [dashboardInformation]);

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
                    <SwiperLongpress
                      dashboardData={dashboardData}
                      listingDataIndex={index}
                      setDashboardInformation={setDashboardInformation}
                      dashboardInformation={dashboardInformation}
                    />
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
