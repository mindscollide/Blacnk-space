import { Fragment, useState, useEffect } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { filterData, searchBlancApi } from "../../../store/Actions/Actions";
import "./SearchHeader.css";
import { Input } from "antd";
import { Button, StarRating } from "../../Elements";

const SearchHeader = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const { actionReducer } = useSelector((state) => state);
  console.log(actionReducer, "actionReducerNation");
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
      value: "24.455071999999998",
      errorMessage: "",
      errorStatus: false,
    },
    UserLongitude: {
      value: "54.394693999999994",
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
    let searchUser = {
      UserID: searchState.UserID.value,
      SearchText: searchState.SearchText.value,
      UserLatitude: searchState.UserLatitude.value,
      UserLongitude: searchState.UserLongitude.value,
      SearchBy: searchState.SearchBy.value,
    };
    dispatch(searchBlancApi(searchUser));
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
  const handleFilter = (data) => {
    console.log(data, "newDataa");
    dispatch(filterData(data));
    setDropdownCategory(false);
  };
  return (
    <Fragment>
      <Container>
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
                      console.log(data, "sortByValuessortByValuessortByValues");
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
      </Container>
    </Fragment>
  );
};

export default SearchHeader;
