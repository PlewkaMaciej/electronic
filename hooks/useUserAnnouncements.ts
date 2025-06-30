import { useQuery } from "react-query";
import api from "../src/api/axios";

async function fetchUserAnnouncements(userId: string): Promise<any[]> {
  if (!userId) throw new Error("Brak ID użytkownika");
  const { data } = await api.get<{ announcements: any[] }>(
    `/announcements/user/${userId}`
  );
  return data.announcements;
}

export const useUserAnnouncements = (userId: string) => {
  return useQuery(
    ["userAnnouncements", userId],
    () => fetchUserAnnouncements(userId),
    {
      enabled: !!userId,
      refetchOnMount: true,
    }
  );
};
