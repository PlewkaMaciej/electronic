import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../src/store";

interface Props {
  children: JSX.Element;
}

const PublicRoute: React.FC<Props> = ({ children }) => {
  const { user, isLoading } = useSelector((s: RootState) => s.auth);

  if (isLoading) {
    return <div className="text-center mt-10">Ładowanie…</div>;
  }

  if (user) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default PublicRoute;
