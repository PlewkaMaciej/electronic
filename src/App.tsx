import "./App.css";
import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Announcement from "../component/Items/Announcement";
import CarouselWrapper from "./Example";

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
        </Route>
      </Routes>
    </>
  );
}

export default App;
