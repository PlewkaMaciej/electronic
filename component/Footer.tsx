import React from "react";
import { Mail } from "lucide-react";
import StyleInput from "./Items/StyleInput";

function Footer() {
  return (
    <footer className="bg-[#F5F7FA] py-8 shadow-xl mt-10 border-t border-gray-300">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center px-6 space-y-6 md:space-y-0">
        <div className="flex flex-col md:flex-row md:space-x-12 space-y-6 md:space-y-0 text-center md:text-left">
          {/* first column */}
          <div className="flex flex-col space-y-3">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 border-b-2 border-gray-400 pb-2">
              Giełda Elektroniki Używanej
            </h2>
            <a
              href="#"
              className="text-gray-600 hover:text-gray-800 transition duration-300"
            >
              O nas
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-gray-800 transition duration-300"
            >
              Pracuj z nami
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-gray-800 transition duration-300"
            >
              Informacje ogólne
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-gray-800 transition duration-300"
            >
              Kontakt
            </a>
          </div>

          {/* second column */}
          <div className="flex flex-col space-y-3">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 border-b-2 border-gray-400 pb-2">
              Pomoc
            </h2>
            <a
              href="#"
              className="text-gray-600 hover:text-gray-800 transition duration-300"
            >
              Centrum pomocy
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-gray-800 transition duration-300"
            >
              Informacje dla sprzedających
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-gray-800 transition duration-300"
            >
              Informacje dla kupujących
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-gray-800 transition duration-300"
            >
              Polityka bezpieczeństwa
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-gray-800 transition duration-300"
            >
              Polityka rozstrzygania sporów
            </a>
          </div>

          {/* 3rd column */}
          <div className="flex flex-col space-y-3">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 border-b-2 border-gray-400 pb-2">
              Dowiedz się więcej
            </h2>
            <a
              href="#"
              className="text-gray-600 hover:text-gray-800 transition duration-300"
            >
              Program afiliacyjny
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-gray-800 transition duration-300"
            >
              Oferta dla przedsiębiorców
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-gray-800 transition duration-300"
            >
              Twoja reklama na GEU
            </a>
          </div>
        </div>

        {/* logo mobile */}
        <div className="p-4 bg-white shadow-md rounded-lg border border-gray-300">
          <img
            src="/path-to-logo.png"
            alt="Logo"
            className="w-16 h-16 object-contain mx-auto"
          />
        </div>
      </div>

      {/* rest */}
      <div className="max-w-7xl mx-auto mt-6 px-4 text-center text-gray-600 text-sm flex flex-col md:flex-row justify-center space-y-3 md:space-y-0 md:space-x-6 border-t border-gray-300 pt-4">
        <a href="#" className="hover:text-gray-800 transition duration-300">
          Regulamin
        </a>
        <a href="#" className="hover:text-gray-800 transition duration-300">
          Polityka prywatności
        </a>
        <a href="#" className="hover:text-gray-800 transition duration-300">
          Polityka cookies
        </a>
        <a href="#" className="hover:text-gray-800 transition duration-300">
          Ustawienia plików cookie
        </a>
      </div>
    </footer>
  );
}

export default Footer;
