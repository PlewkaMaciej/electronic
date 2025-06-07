// src/components/Header/Header.tsx
import React, { useState, useRef, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import MobileSearch from "./Header/MobileSearch";
import AccountMenu, { MenuItem } from "./Header/AccountMenu";
import Navigation from "./Header/Navigation";

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
  { label: "Sprzedawanie", href: "/selling" },
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
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("");
  const [accountOpen, setAccountOpen] = useState(false);
  const navigate = useNavigate();

  // Ref obejmujący przycisk i menu, żeby wykrywać kliknięcia poza oba te elementy
  const accountWrapperRef = useRef<HTMLDivElement>(null);

  // Hook zamykający menu po kliknięciu poza przycisk i menu
  useEffect(() => {
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
  }, [accountOpen]);

  const toggleMobile = () => setMobileOpen((prev) => !prev);
  const toggleAccount = () => setAccountOpen((prev) => !prev);

  const handleCategory = (cat: string) => {
    setActiveCategory(cat);
    navigate(`/offer-search?category=${encodeURIComponent(cat)}`);
    if (mobileOpen) toggleMobile();
  };

  const handleLogout = () => {
    setAccountOpen(false);
    alert("Wylogowano!");
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
            <X className="w-6 h-6 text-gray-700" />
          ) : (
            <Menu className="w-6 h-6 text-gray-700" />
          )}
        </button>
      </div>

      {/* Desktop Header */}
      <div className="hidden lg:flex items-center justify-between mx-auto max-w-7xl py-4">
        <h1 className="text-3xl font-extrabold text-[#4A4A4A]">
          Nazwa Aplikacji
        </h1>
        <MobileSearch />

        {/* Ważne! Ref obejmuje zarówno przycisk, jak i AccountMenu */}
        <div className="relative" ref={accountWrapperRef}>
          <button
            onClick={toggleAccount}
            className="px-6 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition"
          >
            Twoje konto
          </button>

          <AccountMenu
            items={menuItems}
            visible={accountOpen}
            toggleVisible={toggleAccount}
            onLogout={handleLogout}
          />
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
            onClick={() => navigate("/sell")}
            className="w-full py-2 bg-[#4C6B8C] text-white rounded-lg"
          >
            Sprzedaj
          </button>

          {/* Tutaj też owijamy button i menu w ref */}
          <div className="relative" ref={accountWrapperRef}>
            <button
              onClick={toggleAccount}
              className="w-full py-2 bg-gray-300 text-gray-800 rounded-lg"
            >
              Twoje konto
            </button>

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
