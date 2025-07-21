import { useQuery } from "react-query";
import axios from "axios";

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: number;
  joiningDate: string;
  // Dodaj więcej pól jeśli potrzebujesz (np. avatar, phone, itp.)
}

const fetchUserById = async (id: string): Promise<User> => {
  if (!id) {
    throw new Error("Brak ID użytkownika");
  }
  const response = await axios.get(`/users/${id}`);
  return response.data.user; // zakładam, że backend zwraca { user: {...} }
};

export const useUserById = (id: string) => {
  return useQuery(["userById", id], () => fetchUserById(id), {
    enabled: !!id,
    onError: (error) => {
      console.error("Błąd podczas pobierania użytkownika:", error);
    },
  });
};
