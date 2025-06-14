// src/components/Header/AccountMenu.tsx
import React from "react";
import { useNavigate } from "react-router-dom";

export interface MenuItem {
  label: string;
  href: string;
  bold?: boolean;
}

interface AccountMenuProps {
  items: MenuItem[];
  visible: boolean;
  toggleVisible: () => void;
  onLogout: () => void; // logout przekazany z zewnątrz
}

const AccountMenu: React.FC<AccountMenuProps> = ({
  items,
  visible,
  toggleVisible,
  onLogout,
}) => {
  const navigate = useNavigate();

  if (!visible) return null;

  return (
    <div className="absolute left-0 top-full mt-2 w-56 bg-white border border-gray-300 rounded-lg shadow-lg z-50">
      <ul className="flex flex-col divide-y divide-gray-200">
        {items.map((item, idx) => (
          <li key={idx}>
            <button
              className={`w-full text-left px-4 py-2 hover:bg-gray-100 ${
                item.bold ? "font-bold" : ""
              }`}
              onClick={() => {
                toggleVisible();
                navigate(item.href);
              }}
            >
              {item.label}
            </button>
          </li>
        ))}
        <li>
          <button
            className="w-full text-left px-4 py-2 cursor-pointer hover:bg-red-500 hover:text-white font-semibold"
            onClick={() => {
              toggleVisible();
              onLogout();
            }}
          >
            Wyloguj się
          </button>
        </li>
      </ul>
    </div>
  );
};

export default AccountMenu;
