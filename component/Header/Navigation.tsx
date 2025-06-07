
// src/components/Header/Navigation.tsx
import React from "react";

interface NavigationProps {
  categories: string[];
  active: string;
  onSelect: (category: string) => void;
  className?: string;
}

const Navigation: React.FC<NavigationProps> = ({ categories, active, onSelect, className = "" }) => (
  <nav className={`flex ${className}`}>  
    {categories.map((text, index) => (
      <a
        key={index}
        href="#"
        onClick={e => {
          e.preventDefault();
          onSelect(text);
        }}
        className={`px-3 py-1.5 rounded transition hover:text-black hover:scale-105 hover:shadow-sm cursor-pointer ${active === text ? "text-black font-bold" : ""}`}
      >
        {text}
      </a>
    ))}
  </nav>
);

export default Navigation;