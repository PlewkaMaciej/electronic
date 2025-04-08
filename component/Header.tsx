import React, { useState } from "react";
import { Search, Menu, X } from "lucide-react";

function Header() {
  const categories = [
    "Komputery",
    "Laptopy",
    "Telefony",
    "Podzespoły i części",
    "Fotografia",
    "Smartwatche",
    "RTV",
    "AGD",
    "Audio",
    "Video",
  ];

  const [isOpen, setIsOpen] = useState(false);
  const [shouldRenderMenu, setShouldRenderMenu] = useState(false);
  const [active, setActive] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const toggleMobileMenu = () => {
    if (isOpen) {
      setIsOpen(false);
      setTimeout(() => setShouldRenderMenu(false), 300);
    } else {
      setShouldRenderMenu(true);
      setTimeout(() => setIsOpen(true), 10);
    }
  };

  const handleCloseModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      setShowModal(false);
      setIsClosing(false);
    }, 400);
  };

  return (
    <header className="bg-[#F0F1EC] p-4 shadow-lg">
      {/* Mobile Header */}
      <div className="flex items-center justify-between max-w-7xl mx-auto space-x-4 lg:hidden">
        <div className="flex flex-grow items-center bg-white rounded-xl shadow p-2 border border-gray-300 transition-all duration-300 hover:shadow-md">
          <input
            type="text"
            placeholder="Czego dziś szukasz?"
            className="flex-grow px-3 py-2 outline-none bg-transparent text-base placeholder-gray-500"
          />
          <button className="ml-2 p-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition duration-200 cursor-pointer">
            <Search className="text-gray-500 w-5 h-5" />
          </button>
        </div>

        <button
          className="p-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition cursor-pointer"
          onClick={toggleMobileMenu}
        >
          {isOpen ? (
            <X className="w-6 h-6 text-gray-700" />
          ) : (
            <Menu className="w-6 h-6 text-gray-700" />
          )}
        </button>
      </div>

      {/* Desktop Header */}
      <div className="hidden lg:flex items-center justify-between max-w-7xl mx-auto py-4 space-x-8">
        <h1 className="text-3xl font-extrabold text-[#2F4F4F] tracking-tight">
          Nazwa Aplikacji
        </h1>

        <div className="flex flex-grow items-center bg-white rounded-xl shadow p-2 max-w-lg border border-gray-300 transition-all duration-300 hover:shadow-md">
          <input
            type="text"
            placeholder="Czego dziś szukasz?"
            className="flex-grow px-3 py-2 outline-none bg-transparent text-base placeholder-gray-500"
          />
          <button className="ml-2 p-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition duration-200 cursor-pointer">
            <Search className="text-gray-500 w-5 h-5" />
          </button>
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => setShowModal(true)}
            className="bg-gray-300 text-gray-800 px-6 py-2 rounded-lg shadow hover:bg-gray-400 transition cursor-pointer"
          >
            Zaloguj się / Zarejestruj się
          </button>
          <button className="bg-[#339FB8] text-white px-6 py-2 rounded-lg shadow hover:bg-[#2b8fa6] transition hover:shadow-lg cursor-pointer">
            Sprzedaj
          </button>
        </div>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden lg:flex justify-center max-w-7xl mx-auto text-gray-700 font-medium text-base gap-3 mt-4 flex-wrap">
        {categories.map((text, index) => (
          <a
            key={index}
            href="#"
            onClick={() => setActive(text)}
            className={`px-3 py-1.5 rounded transition hover:text-black hover:scale-105 hover:shadow-sm cursor-pointer ${
              active === text ? "text-black font-bold" : ""
            }`}
          >
            {text}
          </a>
        ))}
      </nav>

      {/* Mobile Menu */}
      {shouldRenderMenu && (
        <div
          className={`${
            isOpen ? "menu-open" : "menu-close"
          } lg:hidden flex flex-col items-center mt-4 bg-white shadow-lg rounded-xl p-4 space-y-3`}
        >
          <h1 className="text-xl font-bold text-[#2F4F4F]">Nazwa Aplikacji</h1>

          <button className="bg-[#339FB8] text-white px-5 py-2 rounded-lg shadow hover:bg-[#2b8fa6] transition w-full cursor-pointer">
            Sprzedaj
          </button>

          <button
            onClick={() => setShowModal(true)}
            className="bg-gray-300 text-gray-800 px-5 py-2 rounded-lg shadow hover:bg-gray-400 transition w-full cursor-pointer"
          >
            Zaloguj się / Zarejestruj się
          </button>

          <div className="border-t border-gray-300 w-full my-2" />

          <nav className="flex flex-wrap justify-center items-center gap-3 text-gray-700 font-medium text-sm">
            {categories.map((text, index) => (
              <a
                key={index}
                href="#"
                onClick={() => {
                  setActive(text);
                  toggleMobileMenu();
                }}
                className={`px-3 py-1 rounded transition hover:text-black hover:scale-105 hover:shadow-sm cursor-pointer ${
                  active === text ? "text-black font-bold" : ""
                }`}
              >
                {text}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

export default Header;
