import { Navbar, Nav } from "react-bootstrap";
import "./Header.css";
import BlancLogo from "./../../../assets/Images/logo-header.png";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const navigateCategories = () => {
    navigate("/Categories");
  };

  const onClickFavourite = () => {
    navigate("/Favourite");
  };

  const onCickSearchIcon = () => {
    navigate("/SearchPage");
  };

  return (
    <>
      <Navbar>
        <Navbar.Brand to="Home">
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
