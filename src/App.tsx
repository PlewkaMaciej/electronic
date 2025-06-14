import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./Layout";
import OfferSearch from "./OffersSearch";
import RectangleAd from "../component/Items/RectangleAd";
import Homepage from "./Homepage";
import ProfileSettingsMain from "./ProfilSettingsMain";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import ProductPage from "./ProductsPage";
import MyAds from "./UserPanel/MyAds";
import MyOrders from "./UserPanel/MyOrders";
import Chat from "./UserPanel/Chat";
import Favorites from "./UserPanel/Favorites";
import AddnewAnn from "./AddnewAnn";
import UpdateAccount from "./UserPanel/UpdateAccount";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrentUser } from "./store/slices/authSlice";
import type { AppDispatch, RootState } from "./store";

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const { user, isLoading } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      dispatch(fetchCurrentUser());
    }
  }, [dispatch]);

  if (isLoading) {
    return <div className="text-center mt-10">Ładowanie…</div>;
  }

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Homepage />} />
        <Route
          path="/login-email"
          element={user ? <Navigate to="/" /> : <LoginPage />}
        />
        <Route
          path="/register"
          element={user ? <Navigate to="/" /> : <RegisterPage />}
        />
        <Route path="/offer-search" element={<OfferSearch />} />
        <Route path="/Product/:id" element={<ProductPage />} />
        <Route path="/updateAccount" element={<UpdateAccount />} />
        <Route
          path="/rectanglead"
          element={
            <RectangleAd
              imageSrc="https://www.example.com/ad-image.jpg"
              name="Przykładowa nazwa ogłoszenia"
              dateAdded="2025-03-09"
              specification="Intel i7, 16GB RAM, 1TB SSD"
              price="3500"
            />
          }
        />
        <Route
          path="/Profile"
          element={user ? <ProfileSettingsMain /> : <Navigate to="/login-email" />}
        />
        <Route
          path="/my-ads"
          element={user ? <MyAds /> : <Navigate to="/login-email" />}
        />
        <Route
          path="/my-orders"
          element={user ? <MyOrders /> : <Navigate to="/login-email" />}
        />
        <Route
          path="/chat"
          element={user ? <Chat /> : <Navigate to="/login-email" />}
        />
        <Route
          path="/favorites"
          element={user ? <Favorites /> : <Navigate to="/login-email" />}
        />
        <Route
          path="/addNewAnn"
          element={user ? <AddnewAnn /> : <Navigate to="/login-email" />}
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

export default App;
