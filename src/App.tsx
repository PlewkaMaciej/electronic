import "./App.css";
import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";

import RectangleAd from "../component/Items/RectangleAd";
import Homepage from "./Homepage";
import ProfileSettingsMain from "./ProfilSettingsMain";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import ProductPage from "./ProductsPage";
function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/Product/:id" element={<ProductPage />} />
          <Route path="/" element={<Homepage />} />
          <Route path="/login-email" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
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
        <Route path="/Profile" element={<ProfileSettingsMain />} />
      </Routes>
    </>
  );
}

export default App;
