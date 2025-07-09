import React from "react";
import { formatPrice } from "../../utils/formatPrice";

interface Props {
  title: string;
  price: number;
}

const MobileHeader: React.FC<Props> = ({ title, price }) => (
  <div className="block lg:hidden mb-6">
    <h1 className="text-xl font-bold text-gray-800 mb-2">{title}</h1>
    <p className="text-lg font-semibold text-[#006F91] mb-4">
      {formatPrice(price)}
    </p>
  </div>
);

export default MobileHeader;
