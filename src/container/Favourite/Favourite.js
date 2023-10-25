import { Fragment, useState, useEffect, useRef } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Loader, FavoriteSwiperLong } from "../../components/Elements";
import {
  cleareFavResponce,
  cleareLikeResponce,
  favoriteByUserApi,
  likeUnlikeApi,
  updateFavoriteApi,
} from "../../store/Actions/Actions";
import "swiper/css";
import "./Favourite.css";
import { useDispatch, useSelector } from "react-redux";
import { getRndomeNumber } from "../../common/Function/utils";
import { HandThumbsUpFill, StarFill } from "react-bootstrap-icons";

const Favourite = () => {
  const dispatch = useDispatch();
  const Loading = useSelector((state) => state.actionReducer.Loading);
  const favoriteListings = useSelector(
    (state) => state.actionReducer.favoriteListings
  );
  const favoriteListing = useSelector(
    (state) => state.actionReducer.favoriteListing
  );
  const likeUnlikeBusiness = useSelector(
    (state) => state.actionReducer.likeUnlikeBusiness
  );
  // state for explore Favourite status
  const [favoriteInformation, setFavoriteInformation] = useState([]);

  //this state is for Favourite
  const [favoriteData, setFavoriteData] = useState({
    UserID: {
      value: "PLU_1",
      errorMessage: "",
      errorStatus: false,
    },
  });
  const [activeCategory, setActiveCategory] = useState(null);

  // this is how I set data in Favourite Api by using explore state
  useEffect(() => {
    let favoriteNewData = {
      UserID: favoriteData.UserID.value,
    };
    dispatch(favoriteByUserApi(favoriteNewData));
  }, []);

  // this is how I get data from Reducer
  useEffect(() => {
    if (
      favoriteListings !== null &&
      favoriteListings !== undefined &&
      favoriteListings.length !== 0
    ) {
      setFavoriteInformation(favoriteListings);
    }
  }, [favoriteListings]);
  // UPDATE REAL TIME DATA IF API IS GOING TO SUCESS OF LIKE
  const toggleIsLiked = (businessListingId) => {
    const updatedData = favoriteInformation.map((category) => {
      const updatedListings = category.favoriteByUserListings.map((listing) => {
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
        favoriteByUserListings: updatedListings,
      };
    });

    setFavoriteInformation(updatedData);
    setActiveCategory(null);
  };

  // UPDATE CALL REAL TIME DATA IF API IS GOING TO SUCESS OF LIKE
  useEffect(() => {
    if (likeUnlikeBusiness) {
      console.log("toggleIsLiked");
      toggleIsLiked(likeUnlikeBusiness);
      dispatch(cleareLikeResponce());
    }
  }, [likeUnlikeBusiness]);

  // UPDATE REAL TIME DATA IF API IS GOING TO SUCESS OF FAVORITE
  const toggleIsFavriote = (businessListingId) => {
    setFavoriteInformation((prevDashboardInfo) => {
      const updatedData = prevDashboardInfo
        .map((category) => {
          const updatedListings = category.favoriteByUserListings.filter(
            (listing) => listing.businessListingId !== businessListingId
          );

          return {
            ...category,
            favoriteByUserListings: updatedListings,
          };
        })
        .filter((category) => category.favoriteByUserListings.length > 0);

      return updatedData;
    });
    setActiveCategory(null);
  };

  // UPDATE CALL REAL TIME DATA IF API IS GOING TO SUCESS OF FAVORITE
  useEffect(() => {
    if (favoriteListing) {
      toggleIsFavriote(favoriteListing);
      dispatch(cleareFavResponce());
    }
  }, [favoriteListing]);

  const [childIndex, setChildIndex] = useState(null);
  const [childIconIndex, setChildIconIndex] = useState(null);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const FavoriteLongBoxRef = useRef(null);
  const locationLatitude = useSelector(
    (state) => state.actionReducer.locationLatitude
  );
  const locationLongitude = useSelector(
    (state) => state.actionReducer.locationLongitude
  );

  //for Favorite icon toggle onclick
  const toggleFav = (checked, LikeData, favIndex) => {
    let likeItem = LikeData.businessListingId;
    let filterData = [
      ...favoriteInformation[childIndex].favoriteByUserListings,
    ];
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
    setActiveCategory(null);
    setMenuPosition({ x: 0, y: 0 });
    setChildIconIndex(null);
    setChildIconIndex(null);
  };

  //for like icon toggle onclick
  const toggleLike = (checked, LikeData, dataIndex) => {
    let likeItem = LikeData.businessListingId;
    let filterData = [
      ...favoriteInformation[childIndex].favoriteByUserListings,
    ];

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
    setActiveCategory(null);
    setMenuPosition({ x: 0, y: 0 });
    setChildIconIndex(null);
    setChildIconIndex(null);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        FavoriteLongBoxRef.current &&
        !FavoriteLongBoxRef.current.contains(event.target)
      ) {
        setActiveCategory(null);
        setMenuPosition({ x: 0, y: 0 });
        setChildIconIndex(null);
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
      <Row>
        <Col>
          {favoriteInformation.map((favoriteUserListing, index) => {
            return (
              <Fragment key={index}>
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
                      className={`heading-title-h1 mouse-cursor-heading 
                        active`}
                    >
                      {favoriteUserListing.categoryName}
                    </label>
                  </Col>
                </Row>
                <Row>
                  <Col lg={12} md={12} sm={12}>
                    {favoriteUserListing.favoriteByUserListings !== null &&
                      favoriteUserListing.favoriteByUserListings.length > 0 && (
                        <>
                          {activeCategory && (
                            <div
                              ref={FavoriteLongBoxRef}
                              className={"longpress-box"}
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
                                  {favoriteInformation[childIndex]
                                    .favoriteByUserListings[childIconIndex]
                                    .isLiked ? (
                                    <>
                                      <span
                                        onClick={(checked) =>
                                          toggleLike(
                                            false,
                                            favoriteInformation[childIndex]
                                              .favoriteByUserListings[
                                              childIconIndex
                                            ],
                                            index
                                          )
                                        }
                                      >
                                        <HandThumbsUpFill className="icon-class" />
                                        <span className="main-options">
                                          UnLike
                                        </span>
                                      </span>
                                    </>
                                  ) : (
                                    <>
                                      <span
                                        onClick={(checked) =>
                                          toggleLike(
                                            true,
                                            favoriteInformation[childIndex]
                                              .favoriteByUserListings[
                                              childIconIndex
                                            ],
                                            index
                                          )
                                        }
                                      >
                                        <i className="icon-like icon-class"></i>
                                        <span className="main-options">
                                          Like
                                        </span>
                                      </span>
                                    </>
                                  )}
                                </span>
                                <span className="icn-display-block">
                                  {favoriteInformation[childIndex]
                                    .favoriteByUserListings[childIconIndex]
                                    .businessContactNumber ? (
                                    <>
                                      <i className="icon-call icon-class"></i>
                                      <span className="main-options">Call</span>
                                    </>
                                  ) : (
                                    <>
                                      <i className="icon-call icon-class"></i>
                                      <span className="main-options">Call</span>
                                    </>
                                  )}
                                </span>
                                <span className="icn-display-block">
                                  {favoriteInformation[childIndex]
                                    .favoriteByUserListings[childIconIndex]
                                    .businessLocation ? (
                                    <>
                                      <i className="icon-location icon-class"></i>
                                      <span className="main-options">
                                        Direction
                                      </span>
                                    </>
                                  ) : (
                                    <>
                                      <i className="icon-location icon-class"></i>
                                      <span className="main-options">
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
                                  {favoriteInformation[childIndex]
                                    .favoriteByUserListings[childIconIndex]
                                    .isFavorite ? (
                                    <>
                                      <span
                                        onClick={(checked) =>
                                          toggleFav(
                                            false,
                                            favoriteInformation[childIndex]
                                              .favoriteByUserListings[
                                              childIconIndex
                                            ],
                                            index
                                          )
                                        }
                                      >
                                        <StarFill className="icon-class" />
                                        <span className="main-options">
                                          UnFavorite
                                        </span>
                                      </span>
                                    </>
                                  ) : (
                                    <>
                                      {" "}
                                      <span
                                        onClick={(checked) =>
                                          toggleFav(
                                            true,
                                            favoriteInformation[childIndex]
                                              .favoriteByUserListings[
                                              childIconIndex
                                            ],
                                            index
                                          )
                                        }
                                      >
                                        <i className="icon-star icon-Favorite"></i>
                                        <span className="main-options">
                                          Favorite
                                        </span>
                                      </span>
                                    </>
                                  )}
                                </span>
                              </div>
                            </div>
                          )}

                          <FavoriteSwiperLong
                            favoriteListingData={
                              favoriteUserListing.favoriteByUserListings
                            }
                            parentIndex={index}
                            setChildIconIndex={setChildIconIndex}
                            setChildIndex={setChildIndex}
                            setActiveCategory={setActiveCategory}
                            setMenuPosition={setMenuPosition}
                            activeCategory={activeCategory}
                          />
                        </>
                      )}
                  </Col>
                </Row>
              </Fragment>
            );
          })}
          {Loading ? <Loader /> : null}
        </Col>
      </Row>
    </Container>
  );
};

export default Favourite;
