import { Routes, Route, Navigate } from "react-router-dom";
import RouteProtector from "../components/RouteProtector";
import DashboardPage from "./dashboard";
import SigninPage from "./signin";
import SignupPage from "./signup";
import NotFound from "./404";

export default function RoutesHandler() {
  return (
    <Routes>
      <Route path="/" element={<Navigate replace={true} to="/dashboard" />} />
      <Route
        path="/dashboard/*"
        element={
          <RouteProtector isAuthRequired={true}>
            <DashboardPage />
          </RouteProtector>
        }
      />
      <Route
        path="/signin"
        element={
          <RouteProtector isAuthRequired={false}>
            <SigninPage />
          </RouteProtector>
        }
      />
      <Route
        path="/signup"
        element={
          <RouteProtector isAuthRequired={false}>
            <SignupPage />
          </RouteProtector>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
