// src/pages/ProductPage.tsx
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSingleAnnouncement } from "../hooks/useGetSingleAnn";
import MobileHeader from "../component/ProductPage/MobileHeader";
import ImageCarousel from "../component/ProductPage/ImageCarousel";
import ProductActions from "../component/ProductPage/ProductActions";
import ProductSpecs from "../component/ProductPage/ProductSpecs";
import ImagePreview from "../component/ProductPage/ImagePreview";
import SellerCard from "../component/ProductPage/SellerCard";
import LocationMap from "../component/ProductPage/LocationMap";
import { formatPrice } from "../utils/formatPrice";

const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: product, isLoading } = useSingleAnnouncement(id!);

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewIndex, setPreviewIndex] = useState(0);

  if (isLoading || !product) {
    return <div className="text-center py-8">Ładowanie produktu…</div>;
  }

  return (
    <div className="container mx-auto py-8 px-4">
      {/* 1. Mobile header */}
      <MobileHeader title={product.title} price={product.price} />

      {/* 2. Main flex */}
      <div className="flex flex-col lg:flex-row gap-6 border border-gray-200 p-6 rounded-2xl shadow-xl bg-white">
        {/* --- Left column (images + desc + specs + map + seller) --- */}
        <div className="lg:w-[70%]">
          {/* images carousel */}
          <ImageCarousel
            images={product.images}
            onPreviewOpen={(idx) => {
              setPreviewIndex(idx);
              setPreviewOpen(true);
            }}
          />

          {/* description */}
          <div className="mt-6 bg-gray-50 p-4 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold mb-2">OPIS PRODUKTU</h2>
            <p className="text-sm text-gray-700">{product.description}</p>
          </div>

          {/* specs + map + seller (mobile) */}
          <div className="block lg:hidden space-y-6 mt-6">
            <ProductSpecs spec={product.specification || {}} />

            {/* mapa miasta */}

            {/* seller */}
            {product.userId && <SellerCard userId={product.userId} />}
            {product.location && <LocationMap city={product.location} />}
          </div>
        </div>

        {/* --- Right column (desktop only) --- */}
        <div className="hidden lg:block lg:w-[30%] space-y-6">
          {/* title + price + actions */}
          <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
            <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
            <p className="text-xl font-semibold text-[#006F91] mb-4">
              {formatPrice(product.price)}
            </p>
            <ProductActions title={product.title} price={product.price} />
          </div>

          {/* specs */}
          <ProductSpecs spec={product.specification || {}} />

          {/* mapa miasta */}

          {/* seller */}
          {product.userId && <SellerCard userId={product.userId} />}
          {product.location && <LocationMap city={product.location} />}
        </div>
      </div>

      {/* 3. Fullscreen preview */}
      {previewOpen && (
        <ImagePreview
          images={product.images}
          current={previewIndex}
          onClose={() => setPreviewOpen(false)}
          onChange={(i) => setPreviewIndex(i)}
        />
      )}
    </div>
  );
};

export default ProductPage;
