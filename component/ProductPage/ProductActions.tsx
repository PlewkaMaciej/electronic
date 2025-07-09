import React from "react";
import { formatPrice } from "../../utils/formatPrice";

interface Props {
  title: string;
  price: number;
}

const ProductActions: React.FC<Props> = ({ title, price }) => (
  <div className="flex flex-col gap-3">
    <button className="bg-[#006F91] text-white px-6 py-2 rounded-md shadow-md hover:bg-[#00597A] transition-all duration-300">
      Kup teraz
    </button>
    <button className="bg-gray-200 text-gray-800 px-6 py-2 rounded-md shadow-md hover:bg-gray-300 transition-all duration-300">
      Zaproponuj cenę
    </button>
    <button className="bg-gray-200 text-gray-800 px-6 py-2 rounded-md shadow-md hover:bg-gray-300 transition-all duration-300">
      Wyślij wiadomość
    </button>
  </div>
);

export default ProductActions;
