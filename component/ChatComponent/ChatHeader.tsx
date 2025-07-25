import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../src/store";

interface ChatHeaderProps {
  isMobile: boolean;
  onBack: () => void;
  userName: string;
  userLastName?: string;
  productTitle?: string;
  productImage?: string;
  partnerId?: string; // <- nowy props: ID rozmówcy
}

const ChatHeader: React.FC<ChatHeaderProps> = ({
  isMobile,
  onBack,
  userName,
  userLastName,
  productTitle,
  productImage,
  partnerId,
}) => {
  const currentUserId = useSelector((state: RootState) => state.auth.user?._id);

  // Tylko pokazuj dane użytkownika, jeśli to nie jest zalogowany user
  const showUserName = partnerId && partnerId !== currentUserId;

  return (
    <div className="border-b border-gray-300 pb-4 mb-6 px-4 bg-white rounded-t-2xl shadow-sm flex flex-col md:flex-row items-center justify-between">
      <div className="flex items-center w-full md:w-auto">
        {isMobile && (
          <button
            onClick={onBack}
            className="text-blue-600 hover:text-blue-800 font-semibold mr-4"
            aria-label="Wróć"
          >
            ←
          </button>
        )}

        <div>
          {showUserName && (
            <p className="text-xl font-semibold text-gray-900">
              {userName} {userLastName}
            </p>
          )}
          {productTitle && (
            <p className="text-sm text-gray-500 mt-1 max-w-xs truncate">
              Produkt: {productTitle}
            </p>
          )}
        </div>
      </div>

      {productImage && (
        <div className="mt-4 md:mt-0">
          <img
            src={productImage}
            alt={productTitle}
            className="w-16 h-16 md:w-16 md:h-16 rounded-xl object-cover shadow-md border border-gray-200"
            loading="lazy"
          />
        </div>
      )}
    </div>
  );
};

export default ChatHeader;
