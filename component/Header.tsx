// src/components/Header/Header.tsx
import React, { useState, useRef, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import MobileSearch from "./Header/MobileSearch";
import AccountMenu, { MenuItem } from "./Header/AccountMenu";
import Navigation from "./Header/Navigation";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../src/store";
import { logout } from "../src/store/slices/authSlice";

const menuItems: MenuItem[] = [
  { label: "Panel sterowania", href: "/dashboard", bold: true },
  { label: "Moje ogłoszenia", href: "/my-ads" },
  { label: "Moje zamówienia", href: "/my-orders" },
  { label: "Czat", href: "/chat" },
  { label: "Obserwowane", href: "/favorites" },
  { label: "Portfel", href: "/wallet" },
  { label: "Pomoc", href: "/help" },
  { label: "Ustawienia", href: "/settings", bold: true },
  { label: "Profil", href: "/profile" },
  { label: "Konto i bezpieczeństwo", href: "/account-security" },
  { label: "Wysyłka", href: "/shipping" },
  { label: "Prywatność", href: "/privacy" },
  { label: "Sprzedawanie", href: "/addNewAnn" },
];

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

const Header: React.FC = () => {
  const [isLogged, setIsLogged] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("");
  const [accountOpen, setAccountOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const accountWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsLogged(!!user);
    if (!accountOpen) return;

    function handleClickOutside(event: MouseEvent) {
      if (
        accountWrapperRef.current &&
        !accountWrapperRef.current.contains(event.target as Node)
      ) {
        setAccountOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [accountOpen, user]);

  const handleLogout = () => {
    setAccountOpen(true);
    setIsLogged(false);
    dispatch(logout());
  };

  const toggleMobile = () => setMobileOpen((prev) => !prev);
  const toggleAccount = () => setAccountOpen((prev) => !prev);

  const handleCategory = (cat: string) => {
    setActiveCategory(cat);
    navigate(`/offer-search?category=${encodeURIComponent(cat)}`);
    if (mobileOpen) toggleMobile();
  };

  return (
    <header className="bg-[#E5E5E5] p-4 shadow-lg">
      {/* Mobile Header */}
      <div className="flex items-center justify-between mx-auto max-w-7xl lg:hidden">
        <MobileSearch />
        <button
          onClick={toggleMobile}
          className="p-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
        >
          {mobileOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Desktop Header */}
      <div className="hidden lg:flex items-center justify-between gap-8 mx-auto max-w-7xl py-4">
        <h1 className="text-3xl font-extrabold text-[#4A4A4A]">
          Nazwa Aplikacji
        </h1>
        <MobileSearch />

        <div className="flex items-center gap-4 ml-auto">
          <div className="relative" ref={accountWrapperRef}>
            {isLogged ? (
              <button
                onClick={toggleAccount}
                className="px-6 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition"
              >
                Twoje konto
              </button>
            ) : (
              <Link
                to="/login"
                className="px-6 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition"
              >
                Zaloguj się / Zarejestruj się
              </Link>
            )}

            <AccountMenu
              items={menuItems}
              visible={accountOpen}
              toggleVisible={toggleAccount}
              onLogout={handleLogout}
            />
          </div>

          {isLogged && (
            <button
              onClick={() => navigate("/addNewAnn")}
              className="px-6 py-2 bg-[#339FB8] text-white rounded-lg hover:bg-[#2a8ba0] transition"
            >
              Sprzedaj
            </button>
          )}
        </div>
      </div>

      {/* Navigation */}
      <div className="hidden lg:block mt-4">
        <Navigation
          categories={categories}
          active={activeCategory}
          onSelect={handleCategory}
          className="flex justify-center gap-4 text-gray-700 font-medium"
        />
      </div>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div className="lg:hidden mt-4 bg-white shadow-lg rounded-xl p-4 space-y-3 mx-auto max-w-7xl">
          <button
            onClick={() => isLogged && navigate("/addNewAnn")}
            className={`w-full py-2 rounded-lg text-white ${
              isLogged ? "bg-[#339FB8]" : "bg-gray-400 cursor-not-allowed"
            }`}
            disabled={!isLogged}
          >
            Sprzedaj
          </button>

          <div className="relative" ref={accountWrapperRef}>
            {isLogged ? (
              <button
                onClick={toggleAccount}
                className="w-full px-6 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition"
              >
                Twoje konto
              </button>
            ) : (
              <Link
                to="/login"
                className="w-full block text-center px-6 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition"
              >
                Zaloguj się / Zarejestruj się
              </Link>
            )}

            <AccountMenu
              items={menuItems}
              visible={accountOpen}
              toggleVisible={toggleAccount}
              onLogout={handleLogout}
            />
          </div>

          <Navigation
            categories={categories}
            active={activeCategory}
            onSelect={handleCategory}
            className="flex flex-wrap justify-center gap-3 text-sm text-gray-700"
          />
        </div>
      )}
    </header>
  );
};

export default Header;
