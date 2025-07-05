import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../src/store";
import { useLocation } from "react-router-dom";
interface Props {
  children: JSX.Element;
}

const ProtectedRoute: React.FC<Props> = ({ children }) => {
  const { user, isLoading } = useSelector((s: RootState) => s.auth);
  const location = useLocation();

  if (isLoading) {
    return <div className="text-center mt-10">Ładowanie…</div>;
  }
  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  return children;
};

export default ProtectedRoute;
