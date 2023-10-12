import { Fragment, useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Loader, StarRating, Button } from "./../../components/Elements";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Highlighter from "react-highlight-words";
import { Input } from "antd";
// import { Header, UserInfo, SearchHeader } from "../../components/Layout";
import { searchBlancApi, filterData } from "../../store/Actions/Actions";
import "./Search.css";

const SearchPage = () => {
  const { actionReducer } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchData, setSearchData] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const [isHome, setIsHome] = useState(false);

  const [ratingValue, setRatingValue] = useState(1);
  // search Listing Category new State
  const [searchListingData, setSearchListingData] = useState([]);
  console.log(ratingValue, "ratingValueratingValueratingValue");
  const [sortByValues, setSortByValues] = useState([
    {
      value: 1,
      label: "Rating",
    },
    {
      value: 2,
      label: "location",
    },
  ]);
  console.log(sortByValues, "sortByValuessortByValuessortByValues");
  const [dropdownCategory, setDropdownCategory] = useState(false);

  // state for search
  const [searchState, setSearchState] = useState({
    UserID: {
      value: "PLU_1",
      errorMessage: "",
      errorStatus: false,
    },
    SearchText: {
      value: "",
      errorMessage: "",
      errorStatus: false,
    },
    UserLatitude: {
      value: actionReducer.locationLatitude,
      errorMessage: "",
      errorStatus: false,
    },
    UserLongitude: {
      value: actionReducer.locationLongitude,
      errorMessage: "",
      errorStatus: false,
    },
    SearchBy: {
      value: 1,
      errorMessage: "",
      errorStatus: false,
    },
  });

  const onClickDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const onClickCategory = () => {
    setDropdownCategory(!dropdownCategory);
  };

  // dispatch api on click Search Icon
  const onClickSearchIcon = () => {
    if (searchState.SearchText.value !== "") {
      let searchUser = {
        UserID: searchState.UserID.value,
        SearchText: searchState.SearchText.value,
        UserLatitude: actionReducer.locationLatitude,
        UserLongitude: actionReducer.locationLongitude,
        SearchBy: searchState.SearchBy.value,
      };
      dispatch(searchBlancApi(navigate, searchUser));
    } else if (searchState.SearchText.value === "") {
      let newSearch = {
        UserID: "",
        SearchText: "",
        UserLatitude: actionReducer.locationLatitude,
        UserLongitude: actionReducer.locationLongitude,
        SearchBy: 0,
      };

      // dispatch(searchBlancApi(navigate, newSearch));
    } else {
      console.log("Nothing To Show");
    }
  };

  // onChange handlder for search
  const handleSearchInputChange = (e) => {
    setSearchState({
      ...searchState,
      SearchText: {
        value: e.target.value,
      },
    });
  };

  // for another Reducer Listing Category for Seacrh
  useEffect(() => {
    if (
      actionReducer.searchListingCategory !== null &&
      actionReducer.searchListingCategory !== undefined &&
      actionReducer.searchListingCategory.length > 0
    ) {
      setSearchListingData(actionReducer.searchListingCategory);
    } else {
      setSearchListingData([]);
    }
  }, [actionReducer.searchListingCategory]);

  console.log(
    actionReducer.searchListingCategory,
    "actionReducersearchListingCategory"
  );

  //for close category and sort popup
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        showDropdown ||
        (!dropdownCategory && !event.target.closest(".popup"))
      ) {
        setShowDropdown(false);
        setDropdownCategory(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [showDropdown, dropdownCategory]);

  // this is the dropdown handler for category filter
  const handleFilter = (data) => {
    console.log(data, "newDataa");
    dispatch(filterData(data));
    setDropdownCategory(false);
  };

  // For another Reducer searchListing Api shown when user hit search Icon
  useEffect(() => {
    if (
      actionReducer.searchListing !== null &&
      actionReducer.searchListing !== undefined &&
      actionReducer.searchListing.length > 0
    ) {
      setSearchData(actionReducer.searchListing);
    } else {
      setSearchData([]);
    }
  }, [actionReducer.searchListing]);

  // this is used for category dropdown filter
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

  console.log({ searchData }, "searchDatasearchDatasearchDatasearchData");
  return (
    <Fragment>
      {/* <Row>
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
      </Row> */}
      <Container className="Search-header">
        <Row className="d-flex justify-content-end">
          <Col lg={12} md={12} sm={12}>
            <Row className="mt-3">
              <Col lg={12} md={12} sm={12}>
                <Input
                  size="large"
                  placeholder="SEARCH FOR A FOOD, TOURS, EVENT, ENTERTAIN..."
                  value={searchState.SearchText.value}
                  onChange={handleSearchInputChange}
                  prefix={
                    <i
                      className="icon-search seacrh-icon-size"
                      onClick={onClickSearchIcon}
                    ></i>
                  }
                  // className="search-bar-ant"
                />
              </Col>
            </Row>

            <Row>
              <Col
                lg={12}
                md={12}
                sm={12}
                className="d-flex justify-content-end mt-3"
              >
                <Button
                  text="Go Back"
                  className="Go-Back-Button"
                  onClick={() => navigate("/BlankSpace/")}
                />
              </Col>
            </Row>

            <Row className="mt-3">
              <Col
                lg={4}
                md={4}
                sm={4}
                xs={4}
                className="d-flex justify-content-start"
              >
                <span className="top-result-heading">TOP RESULTS</span>
              </Col>

              <Col
                lg={4}
                md={4}
                sm={4}
                xs={4}
                className="d-flex justify-content-center"
              >
                <span className="sortby-heading" onClick={onClickDropdown}>
                  SORT BY:{" "}
                  {ratingValue === 1
                    ? "RATING"
                    : ratingValue === 2
                    ? "LOCATION"
                    : null}{" "}
                  <span className="dropdown-icon"></span>
                </span>
                <div>
                  {showDropdown ? (
                    <>
                      <div className="dropdown-main-div">
                        {sortByValues.map((data, index) => {
                          console.log(
                            data,
                            "sortByValuessortByValuessortByValues"
                          );
                          return (
                            <div className="dropdown-list-item">
                              <p
                                className="dropdown-menu-text"
                                onChange={() => setRatingValue(data.value)}
                              >
                                {data.label}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    </>
                  ) : null}
                </div>
              </Col>

              <Col
                lg={4}
                md={4}
                sm={4}
                xs={4}
                className="d-flex justify-content-end"
              >
                <span className="sortby-heading" onClick={onClickCategory}>
                  CATEGORIES<span className="dropdown-icon"></span>
                </span>
                {/* {searchListingData.map((newDataa, index) => {
              console.log(newDataa, "newDatagagagagaga");
              return ( */}
                <>
                  <div className="dropdown-main-div-category">
                    {searchListingData.map((newDataa, index) => {
                      console.log(newDataa, "newwwwwwDataa");
                      return (
                        <>
                          {dropdownCategory ? (
                            <>
                              <div
                                className="dropdown-list-item"
                                onClick={() => handleFilter(newDataa)}
                              >
                                <p
                                  className="dropdown-menu-text"
                                  // onClick={handleCategorySelect}
                                >
                                  {newDataa.categoryName}
                                </p>
                              </div>
                            </>
                          ) : null}
                        </>
                      );
                    })}
                  </div>
                </>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>

      <div className="Search-header-marginTop" />
      <Container>
        {searchData.map((newData, index) => {
          let firstLetter = newData.businessListingName
          .charAt(0)
          .toUpperCase();
          console.log(newData, "newDatagagagagaga");
          return (
            <>
              <Row>
                <Col
                  lg={2}
                  md={2}
                  sm={2}
                  xs={2}
                  className="d-flex justify-content-start"
                >
                  <div className="Search-slide-box">
                  {newData.businessListingIcon !== "" ? (
                          <img
                            src={`data:image/jpeg;base64,${newData.businessListingIcon}`}
                            alt="Icon"
                            className="Swipper-slide-box-image"
                          />
                        ) : (
                          <span>{firstLetter}</span>
                        )}
                  </div>
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
                      <Highlighter
                        highlightClassName="Search-Highlighted-text"
                        searchWords={[searchState.SearchText.value]}
                        autoEscape={true}
                        textToHighlight={newData.businessListingName}
                      />
                      {/* {newData.businessListingName} */}
                    </div>
                    <div className="rating-icons">
                      <StarRating rating={newData.businessListingRatings} />
                      <span className="listing-Review">
                        (<span>{newData.businessListingReview}</span>
                        <span style={{ marginLeft: "5px" }}>Reviews</span>)
                      </span>
                    </div>
                    <span className="span-Kilometer">
                      {newData.distance} KM
                    </span>
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
            </>
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
