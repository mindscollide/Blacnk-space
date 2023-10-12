import React, { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
const PrivateRoutes = () => {
  let Blur = localStorage.getItem("blur");
  let currentUserID = localStorage.getItem("userID");
  let RoleID = localStorage.getItem("roleID");

  //   const [currentUser, setCurrentUser] = useState(
  //     RoleID === "3" && (Blur === undefined || Blur === null) ? true : null
  //   );
  const [currentUser, setCurrentUser] = useState("PLU_1");
  const token = JSON.parse(localStorage.getItem("token"));

  //   return currentUser && token ? <Outlet /> : <Navigate to="*" />;
  return currentUser ? <Outlet /> : <Navigate to="*" />;
};
export default PrivateRoutes;
