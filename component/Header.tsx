import React, { useState, useEffect, useRef } from "react";
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

  // Symulacja stanu logowania (zmień wg własnej logiki)
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Menu mobilne
  const [isOpen, setIsOpen] = useState(false);
  const [shouldRenderMenu, setShouldRenderMenu] = useState(false);
  const [active, setActive] = useState("");
  // Modal logowania
  const [showModal, setShowModal] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  // Menu Twoje Konto
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const accountMenuRef = useRef<HTMLDivElement>(null);

  // Toggle menu mobilnego
  const toggleMobileMenu = () => {
    if (isOpen) {
      setIsOpen(false);
      setTimeout(() => setShouldRenderMenu(false), 300);
    } else {
      setShouldRenderMenu(true);
      setTimeout(() => setIsOpen(true), 10);
    }
  };

  // Modal logowania
  const handleCloseModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      setShowModal(false);
      setIsClosing(false);
    }, 400);
  };

  // Toggle menu Twoje Konto
  const toggleAccountMenu = () => {
    setIsAccountMenuOpen((prev) => !prev);
  };

  // Zamknij menu Twoje Konto przy kliknięciu poza nim
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        isAccountMenuOpen &&
        accountMenuRef.current &&
        !accountMenuRef.current.contains(event.target as Node)
      ) {
        setIsAccountMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isAccountMenuOpen]);

  // Przykładowa funkcja wylogowania
  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsAccountMenuOpen(false);
    alert("Wylogowano!");
  };

  // Funkcja obsługująca kliknięcie w link menu - zamyka menu
  const handleMenuClick = () => {
    setIsAccountMenuOpen(false);
  };

  return (
    <header className="bg-[#E5E5E5] p-4 shadow-lg relative">
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

        <div className="flex gap-4 items-center relative">
          {!isLoggedIn ? (
            <>
              <button
                onClick={toggleAccountMenu}
                className="bg-gray-300 text-gray-800 px-6 py-2 rounded-lg shadow hover:bg-gray-400 transition cursor-pointer"
              >
                Twoje konto
              </button>

              {isAccountMenuOpen && (
                <div
                  ref={accountMenuRef}
                  className="absolute right-0 top-full mt-2 w-56 bg-white border border-gray-300 rounded-lg shadow-lg z-50"
                >
                  <ul className="flex flex-col divide-y divide-gray-200">
                    <li>
                      <a
                        href="/dashboard"
                        className="block px-4 py-2 font-bold hover:bg-gray-100"
                        onClick={handleMenuClick}
                      >
                        Panel sterowania
                      </a>
                    </li>
                    <li>
                      <a
                        href="/my-ads"
                        className="block px-4 py-2 hover:bg-gray-100"
                        onClick={handleMenuClick}
                      >
                        Moje ogłoszenia
                      </a>
                    </li>
                    <li>
                      <a
                        href="/my-orders"
                        className="block px-4 py-2 hover:bg-gray-100"
                        onClick={handleMenuClick}
                      >
                        Moje zamówienia
                      </a>
                    </li>
                    <li>
                      <a
                        href="/chat"
                        className="block px-4 py-2 hover:bg-gray-100"
                        onClick={handleMenuClick}
                      >
                        Czat
                      </a>
                    </li>
                    <li>
                      <a
                        href="/favorites"
                        className="block px-4 py-2 hover:bg-gray-100"
                        onClick={handleMenuClick}
                      >
                        Obserwowane
                      </a>
                    </li>
                    <li>
                      <a
                        href="/wallet"
                        className="block px-4 py-2 hover:bg-gray-100"
                        onClick={handleMenuClick}
                      >
                        Portfel
                      </a>
                    </li>
                    <li>
                      <a
                        href="/help"
                        className="block px-4 py-2 hover:bg-gray-100"
                        onClick={handleMenuClick}
                      >
                        Pomoc
                      </a>
                    </li>
                    <li>
                      <a
                        href="/settings"
                        className="block px-4 py-2 font-bold hover:bg-gray-100"
                        onClick={handleMenuClick}
                      >
                        Ustawienia
                      </a>
                    </li>
                    <li>
                      <a
                        href="/profile"
                        className="block px-4 py-2 hover:bg-gray-100"
                        onClick={handleMenuClick}
                      >
                        Profil
                      </a>
                    </li>
                    <li>
                      <a
                        href="/account-security"
                        className="block px-4 py-2 hover:bg-gray-100"
                        onClick={handleMenuClick}
                      >
                        Konto i bezpieczeństwo
                      </a>
                    </li>
                    <li>
                      <a
                        href="/shipping"
                        className="block px-4 py-2 hover:bg-gray-100"
                        onClick={handleMenuClick}
                      >
                        Wysyłka
                      </a>
                    </li>
                    <li>
                      <a
                        href="/privacy"
                        className="block px-4 py-2 hover:bg-gray-100"
                        onClick={handleMenuClick}
                      >
                        Prywatność
                      </a>
                    </li>
                    <li>
                      <a
                        href="/selling"
                        className="block px-4 py-2 hover:bg-gray-100"
                        onClick={handleMenuClick}
                      >
                        Sprzedawanie
                      </a>
                    </li>
                    <li
                      className="px-4 py-2 cursor-pointer hover:bg-red-500 hover:text-white font-semibold"
                      onClick={handleLogout}
                    >
                      Wyloguj się
                    </li>
                  </ul>
                </div>
              )}
            </>
          ) : (
            <button className="bg-[#4C6B8C] text-white px-6 py-2 rounded-lg shadow hover:bg-[#3c5572] transition hover:shadow-lg cursor-pointer">
              Sprzedaj
            </button>
          )}
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

          {isLoggedIn && (
            <button className="bg-[#4C6B8C] text-white px-5 py-2 rounded-lg shadow hover:bg-[#3c5572] transition w-full cursor-pointer">
              Sprzedaj
            </button>
          )}

          {!isLoggedIn && (
            <button
              onClick={() => setShowModal(true)}
              className="bg-gray-300 text-gray-800 px-5 py-2 rounded-lg shadow hover:bg-gray-400 transition w-full cursor-pointer"
            >
              Zaloguj się / Zarejestruj się
            </button>
          )}

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
                className="flex items-center justify-center gap-4 bg-[#4285F4] hover:bg-[#3367D6] text-white px-6 py-3 rounded-full font-semibold cursor-pointer transition"
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                  alt="Google Logo"
                  className="w-6 h-6"
                />
                Zaloguj się z Google
              </a>
              <button
                className="bg-gray-300 text-gray-800 px-6 py-3 rounded-full font-semibold hover:bg-gray-400 transition cursor-pointer"
                onClick={() => alert("Formularz logowania (placeholder)")}
              >
                Zaloguj się tradycyjnie
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
