import { Layout } from "antd";
import { useState, useEffect } from "react";
import { Container, Col, Row } from "react-bootstrap";

import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Header from "./../../components/Layout/Header/Header";
import UserInfo from "./../../components/Layout/User/UserInfo";
import Home from "./../../container/Home/Home";
// import "./App.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [exploreHeaderUser, setExploreHeaderUser] = useState(false);

  // To locate on Explore Category Page
  useEffect(() => {
    // Check if the current location is the ExplorePage
    setExploreHeaderUser(location.pathname === "/BlankSpace/ExploreCategory");
  }, [location.pathname]);
  return (
    <>
      <Layout>
        <div className="header">
          <Container>
            <Header />
            <UserInfo />
          </Container>
        </div>
        <div className="home_Container">
          <Outlet />
        </div>
      </Layout>

      {/* <Row>
        <Col>
          <div className="header">
            <Container>
              <Header />
              <UserInfo />
            </Container>
          </div>
          <Row>
            <Col className="home_Container">
              <Home />
            </Col>
          </Row>
        </Col>
      </Row> */}
    </>
  );
};

export default Dashboard;
