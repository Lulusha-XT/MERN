import React from "react";
import { useAppSelector } from "../../store/store";
import { Outlet } from "react-router-dom";
import LoginPage from "../../features/account/loginPage/LoginPage";

const AuthGuard = () => {
  const { isLoggedIn } = useAppSelector((state) => state.account);
  return isLoggedIn ? <Outlet /> : <LoginPage />;
};

export default AuthGuard;
