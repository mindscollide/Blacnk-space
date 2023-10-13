import { Navbar, Nav } from "react-bootstrap";
import "./Header.css";
import BlancLogo from "./../../../assets/Images/logo-header.png";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { longitudeData } from "../../../store/Actions/Actions";
import { latitudeData } from "../../../store/Actions/Actions";
import { getRndomeNumber } from "../../../common/Function/utils";
// import { Hidden } from "@material-ui/core";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { actionReducer } = useSelector((state) => state);
  // For Explore Page
  const [showExploreIcon, setShowExploreIcon] = useState(false);
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  // For Favorite Page
  const [isFavorite, setIsFavorite] = useState(false);

  // For MAinCategory Switch
  const [isSwitchCategory, setIsSwitchCategory] = useState(false);

  // For SubCategory Switch
  const [isSubSwitchCategory, setIsSubSwitchCategory] = useState(false);

  // To locate on Explore Category Page
  useEffect(() => {
    // Check if the current location is the ExplorePage
    setShowExploreIcon(location.pathname === "/BlankSpace/ExploreCategory");
  }, [location.pathname]);

  // To locate on Favorite Page
  useEffect(() => {
    setIsFavorite(location.pathname === "/BlankSpace/Favourite");
  }, [location.pathname]);

  // To loacte on main category switch
  useEffect(() => {
    setIsSwitchCategory(location.pathname === "/BlankSpace/Categories");
  }, [location.pathname]);
  // To loacte on Sub category switch

  const navigateCategories = () => {
    navigate("/BlankSpace/Categories");
  };

  const onClickFavourite = () => {
    navigate("/BlankSpace/Favourite");
  };

  const onCickSearchIcon = () => {
    navigate("/BlankSpace/SearchPage");
  };

  // Function to handle changes in the "longitude" input field
  // useEffect(() => {
  //   myFunction();
  // }, []);
  // function myFunction() {
  //   setLatitude("24.503");
  //   dispatch(latitudeData("24.503"));
  //   setLongitude("54.388");
  //   dispatch(longitudeData("54.388"));
  //   localStorage.setItem("latitudeValue", "24.503");

  //   localStorage.setItem("longitudeValue", "54.388");
  // }

  function myFunction() {
    const latitudeInput = document.getElementById("latitude");
    const longitudeInput = document.getElementById("longitude");
    // Check if the element exists
    if (latitudeInput && latitude !== latitudeInput.value) {
      // Access the value of the input element
      const latitudeValue = latitudeInput.value;
      setLatitude(latitudeValue);
      localStorage.setItem("latitudeValue", latitudeValue);
      dispatch(latitudeData(latitudeValue));
    } else {
      // console.log("Element with ID 'latitude' not found.");
    }
    if (longitudeInput && longitudeInput.value !== longitude) {
      // Access the value of the input element
      localStorage.setItem("longitudeValue", longitudeValue);

      const longitudeValue = longitudeInput.value;
      setLongitude(longitudeValue);
      dispatch(longitudeData(longitudeValue));
    } else {
      // console.log("Element with ID 'longitude' not found.");
    }
  }
  const intervalId = setInterval(myFunction, 30000);
  return (
    <>
      <input
        key={getRndomeNumber()}
        id="latitude"
        style={{ display: "none" }}
        // value={latitude}
      />
      <input
        key={getRndomeNumber()}
        id="longitude"
        style={{ display: "none" }}
        //
        // value={longitude}
      />
      <Navbar>
        <Navbar.Brand to="Home">
          {showExploreIcon && (
            <>
              <i
                className="icon-home home-icon-color"
                onClick={() => navigate("/BlankSpace/")}
              ></i>
            </>
          )}

          {isFavorite && (
            <>
              <i
                key={getRndomeNumber()}
                className="icon-home home-icon-color"
                onClick={() => navigate("/BlankSpace/")}
              ></i>
            </>
          )}

          {isSwitchCategory && (
            <>
              <i
                key={getRndomeNumber()}
                className="icon-home home-icon-color"
                onClick={() => navigate("/BlankSpace/")}
              ></i>
            </>
          )}

          {isSubSwitchCategory && (
            <>
              <i
                key={getRndomeNumber()}
                className="icon-home home-icon-color"
                onClick={() => navigate("/BlankSpace/")}
              ></i>
            </>
          )}

          <img
            key={getRndomeNumber()}
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
};

export default Header;
