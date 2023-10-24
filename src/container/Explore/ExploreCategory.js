import { Fragment, useState, useEffect } from "react";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import {
  ExploreSwiperLong,
  HeadingHoldPU,
  Loader,
} from "../../components/Elements";
import {
  CleareblockUnBlockSuccess,
  cleareFavResponce,
  cleareLikeResponce,
  exploreCategory,
} from "../../store/Actions/Actions";
import "swiper/css";
import "./ExploreCategory.css";
import { useDispatch, useSelector } from "react-redux";
import { getRndomeNumber } from "../../common/Function/utils";
import LongPress from "../../components/Elements/LonPress/LongPress";

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
  const blockUnBlockCategory = useSelector(
    (state) => state.actionReducer.blockUnBlockCategory
  );
  const likeUnlikeBusiness = useSelector(
    (state) => state.actionReducer.likeUnlikeBusiness
  );
  
  const favoriteListing = useSelector(
    (state) => state.actionReducer.favoriteListing
  );


  let categoryID = localStorage.getItem("categoryID");

  const [loadingAuto, seLoadingAuto] = useState(true);

  //state for active longPress event
  const [activeCategory, setActiveCategory] = useState(null);

  // state for explore Category status
  const [exploreInformation, setExploreInformation] = useState([]);

  useEffect(() => {
    if (
      locationLatitude !== null &&
      locationLongitude !== null &&
      categoryID !== undefined
    ) {
      let exploreNewData = {
        UserID: "PLU_1",
        pageNumber: 1,
        isAutomatic: false,
        ParentCategoryID: categoryID,
        UserLatitude: locationLatitude,
        UserLongitude: locationLongitude,
      };
      dispatch(exploreCategory(exploreNewData, seLoadingAuto));
    } else if (
      performance.navigation.type === performance.navigation.TYPE_RELOAD
    ) {
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
      dispatch(exploreCategory(exploreNewData));
    }
  }, [locationLatitude, locationLongitude]);

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

  const handleLongPress = (e, value) => {
    // Handle long press here
    e.preventDefault();
    setActiveCategory(value);
  };
  const handleShortPress = (e) => {
    // Handle short press here
    e.preventDefault();
  };
  // UPDATE REAL TIME DATA IF API IS GOING TO SUCESS OF Block
  const blockCategory = (categoryID) => {
    setExploreInformation((prevDashboardInfo) => {
      const updatedDashboardInformation = prevDashboardInfo.filter(
        (item) => item.subCategoryID !== categoryID
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

  const toggleIsLiked = (businessListingId) => {
    setExploreInformation((prevDashboardInfo) => {
      return prevDashboardInfo.map((category) => {
        const updatedListings = category.subCategoryListings.map((listing) => {
          if (listing.subCategoryListingId === businessListingId) {
            return {
              ...listing,
              isLiked: !listing.isLiked,
            };
          }
          return listing;
        });
        return {
          ...category,
          subCategoryListings: updatedListings,
        };
      });
    });
    setActiveCategory(0);
  };

  useEffect(() => {
    if (likeUnlikeBusiness) {
      toggleIsLiked(likeUnlikeBusiness);
      dispatch(cleareLikeResponce());
      console.log("toggleIsLiked")
    }
  }, [likeUnlikeBusiness]);

  const toggleIsFavriote = (businessListingId) => {
    setExploreInformation((prevDashboardInfo) => {
      return prevDashboardInfo.map((category) => {
        const updatedListings = category.subCategoryListings.map((listing) => {
          if (listing.subCategoryListingId === businessListingId) {
            return {
              ...listing,
              isFavorite: !listing.isFavorite,
            };
          }
          return listing;
        });
        return {
          ...category,
          subCategoryListings: updatedListings,
        };
      });
    });
    setActiveCategory(0);
  };

  useEffect(() => {
    if (favoriteListing ) {
      toggleIsFavriote(favoriteListing);
      dispatch(cleareFavResponce());
    }
  }, [favoriteListing]);
  return (
    <Container  className="backgroundBody">
      <Row>
        <Col>
          {exploreInformation !== null &&
          exploreInformation !== undefined &&
          exploreInformation.length > 0
            ? exploreInformation.map((exploreListing, index) => {
                return (
                  <Fragment key={exploreListing.subCategoryID}>
                    {/* Food Section */}
                    <Row className="mt-4">
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
                            id={`food-label ${exploreListing.subCategoryID}`}
                            className={`heading-title-h1 mouse-cursor-heading ${
                              activeCategory === index ? "active" : ""
                            }`}
                            onClick={() => {}}
                          >
                            {exploreListing.subCategoryName}
                          </label>
                        </LongPress>

                        {activeCategory === index ? (
                          <HeadingHoldPU
                            parentIndex={index}
                            parentcategoryID={exploreListing.subCategoryID}
                            setDashboardInformation={setExploreInformation}
                            dashboardInformation={exploreInformation}
                            setActiveCategory={setActiveCategory}
                          />
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
              <Col className="d-flex justify-content-center align-Item-center mt-4">
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
