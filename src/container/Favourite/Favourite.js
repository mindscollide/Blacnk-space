import { Fragment, useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Loader, FavoriteSwiperLong } from "../../components/Elements";
import {
  cleareFavResponce,
  cleareLikeResponce,
  favoriteByUserApi,
} from "../../store/Actions/Actions";
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
  };

  // UPDATE CALL REAL TIME DATA IF API IS GOING TO SUCESS OF FAVORITE
  useEffect(() => {
    if (favoriteListing) {
      toggleIsFavriote(favoriteListing);
      dispatch(cleareFavResponce());
    }
  }, [favoriteListing]);

  return (
    <Container className="backgroundBody">
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
