import "./App.css";
import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import CarouselWrapper from "./Example";
import RectangleAd from "../component/Items/RectangleAd";
import Homepage from "./homepage";
function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Homepage />} />
          <Route path="/carousel" element={<CarouselWrapper />} />
          <Route
            path="/rectanglead"
            element={
              <RectangleAd
                imageSrc="https://www.example.com/ad-image.jpg"
                name="Przykładowa nazwa ogłoszenia Przykładowa nazwa ogłoszenia Przykładowa1"
                dateAdded="2025-03-09"
                specification="Intel i7, 16GB RAM, 1TB SSD"
                price="3500"
              />
            }
          />{" "}
          {/* Poprawiona ścieżka */}
        </Route>
      </Routes>
    </>
  );
}

export default App;
