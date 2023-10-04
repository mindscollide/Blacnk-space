import React from "react";
import { Navbar } from "react-bootstrap";
import "./SettingHeader.css";
import { useNavigate } from "react-router-dom";
import BlancLogo from "./../../../assets/Images/logo-header.png";

const SettingHeader = () => {
  const navigate = useNavigate();

  const onHomePage = () => {
    navigate("/");
  };

  return (
    <>
      <Navbar>
        <Navbar.Brand to="Home">
          <img
            src={BlancLogo}
            className="Setting-headerBlancspace-Logo"
            alt="Blancspace-Logo"
            onClick={onHomePage}
          />
        </Navbar.Brand>
      </Navbar>
    </>
  );
};

export default SettingHeader;
