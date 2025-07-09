// src/hooks/useUserConversations.ts
import { useQuery } from "react-query";
import axios from "axios";

export interface Conversation {
  _id: string;
  members: string[];
  lastMessage?: string;
  productId: string;
  createdAt: string;
  updatedAt: string;
}

export const useUserConversations = () => {
  return useQuery<Conversation[], Error>(
    ["userConversations"],
    async () => {
      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("Brak tokena. Użytkownik nie jest zalogowany.");

      const { data } = await axios.get<Conversation[]>(
        "/chat/user",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return data;  // <-- tutaj zwracamy całą tablicę conversations
    },
    {
      staleTime: 1000 * 60 * 5,
      onError: (err) => console.error("❌ Błąd ładowania konwersacji:", err),
    }
  );
};
