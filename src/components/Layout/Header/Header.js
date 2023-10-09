import { Navbar, Nav } from "react-bootstrap";
import "./Header.css";
import BlancLogo from "./../../../assets/Images/logo-header.png";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { longitudeData } from "../../../store/Actions/Actions";
import { latitudeData } from "../../../store/Actions/Actions";
// import { Hidden } from "@material-ui/core";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { actionReducer } = useSelector((state) => state);
  console.log(actionReducer, "locaatioonnnnn");

  const [lat, setLat] = useState([]);
  const [long, setLong] = useState([]);
  console.log({ lat, long }, "latlatlat");
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setLat(position.coords.latitude);
      setLong(position.coords.longitude);
    });

    console.log("Latitude is location:", lat);
    console.log("Longitude is: location", long);
  }, [lat, long]);
  // For Explore Page
  const [showExploreIcon, setShowExploreIcon] = useState(false);

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
  const inputElementLatitude = document.getElementById("latitude");

  try {
    inputElementLatitude.addEventListener("input", function () {
      const updatedValueLatitude = inputElementLatitude.value;

      // Call dispatch(api(value)) with the updated value

      if (updatedValueLatitude !== null) {
        dispatch(latitudeData(updatedValueLatitude));
      }
    });
  } catch {}
  const inputElementLongitude = document.getElementById("longitude");
  try {
    inputElementLongitude.addEventListener("input", function () {
      const updatedLongitude = inputElementLongitude.value;

      // Call dispatch(api(value)) with the updated value
      if (updatedLongitude !== null) {
        dispatch(longitudeData(updatedLongitude));
      }
    });
  } catch {}

  return (
    <>
      <input
        // style={{ display: "none" }}
        id="latitude"
        onChange={(e) => dispatch(latitudeData(e))}
        // this is our reducer state reducer name location
        value={actionReducer.locationLatitude}
      ></input>
      <input
        // style={{ display: "none" }}
        id="longitude"
        onChange={(e) => dispatch(longitudeData(e))}
        // this is our reducer state reducer name location
        value={actionReducer.locationLongitude}
      ></input>
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
