import Header from "../component/Header";
import { Outlet } from "react-router-dom";
export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <div className="flex-grow flex flex-col">
        <div className="flex-grow ">
          {" "}
          <Outlet />
        </div>
      </div>
    </div>
  );
}