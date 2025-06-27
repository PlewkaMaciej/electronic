import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../store/index.ts";
import { useUserAnnouncements } from "../../hooks/useUserAnnouncements.ts";
import { RootState } from "../store/index.ts";
import UserPanelNav from "./Items/UserPanelNav";
import Announcement from "../../component/Items/Announcement";
import { fetchCurrentUser } from "../store/slices/authSlice";
import computer from "../../img/computer.jpg";

const MyAds: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user, isLoading: userLoading } = useSelector(
    (state: RootState) => state.auth
  );

  const [userLoaded, setUserLoaded] = useState(false);

  useEffect(() => {
    if (!user && !userLoading) {
      dispatch(fetchCurrentUser());
    } else if (user && !userLoaded) {
      setUserLoaded(true);
    }
  }, [dispatch, user, userLoading, userLoaded]);

  const {
    data: ads,
    isLoading,
    isError,
    error,
  } = useUserAnnouncements(user?._id || "");

  if (userLoading || !userLoaded) {
    return (
      <div className="flex flex-wrap lg:flex-nowrap max-w-7xl mx-auto px-4 gap-6 items-start">
        <div className="w-full lg:w-1/4 mb-6 lg:mb-0">
          <UserPanelNav />
        </div>

        <div className="w-full lg:w-3/4 flex flex-wrap justify-start gap-6 mt-6 lg:mt-0 pl-4">
          Ładowanie danych użytkownika...
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex flex-wrap lg:flex-nowrap max-w-7xl mx-auto px-4 gap-6 items-start">
        <div className="w-full lg:w-1/4 mb-6 lg:mb-0">
          <UserPanelNav />
        </div>

        <div className="w-full lg:w-3/4 flex flex-wrap justify-start gap-6 mt-6 lg:mt-0 pl-4">
          Ładowanie ogłoszeń...
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-wrap lg:flex-nowrap max-w-7xl mx-auto px-4 gap-6 items-start">
        <div className="w-full lg:w-1/4 mb-6 lg:mb-0">
          <UserPanelNav />
        </div>

        <div className="w-full lg:w-3/4 flex flex-wrap justify-start gap-6 mt-6 lg:mt-0 pl-4">
          Wystąpił błąd podczas pobierania ogłoszeń:{" "}
          {error instanceof Error ? error.message : "Nieznany błąd"}
        </div>
      </div>
    );
  }

  const announcements = ads?.announcements || ads;

  return (
    <div className="flex flex-wrap lg:flex-nowrap max-w-7xl mx-auto px-4 gap-6 items-start">
      <div className="w-full lg:w-1/4 mb-6 lg:mb-0">
        <UserPanelNav />
      </div>

      <div className="w-full lg:w-3/4 flex flex-wrap justify-start gap-6 mt-6 lg:mt-0 pl-4">
        {announcements && announcements.length > 0 ? (
          announcements.map((ad: any) => (
            <Announcement
              key={ad._id}
              offer={ad}
              category={ad.category}
              imageSrc={computer}
             
            />
          ))
        ) : (
          <div className="w-full flex justify-center items-center text-center text-xl text-gray-500 mt-8">
            Brak ogłoszeń do wyświetlenia.
          </div>
        )}
      </div>
    </div>
  );
};

export default MyAds;
