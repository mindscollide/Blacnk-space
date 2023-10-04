import { Container, Col, Row } from "react-bootstrap";
import Header from "./../../components/Layout/Header/Header";
import UserInfo from "./../../components/Layout/User/UserInfo";
import Home from "./../../container/Home/Home";
// import "./App.css";

const Dashboard = () => {
  return (
    <>
      <Row>
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
      </Row>
    </>
  );
};

export default Dashboard;
