import { Fragment, useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Button,
  useLongPressClick,
  HeadingHoldPU,
  Loader,
  FavoriteSwiperLong,
} from "../../components/Elements";
import { favoriteByUserApi } from "../../store/Actions/Actions";
// import { useNavigate } from "react-router-dom";
import {
  Header,
  UserInfo,
  ExploreHeader,
  ExploreUser,
} from "../../components/Layout";
import "swiper/css";
import "./Favourite.css";
import { useDispatch, useSelector } from "react-redux";

const Favourite = () => {
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  const { actionReducer } = useSelector((state) => state);
  const [isHeadingFood, setIsHeadingFood] = useState(false);

  const [isHome, setIsHome] = useState(false);

  //state for active longPress event
  const [activeCategory, setActiveCategory] = useState(null);

  // state for explore Favourite status
  const [favoriteInformation, setFavoriteInformation] = useState([]);

  // state for Loader
  // const [showLoader, setShowLoader] = useState(false);

  //this state is for Favourite
  const [favoriteData, setFavoriteData] = useState({
    UserID: {
      value: "PLU_1",
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

  // this is how I set data in Favourite Api by using explore state
  useEffect(() => {
    let favoriteNewData = {
      UserID: favoriteData.UserID.value,
    };
    dispatch(favoriteByUserApi(favoriteNewData));
  }, []);

  console.log("actionReducer", actionReducer);

  // this is how I get data from Reducer
  useEffect(() => {
    if (
      actionReducer.favoriteListing !== null &&
      actionReducer.favoriteListing !== undefined &&
      actionReducer.favoriteListing.length !== 0
    ) {
      setFavoriteInformation(actionReducer.favoriteListing);
    }
  }, [actionReducer.favoriteListing]);

  console.log("explore Data Information", favoriteData);

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
              {favoriteInformation.map((favoriteUserListing, index) => {
                return (
                  <>
                    {/* Food Section */}
                    <Row className="mt-4" key={index}>
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
                          {favoriteUserListing.categoryName}
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
                        {favoriteUserListing.favoriteByUserListings.length >
                          0 && (
                          <FavoriteSwiperLong
                            favoriteListingData={
                              favoriteUserListing.favoriteByUserListings
                            }
                          />
                        )}
                      </Col>
                    </Row>
                  </>
                );
              })}

              {/* {showLoader && (
                <div className="loader-overlay">
                  <Loader />
                </div>
              )} */}
              {actionReducer.Loading ? <Loader /> : null}
            </Col>
          </Row>
        </Fragment>
      </Container>
    </Fragment>
  );
};

export default Favourite;
