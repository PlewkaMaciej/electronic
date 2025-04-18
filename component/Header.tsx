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
    <header className="bg-[#E5E5E5] p-4 shadow-lg">
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
        <h1 className="text-3xl font-extrabold text-[#4A4A4A] tracking-tight">
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
          <button className="bg-[#4C6B8C] text-white px-6 py-2 rounded-lg shadow hover:bg-[#3c5572] transition hover:shadow-lg cursor-pointer">
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
          <h1 className="text-xl font-bold text-[#4A4A4A]">Nazwa Aplikacji</h1>

          <button className="bg-[#4C6B8C] text-white px-5 py-2 rounded-lg shadow hover:bg-[#3c5572] transition w-full cursor-pointer">
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

      {/* Modal */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm"
          onClick={handleCloseModal}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={`${
              isClosing ? "funky-exit" : "funky-enter"
            } bg-white rounded-2xl shadow-2xl p-8 w-[90%] max-w-md text-center space-y-6 relative border border-gray-300`}
          >
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-black"
            >
              <X className="w-6 h-6" />
            </button>
            <h2 className="text-2xl font-bold text-[#4A4A4A]">
              Zaloguj się by przenieść się do świata technologii
            </h2>
            <div className="flex flex-col space-y-4">
              <a
                href="/login-google"
                className="bg-white border border-gray-300 shadow px-6 py-3 rounded-lg flex items-center justify-center space-x-3 hover:shadow-md transition"
              >
                <img
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  alt="Google"
                  className="w-5 h-5"
                />
                <span>Zaloguj się przez Google</span>
              </a>
              <a
                href="/login-facebook"
                className="bg-white border border-gray-300 shadow px-6 py-3 rounded-lg flex items-center justify-center space-x-3 hover:shadow-md transition text-[#1877F2]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path d="M22.675 0H1.325C.593 0 0 .593 0 1.326v21.348C0 23.407.593 24 1.325 24h11.495v-9.294H9.691v-3.622h3.129V8.413c0-3.1 1.894-4.788 4.659-4.788 1.325 0 2.464.099 2.797.143v3.24l-1.918.001c-1.504 0-1.794.715-1.794 1.763v2.311h3.587l-.467 3.622h-3.12V24h6.116C23.407 24 24 23.407 24 22.674V1.326C24 .593 23.407 0 22.675 0z" />
                </svg>
                <span>Zaloguj się przez Facebook</span>
              </a>
              <a
                href="/login-email"
                className="text-[#4C6B8C] font-medium hover:underline"
              >
                Zaloguj się przez email
              </a>
            </div>
            <p className="text-sm">
              Nie masz konta?{" "}
              <a
                href="/register"
                className="text-[#4C6B8C] font-semibold hover:underline"
              >
                Zarejestruj się
              </a>
            </p>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
