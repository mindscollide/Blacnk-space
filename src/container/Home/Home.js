import React, { Fragment, useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Button, HeadingHoldPU, Loader } from "./../../components/Elements";
import {
  CleareblockUnBlockSuccess,
  getdashboardApi,
} from "../../store/Actions/Actions";
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
  const Loading = useSelector((state) => state.actionReducer.Loading);

  const [loadingAuto, seLoadingAuto] = useState(true);

  const [autoCheck, setAutoCheck] = useState(false);
  // state for dashboard Title, swiper, swiperLabel
  const [dashboardInformation, setDashboardInformation] = useState([]);

  //state for active longPress event
  const [activeCategory, setActiveCategory] = useState(null);

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

  const onClickExploreCategory = async (categoryID) => {
    await localStorage.setItem("categoryID", categoryID);
    navigate("/BlankSpace/ExploreCategory");
  };

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
    if (locationLatitude && locationLongitude) {
      let Data = {
        UserID: dashboardData.userID.value,
        pageNumber: dashboardData.pageNumber.value,
        isAutomatic: dashboardData.isAutomatic.value,
        UserLatitude: locationLatitude,
        UserLongitude: locationLongitude,
      };

      dispatch(getdashboardApi(Data, seLoadingAuto));
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

  // UPDATE REAL TIME DATA IF API IS GOING TO SUCESS OF Block
  const toggleIsFavriote = (categoryID) => {
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
      toggleIsFavriote(blockUnBlockCategory);
      dispatch(CleareblockUnBlockSuccess());
    }
  }, [blockUnBlockCategory]);

  // this is how I set data from reducer
  useEffect(() => {
    try {
      if (dashBoardListings) {
        if (autoCheck) {
          setDashboardInformation(dashBoardListings);
        } else {
          // for lazy loading
          let newDAta = [...dashboardInformation];
          newDAta.push(dashBoardListings);
          setDashboardInformation(newDAta);
        }
      }
    } catch {
      console.log("error");
    }
  }, [dashBoardListings]);

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

      {loadingAuto ? (
        <Loader />
      ) : Loading ? (
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
