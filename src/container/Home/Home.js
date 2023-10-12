import React, { Fragment, useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Button, HeadingHoldPU, Loader } from "./../../components/Elements";
import { getdashboardApi } from "../../store/Actions/Actions";
import { SwiperLongpress } from "../../components/Elements";
import "swiper/css";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Spinner } from "react-bootstrap";
import { getRndomeNumber } from "../../common/Function/utils";
import LongPress from "../../components/Elements/LonPress/LongPress";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { actionReducer } = useSelector((state) => state);
  // for long press Heading state
  const [isHeadingFood, setIsHeadingFood] = useState(false);
  const [loadingAuto, seLoadingAuto] = useState(true);
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
  // long press func
  const onLongPressFood = () => {
    setIsHeadingFood(true);
    setTimeout(() => setIsHeadingFood(false), 3000);
  };

  //long onClick func
  const onClickFood = () => {
    console.log("click is triggered");
  };

  const onClickExploreCategory = async (categoryID) => {
    await localStorage.setItem("categoryID", categoryID);
    navigate("/BlankSpace/ExploreCategory");
  };

  useEffect(() => {
    console.log("check for data", actionReducer.locationLatitude);
    console.log("check for data", actionReducer.locationLongitude);
    if (actionReducer.locationLatitude && actionReducer.locationLongitude) {
      let Data = {
        UserID: dashboardData.userID.value,
        pageNumber: dashboardData.pageNumber.value,
        isAutomatic: dashboardData.isAutomatic.value,
        UserLatitude: actionReducer.locationLatitude,
        UserLongitude: actionReducer.locationLongitude,
      };

      dispatch(getdashboardApi(Data, seLoadingAuto));
      setAutoCheck(true);
      setDashboardData({
        ...dashboardData,
        UserLatitude: {
          value: actionReducer.locationLatitude,
        },
        UserLongitude: {
          value: actionReducer.locationLongitude,
        },
      });
    }
  }, [actionReducer.locationLatitude, actionReducer.locationLongitude]);

  // this is how I set data from reducer
  useEffect(() => {
    try {
      if (actionReducer.dashBoardListings) {
        if (autoCheck) {
          setDashboardInformation(actionReducer.dashBoardListings);
        } else {
          // for lazy loading
          let newDAta = [...dashboardInformation];
          newDAta.push(actionReducer.dashBoardListings);
          setDashboardInformation(newDAta);
        }
      }
    } catch {
      console.log("error");
    }
  }, [actionReducer.dashBoardListings]);
  const handleLongPress = (e,index) => {
    e.preventDefault();
    setActiveCategory(index)  
    // alert("Long press event:", index);
  };

  const handleShortPress = (e) => {
    e.preventDefault();
    // alert("Short press event:", e);
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
                  onLongPress={(e)=>handleLongPress(e,index)}
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
                    <SwiperLongpress listingData={listing.dashBoardListings} />
                  )}
              </Col>
            </Row>
          </Fragment>
        );
      })}

      {loadingAuto ? (
        <Loader />
      ) : actionReducer.Loading ? (
        <>
          <Row>
            <Col className="d-flex justify-content-center align-Item-center">
              <Spinner className="spinner-instead-Loader" />
            </Col>
          </Row>
        </>
      ) : null}
    </Container>
  );
};

export default Home;
