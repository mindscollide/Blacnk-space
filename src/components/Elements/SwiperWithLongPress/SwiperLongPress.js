import React, {
  Fragment,
  useEffect,
  useState,
  useRef,
  useLayoutEffect,
} from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Button } from "./../../../components/Elements";
import { Swiper, SwiperSlide } from "swiper/react";
import { useNavigate } from "react-router-dom";
import {
  updateFavoriteApi,
  likeUnlikeApi,
} from "../../../store/Actions/Actions";
import { useDispatch, useSelector } from "react-redux";
import { StarFill, HandThumbsUpFill } from "react-bootstrap-icons";
import "swiper/css";
import "./SwiperLongPress.css";
import { getRndomeNumber } from "../../../common/Function/utils";
import LongPress from "../LonPress/LongPress";

const SwiperLongpress = ({ listingDataIndex, dashboardInformation }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const locationLatitude = useSelector(
    (state) => state.actionReducer.locationLatitude
  );
  const locationLongitude = useSelector(
    (state) => state.actionReducer.locationLongitude
  );

  const [activeCategory, setActiveCategory] = useState(null);
  // Create a ref for the swiper-longpress-box element
  const swiperLongPressBoxRef = useRef(null);
  const [clicks, setClicks] = useState(0);
  const [dataCheck, setDataCheck] = useState([]);

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };

  const detailBusiness = async (businessData) => {
    if (businessData && businessData.businessListingId) {
      let newBusinessIdData = {
        BusinessListingID: businessData.businessListingId,
      };
      await localStorage.setItem(
        "newBusinessIdData",
        JSON.stringify(newBusinessIdData)
      );
      navigate("/BlankSpace/Category");
    } else {
    }
  };

  //for Favorite icon toggle onclick
  const toggleFav = (checked, LikeData, favIndex) => {
    console.log("Favorite favoriteListing");
    let likeItem = LikeData.businessListingId;
    let filterData = [
      ...dashboardInformation[listingDataIndex].dashBoardListings,
    ];
    filterData.splice(favIndex, 1);
    const businessListingOtherIds = filterData.map(
      (item) => item.businessListingId
    );
    console.log("Favorite favoriteListing");
    let newLike = {
      AddRemoveFavoriteBusinessEnum: checked === true ? 1 : 2,
      UserID: "PLU_1",
      Latitude: locationLatitude,
      Longitude: locationLongitude,
      BusinessListingId: likeItem,
      OtherAvailableListings: businessListingOtherIds,
    };
    console.log("Favorite favoriteListing", newLike);
    dispatch(updateFavoriteApi(newLike, likeItem));
    setRight(false);
  };

  const toggleLike = (checked, LikeData, dataIndex) => {
    let likeItem = LikeData.businessListingId;
    let filterData = [
      ...dashboardInformation[listingDataIndex].dashBoardListings,
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
    setRight(false);
  };
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const [right, setRight] = useState(false);
  const handleLongPress = (e, value) => {
    // e.preventDefault();

    const menuElement = swiperLongPressBoxRef.current;
    console.log("viewportWidth", menuElement);
    if (menuElement) {
      const menuStyles = getComputedStyle(menuElement);
      console.log("viewportWidth", menuStyles);
      // const menuWidth = parseInt(menuStyles.clientWitdth);
      // const menuHeight = parseInt(menuStyles.offsetHeight);
      const menuWidth = 290;
      const menuHeight = 45;
      console.log("viewportWidth", menuWidth);
      console.log("viewportWidth", menuHeight);

      const rect = e.target.getBoundingClientRect();
      console.log("viewportWidth", rect);
      const xPos = rect.left + window.scrollX + rect.width / 2;
      const yPos = rect.top + window.scrollY + rect.height;

      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      console.log("viewportWidth", viewportWidth);
      let x = xPos;
      let y = yPos;

      // Check if the menu will go beyond the viewport boundaries and adjust its position
      if (x + menuWidth > viewportWidth) {
        setRight(true);
        x = xPos - menuWidth;
      } else {
        setRight(false);
      }

      if (y + menuHeight > viewportHeight) {
        y = yPos - menuHeight;
      }

      setMenuPosition({ x, y });
      setActiveCategory(value);
    }
  };

  const handleShortPress = (e, data) => {
    // Handle short press here
    // e.preventDefault();
    if (clicks === 1) {
      if (dataCheck === data) {
        // Perform the action you want to happen on the double-click here
        detailBusiness(data);
      } else {
        setDataCheck(data);
      }
      // Reset the click count
      setClicks(0);
    } else {
      // Increment the click count
      setClicks(clicks + 1);
      setDataCheck(data);
      // You can add a delay here to reset the click count after a certain time if needed
      setTimeout(() => {
        setClicks(0);
        setDataCheck([]);
      }, 300); // Reset after 300 milliseconds (adjust as needed)
    }
  };

  // Add a click event listener to the document to handle clicks outside of swiper-longpress-box
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        swiperLongPressBoxRef.current &&
        !swiperLongPressBoxRef.current.contains(event.target)
      ) {
        setActiveCategory(null);
        setRight(false);
      }
    };
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  useEffect(() => {}, [dashboardInformation]);

  return (
    <Container className="backgroundBody">
      <Fragment>
        <Row>
          <Col lg={12} md={12} sm={12}>
            <Swiper
              breakpoints={{
                320: {
                  slidesPerView: 3,
                  spaceBetween: 5,
                },
                375: {
                  slidesPerView: 3,
                  spaceBetween: 0,
                },
                412: {
                  slidesPerView: 4,
                  spaceBetween: 7,
                },
                425: {
                  slidesPerView: 4,
                  spaceBetween: 7,
                },
                667: {
                  slidesPerView: 5,
                  spaceBetween: 0,
                },
                684: {
                  slidesPerView: 5,
                  spaceBetween: 0,
                },
                734: {
                  slidesPerView: 5,
                  spaceBetween: 0,
                },
                768: {
                  slidesPerView: 5,
                  spaceBetween: 0,
                },
                1024: {
                  slidesPerView: 8,
                  spaceBetween: 2,
                },
                1360: {
                  slidesPerView: 8,
                  spaceBetween: 0,
                },
                1440: {
                  slidesPerView: 8,
                  spaceBetween: 0,
                },
                2560: {
                  slidesPerView: 18,
                  spaceBetween: 0,
                },
              }}
            >
              {dashboardInformation[listingDataIndex].dashBoardListings.map(
                (newData, index) => {
                  let firstLetter = newData.businessListingName
                    .charAt(0)
                    .toUpperCase();
                  return (
                    <SwiperSlide key={newData.businessListingId}>
                      <LongPress
                        onLongPress={(e) =>
                          handleLongPress(e, newData.businessListingId)
                        }
                        onPress={(e) => handleShortPress(e, newData)}
                        duration={500}
                      >
                        <Button
                          id={`swiper-section ${newData.businessListingId}`}
                          className={`Swipper-slide-box ${
                            activeCategory === newData.businessListingId
                              ? "active"
                              : ""
                          }`}
                          text={
                            newData.businessListingIcon !== "" ? (
                              <img
                                src={`data:image/jpeg;base64,${newData.businessListingIcon}`}
                                alt="Icon"
                                className="Swipper-slide-box-image"
                              />
                            ) : (
                              <span className="tile-empty-letter">
                                {firstLetter}
                              </span>
                            )
                          }
                        ></Button>
                      </LongPress>

                      <>
                        <div
                          ref={swiperLongPressBoxRef}
                          className="swiper-longpress-box"
                          style={{
                            position: "absolute",
                            top: `${menuPosition.y}px`,
                            [right ? "right" : "left"]: `${menuPosition.x}px`,
                            opacity: 1,
                            transform: "translate(0, 0)",
                            zIndex: 33,
                            display:
                              activeCategory === newData.businessListingId
                                ? "block"
                                : "none",
                          }}
                        >
                          <div className="options-main-div">
                            <span className="icn-display-block">
                              {newData.isLiked ? (
                                <>
                                  <span
                                    onClick={() =>
                                      toggleLike(false, newData, index)
                                    }
                                  >
                                    <HandThumbsUpFill className="icon-class" />
                                    <span className="main-options">UnLike</span>
                                  </span>
                                </>
                              ) : (
                                <>
                                  <span
                                    onClick={() =>
                                      toggleLike(true, newData, index)
                                    }
                                  >
                                    <i className="icon-like icon-class"></i>
                                    <span className="main-options">Like</span>
                                  </span>
                                </>
                              )}
                            </span>
                            <span className="icn-display-block">
                              {newData.businessContactNumber ? (
                                <>
                                  <i className="icon-call icon-class"></i>
                                  <span className="main-options">Call</span>
                                </>
                              ) : (
                                <>
                                  <i className="icon-call Icon-disabled-Call"></i>
                                  <span className="disable-main-options">
                                    {" "}
                                    Call
                                  </span>
                                </>
                              )}
                            </span>
                            <span className="icn-display-block">
                              {newData.businessLocation ? (
                                <>
                                  <a
                                    href={newData.businessLocation}
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
                                  <i className="icon-location Icon-disabled-Direction"></i>
                                  <span className="disable-main-options">
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
                              {newData.isFavorite ? (
                                <span
                                  onClick={() =>
                                    toggleFav(false, newData, index)
                                  }
                                >
                                  <StarFill className="icon-class" />
                                  {/* <i className="icon-star icon-Favorite"></i> */}
                                  <span className="main-options">
                                    UnFavorite
                                  </span>
                                </span>
                              ) : (
                                <span
                                  onClick={() =>
                                    toggleFav(true, newData, index)
                                  }
                                >
                                  <i className="icon-star icon-Favorite"></i>
                                  <span className="main-options">Favorite</span>
                                </span>
                              )}
                            </span>
                          </div>
                        </div>
                      </>

                      <p
                        className={`para-color`}
                        title={newData.businessListingName}
                        data-fulltext={newData.businessListingName}
                      >
                        {truncateText(newData.businessListingName, 15)}
                      </p>
                    </SwiperSlide>
                  );
                }
              )}
            </Swiper>
          </Col>
        </Row>
      </Fragment>
    </Container>
  );
};

export default SwiperLongpress;
