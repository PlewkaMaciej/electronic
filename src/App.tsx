import "./App.css";
import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Announcement from "../component/Items/Announcement";
import CarouselWrapper from "./Example";
import RectangleAd from "../component/Items/RectangleAd"
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            path="/ann"
            element={
              <Announcement
                name="przykladowe ogloszenie"
                specification="Komputery stacjonarne, Telefony, Sprzęt audio"
                imageSrc="https://www.fotopolis.pl/i/images/9/5/5/dz01MTg0Jmg9Mzg4OA==_src_181955-PA160002.JPG"
              />
            }
          />

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
          /> {/* Poprawiona ścieżka */}
        </Route>
      </Routes>
    </>
  );
}

export default App;
