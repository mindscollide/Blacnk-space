import { Navbar, Nav } from "react-bootstrap";
import "./ExploreHeader.css";
import { useNavigate } from "react-router-dom";
import BlancLogo from "./../../../assets/Images/logo-header.png";

const ExploreHeader = () => {
  const navigate = useNavigate();

  const onClickHome = () => {
    navigate("/");
  };

  const navigateCategories = () => {
    navigate("/Categories");
  };

  const onClickFavourite = () => {
    navigate("/Favourite");
  };

  const onClickSearch = () => {
    navigate("/SearchPage");
  };

  return (
    <>
      <Navbar>
        <Navbar.Brand to="Home">
          <i className="icon-home home-icon-color" onClick={onClickHome}></i>
          <img
            src={BlancLogo}
            className="Explore-Blancspace-Logo"
            alt="Blancspace-Logo"
          />
        </Navbar.Brand>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="Explore-nav ms-auto">
            <Nav.Link>
              <span className="Explore_navlink_text" onClick={onClickFavourite}>
                FAVOURITES
              </span>
            </Nav.Link>
            <Nav.Link>
              <span
                className="Explore_navlink_text"
                onClick={navigateCategories}
              >
                CATEGORIES
              </span>
            </Nav.Link>
            <i
              className="icon-search Explore-icon-search-color"
              onClick={onClickSearch}
            ></i>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default ExploreHeader;
