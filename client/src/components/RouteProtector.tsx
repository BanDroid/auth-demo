import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useUserContext } from "../contexts/UserContext";

type RouteProtectorProps = {
  children: ReactNode;
  isAuthRequired?: boolean;
};
export default function RouteProtector({
  children,
  isAuthRequired = false,
}: RouteProtectorProps) {
  const { user } = useUserContext();
  return isAuthRequired ? (
    user ? (
      children
    ) : (
      <Navigate to="/signin" replace={true} />
    )
  ) : user ? (
    <Navigate to="/dashboard" replace={true} />
  ) : (
    children
  );
}
