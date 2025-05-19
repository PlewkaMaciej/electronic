import React from "react";

type OfferCardProps = {
  offer: any; // Typ można rozbudować wg potrzeb
  category: string | null;
  imageSrc: string;
};

export function OfferCard({ offer, category, imageSrc }: OfferCardProps) {
  return (
    <div className="bg-white p-4 rounded-2xl shadow hover:shadow-lg transition relative w-[20%]">
      <div className="w-full aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4">
        <img
          src={imageSrc}
          alt={offer.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      <h4 className="font-semibold text-lg mb-1">{offer.name}</h4>
      <p className="text-sm text-gray-500 mb-1">Dodano: {offer.date}</p>
      <p className="text-sm text-gray-500 mb-1">Stan: {offer.state}</p>

      <ul className="text-sm text-gray-600 mb-2">
        {category === "Komputery" && (
          <>
            <li>Procesor: {offer.processor}</li>
            <li>GPU: {offer.gpu}</li>
            <li>RAM: {offer.ram}</li>
            <li>Dysk: {offer.disk}</li>
            <li>Zasilacz: {offer.power}</li>
          </>
        )}
        {category === "Laptopy" && (
          <>
            <li>Marka: {offer.brand}</li>
            <li>Procesor: {offer.processor}</li>
            <li>GPU: {offer.gpu}</li>
            <li>RAM: {offer.ram}</li>
            <li>Dysk: {offer.disk}</li>
            <li>Rozmiar ekranu: {offer.screenSize}</li>
          </>
        )}
        {category === "Telefony" && (
          <>
            <li>Marka: {offer.brand}</li>
            <li>System: {offer.os}</li>
            <li>RAM: {offer.ram}</li>
            <li>Pamięć: {offer.storage}</li>
          </>
        )}
        {category === "Podzespoły i części" && (
          <>
            <li>Typ: {offer.type}</li>
            <li>Kompatybilność: {offer.compatibility}</li>
          </>
        )}
        {category === "Fotografia" && (
          <>
            <li>Marka: {offer.brand}</li>
            <li>Typ: {offer.type}</li>
            <li>Megapiksele: {offer.megapixels}</li>
          </>
        )}
        {category === "Smartwatche" && (
          <>
            <li>Marka: {offer.brand}</li>
            <li>System: {offer.os}</li>
            <li>Funkcje: {offer.features}</li>
          </>
        )}
        {category === "RTV" && (
          <>
            <li>Marka: {offer.brand}</li>
            <li>Typ: {offer.type}</li>
            <li>Rozdzielczość: {offer.resolution}</li>
          </>
        )}
        {category === "AGD" && (
          <>
            <li>Marka: {offer.brand}</li>
            <li>Typ: {offer.type}</li>
            <li>Klasa energetyczna: {offer.energyClass}</li>
          </>
        )}
        {category === "Audio" && (
          <>
            <li>Marka: {offer.brand}</li>
            <li>Typ: {offer.type}</li>
            <li>Łączność: {offer.connectivity}</li>
          </>
        )}
        {category === "Video" && (
          <>
            <li>Marka: {offer.brand}</li>
            <li>Typ: {offer.type}</li>
            <li>Rozdzielczość: {offer.resolution}</li>
          </>
        )}
      </ul>

      <div className="flex justify-between items-center mt-2">
        <p className="text-xl font-bold text-indigo-600">
          {offer.price.toLocaleString("pl-PL", {
            style: "currency",
            currency: "PLN",
          })}
        </p>
        <button className="text-gray-400 hover:text-red-500 text-xl">♡</button>
      </div>
    </div>
  );
}
