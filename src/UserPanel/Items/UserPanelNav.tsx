import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

interface NavItem {
  label: string;
  href?: string;
  children?: NavItem[];
}

interface UserNavigationProps {
  items?: NavItem[];
  className?: string;
}

const navStructure: NavItem[] = [
  {
    label: "Panel sterowania",
    children: [
      {
        label: "Moje ogłoszenia",
        children: [
          { label: "Aktywne", href: "/my-ads?active" },
          { label: "Oczekujące", href: "/my-ads?pending" },
          { label: "Na weryfikację", href: "/my-ads?verification" },
          { label: "Robocze", href: "/my-ads?inWork" },
          { label: "Wstrzymane", href: "/my-ads?suspended" },
          { label: "Prywatne", href: "/my-ads?private" },
          { label: "Zakończone", href: "/my-ads?ended" },
        ],
      },
      {
        label: "Moje zamówienia",
        children: [
          { label: "Aktywne", href: "/my-orders?active" },
          { label: "Oczekujące", href: "/my-orders?pending" },
          { label: "Na weryfikację", href: "/my-orders?verification" },
          { label: "Robocze", href: "/my-orders?inWork" },
          { label: "Wstrzymane", href: "/my-orders?suspended" },
          { label: "Prywatne", href: "/my-orders?private" },
          { label: "Zakończone", href: "/my-orders?ended" },
        ],
      },
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

const UserPanelNav: React.FC<UserNavigationProps> = ({ className = "" }) => {
  const location = useLocation();
  const [expanded, setExpanded] = useState<string | null>(null);
  const [mobilePanelOpen, setMobilePanelOpen] = useState(false);

  useEffect(() => {
    // Set expanded section if current URL matches a nested item
    for (const section of navStructure) {
      section.children?.forEach((item) => {
        item.children?.forEach((subItem) => {
          if (subItem.href === location.pathname + location.search) {
            setExpanded(item.label);
            if (section.label === "Panel sterowania") {
              setMobilePanelOpen(true);
            }
          }
        });
      });
    }
  }, [location]);

  const toggleExpand = (label: string) => {
    setExpanded((prev) => (prev === label ? null : label));
  };

  return (
    <div className={`mt-6 max-w-7xl mx-auto px-4 ${className}`}>
      {/* MOBILE: Only Panel sterowania button */}
      <div className="block lg:hidden mb-4">
        <button
          onClick={() => setMobilePanelOpen(!mobilePanelOpen)}
          className="px-4 py-2 bg-gray-800 text-white w-full text-left rounded-lg"
        >
          Panel sterowania
        </button>
        {mobilePanelOpen && (
          <div className="mt-2 w-full bg-white border border-gray-300 rounded-2xl shadow-md p-4">
            {navStructure
              .find((s) => s.label === "Panel sterowania")
              ?.children?.map((item) => (
                <div key={item.label}>
                  {item.children ? (
                    <div>
                      <button
                        onClick={() => toggleExpand(item.label)}
                        className="w-full text-left text-sm font-medium py-1 px-2 rounded hover:bg-gray-100"
                      >
                        {item.label}
                      </button>
                      {expanded === item.label && (
                        <div className="ml-4">
                          {item.children.map((subItem) => (
                            <a
                              key={subItem.href}
                              href={subItem.href}
                              className={`block text-sm py-1 px-2 rounded hover:bg-gray-100 ${
                                location.pathname + location.search ===
                                subItem.href
                                  ? "bg-gray-200 font-semibold"
                                  : "text-gray-700"
                              }`}
                            >
                              {subItem.label}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <a
                      href={item.href}
                      className={`block text-sm py-1 px-2 rounded hover:bg-gray-100 ${
                        location.pathname + location.search === item.href
                          ? "bg-gray-200 font-semibold"
                          : "text-gray-700"
                      }`}
                    >
                      {item.label}
                    </a>
                  )}
                </div>
              ))}
          </div>
        )}
      </div>

      {/* DESKTOP: Full menu */}
      <div className="hidden lg:block w-full lg:w-64 bg-white border border-gray-300 rounded-2xl shadow-md p-4">
        {navStructure.map((section) => (
          <div key={section.label} className="mb-4">
            <p className="text-gray-600 font-semibold mb-2 uppercase text-sm">
              {section.label}
            </p>
            {section.children?.map((item) => (
              <div key={item.label}>
                {item.children ? (
                  <div>
                    <button
                      onClick={() => toggleExpand(item.label)}
                      className="w-full text-left text-sm font-medium py-1 px-2 rounded hover:bg-gray-100"
                    >
                      {item.label}
                    </button>
                    {expanded === item.label && (
                      <div className="ml-4">
                        {item.children.map((subItem) => (
                          <a
                            key={subItem.href}
                            href={subItem.href}
                            className={`block text-sm py-1 px-2 rounded hover:bg-gray-100 ${
                              location.pathname + location.search ===
                              subItem.href
                                ? "bg-gray-200 font-semibold"
                                : "text-gray-700"
                            }`}
                          >
                            {subItem.label}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <a
                    href={item.href}
                    className={`block text-sm py-1 px-2 rounded hover:bg-gray-100 ${
                      location.pathname + location.search === item.href
                        ? "bg-gray-200 font-semibold"
                        : "text-gray-700"
                    }`}
                  >
                    {item.label}
                  </a>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserPanelNav;
