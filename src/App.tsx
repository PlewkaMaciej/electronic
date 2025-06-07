import "./App.css";
import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import OfferSearch from "./OffersSearch";
import RectangleAd from "../component/Items/RectangleAd";
import Homepage from "./Homepage";
import ProfileSettingsMain from "./ProfilSettingsMain";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import ProductPage from "./ProductsPage";
import MyAds from "./UserPanel/MyAds"
import MyOrders from "./UserPanel/MyOrders";
import Chat from "./UserPanel/Chat";
import Favorites from "./UserPanel/Favorites";
import AddnewAnn from "./AddnewAnn";
import UpdateAccount from "./UserPanel/UpdateAccount";
function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
        
        <Route path="/Profile" element={<ProfileSettingsMain />} />
          <Route path="/Product/:id" element={<ProductPage />} />
          <Route path="/offer-search" element={<OfferSearch />} />
          <Route path="/" element={<Homepage />} />
          <Route path="/login-email" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/my-ads" element={<MyAds />} />
          <Route path="/my-orders" element={<MyOrders />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/addNewAnn" element={<AddnewAnn />} />
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
        </Route>
      
      </Routes>
    </>
  );
}

export default App;
