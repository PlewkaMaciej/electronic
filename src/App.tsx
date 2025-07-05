import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "./store";
import { fetchCurrentUser } from "./store/slices/authSlice";

import Layout from "./Layout";
import Homepage from "./Homepage";
import OfferSearch from "./OffersSearch";
import ProductPage from "./ProductsPage";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import ProfileSettingsMain from "./ProfilSettingsMain";
import MyAds from "./UserPanel/MyAds";
import MyOrders from "./UserPanel/MyOrders";
import Chat from "./UserPanel/Chat";
import Favorites from "./UserPanel/Favorites";
import AddNewAnn from "./AddnewAnn";
import UpdateAccount from "./UserPanel/UpdateAccount";

import ProtectedRoute from "../component/protectRouter";
import PublicRoute from "../component/PublicRoute";

export default function App() {
  const dispatch = useDispatch<AppDispatch>();
  const { user, isLoading } = useSelector((s: RootState) => s.auth);
  const [initializing, setInitializing] = useState(true);

  const token = localStorage.getItem("accessToken");
  useEffect(() => {
    if (token) {
      dispatch(fetchCurrentUser())
        .unwrap()
        .catch(() => {})
        .finally(() => setInitializing(false));
    } else {
      setInitializing(false);
    }
  }, [dispatch, token]);

  if (initializing || isLoading) {
    return <div className="text-center mt-10">Ładowanie…</div>;
  }

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Homepage />} />
        <Route path="offer-search" element={<OfferSearch />} />
        <Route path="product/:id" element={<ProductPage />} />

        <Route
          path="login"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />
        <Route
          path="register"
          element={
            <PublicRoute>
              <RegisterPage />
            </PublicRoute>
          }
        />
        <Route path="update-account" element={<UpdateAccount />} />

        <Route
          path="profile"
          element={
            <ProtectedRoute>
              <ProfileSettingsMain />
            </ProtectedRoute>
          }
        />
        <Route
          path="my-ads"
          element={
            <ProtectedRoute>
              <MyAds />
            </ProtectedRoute>
          }
        />
        <Route
          path="my-orders"
          element={
            <ProtectedRoute>
              <MyOrders />
            </ProtectedRoute>
          }
        />
        <Route
          path="chat"
          element={
            <ProtectedRoute>
              <Chat />
            </ProtectedRoute>
          }
        />
        <Route
          path="favorites"
          element={
            <ProtectedRoute>
              <Favorites />
            </ProtectedRoute>
          }
        />
        <Route
          path="addNewAnn"
          element={
            <ProtectedRoute>
              <AddNewAnn />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
