import { useQuery } from "react-query";
import axios from "axios";

export const useConversationMessages = (conversationId: string) => {
  const token = localStorage.getItem("accessToken") || "";

  return useQuery({
    queryKey: ["conversationMessages", conversationId],
    queryFn: async () => {
      const res = await axios.get(`/chat/messages/${conversationId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      return res.data.messages;
    },
    enabled: !!conversationId,
  });
};
