import { Navbar, Nav } from "react-bootstrap";
import "./CategoryHeader.css";
import { useNavigate } from "react-router-dom";

const CategoryHeader = () => {
  const navigate = useNavigate();

  const onClickHome = () => {
    navigate("/");
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
          <i
            className="icon-home CategoryHeader-home-icon-color"
            onClick={onClickHome}
          ></i>
        </Navbar.Brand>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="Category-Header-nav ms-auto">
            <Nav.Link>
              <span
                className="Category_navlink_text"
                onClick={onClickFavourite}
              >
                FAVOURITES
              </span>
            </Nav.Link>
            <Nav.Link>
              <span className="Category_navlink_text">CATEGORIES</span>
            </Nav.Link>
            <i
              className="icon-search Category-icon-search-color"
              onClick={onClickSearch}
            ></i>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default CategoryHeader;
