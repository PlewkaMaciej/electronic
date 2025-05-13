import React from "react";
import { Mail } from "lucide-react";
import StyleInput from "./Items/StyleInput";

function Footer() {
  return (
    <footer className="bg-[#F5F7FA] py-10 mt-16 border-t border-gray-300 shadow-inner">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-10">
        {/* Column Container */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 w-full">
          {/* Column 1 */}
          <div className="flex flex-col space-y-3 text-center md:text-left">
            <h2 className="text-2xl font-semibold text-gray-800 border-b pb-2 border-gray-400">
              Giełda Elektroniki Używanej
            </h2>
            {["O nas", "Pracuj z nami", "Informacje ogólne", "Kontakt"].map(
              (text) => (
                <a
                  key={text}
                  href="#"
                  className="text-gray-600 hover:text-gray-900 hover:underline transition duration-300"
                >
                  {text}
                </a>
              )
            )}
          </div>

          {/* Column 2 */}
          <div className="flex flex-col space-y-3 text-center md:text-left">
            <h2 className="text-2xl font-semibold text-gray-800 border-b pb-2 border-gray-400">
              Pomoc
            </h2>
            {[
              "Centrum pomocy",
              "Informacje dla sprzedających",
              "Informacje dla kupujących",
              "Polityka bezpieczeństwa",
              "Polityka rozstrzygania sporów",
            ].map((text) => (
              <a
                key={text}
                href="#"
                className="text-gray-600 hover:text-gray-900 hover:underline transition duration-300"
              >
                {text}
              </a>
            ))}
          </div>

          {/* Column 3 */}
          <div className="flex flex-col space-y-3 text-center md:text-left">
            <h2 className="text-2xl font-semibold text-gray-800 border-b pb-2 border-gray-400">
              Dowiedz się więcej
            </h2>
            {[
              "Program afiliacyjny",
              "Oferta dla przedsiębiorców",
              "Twoja reklama na GEU",
            ].map((text) => (
              <a
                key={text}
                href="#"
                className="text-gray-600 hover:text-gray-900 hover:underline transition duration-300"
              >
                {text}
              </a>
            ))}
          </div>
        </div>

        {/* Logo Section */}
        <div className="flex justify-center w-full md:w-auto">
          <div className="p-4 bg-white shadow-lg rounded-xl border border-gray-300">
            <img
              src="/path-to-logo.png"
              alt="Logo"
              className="w-20 h-20 object-contain"
            />
          </div>
        </div>
      </div>

      {/* Bottom Links */}
      <div className="max-w-7xl mx-auto mt-8 px-6 border-t pt-4 border-gray-300 flex flex-col md:flex-row justify-center items-center text-sm text-gray-600 space-y-3 md:space-y-0 md:space-x-6 text-center">
        {[
          "Regulamin",
          "Polityka prywatności",
          "Polityka cookies",
          "Ustawienia plików cookie",
        ].map((text) => (
          <a
            key={text}
            href="#"
            className="hover:text-gray-800 hover:underline transition duration-300"
          >
            {text}
          </a>
        ))}
      </div>
    </footer>
  );
}

export default Footer;
