import { Fragment, useState, useEffect } from "react";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import {
  ExploreSwiperLong,
  HeadingHoldPU,
  Loader,
} from "../../components/Elements";
import { exploreCategory } from "../../store/Actions/Actions";
import "swiper/css";
import "./ExploreCategory.css";
import { useDispatch, useSelector } from "react-redux";
import { getRndomeNumber } from "../../common/Function/utils";

const ExploreCategory = () => {
  const dispatch = useDispatch();
  const locationLatitude = useSelector(
    (state) => state.actionReducer.locationLatitude
  );
  const locationLongitude = useSelector(
    (state) => state.actionReducer.locationLongitude
  );
  const subCategoryDashboardListing = useSelector(
    (state) => state.actionReducer.subCategoryDashboardListing
  );
  const Loading = useSelector((state) => state.actionReducer.Loading);
  const [isHeadingFood, setIsHeadingFood] = useState(false);
  let categoryID = localStorage.getItem("categoryID");
  const [loadingAuto, seLoadingAuto] = useState(true);

  //state for active longPress event
  const [activeCategory, setActiveCategory] = useState(null);

  // state for explore Category status
  const [exploreInformation, setExploreInformation] = useState([]);
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
      value: categoryID ? categoryID : "",
      errorMessage: "",
      errorStatus: false,
    },
    UserLatitude: {
      value: locationLatitude,
      errorMessage: "",
      errorStatus: false,
    },
    UserLongitude: {
      value: locationLongitude,
      errorMessage: "",
      errorStatus: false,
    },
  });

  useEffect(() => {
    let exploreNewData = {
      UserID: "PLU_1",
      pageNumber: 1,
      isAutomatic: false,
      ParentCategoryID: categoryID,
      UserLatitude: locationLatitude,
      UserLongitude: locationLongitude,
    };

    setExploreData((prevState) => ({
      ...prevState,
      ParentCategoryID: {
        value: categoryID,
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
        value: locationLatitude,
        errorMessage: "",
        errorStatus: false,
      },
      UserLongitude: {
        value: locationLongitude,
        errorMessage: "",
        errorStatus: false,
      },
    }));
    if (categoryID !== undefined) {
      dispatch(exploreCategory(exploreNewData, seLoadingAuto));
    }
  }, []);

  useEffect(() => {
    if (locationLatitude !== null && locationLongitude !== null) {
      setExploreData({
        ...exploreData,
        UserLatitude: {
          value: locationLatitude,
        },
        UserLongitude: {
          value: locationLongitude,
        },
      });
      let exploreNewData = {
        UserID: "PLU_1",
        pageNumber: 1,
        isAutomatic: false,
        ParentCategoryID: categoryID,
        UserLatitude: locationLatitude,
        UserLongitude: locationLongitude,
      };

      dispatch(exploreCategory(exploreNewData, seLoadingAuto));
    }
  }, [locationLatitude, locationLongitude]);

  useEffect(() => {
    if (performance.navigation.type === performance.navigation.TYPE_RELOAD) {
      let latitudeValueLocal = localStorage.getItem("latitudeValue");
      let longitudeValueLocal = localStorage.getItem("longitudeValue");
      let exploreNewData = {
        UserID: "PLU_1",
        pageNumber: 1,
        isAutomatic: false,
        ParentCategoryID: categoryID,
        UserLatitude: latitudeValueLocal,
        UserLongitude: longitudeValueLocal,
      };

      dispatch(exploreCategory(exploreNewData, seLoadingAuto));
    } else {
    }
  }, []);

  // this is how I get data from Reducer
  useEffect(() => {
    if (
      subCategoryDashboardListing !== null &&
      subCategoryDashboardListing !== undefined &&
      subCategoryDashboardListing.length !== 0
    ) {
      setExploreInformation(subCategoryDashboardListing);
    }
  }, [subCategoryDashboardListing]);

  return (
    <Container>
      <Row>
        <Col>
          {exploreInformation !== null &&
          exploreInformation !== undefined &&
          exploreInformation.length > 0
            ? exploreInformation.map((exploreListing, index) => {
                return (
                  <Fragment key={getRndomeNumber()}>
                    {/* Food Section */}
                    <Row className="mt-4">
                      <Col
                        lg={12}
                        md={12}
                        sm={12}
                        className="d-flex justify-content-between"
                      >
                        <label
                          id={`food-label ${exploreListing.subCategoryID}`}
                          className={`heading-title-h1 mouse-cursor-heading ${
                            activeCategory === index ? "active" : ""
                          }`}
                          onClick={() => {}}
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
                            setExploreInformation={setExploreInformation}
                            exploreInformation={exploreInformation}
                          />
                        )}
                      </Col>
                    </Row>
                  </Fragment>
                );
              })
            : null}

          {loadingAuto ? (
            <Loader />
          ) : Loading ? (
            <Row>
              <Col className="d-flex justify-content-center align-Item-center">
                <Spinner className="spinner-instead-Loader" />
              </Col>
            </Row>
          ) : null}
        </Col>
      </Row>
    </Container>
  );
};

export default ExploreCategory;
