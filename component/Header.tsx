import { useState } from "react";
import {
  Search,
  Grid,
  Tag,
  Gavel,
  Database,
  Mail,
  Menu,
  X,
} from "lucide-react";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState("");

  return (
    <header className="bg-[#F0F1EC] p-4 shadow-lg">
      <div className="flex items-center justify-between max-w-7xl mx-auto space-x-4 lg:hidden">
        <div className="flex flex-grow items-center bg-white rounded-lg shadow-lg p-2 border border-gray-300 transition-all duration-300 hover:shadow-xl">
          <input
            type="text"
            placeholder="Czego dziś szukasz?"
            className="flex-grow px-3 py-2 outline-none bg-transparent text-base"
          />
          <button className="ml-2 p-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-all duration-200">
            <Search className="text-gray-500 w-5 h-5" />
          </button>
        </div>

        <button
          className="p-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-all"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <X className="w-6 h-6 text-gray-700" />
          ) : (
            <Menu className="w-6 h-6 text-gray-700" />
          )}
        </button>
      </div>

      <div className="hidden lg:flex items-center justify-between max-w-7xl mx-auto space-x-6">
        <h1 className="text-3xl font-bold text-[#2F4F4F] flex-shrink-0 drop-shadow-md">
          Nazwa Aplikacji
        </h1>

        <div className="flex flex-grow items-center bg-white rounded-lg shadow-lg p-2 max-w-md border border-gray-300 transition-all duration-300 hover:shadow-xl">
          <input
            type="text"
            placeholder="Czego dziś szukasz?"
            className="flex-grow px-3 py-2 outline-none bg-transparent text-base"
          />
          <button className="ml-2 p-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-all duration-200">
            <Search className="text-gray-500 w-5 h-5" />
          </button>
        </div>

        <button className="bg-[#339FB8] text-white px-8 py-3 rounded-lg shadow-md text-lg hover:bg-[#2b8fa6] transition-all duration-200 hover:shadow-xl">
          Sprzedaj
        </button>

        <button className="bg-gray-300 text-gray-800 px-8 py-3 rounded-lg shadow-md text-lg hover:bg-gray-400 transition-all duration-200">
          Zarejestruj się / Zaloguj się
        </button>
      </div>

      <div className="border-b border-gray-400 my-6 hidden lg:block"></div>

      <nav className="hidden lg:grid grid-cols-5 max-w-7xl mx-auto text-gray-700 font-semibold text-lg gap-6">
        {[
          { icon: Grid, text: "Kategorie" },
          { icon: Tag, text: "Deals" },
          { icon: Gavel, text: "Aukcje" },
          { icon: Database, text: "Baza danych" },
          { icon: Mail, text: "Kontakt" },
        ].map(({ icon: Icon, text }, index) => (
          <a
            key={index}
            href="#"
            onClick={() => setActive(text)}
            className={`flex flex-col items-center space-y-2 p-2 rounded-lg transition-all duration-200 hover:scale-110 hover:shadow-md ${
              active === text ? "text-black font-bold" : "hover:text-black"
            }`}
          >
            <div
              className={`p-3 rounded-full shadow-md transition-all duration-300 ${
                active === text
                  ? "bg-gray-400"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              <Icon className="w-8 h-8 text-gray-700" />
            </div>
            {text}
          </a>
        ))}
      </nav>

      {isOpen && (
        <div className="lg:hidden flex flex-col items-center mt-4 bg-white shadow-lg rounded-lg p-4 space-y-4">
          <h1 className="text-2xl font-bold text-[#2F4F4F] drop-shadow-md">
            Nazwa Aplikacji
          </h1>

          <button className="bg-[#339FB8] text-white px-6 py-2 rounded-lg shadow-md hover:bg-[#2b8fa6] transition-all duration-200">
            Sprzedaj
          </button>
          <button className="bg-gray-300 text-gray-800 px-6 py-2 rounded-lg shadow-md hover:bg-gray-400 transition-all duration-200">
            Zarejestruj się / Zaloguj się
          </button>

          <div className="border-t border-gray-300 w-full"></div>

          <nav className="flex flex-col items-center space-y-4 text-gray-700 font-semibold text-lg">
            {[
              { icon: Grid, text: "Kategorie" },
              { icon: Tag, text: "Deals" },
              { icon: Gavel, text: "Aukcje" },
              { icon: Database, text: "Baza danych" },
              { icon: Mail, text: "Kontakt" },
            ].map(({ icon: Icon, text }, index) => (
              <a
                key={index}
                href="#"
                onClick={() => setActive(text)}
                className={`flex items-center space-x-3 p-2 rounded-lg transition-all duration-200 hover:scale-105 ${
                  active === text ? "text-black font-bold" : "hover:text-black"
                }`}
              >
                <Icon className="w-6 h-6 text-gray-700" />
                <span>{text}</span>
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

export default Header;
