import React from "react";

interface NavItem {
  label: string;
  href: string;
}

interface UserNavigationProps {
  items: NavItem[];
  className?: string;
}

const UserPanelNav: React.FC<UserNavigationProps> = ({ items, className = "" }) => {
  const currentPath =
    typeof window !== "undefined"
      ? window.location.pathname + window.location.search
      : "";

  return (
    <div className={`mt-6 max-w-7xl mx-auto px-4 ${className}`}>
      {/* Mobile */}
      <div className="block lg:hidden bg-white border border-gray-300 rounded-2xl shadow-md p-4">
        <nav className="flex justify-center overflow-x-auto whitespace-nowrap scrollbar-hide space-x-3">
          {items.map((item) => {
            const isActive = currentPath === item.href;
            return (
              <a
                key={item.href}
                href={item.href}
                className={`flex-shrink-0 px-4 py-2 rounded-xl border text-sm font-medium transition cursor-pointer 
                  ${
                    isActive
                      ? "bg-[#4C6B8C] text-white shadow-md border-transparent"
                      : "bg-white text-gray-700 border-gray-200 hover:bg-gray-100 hover:shadow"
                  }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>
      </div>

      {/* Desktop */}
      <div className="hidden lg:flex justify-center">
        <nav className="flex flex-wrap gap-3">
          {items.map((item) => {
            const isActive = currentPath === item.href;
            return (
              <a
                key={item.href}
                href={item.href}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition cursor-pointer
                  ${
                    isActive
                      ? "bg-[#4C6B8C] text-white shadow"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default UserPanelNav;
