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
import { getRndomeNumber } from "../../common/Function/utils";
import {
  getdashboardApi,
  CleareblockUnBlockSuccess,
  categoryRoute,
} from "../../store/Actions/Actions";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Redux state variables
  const locationLatitude = useSelector(
    (state) => state.actionReducer.locationLatitude
  );
  const locationLongitude = useSelector(
    (state) => state.actionReducer.locationLongitude
  );
  const blockUnBlockCategory = useSelector(
    (state) => state.actionReducer.blockUnBlockCategory
  );
  const dashBoardListings = useSelector(
    (state) => state.actionReducer.dashBoardListings
  );
  const LoadingCheck = useSelector((state) => state.actionReducer.LoadingCheck);
  const Loading = useSelector((state) => state.actionReducer.Loading);

  // Local state
  const [loadingAuto, seLoadingAuto] = useState(true);
  const [autoCheck, setAutoCheck] = useState(false);
  const [dashboardInformation, setDashboardInformation] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [flagCheck, seFlagCheck] = useState(false);

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
    return () => {
      setDashboardInformation([]);
    };
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

  useEffect(() => {
    if (
      (Object.keys(dashBoardListings).length === 0 &&
        locationLatitude &&
        locationLongitude) ||
      LoadingCheck
    ) {
      console.log("helloooooo dashboardData first", LoadingCheck);
      let Data = {
        UserID: "PLU_1",
        pageNumber: dashboardData.pageNumber.value,
        isAutomatic: dashboardData.isAutomatic.value,
        UserLatitude: locationLatitude,
        UserLongitude: locationLongitude,
      };

      dispatch(getdashboardApi(Data, seLoadingAuto, true));
      setAutoCheck(true);
      setDashboardData({
        ...dashboardData,
        UserLatitude: {
          value: locationLatitude,
        },
        UserLongitude: {
          value: locationLongitude,
        },
      });
    }
  }, [locationLatitude, locationLongitude]);

  useEffect(() => {
    if (
      locationLatitude &&
      locationLongitude &&
      Object.keys(dashBoardListings).length > 0 &&
      flagCheck &&
      LoadingCheck === false
    ) {
      console.log("helloooooo LoadingCheck", LoadingCheck);
      let Data = {
        UserID: "PLU_1",
        pageNumber: dashboardData.pageNumber.value,
        isAutomatic: dashboardData.isAutomatic.value,
        UserLatitude: locationLatitude,
        UserLongitude: locationLongitude,
      };

      console.log("helloooooo dashboardData auto");
      dispatch(getdashboardApi(Data, seLoadingAuto, false));
      setAutoCheck(true);
      setDashboardData({
        ...dashboardData,
        UserLatitude: {
          value: locationLatitude,
        },
        UserLongitude: {
          value: locationLongitude,
        },
      });
    } else {
      seFlagCheck(true);
    }
  }, [locationLatitude, locationLongitude]);

  // UPDATE REAL TIME DATA IF API IS GOING TO SUCESS OF Block
  const blockCategory = (categoryID) => {
    setDashboardInformation((prevDashboardInfo) => {
      const updatedDashboardInformation = prevDashboardInfo.filter(
        (item) => item.categoryID !== categoryID
      );
      return updatedDashboardInformation;
    });
  };

  // UPDATE CALL REAL TIME DATA IF API IS GOING TO SUCESS OF Block
  useEffect(() => {
    if (blockUnBlockCategory) {
      console.log("block check home cleare", blockUnBlockCategory);
      blockCategory(blockUnBlockCategory);
      dispatch(CleareblockUnBlockSuccess());
    }
  }, [blockUnBlockCategory]);

  // this is how I set data from reducer
  useEffect(() => {
    if (dashBoardListings) {
      if (autoCheck) {
        // for auto hit
        setDashboardInformation(dashBoardListings);
        console.log("helloooooo");
        dispatch(categoryRoute(false));
      } else if (flagCheck) {
        // for lazy loading
        let newData = [...dashboardInformation, dashBoardListings];
        setDashboardInformation(newData);
        console.log("helloooooo");
      } else {
        console.log("helloooooo");
        // for comming from different page
        setDashboardInformation(dashBoardListings);
      }
    }
  }, [dashBoardListings]);

  useEffect(() => {
    if (loadingAuto) {
      seLoadingAuto(false);
    }
  }, [dashboardInformation]);

  const handleLongPress = (e, index) => {
    e.preventDefault();
    setActiveCategory(index);
  };

  const handleShortPress = (e) => {
    // e.preventDefault();
  };

  return (
    <Container>
      {dashboardInformation.map((listing, index) => {
        return (
          <Fragment key={getRndomeNumber()}>
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
                  <>
                    <Button
                      id={listing.categoryID}
                      text="Explore Category"
                      className="Explore-Home-Button"
                      onClick={() => onClickExploreCategory(listing.categoryID)}
                    />
                  </>
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
                      listingData={listing.dashBoardListings}
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
          <Col className="d-flex justify-content-center align-Item-center">
            <Spinner className="spinner-instead-Loader" />
          </Col>
        </Row>
      ) : null}
    </Container>
  );
};

export default Home;
