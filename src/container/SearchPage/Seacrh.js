import { Fragment, useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Loader } from "./../../components/Elements";
import { Header, UserInfo, SearchHeader } from "../../components/Layout";
import "./Search.css";

const SearchPage = () => {
  const [data, setData] = useState([1, 2, 3, 4, 5, 6, 7, 8]);
  const [isHome, setIsHome] = useState(false);

  // state for Loader
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    setShowLoader(true);

    setTimeout(() => {
      setShowLoader(false);
    }, 3000);
  }, []);
  return (
    <Fragment>
      <Row>
        <Col>
          {isHome ? (
            <>
              <Header />
              <UserInfo />
            </>
          ) : (
            <>
              <div className="Search-header">
                <Container>
                  <SearchHeader />
                </Container>
              </div>
            </>
          )}
        </Col>
      </Row>

      <Row className="Search-header-marginTop">
        <Col></Col>
      </Row>

      <Container>
        {data.map((newData, index) => {
          return (
            <Row>
              <Col
                lg={2}
                md={2}
                sm={2}
                xs={2}
                className="d-flex justify-content-start"
              >
                <div className="Search-slide-box"></div>
              </Col>
              <Col
                lg={7}
                md={7}
                sm={7}
                xs={7}
                className="d-flex justify-content-start"
              >
                <div className="Container">
                  <div className="User-name-highlighted">
                    Kashan{" "}
                    <span className="user-name-nonhighlight">Sea Food</span>
                  </div>

                  <div>
                    <i className="icon-star-fill icon-color-star pe-auto"></i>
                    <i className="icon-star-fill icon-color-star pe-auto"></i>
                    <i className="icon-star-fill icon-color-star pe-auto"></i>
                    <i className="icon-star icon-color-star pe-auto"></i>
                    <i className="icon-star icon-color-star pe-auto">
                      (20 Reviews)
                    </i>
                  </div>
                  <span className="span-Kilometer">5.1 KM</span>
                </div>
              </Col>

              <Col
                lg={3}
                md={3}
                sm={3}
                xs={3}
                className="d-flex justify-content-end"
              >
                <div className="Container">
                  <div className="other-text-size">Food</div>
                  <div className="other-text-size">FAST FOOD</div>
                  <div className="other-text-size">LOCATION</div>
                </div>
              </Col>
            </Row>
          );
        })}
      </Container>

      {showLoader && (
        <div className="loader-overlay">
          <Loader />
        </div>
      )}
    </Fragment>
  );
};

export default SearchPage;
