import React, { Fragment, useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import {
  Button,
  useLongPressClick,
  HeadingHoldPU,
  Loader,
} from "./../../components/Elements";
import { getdashboardApi } from "../../store/Actions/Actions";
import { SwiperLongpress } from "../../components/Elements";
import "swiper/css";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import { Spin } from "antd";
import { Spinner } from "react-bootstrap";
import { async } from "q";
// import { useDispatch, useSelector } from "react-redux";

const Home = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { actionReducer } = useSelector((state) => state);

  // for long press Heading state
  const [isHeadingHold, setIsHeadingHold] = useState(false);
  const [isHeadingFood, setIsHeadingFood] = useState(false);

  // const dispatch = useDispatch();
  const [data, setData] = useState([1, 2, 3, 4, 5]);
  const [loadingAuto, seLoadingAuto] = useState(false);

  // dashboard state
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

  const [autoCheck, setAutoCheck] = useState(false);
  // state for dashboard Title, swiper, swiperLabel
  const [dashboardInformation, setDashboardInformation] = useState([]);

  //state for active longPress event
  const [activeCategory, setActiveCategory] = useState(null);
  console.log(activeCategory, "activeCategoryactiveCategory");

  // state for Loader
  const [showLoader, setShowLoader] = useState(false);

  // long press func
  const onLongPressFood = () => {
    console.log("longpress is triggered");
    setIsHeadingFood(true);
    setTimeout(() => setIsHeadingFood(false), 3000);
  };

  //long onClick func
  const onClickFood = () => {
    console.log("click is triggered");
  };

  const defaultOptionsFood = {
    shouldPreventDefault: true,
    delay: 500,
  };
  const longPressEventFood = useLongPressClick(
    onLongPressFood,
    onClickFood,
    defaultOptionsFood
  );

  const onClickExploreCategory = async (categoryID) => {
    await localStorage.setItem("categoryID", categoryID);
    navigate("/ExploreCategory");
  };

  useEffect(() => {
    let Data = {
      UserID: dashboardData.userID.value,
      pageNumber: dashboardData.pageNumber.value,
      isAutomatic: dashboardData.isAutomatic.value,
      UserLatitude: actionReducer.locationLatitude,
      UserLongitude: actionReducer.locationLongitude,
    };
    setAutoCheck(false);
    dispatch(getdashboardApi(Data, seLoadingAuto));
  }, []);

  useEffect(() => {
    console.log("actionReducer call on location change");
    if (actionReducer.locationLatitude && actionReducer.locationLongitude) {
      console.log(
        "chanegegegegegegeggeerrrr",
        actionReducer.locationLatitude,
        actionReducer.locationLongitude
      );
      let Data = {
        UserID: dashboardData.userID.value,
        pageNumber: dashboardData.pageNumber.value,
        isAutomatic: dashboardData.isAutomatic.value,
        UserLatitude: actionReducer.locationLatitude,
        UserLongitude: actionReducer.locationLongitude,
      };
      console.log("actionReducer call on location change", Data);
      dispatch(getdashboardApi(Data, seLoadingAuto));
      setAutoCheck(true);
      seLoadingAuto(true);
      setDashboardData({
        ...dashboardData,
        UserLatitude: {
          value: actionReducer.locationLatitude.toString(),
        },
        UserLongitude: {
          value: actionReducer.locationLongitude.toString(),
        },
      });
    }
  }, [actionReducer.locationLatitude, actionReducer.locationLongitude]);

  // this is how I set data from reducer
  useEffect(() => {
    try {
      if (actionReducer.dashBoardListings) {
        console.log(
          "actionReducer call on location autoCheck",
          actionReducer.dashBoardListings
        );
        if (autoCheck) {
          console.log(
            "actionReducer call on location autoCheck",
            actionReducer.dashBoardListings
          );
          setDashboardInformation(actionReducer.dashBoardListings);
        } else {
          // for lazy loading
          console.log(
            "actionReducer call on location autoCheck",
            actionReducer.dashBoardListings
          );
          let newDAta = [...dashboardInformation];
          newDAta.push(actionReducer.dashBoardListings);
          setDashboardInformation(newDAta);
        }
      }
    } catch {
      console.log("error");
    }
  }, [actionReducer.dashBoardListings]);

  console.log("dashboard Information", dashboardInformation);

  return (
    <Container>
      <Fragment>
        {dashboardInformation.map((listing, index) => {
          console.log(listing, "nanannanan");
          return (
            <>
              {/* Food Section */}
              <Row className="mt-5">
                <Col
                  lg={12}
                  md={12}
                  sm={12}
                  className="d-flex justify-content-between"
                >
                  <label
                    id={`food-label ${listing.categoryID}`}
                    className={`heading-title-h1 mouse-cursor-heading ${
                      activeCategory === index ? "active" : ""
                    }`}
                    onClick={() => {
                      setTimeout(() => {
                        setActiveCategory(null);
                      }, 3000);
                      setActiveCategory(index);
                    }}
                    {...longPressEventFood}
                  >
                    {listing.categoryName}
                  </label>

                  {activeCategory === index ? (
                    <>
                      <HeadingHoldPU />
                    </>
                  ) : null}

                  {listing.categoryID && (
                    <>
                      <Button
                        id={listing.categoryID}
                        text="Explore Category"
                        className="Explore-Home-Button"
                        onClick={() =>
                          onClickExploreCategory(listing.categoryID)
                        }
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
                        listingData={listing.dashBoardListings}
                      />
                    )}
                </Col>
              </Row>
            </>
          );
        })}

        {loadingAuto ? (
          <>
            <Row>
              <Col className="d-flex justify-content-center align-Item-center">
                <Spinner className="spinner-instead-Loader" />
              </Col>
            </Row>
          </>
        ) : actionReducer.Loading ||
          actionReducer.locationLongitude === "" ||
          actionReducer.locationLatitude === "" ? (
          <Loader />
        ) : null}
      </Fragment>
    </Container>
  );
};

export default Home;
