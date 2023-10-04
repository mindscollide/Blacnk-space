import { Navbar, Nav } from "react-bootstrap";
import "./SubCategoryHeader.css";
import { useNavigate } from "react-router-dom";

const SubCategoryHeader = () => {
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
            className="icon-home Sub-CategoryHeader-home-icon-color"
            onClick={onClickHome}
          ></i>
        </Navbar.Brand>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="Sub-Category-Header-nav ms-auto">
            <Nav.Link>
              <span
                className="Sub-Category_navlink_text"
                onClick={onClickFavourite}
              >
                FAVOURITES
              </span>
            </Nav.Link>
            <Nav.Link>
              <span className="Sub-Category_navlink_text">SUB-CATEGORIES</span>
            </Nav.Link>
            <i
              className="icon-search Sub-Category-icon-search-color"
              onClick={onClickSearch}
            ></i>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default SubCategoryHeader;
