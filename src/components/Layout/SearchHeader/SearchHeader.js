import { Fragment, useState, useEffect } from "react";
import { Row, Col, Container } from "react-bootstrap";
import "./SearchHeader.css";
// import { useNavigate } from "react-router-dom";
import { Input } from "antd";

const SearchHeader = () => {
  // const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  const [dropdownCategory, setDropdownCategory] = useState(false);

  const onClickDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const onClickCategory = () => {
    setDropdownCategory(!dropdownCategory);
  };

  //for close category and sort popup

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        showDropdown ||
        (dropdownCategory && !event.target.closest(".popup"))
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

  return (
    <Fragment>
      <Container>
        <Row className="mt-3">
          <Col lg={12} md={12} sm={12}>
            <Input
              size="large"
              value={"SEARCH FOR A FOOD, TOURS, EVENT, ENTERTAIN..."}
              prefix={<i className="icon-search seacrh-icon-size"></i>}
              // className="search-bar-ant"
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
              SORT BY: RATING <span className="dropdown-icon"></span>
            </span>
            {showDropdown ? (
              <>
                <div className="dropdown-main-div">
                  <div className="dropdown-list-item">
                    <p className="dropdown-menu-text">Raiting</p>
                  </div>
                  <div className="dropdown-list-item">
                    <p className="dropdown-menu-text-2">Location</p>
                  </div>
                </div>
              </>
            ) : null}
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
            {dropdownCategory ? (
              <>
                <div className="dropdown-main-div">
                  <div className="dropdown-list-item">
                    <p className="dropdown-menu-text">Food</p>
                  </div>
                  <div className="dropdown-list-item">
                    <p className="dropdown-menu-text">Entertainment</p>
                  </div>
                  <div className="dropdown-list-item">
                    <p className="dropdown-menu-text-2">Tours</p>
                  </div>
                </div>
              </>
            ) : null}
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default SearchHeader;
