import { useQuery } from "react-query";
import axios from "axios";

const fetchUserAnnouncements = async (userId: string) => {
  if (!userId) {
    throw new Error("Brak ID użytkownika");
  }

  console.log("Fetching announcements for user:", userId);
  const response = await axios.get(`/announcements/user/${userId}`);
  console.log("Fetched announcements:", response.data);
  return response.data;
};

export const useUserAnnouncements = (userId: string) => {
  console.log("useUserAnnouncements called with userId:", userId); // Zalogowanie, kiedy funkcja jest wywoływana
  return useQuery(
    ["userAnnouncements", userId],
    () => fetchUserAnnouncements(userId),
    {
      enabled: !!userId, // Zapytanie tylko, jeśli userId jest dostępne
      onError: (error) => {
        console.error("Error fetching announcements:", error); // Logowanie błędów
      },
    }
  );
};
