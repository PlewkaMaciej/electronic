import React from "react";
import { OfferCard } from "./OfferCard";

type OfferListProps = {
  filteredOffers: any[];
  category: string | null;
};

export function OfferList({ filteredOffers, category }: OfferListProps) {
  return (
    <div className="flex flex-row flex-wrap gap-4">
      {filteredOffers.map((offer) => (
        <OfferCard
          key={offer.id}
          offer={offer}
          category={category}
          imageSrc="../../img/computer.jpg"
        />
      ))}
    </div>
  );
}
