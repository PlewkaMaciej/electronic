import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

interface NavItem {
  label: string;
  href?: string;
  children?: NavItem[];
}

interface UserNavigationProps {
  className?: string;
}

const navStructure: NavItem[] = [
  {
    label: "Panel sterowania",
    children: [
      { label: "Moje ogłoszenia", href: "/my-ads" },
      { label: "Moje zamówienia", href: "/my-orders" },
      { label: "Czat", href: "/chat" },
      { label: "Obserwowane", href: "/favorites" },
      { label: "Portfel", href: "/wallet" },
      { label: "Pomoc", href: "/help" },
    ],
  },
  {
    label: "Ustawienia",
    children: [
      { label: "Profil", href: "/settings/profile" },
      { label: "Konto i bezpieczeństwo", href: "/settings/security" },
      { label: "Wysyłka", href: "/settings/shipping" },
      { label: "Prywatność", href: "/settings/privacy" },
      { label: "Sprzedawanie", href: "/settings/selling" },
    ],
  },
];

function isLinkActive(currentPath: string, currentSearch: string, href?: string): boolean {
  if (!href) return false;
  const [hrefPath, hrefQuery] = href.split("?");
  if (currentPath !== hrefPath) return false;
  if (!hrefQuery) return true;

  const currentParams = new URLSearchParams(currentSearch);
  const hrefParams = new URLSearchParams(hrefQuery);

  for (const [key, value] of hrefParams.entries()) {
    if (currentParams.get(key) !== value) return false;
  }
  return true;
}

const UserPanelNav: React.FC<UserNavigationProps> = ({ className = "" }) => {
  const location = useLocation();
  const [mobilePanelOpen, setMobilePanelOpen] = useState(false);

  const renderLink = (item: NavItem) => {
    const isActive = isLinkActive(location.pathname, location.search, item.href);
    return (
      <Link
        key={item.href}
        to={item.href || "#"}
        className={`block text-sm py-1 px-2 rounded hover:bg-gray-100 ${
          isActive ? "bg-gray-200 font-semibold" : "text-gray-700"
        }`}
        onClick={() => setMobilePanelOpen(false)} // zamykamy menu na mobile po kliknięciu
      >
        {item.label}
      </Link>
    );
  };

  return (
    <div className={`mt-6 max-w-7xl mx-auto px-4 ${className}`}>
      {/* MOBILE */}
      <div className="block lg:hidden mb-4">
        <button
          onClick={() => setMobilePanelOpen(!mobilePanelOpen)}
          className="px-4 py-2 bg-gray-800 text-white w-full text-left rounded-lg"
        >
          Panel sterowania
        </button>
        {mobilePanelOpen && (
          <div className="mt-2 w-full bg-white border border-gray-300 rounded-2xl shadow-md p-4 space-y-2">
            {navStructure
              .find((section) => section.label === "Panel sterowania")
              ?.children?.map(renderLink)}
            {navStructure
              .find((section) => section.label === "Ustawienia")
              ?.children?.map(renderLink)}
          </div>
        )}
      </div>

      {/* DESKTOP */}
      <div className="hidden lg:block w-full lg:w-64 bg-white border border-gray-300 rounded-2xl shadow-md p-4 space-y-4">
        {navStructure.map((section) => (
          <div key={section.label}>
            <p className="text-gray-600 font-semibold mb-2 uppercase text-sm">
              {section.label}
            </p>
            <div className="space-y-1">
              {section.children?.map(renderLink)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserPanelNav;
