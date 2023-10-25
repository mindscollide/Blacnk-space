import React, {
  Fragment,
  useEffect,
  useState,
} from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Button } from "./../../../components/Elements";
import { Swiper, SwiperSlide } from "swiper/react";
import { useNavigate } from "react-router-dom";
import "swiper/css";
import "./SwiperLongPress.css";
import LongPress from "../LonPress/LongPress";

const SwiperLongpress = ({
  listingDataIndex,
  dashboardInformation,
  setActiveChildCategory,
  activeChildCategory,
  setChildIndex,
  setChildIconIndex,
  setMenuPosition,
}) => {
  const navigate = useNavigate();

  // Create a ref for the swiper-longpress-box element
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

  const handleLongPress = (e, value, index) => {
    e.preventDefault();
    const menuWidth = 290;
    const menuHeight = 48;
    const rect = e.target.getBoundingClientRect();
    const xPos = rect.left + window.scrollX + rect.width / 2;
    const yPos = rect.top + window.scrollY + rect.height;
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    let x = xPos;
    let y = yPos;
    // Check if the menu will go beyond the viewport boundaries and adjust its position
    if (x + menuWidth > viewportWidth) {
      x = (viewportWidth - menuWidth) / 2;
    } else {
    }

    if (y + menuHeight > viewportHeight) {
      y = yPos - menuHeight;
    }

    setMenuPosition({ x, y });
    setChildIndex(listingDataIndex);
    setChildIconIndex(index);
    setActiveChildCategory(value);
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
                          handleLongPress(e, newData.businessListingId, index)
                        }
                        onPress={(e) => handleShortPress(e, newData)}
                        duration={500}
                      >
                        <Button
                          id={`swiper-section ${newData.businessListingId}`}
                          className={`Swipper-slide-box ${
                            activeChildCategory === newData.businessListingId
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
