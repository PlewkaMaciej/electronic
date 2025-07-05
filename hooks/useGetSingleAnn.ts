import { useQuery } from "react-query";
import axios from "axios";

const fetchSingleAnnouncement = async (id: string) => {
  if (!id) {
    throw new Error("Brak ID ogłoszenia");
  }
  const response = await axios.get(`/announcements/getSingleAnn/${id}`);
  return response.data.announcement; // zakładam, że backend zwraca { announcement: {...} }
};

export const useSingleAnnouncement = (id: string) => {
  return useQuery(
    ["singleAnnouncement", id],
    () => fetchSingleAnnouncement(id),
    {
      enabled: !!id,
      onError: (error) => {
        console.error("Error fetching announcement:", error);
      },
    }
  );
};
