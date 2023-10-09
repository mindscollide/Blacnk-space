import { Fragment, useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import {
  Loader,
  HighlightedText,
  StarRating,
} from "./../../components/Elements";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Header, UserInfo, SearchHeader } from "../../components/Layout";
import { searchBlancApi } from "../../store/Actions/Actions";
import "./Search.css";

const SearchPage = () => {
  const { actionReducer } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchData, setSearchData] = useState([]);
  const [isHome, setIsHome] = useState(false);

  // state for Loader
  // const [showLoader, setShowLoader] = useState(false);
  useEffect(() => {
    if (
      actionReducer.searchListing !== null &&
      actionReducer.searchListing !== undefined &&
      actionReducer.searchListing.length > 0
    ) {
      setSearchData(actionReducer.searchListing);
    }
  }, [actionReducer.searchListing]);
  useEffect(() => {
    if (
      actionReducer.filterData !== null &&
      actionReducer.filterData !== undefined
    ) {
      let value = actionReducer.filterData;
      let copyData = [...actionReducer.searchListing];
      let newData = copyData.filter(
        (data, index) => data.parentCategoryName === value.categoryName
      );
      setSearchData(newData);
    }
  }, [actionReducer.filterData]);
  // useEffect(() => {
  //   let newSearchData = {
  //     UserID: "PLU_1",
  //     SearchText: "abu",
  //     UserLatitude: "26.3214",
  //     UserLongitude: "67.3214",
  //     SearchBy: 1,
  //   };
  //   dispatch(searchBlancApi(newSearchData));
  // }, []);

  // useEffect(() => {
  //   setShowLoader(true);

  //   setTimeout(() => {
  //     setShowLoader(false);
  //   }, 3000);
  // }, []);
  console.log({ searchData }, "searchDatasearchDatasearchDatasearchData");
  return (
    <Fragment>
      <Row>
        <Col>
          {isHome ? (
            <>
              <Header />
              <UserInfo />
            </>
          ) : (
            <>
              <div className="Search-header">
                <Container>
                  <SearchHeader />
                </Container>
              </div>
            </>
          )}
        </Col>
      </Row>
      <Row className="Search-header-marginTop">
        <Col></Col>
      </Row>
      <Container>
        {searchData.map((newData, index) => {
          console.log(newData, "newDatagagagagaga");
          return (
            <Row>
              <Col
                lg={2}
                md={2}
                sm={2}
                xs={2}
                className="d-flex justify-content-start"
              >
                <div className="Search-slide-box"></div>
              </Col>
              <Col
                lg={9}
                md={9}
                sm={9}
                xs={9}
                className="d-flex justify-content-start"
              >
                <div className="Container">
                  <div className="User-name-highlighted">
                    {newData.businessListingName}
                  </div>

                  <div>
                    <span className="rating-icons">
                      <StarRating rating={newData.businessListingRatings} />
                    </span>
                    {/* <i className="icon-star-fill icon-color-star pe-auto"></i>
                    <i className="icon-star-fill icon-color-star pe-auto"></i>
                    <i className="icon-star icon-color-star pe-auto"></i>
                    <i className="icon-star icon-color-star pe-auto"> */}
                    {/* </i> */}
                    <span>
                      {
                        <span className="listing-Review">
                          {newData.businessListingReview}
                        </span>
                      }
                      {<span className="Review-Text"> Reviews</span>}
                    </span>
                  </div>
                  <span className="span-Kilometer">{newData.distance} KM</span>
                </div>
              </Col>

              <Col
                lg={1}
                md={1}
                sm={1}
                xs={1}
                className="d-flex justify-content-start"
              >
                <div className="Container">
                  <div className="other-text-size">
                    {newData.parentCategoryName}
                  </div>
                  <div className="other-text-size">
                    {newData.childCategoryName}
                  </div>
                  <div>
                    {newData.businessListingLocation ? (
                      <>
                        <span className="other-text-size">
                          {/* Location */}

                          <a
                            href={newData.businessListingLocation}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underLine_Text"
                          >
                            <i className="icon-location icon-class"></i>
                          </a>
                        </span>
                      </>
                    ) : null}
                  </div>
                </div>
              </Col>
            </Row>
          );
        })}
      </Container>
      {/* {showLoader && (
        <div className="loader-overlay">
          <Loader />
        </div>
      )} */}
      {actionReducer.Loading ? <Loader /> : null}
    </Fragment>
  );
};

export default SearchPage;
