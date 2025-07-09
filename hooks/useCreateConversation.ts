import { useMutation, useQueryClient } from "react-query";
import axios from "axios";

interface CreateConversationData {
  recipientId: string;
  productId: string;
}

interface Conversation {
  _id: string;
  members: string[];
  productId: string;
  createdAt: string;
  updatedAt: string;
}

interface ConversationResponse {
  message: string;
  conversation: Conversation;
}

export const useCreateConversation = () => {
  const queryClient = useQueryClient();

  return useMutation<ConversationResponse, Error, CreateConversationData>(
    async ({ recipientId, productId }) => {
      const token = localStorage.getItem("accessToken");
      console.log(token);
      if (!token) {
        throw new Error("Brak tokena. Użytkownik nie jest zalogowany.");
      }

      const { data } = await axios.post<ConversationResponse>(
        "/chat/create-conversation",
        { recipientId, productId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("conversations");
      },
      onError: (error) => {
        console.error("❌ Błąd tworzenia konwersacji:", error.message);
      },
    }
  );
};
