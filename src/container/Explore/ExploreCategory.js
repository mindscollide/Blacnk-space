import { Fragment, useState, useEffect, useRef } from "react";
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
  likeUnlikeApi,
  updateFavoriteApi,
} from "../../store/Actions/Actions";
import "swiper/css";
import "./ExploreCategory.css";
import { useDispatch, useSelector } from "react-redux";
import LongPress from "../../components/Elements/LonPress/LongPress";
import { HandThumbsUpFill, StarFill } from "react-bootstrap-icons";

const ExploreCategory = () => {
  const dispatch = useDispatch();
  const ExploreLongBoxRef = useRef(null);
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
  const [activeInneryCategory, setActiveInneryCategory] = useState(null);

  // state for explore Category status
  const [exploreInformation, setExploreInformation] = useState([]);
  const [childIndex, setChildIndex] = useState(null);
  const [childIconIndex, setChildIconIndex] = useState(null);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
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
      if (activeCategory) {
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
    setActiveInneryCategory(null);
  };

  useEffect(() => {
    if (likeUnlikeBusiness) {
      toggleIsLiked(likeUnlikeBusiness);
      dispatch(cleareLikeResponce());
      console.log("toggleIsLiked");
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
    setActiveInneryCategory(null);
  };

  useEffect(() => {
    if (favoriteListing) {
      toggleIsFavriote(favoriteListing);
      dispatch(cleareFavResponce());
    }
  }, [favoriteListing]);

  const toggleIcon = (checked, LikeData, favIndex) => {
    if (childIndex != null) {
      let likeItem = LikeData.subCategoryListingId;
      let filterData = [...exploreInformation[childIndex].subCategoryListings];
      filterData.splice(favIndex, 1);
      const businessListingOtherIds = filterData.map(
        (item) => item.subCategoryListingId
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
      setActiveInneryCategory(null);
      setChildIconIndex(null);
      setChildIndex(null);
    }
  };

  const toggleLike = (checked, LikeData, dataIndex) => {
    if (childIndex != null) {
      let likeItem = LikeData.subCategoryListingId;
      let filterData = [...exploreInformation[childIndex].subCategoryListings];
      filterData.splice(dataIndex, 1);
      const businessListingOtherIds = filterData.map(
        (item) => item.subCategoryListingId
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
      setActiveInneryCategory(null);
      setChildIconIndex(null);
      setChildIndex(null);
    }
  };
  // Add a click event listener to the document to handle clicks outside of swiper-longpress-box
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        ExploreLongBoxRef.current &&
        !ExploreLongBoxRef.current.contains(event.target)
      ) {
        setMenuPosition({ x: 0, y: 0 });
        setActiveInneryCategory(null);
        setChildIconIndex(null);
        setChildIndex(null);
      }
    };
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);
  return (
    <Container className="backgroundBody">
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
                          <>
                            {activeInneryCategory && (
                              <div
                                ref={ExploreLongBoxRef}
                                className={"Explore-longpress-box"}
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
                                    {exploreInformation[childIndex]
                                      .subCategoryListings[childIconIndex]
                                      .isLiked ? (
                                      <span
                                        onClick={() =>
                                          toggleLike(
                                            false,
                                            exploreInformation[childIndex]
                                              .subCategoryListings[
                                              childIconIndex
                                            ],
                                            childIconIndex
                                          )
                                        }
                                      >
                                        <HandThumbsUpFill className="icon-class" />
                                        <span className="main-options">
                                          UnLike
                                        </span>
                                      </span>
                                    ) : (
                                      <span
                                        onClick={() =>
                                          toggleLike(
                                            true,
                                            exploreInformation[childIndex]
                                              .subCategoryListings[
                                              childIconIndex
                                            ],
                                            childIconIndex
                                          )
                                        }
                                      >
                                        <i className="icon-like icon-class"></i>
                                        <span className="main-options">
                                          Like
                                        </span>
                                      </span>
                                    )}
                                  </span>
                                  <span className="icn-display-block">
                                    {exploreInformation[childIndex]
                                      .subCategoryListings[childIconIndex]
                                      .subCategoryContactNumber ? (
                                      <>
                                        <i className="icon-call icon-class"></i>
                                        <span className="main-options">
                                          Call
                                        </span>
                                      </>
                                    ) : (
                                      <>
                                        <i className="icon-call IconExplore-disabled-Call"></i>
                                        <span className="disable-Exploremain-options">
                                          Call
                                        </span>
                                      </>
                                    )}
                                  </span>
                                  <span className="icn-display-block">
                                    {exploreInformation[childIndex]
                                      .subCategoryListings[childIconIndex]
                                      .subCategoryLocation ? (
                                      <>
                                        <a
                                          href={
                                            exploreInformation[childIndex]
                                              .subCategoryListings[
                                              childIconIndex
                                            ].subCategoryLocation
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
                                        <i className="icon-location IconExplore-disabled-Direction"></i>
                                        <span className="disable-Exploremain-options">
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
                                    {exploreInformation[childIndex]
                                      .subCategoryListings[childIconIndex]
                                      .isFavorite ? (
                                      <span
                                        onClick={() =>
                                          toggleIcon(
                                            false,
                                            exploreInformation[childIndex]
                                              .subCategoryListings[
                                              childIconIndex
                                            ],
                                            childIconIndex
                                          )
                                        }
                                      >
                                        <StarFill className="icon-class" />
                                        <span className="main-options">
                                          UnFavorite
                                        </span>
                                      </span>
                                    ) : (
                                      <span
                                        onClick={() =>
                                          toggleIcon(
                                            true,
                                            exploreInformation[childIndex]
                                              .subCategoryListings[
                                              childIconIndex
                                            ],
                                            childIconIndex
                                          )
                                        }
                                      >
                                        <i className="icon-star icon-Favorite"></i>
                                        <span className="main-options">
                                          Favorite
                                        </span>
                                      </span>
                                    )}
                                  </span>
                                </div>
                              </div>
                            )}
                            <ExploreSwiperLong
                              exploreListingData={
                                exploreListing.subCategoryListings
                              }
                              parentIndex={index}
                              activeInneryCategory={activeInneryCategory}
                              setActiveInneryCategory={setActiveInneryCategory}
                              setMenuPosition={setMenuPosition}
                              setChildIconIndex={setChildIconIndex}
                              setChildIndex={setChildIndex}
                            />
                          </>
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
