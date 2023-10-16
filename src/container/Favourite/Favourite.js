import { Fragment, useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import {
  HeadingHoldPU,
  Loader,
  FavoriteSwiperLong,
} from "../../components/Elements";
import { favoriteByUserApi } from "../../store/Actions/Actions";
import "swiper/css";
import "./Favourite.css";
import { useDispatch, useSelector } from "react-redux";
import { getRndomeNumber } from "../../common/Function/utils";

const Favourite = () => {
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  const Loading = useSelector((state) => state.actionReducer.Loading);
  const favoriteListings = useSelector(
    (state) => state.actionReducer.favoriteListings
  );
  //state for active longPress event
  const [activeCategory, setActiveCategory] = useState(null);

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

  return (
    <Container>
      <Row>
        <Col>
          {favoriteInformation.map((favoriteUserListing, index) => {
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
                      id={`food-label ${index}`}
                      className={`heading-title-h1 mouse-cursor-heading ${
                        activeCategory === index ? "active" : ""
                      }`}
                      onClick={() => {}}
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
                    {favoriteUserListing.favoriteByUserListings !== null &&
                      favoriteUserListing.favoriteByUserListings.length > 0 && (
                        <FavoriteSwiperLong
                          favoriteListingData={
                            favoriteUserListing.favoriteByUserListings
                          }
                          setFavoriteInformation={setFavoriteInformation}
                          favoriteInformation={favoriteInformation}
                        />
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
