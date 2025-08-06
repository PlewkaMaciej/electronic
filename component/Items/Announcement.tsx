import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getLabel } from "../../utils/fieldLabels";
import { useSelector } from "react-redux";
import { useMutation, useQueryClient } from "react-query";
import api from "../../src/api/axios";
import { toast } from "react-toastify";
import type { RootState } from "../../src/store";
import DeleteModal from "./DeleteModal";
import { AxiosResponse } from "axios";

const formatDate = (date: string) => {
  const d = new Date(date);
  const day = ("0" + d.getDate()).slice(-2);
  const month = ("0" + (d.getMonth() + 1)).slice(-2);
  const year = d.getFullYear();
  return `${day}-${month}-${year}`;
};

interface AnnouncementProps {
  offer: {
    _id: string;
    title: string;
    images: string[];
    createdAt: string;
    specification?: Record<string, any>;
    price: number;
    userId: string;
  };
  category: string | null;
  onLike?: (offerId: string) => void;
}

const Announcement: React.FC<AnnouncementProps> = ({
  offer,
  category,
  onLike,
}) => {
  const navigate = useNavigate();
  const currentUserId = useSelector((s: RootState) => s.auth.user?._id);
  const queryClient = useQueryClient();
  const [modalOpen, setModalOpen] = useState(false);

  const { mutate: deleteAnn, isLoading: deleting } = useMutation<
    AxiosResponse<any>,
    unknown,
    string
  >((id: string) => api.delete(`/announcements/${id}`), {
    onSuccess: () => {
      toast.success("Ogłoszenie usunięte");
      queryClient.invalidateQueries(["userAnnouncements", currentUserId]);
    },
    onError: () => {
      toast.error("Błąd podczas usuwania ogłoszenia");
    },
  });

  const handleRedirect = () => {
    if (!modalOpen) navigate(`/Product/${offer._id}`);
  };

  const handleLike = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onLike?.(offer._id);
  };

  return (
    <div
      className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition relative
                 w-full sm:w-[45%] md:w-[70%] lg:w-[50%] xl:w-[34%] cursor-pointer"
      onClick={handleRedirect}
    >
      <div className="w-full aspect-w-4 aspect-h-3 bg-gray-100 rounded-lg overflow-hidden mb-4">
        <img
          src={offer.images[0]}
          alt={offer.title}
          className="w-full h-full object-contain"
          loading="lazy"
        />
      </div>

      <h4 className="font-semibold text-2xl mb-3 pt-2">{offer.title}</h4>
      <p className="text-lg text-gray-500 mb-2">
        Dodano: {formatDate(offer.createdAt)}
      </p>
      <p className="text-lg text-gray-500 mb-2">Kategoria: {category}</p>

      <ul className="text-lg text-gray-600 mb-4">
        {offer.specification &&
          Object.entries(offer.specification).map(([key, val]) => (
            <li key={key}>
              <b>{getLabel(key)}:</b> {String(val)}
            </li>
          ))}
      </ul>

      <div className="flex justify-between items-center mt-4">
        <p className="text-2xl font-bold text-indigo-600">{offer.price} zł</p>
        {onLike && (
          <button
            onClick={handleLike}
            className="text-gray-400 hover:text-red-500 text-2xl"
            aria-label="Lubię to"
          >
            ♡
          </button>
        )}
      </div>

      {currentUserId === offer.userId && (
        <div className="mt-6 flex flex-col gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/edit-announcement/${offer._id}`);
            }}
            className="w-full px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
          >
            Edytuj ogłoszenie
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setModalOpen(true);
            }}
            className="w-full px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Usuń ogłoszenie
          </button>
        </div>
      )}

      {modalOpen && (
        <div
          className="fixed inset-0 z-50"
          onClick={(e) => e.stopPropagation()}
        >
          <DeleteModal
            open={modalOpen}
            onCancel={() => setModalOpen(false)}
            onConfirm={() => deleteAnn(offer._id)}
            loading={deleting}
          />
        </div>
      )}
    </div>
  );
};

export default Announcement;
