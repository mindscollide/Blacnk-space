import React, { useState, useEffect } from "react";
import { Navbar, Nav } from "react-bootstrap";
import "./Header.css";
import BlancLogo from "./../../../assets/Images/logo-header.png";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { longitudeData, latitudeData } from "../../../store/Actions/Actions";
import { getRndomeNumber } from "../../../common/Function/utils";

const Header = React.memo(() => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // State for displaying icons based on route
  const [showExploreIcon, setShowExploreIcon] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isSwitchCategory, setIsSwitchCategory] = useState(false);
  const [isSubSwitchCategory, setIsSubSwitchCategory] = useState(false);

  // State for latitude and longitude
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  useEffect(() => {
    // Check the current location to determine which icons to show
    setShowExploreIcon(location.pathname === "/BlankSpace/ExploreCategory");
    setIsFavorite(location.pathname === "/BlankSpace/Favourite");
    setIsSwitchCategory(location.pathname === "/BlankSpace/Categories");
  }, [location.pathname]);

  // Function to update latitude and longitude
  const myFunction = () => {
    const latitudeValue = getRandomNumberBetweenRangesLatitude();
    const longitudeValue = getRandomNumberBetweenRangesLongitude();

    localStorage.setItem("latitudeValue", latitudeValue);
    localStorage.setItem("longitudeValue", longitudeValue);

    setLatitude(latitudeValue);
    setLongitude(longitudeValue);

    dispatch(latitudeData(latitudeValue));
    dispatch(longitudeData(longitudeValue));
  };

  // const myFunction = () => {
  //   const latitudeInput = document.getElementById("latitude");
  //   const longitudeInput = document.getElementById("longitude");
  //   // Check if the element exists
  //   if (latitudeInput && latitude !== latitudeInput.value) {
  //     // Access the value of the input element
  //     const latitudeValue = latitudeInput.value;
  //     setLatitude(latitudeValue);
  //     localStorage.setItem("latitudeValue", latitudeValue);
  //     dispatch(latitudeData(latitudeValue));
  //   } else {
  //     // console.log("Element with ID 'latitude' not found.");
  //   }
  //   if (longitudeInput && longitudeInput.value !== longitude) {
  //     // Access the value of the input element
  //     const longitudeValue = longitudeInput.value;
  //     localStorage.setItem("longitudeValue", longitudeValue);
  //     setLongitude(longitudeValue);
  //     dispatch(longitudeData(longitudeValue));
  //   } else {
  //     // console.log("Element with ID 'longitude' not found.");
  //   }
  // };

  useEffect(() => {
    // Update location data initially and then every 10 seconds
    myFunction();
    const intervalId = setInterval(myFunction, 10000);

    return () => {
      clearInterval(intervalId); // Cleanup the interval
    };
  }, []);

  const navigateCategories = () => {
    navigate("/BlankSpace/Categories");
  };

  const onClickFavourite = () => {
    navigate("/BlankSpace/Favourite");
  };

  const onCickSearchIcon = () => {
    navigate("/BlankSpace/SearchPage");
  };

  return (
    <>
      <input
        key={getRndomeNumber()}
        id="latitude"
        style={{ display: "none" }}
      />
      <input
        key={getRndomeNumber()}
        id="longitude"
        style={{ display: "none" }}
      />
      <Navbar>
        <Navbar.Brand to="Home">
          {(showExploreIcon ||
            isFavorite ||
            isSwitchCategory ||
            isSubSwitchCategory) && (
            <i
              className="icon-home home-icon-color"
              onClick={() => navigate("/BlankSpace/")}
            ></i>
          )}
          <img
            key="header-logo"
            src={BlancLogo}
            className="Blancspace-Logo"
            alt="Blancspace-Logo"
          />
        </Navbar.Brand>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="nav-rfq-calculator ms-auto">
            <Nav.Link>
              <span
                className="navlink_text"
                key={getRndomeNumber()}
                onClick={onClickFavourite}
              >
                FAVOURITES
              </span>
            </Nav.Link>
            <Nav.Link>
              <span
                className="navlink_text"
                key={getRndomeNumber()}
                onClick={navigateCategories}
              >
                CATEGORIES
              </span>
            </Nav.Link>
            <i
              key={getRndomeNumber()}
              className="icon-search icon-search-color"
              onClick={onCickSearchIcon}
            ></i>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
});

export default Header;

// Helper function to generate random latitude and longitude values
function getRandomNumberBetweenRangesLatitude() {
  const rangeNumber = Math.random();
  if (rangeNumber < 0.3333) {
    return "24.502";
  } else if (rangeNumber < 0.6666) {
    return "24.501";
  } else {
    return "24.503";
  }
}

function getRandomNumberBetweenRangesLongitude() {
  const rangeNumber = Math.random();
  if (rangeNumber < 0.3333) {
    return "54.388";
  } else if (rangeNumber < 0.6666) {
    return "54.389";
  } else {
    return "54.387";
  }
}
