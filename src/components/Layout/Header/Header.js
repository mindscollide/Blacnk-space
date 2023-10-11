import { Navbar, Nav } from "react-bootstrap";
import "./Header.css";
import BlancLogo from "./../../../assets/Images/logo-header.png";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { longitudeData } from "../../../store/Actions/Actions";
import { latitudeData } from "../../../store/Actions/Actions";
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
    setShowExploreIcon(location.pathname === "/ExploreCategory");
  }, [location.pathname]);

  // To locate on Favorite Page
  useEffect(() => {
    setIsFavorite(location.pathname === "/Favourite");
  }, [location.pathname]);

  // To loacte on main category switch
  useEffect(() => {
    setIsSwitchCategory(location.pathname === "/Categories");
  }, [location.pathname]);

  // To loacte on Sub category switch
  useEffect(() => {
    setIsSubSwitchCategory(location.pathname === "/SubCategories");
  }, [location.pathname]);

  const navigateCategories = () => {
    navigate("/Categories");
  };

  const onClickFavourite = () => {
    navigate("/Favourite");
  };

  const onCickSearchIcon = () => {
    navigate("/SearchPage");
  };

  // Function to handle changes in the "longitude" input field

  function myFunction() {
    const latitudeInput = document.getElementById("latitude");
    const longitudeInput = document.getElementById("longitude");

    // Check if the element exists
    if (latitudeInput && latitude !== latitudeInput.value) {
      // Access the value of the input element
      const latitudeValue = latitudeInput.value;
      setLatitude(latitudeValue);
      dispatch(latitudeData(latitudeValue));

      // Now, you can use latitudeValue as the value of the input
      // console.log("Latitude Value:", latitudeValue);
    } else {
      // console.log("Element with ID 'latitude' not found.");
    }
    if (longitudeInput && longitudeInput.value !== longitude) {
      // Access the value of the input element
      const longitudeValue = longitudeInput.value;
      setLongitude(longitudeValue);
      dispatch(longitudeData(longitudeValue));

      // Now, you can use latitudeValue as the value of the input
      // console.log("longitude Value:", longitudeValue);
    } else {
      // console.log("Element with ID 'longitude' not found.");
    }
  }
  const intervalId = setInterval(myFunction, 30000);
  return (
    <>
      <input
        id="latitude"
        // style={{ display: "none" }}
        // value={latitude}
      />
      <input
        id="longitude"
        // style={{ display: "none" }}

        // value={longitude}
      />
      <Navbar>
        <Navbar.Brand to="Home">
          {showExploreIcon && (
            <>
              <i
                className="icon-home home-icon-color"
                onClick={() => navigate("/")}
              ></i>
            </>
          )}

          {isFavorite && (
            <>
              <i
                className="icon-home home-icon-color"
                onClick={() => navigate("/")}
              ></i>
            </>
          )}

          {isSwitchCategory && (
            <>
              <i
                className="icon-home home-icon-color"
                onClick={() => navigate("/")}
              ></i>
            </>
          )}

          {isSubSwitchCategory && (
            <>
              <i
                className="icon-home home-icon-color"
                onClick={() => navigate("/")}
              ></i>
            </>
          )}

          <img
            src={BlancLogo}
            className="Blancspace-Logo"
            alt="Blancspace-Logo"
          />
        </Navbar.Brand>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="nav-rfq-calculator ms-auto">
            <Nav.Link>
              <span className="navlink_text" onClick={onClickFavourite}>
                FAVOURITES
              </span>
            </Nav.Link>
            <Nav.Link>
              <span className="navlink_text" onClick={navigateCategories}>
                CATEGORIES
              </span>
            </Nav.Link>
            <i
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
