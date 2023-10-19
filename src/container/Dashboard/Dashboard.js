import { Layout } from "antd";
import { useState, useEffect } from "react";
import { Container, Col, Row } from "react-bootstrap";

import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Header from "./../../components/Layout/Header/Header";
import UserInfo from "./../../components/Layout/User/UserInfo";
import { ConfigProvider } from "antd";

// import "./App.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [exploreHeaderUser, setExploreHeaderUser] = useState(false);

  // For category Detail page
  const [isCategoryDetail, setIsCategoryDetail] = useState(false);
  const [isSearch, setIsSearch] = useState(false);

  // To locate category Details
  useEffect(() => {
    setIsCategoryDetail(location.pathname === "/BlankSpace/Category");
    setIsSearch(location.pathname === "/BlankSpace/SearchPage");
  }, [location.pathname]);

  // To locate on Explore Category Page
  useEffect(() => {
    // Check if the current location is the ExplorePage
    setExploreHeaderUser(location.pathname === "/BlankSpace/ExploreCategory");
  }, [location.pathname]);
  return (
    <ConfigProvider>
      <Layout>
        {!isCategoryDetail && !isSearch && (
          <>
            <Header />
            <UserInfo />
          </>
        )}
        <Outlet />
      </Layout>
    </ConfigProvider>
  );
};

export default Dashboard;
