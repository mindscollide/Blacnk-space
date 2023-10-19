import { Fragment, useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import {
  Loader,
  StarRating,
  Button,
  LongPress,
} from "./../../components/Elements";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Highlighter from "react-highlight-words";
import { Input } from "antd";
import { searchBlancApi, filterData, cleareSearchSuccess } from "../../store/Actions/Actions";
import { getRndomeNumber } from "../../common/Function/utils";

import "./Search.css";

const SearchPage = () => {
  const locationLatitude = useSelector(
    (state) => state.actionReducer.locationLatitude
  );
  const locationLongitude = useSelector(
    (state) => state.actionReducer.locationLongitude
  );
  const searchListingCategory = useSelector(
    (state) => state.actionReducer.searchListingCategory
  );
  const searchListing = useSelector(
    (state) => state.actionReducer.searchListing
  );
  const filterDataValue = useSelector(
    (state) => state.actionReducer.filterDataValue
  );
  const Loading = useSelector((state) => state.actionReducer.Loading);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchData, setSearchData] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
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

  // for ellipses the data in search
  const searchTruncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };

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
      value: locationLatitude,
      errorMessage: "",
      errorStatus: false,
    },
    UserLongitude: {
      value: locationLongitude,
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
        UserLatitude: locationLatitude,
        UserLongitude: locationLongitude,
        SearchBy: searchState.SearchBy.value,
      };
      dispatch(searchBlancApi(navigate, searchUser));
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

  const detailBusinessSearch = async (businessData) => {
    if (businessData && businessData.businessListingID) {
      let newBusinessIdData = {
        BusinessListingID: businessData.businessListingID,
      };
      await localStorage.setItem(
        "newBusinessIdData",
        JSON.stringify(newBusinessIdData)
      );
      navigate("/BlankSpace/Category");
    } else {
      console.error("businessData or businessListingId is undefined.");
    }
  };

  const handleShortPress = (e, value) => {
    // Handle short press here
    e.preventDefault();
    detailBusinessSearch(value);
    console.log("clicked");
  };

  // for another Reducer Listing Category for Seacrh
  useEffect(() => {
    if (
      searchListingCategory !== null &&
      searchListingCategory !== undefined &&
      searchListingCategory.length > 0
    ) {
      setSearchListingData(searchListingCategory);
    } else {
      setSearchListingData([]);
    }
  }, [searchListingCategory]);

  useEffect(() => {
   return()=>{
    dispatch(cleareSearchSuccess())
   }
  }, []);
  
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
      searchListing !== null &&
      searchListing !== undefined &&
      searchListing.length > 0
    ) {
      setSearchData(searchListing);
    } else {
      setSearchData([]);
    }
  }, [searchListing]);

  // this is used for category dropdown filter
  useEffect(() => {
    if (filterDataValue !== null && filterDataValue !== undefined) {
      let value = filterDataValue;
      let copyData = [...searchListing];
      let newData = copyData.filter(
        (data, index) => data.parentCategoryName === value.categoryName
      );
      setSearchData(newData);
    }
  }, [filterDataValue]);
  return (
    <Container className="backgroundBody" fluid>
      <Fragment>
        <div className="serach-header-class">
          <Row className="mt-4">
            <Col lg={11} md={10} sm={10} xs={9}>
              <Input
                size="default"
                placeholder="SEARCH FOR A FOOD, TOURS, EVENT, ENTERTAIN..."
                value={searchState.SearchText.value}
                onChange={handleSearchInputChange}
                prefix={
                  <i
                    className="icon-search seacrh-icon-size"
                    onClick={onClickSearchIcon}
                  ></i>
                }
              />
            </Col>
            <Col lg={1} md={2} sm={1} xs={2}>
              <Button
                text="Go Back"
                className="Go-Back-Button-Search"
                onClick={() => navigate("/BlankSpace/")}
              />
            </Col>
          </Row>
          <Row className="mt-4">
            <Col lg={2} md={2} sm={2} xs={3}>
              <span className="top-result-heading">TOP RESULTS</span>
            </Col>

            <Col lg={8} md={8} sm={7} xs={5}>
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

            <Col lg={2} md={2} sm={3} xs={4}>
              <span className="sortby-heading" onClick={onClickCategory}>
                CATEGORIES<span className="dropdown-icon"></span>
              </span>
              <div className="dropdown-main-div-category">
                {searchListingData.map((newDataa, index) => {
                  return (
                    <div key={getRndomeNumber()}>
                      {dropdownCategory ? (
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
                      ) : null}
                    </div>
                  );
                })}
              </div>
            </Col>
          </Row>
        </div>

        <div className="scrollData">
          {searchData.map((newData, index) => {
            let firstLetter = newData.businessListingName
              .charAt(0)
              .toUpperCase();
            console.log(newData, "newDatagagagagaga");
            return (
              <>
                <Row key={getRndomeNumber()}>
                  <Col
                    lg={2} md={2} sm={2} xs={3}
                    className="d-flex justify-content-start"
                  >
                    <LongPress
                      onPress={(e) => handleShortPress(e, newData)}
                      duration={500}
                    >
                      <Button
                        key={newData.businessListingID}
                        id={`swiper-section ${newData.businessListingID}`}
                        className="Search-slide-box"
                        text={
                          newData.businessListingIcon !== "" ? (
                            <img
                              src={`data:image/jpeg;base64,${newData.businessListingIcon}`}
                              alt="Icon"
                              className="Swipper-slide-box-image-search"
                            />
                          ) : (
                            <span>{firstLetter}</span>
                          )
                        }
                      ></Button>
                    </LongPress>
                  </Col>
                  <Col
                    lg={8} md={8} sm={7} xs={5}
                    className="d-flex justify-content-start"
                  >
                    <div className="Container">
                      <div className="User-name-highlighted">
                        <Highlighter
                          highlightClassName="Search-Highlighted-text"
                          searchWords={[searchState.SearchText.value]}
                          autoEscape={true}
                          textToHighlight={searchTruncateText(
                            newData.businessListingName,
                            30
                          )}
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
                    lg={2} md={2} sm={3} xs={4}
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
                                <i className="icon-location icon-class-search"></i>
                              </a>
                            </span>
                          </>
                        ) : (
                          <>
                            <i className="icon-location icon-class-search-empty"></i>
                          </>
                        )}
                      </div>
                    </div>
                  </Col>
                </Row>
              </>
            );
          })}
        </div>
      </Fragment>
      {Loading ? <Loader /> : null}
    </Container>
  );
};

export default SearchPage;
