// src/pages/ProductPage.tsx (albo gdzie masz ten komponent)
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSingleAnnouncement } from "../hooks/useGetSingleAnn";
import MobileHeader from "../component/ProductPage/MobileHeader";
import ProductActions from "../component/ProductPage/ProductActions";
import ImageCarousel from "../component/ProductPage/ImageCarousel";
import ProductSpecs from "../component/ProductPage/ProductSpecs";
import ImagePreview from "../component/ProductPage/ImagePreview";
import { formatPrice } from "../utils/formatPrice";

const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: product, isLoading } = useSingleAnnouncement(id!);
  const [previewOpen, setPreviewOpen] = useState(false);

  if (isLoading || !product) {
    return <div className="text-center py-8">Ładowanie produktu…</div>;
  }

  return (
    <div className="container mx-auto py-8 px-4">
      {/** --- MOBILNY HEADER + PRZYCISKI --- **/}
      <div className="block lg:hidden mb-6">
        <MobileHeader title={product.title} price={product.price} />
        <ProductActions title={product.title} price={product.price} />
      </div>

      <div className="flex flex-col lg:flex-row gap-6 border border-gray-200 p-6 rounded-2xl shadow-xl bg-white">
        {/** --- LEWA CZĘŚĆ: KARUZELA I OPIS --- **/}
        <div className="lg:w-[70%]">
          <ImageCarousel
            images={product.images}
            onPreviewOpen={() => setPreviewOpen(true)}
          />

          <div className="mt-6 bg-gray-50 p-4 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold mb-2">
              <b>OPIS PRODUKTU</b>
            </h2>
            <p className="text-sm text-gray-700">{product.description}</p>
          </div>

          <div className="block lg:hidden space-y-6 mt-6">
            <ProductSpecs spec={product.specification} />
          </div>
        </div>

        {/** --- PRAWA CZĘŚĆ (DESKTOP) --- **/}
        <div className="hidden lg:block lg:w-[30%] space-y-6">
          <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
            <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
            <p className="text-xl font-semibold text-[#006F91] mb-4">
              {formatPrice(product.price)}
            </p>
            <ProductActions title={product.title} price={product.price} />
          </div>
          <ProductSpecs spec={product.specification} />
        </div>
      </div>

      {previewOpen && (
        <ImagePreview
          images={product.images}
          current={0}
          onClose={() => setPreviewOpen(false)}
          onChange={(i) => console.log("zmień podgląd na", i)}
        />
      )}
    </div>
  );
};

export default ProductPage;
