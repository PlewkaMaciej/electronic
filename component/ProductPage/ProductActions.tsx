// src/components/Product/ProductActions.tsx
import React from "react";
import { useCreateConversation } from "../../hooks/useCreateConversation";
import { useSingleAnnouncement } from "../../hooks/useGetSingleAnn";
import { useParams, useNavigate } from "react-router-dom";

interface Props {
  title: string;
  price: number;
}

const ProductActions: React.FC<Props> = ({ title, price }) => {
  // 1. Hooki wewnątrz ciała komponentu
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { data: product, isLoading: loadingProduct } = useSingleAnnouncement(
    id!
  );
  const { mutate: createConversation, isLoading: creatingConversation } =
    useCreateConversation();

  // 2. Handler wywoływany na kliknięcie
  const handleCreateConversation = () => {
    if (!product) return;
    createConversation(
      { recipientId: product.userId, productId: product._id },
      {
        onSuccess: (data) => {
          // Używamy backticków, żeby w URL było rzeczywiste ID
          navigate(`/chat/${data.conversation._id}`);
        },
        onError: () => {
          alert("Nie udało się utworzyć konwersacji.");
        },
      }
    );
  };

  return (
    <div className="flex flex-col gap-3">
      <button className="bg-[#006F91] text-white px-6 py-2 rounded-md shadow-md hover:bg-[#00597A] transition-all duration-300">
        Kup teraz
      </button>
      <button className="bg-gray-200 text-gray-800 px-6 py-2 rounded-md shadow-md hover:bg-gray-300 transition-all duration-300">
        Zaproponuj cenę
      </button>
      <button
        onClick={handleCreateConversation}
        disabled={creatingConversation || loadingProduct}
        className={`px-6 py-2 rounded-md shadow-md transition-all duration-300 transform ${
          creatingConversation || loadingProduct
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-gray-200 text-gray-800 hover:bg-gray-300"
        }`}
      >
        {creatingConversation ? "Tworzenie..." : "Wyślij wiadomość"}
      </button>
    </div>
  );
};

export default ProductActions;
