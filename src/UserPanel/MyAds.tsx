import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserPanelNav from "./Items/UserPanelNav";
import Announcement from "../../component/Items/Announcement";
import { fetchCurrentUser } from "../store/slices/authSlice";
import type { AppDispatch, RootState } from "../store";
import { useUserAnnouncements } from "../../hooks/useUserAnnouncements";

const MyAds: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user, isLoading: userLoading } = useSelector(
    (state: RootState) => state.auth
  );

  // jeśli nie ma usera, pobierz go
  useEffect(() => {
    if (!user && !userLoading) {
      dispatch(fetchCurrentUser());
    }
  }, [dispatch, user, userLoading]);

  const userId = user?._id || "";
  const {
    data: ads = [],
    isLoading: adsLoading,
    isError: adsError,
    error: adsErrorObj,
  } = useUserAnnouncements(userId);

  // skeleton user
  if (userLoading || !userId) {
    return (
      <div className="flex max-w-7xl mx-auto px-4 gap-6">
        <div className="w-1/4">
          <UserPanelNav />
        </div>
        <div className="flex-1 text-gray-600">Ładowanie profilu…</div>
      </div>
    );
  }

  // skeleton ads
  if (adsLoading) {
    return (
      <div className="flex max-w-7xl mx-auto px-4 gap-6">
        <div className="w-1/4">
          <UserPanelNav />
        </div>
        <div className="flex-1 text-gray-600">Ładowanie ogłoszeń…</div>
      </div>
    );
  }

  // error
  if (adsError) {
    return (
      <div className="flex max-w-7xl mx-auto px-4 gap-6">
        <div className="w-1/4">
          <UserPanelNav />
        </div>
        <div className="flex-1 text-red-500">
          Błąd podczas pobierania:{" "}
          {adsErrorObj instanceof Error ? adsErrorObj.message : "Nieznany błąd"}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap lg:flex-nowrap max-w-7xl mx-auto px-4 gap-6">
      <div className="w-full lg:w-1/4 mb-6 lg:mb-0">
        <UserPanelNav />
      </div>
      <div className="w-full lg:w-3/4 flex flex-wrap gap-6 mt-5">
        {ads.length > 0 ? (
          ads.map((ad) => (
            <Announcement key={ad._id} offer={ad} category={ad.category} />
          ))
        ) : (
          <div className="w-full text-center text-gray-500 py-16">
            Nie masz jeszcze żadnych ogłoszeń.
          </div>
        )}
      </div>
    </div>
  );
};

export default MyAds;
