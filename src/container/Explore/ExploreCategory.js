import { Fragment, useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  ExploreSwiperLong,
  Button,
  useLongPressClick,
  HeadingHoldPU,
  Loader,
} from "../../components/Elements";
import { exploreCategory } from "../../store/Actions/Actions";
// import { useNavigate } from "react-router-dom";
import {
  Header,
  UserInfo,
  ExploreHeader,
  ExploreUser,
} from "../../components/Layout";
import "swiper/css";
import "./ExploreCategory.css";
import { useDispatch, useSelector } from "react-redux";

const ExploreCategory = () => {
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  const { actionReducer } = useSelector((state) => state);
  console.log(actionReducer, "jsdvdjsvhjdvjshdv");
  const [isHeadingFood, setIsHeadingFood] = useState(false);

  const [isHome, setIsHome] = useState(false);

  //state for active longPress event
  const [activeCategory, setActiveCategory] = useState(null);

  // state for explore Category status
  const [exploreInformation, setExploreInformation] = useState([]);

  // state for Loader
  // const [showLoader, setShowLoader] = useState(false);

  //this state is for Explore Category
  const [exploreData, setExploreData] = useState({
    UserID: {
      value: "PLU_1",
      errorMessage: "",
      errorStatus: false,
    },
    pageNumber: {
      value: 0,
      errorMessage: "",
      errorStatus: false,
    },
    isAutomatic: {
      value: false,
      errorMessage: "",
      errorStatus: false,
    },
    ParentCategoryID: {
      value: "",
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
  });

  // long press func
  const onLongPressFood = () => {
    console.log("longpress is triggered");
    setIsHeadingFood(true);
    setTimeout(() => setIsHeadingFood(false), 3000);
  };
  console.log("isHeadingFood", isHeadingFood);

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

  // this is how I set data in Explore Api by using explore state
  // useEffect(() => {
  //   let exploreNewData = {
  //     UserID: exploreData.UserID.value,
  //     pageNumber: exploreData.pageNumber.value,
  //     isAutomatic: exploreData.isAutomatic.value,
  //     ParentCategoryID: exploreData.ParentCategoryID.value,
  //   };
  //   dispatch(exploreCategory(exploreNewData));
  // }, []);

  useEffect(() => {
    let exploreNewData = {
      UserID: "PLU_1",
      pageNumber: 1,
      isAutomatic: false,
      ParentCategoryID: "CDL_1",
      UserLatitude: "24.502",
      UserLongitude: "54.388",
      // Update this dynamically
    };

    setExploreData((prevState) => ({
      ...prevState,
      ParentCategoryID: {
        value: exploreNewData.ParentCategoryID,
        errorMessage: "",
        errorStatus: false,
      },
      UserID: {
        value: exploreNewData.UserID,
        errorMessage: "",
        errorStatus: false,
      },
      pageNumber: {
        value: exploreNewData.pageNumber,
        errorMessage: "",
        errorStatus: false,
      },
      isAutomatic: {
        value: exploreNewData.isAutomatic,
        errorMessage: "",
        errorStatus: false,
      },
      UserLatitude: {
        value: exploreNewData.UserLatitude,
      },
      UserLongitude: {
        value: exploreNewData.UserLongitude,
      },
    }));

    // Make the API call using exploreData
    dispatch(exploreCategory(exploreNewData));
  }, []);

  // ...

  console.log("actionReducer", actionReducer);

  useEffect(() => {
    if (
      actionReducer.locationLatitude !== null &&
      actionReducer.locationLongitude !== null
    ) {
      setExploreData({
        ...exploreData,
        UserLatitude: {
          value: actionReducer.locationLatitude,
        },
        UserLongitude: {
          value: actionReducer.locationLongitude,
        },
      });
    }
  }, [actionReducer.locationLatitude, actionReducer.locationLongitude]);
  console.log(exploreData, "dashboardDatadashboardDatadashboardData");

  // this is how I get data from Reducer
  useEffect(() => {
    if (
      actionReducer.subCategoryDashboardListing !== null &&
      actionReducer.subCategoryDashboardListing !== undefined &&
      actionReducer.subCategoryDashboardListing.length !== 0
    ) {
      setExploreInformation(actionReducer.subCategoryDashboardListing);
    }
  }, [actionReducer.subCategoryDashboardListing]);

  console.log("explore Data Information", exploreData);

  // useEffect(() => {
  //   setShowLoader(true);

  //   setTimeout(() => {
  //     setShowLoader(false);
  //   }, 3000);
  // }, []);

  return (
    <Fragment>
      <Row>
        <Col>
          <>
            <div className="Explore-header">
              <Container>
                <Header />
                <UserInfo />
              </Container>
            </div>
          </>
        </Col>
      </Row>
      <Container>
        <Fragment>
          <Row className="home_Container">
            <Col>
              {exploreInformation !== null &&
              exploreInformation !== undefined &&
              exploreInformation.length > 0
                ? exploreInformation.map((exploreListing, index) => {
                    return (
                      <>
                        {/* Food Section */}
                        <Row className="mt-4">
                          <Col
                            lg={12}
                            md={12}
                            sm={12}
                            className="d-flex justify-content-between"
                          >
                            <label
                              id={`food-label ${index}`}
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
                              {exploreListing.subCategoryName}
                            </label>

                            {activeCategory === index ? (
                              <>
                                <HeadingHoldPU />
                              </>
                            ) : null}
                          </Col>
                        </Row>
                        <Row>
                          <Col lg={12} md={12} sm={12}>
                            {exploreListing.subCategoryListings.length > 0 && (
                              <ExploreSwiperLong
                                exploreListingData={
                                  exploreListing.subCategoryListings
                                }
                              />
                            )}
                          </Col>
                        </Row>
                      </>
                    );
                  })
                : null}

              {actionReducer.Loading ? <Loader /> : null}
            </Col>
          </Row>
        </Fragment>
      </Container>
    </Fragment>
  );
};

export default ExploreCategory;
