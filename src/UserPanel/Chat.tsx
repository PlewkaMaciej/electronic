import React, { useState, useEffect } from "react";
import axios from "axios";
import UserPanelNav from "./Items/UserPanelNav";
import ChatSidebar from "./Items/ChatSideBar";
import { useUserConversations } from "../../hooks/useUserConversations";
import ChatHeader from "../../component/ChatComponent/ChatHeader"
import ChatMessages from "../../component/ChatComponent/CharMessages"
import ChatInput from "../../component/ChatComponent/ChatInput"

interface ChatPreview {
  id: string;
  name: string;
  lastMessage: string;
  announcementTitle?: string;
  announcementImage?: string;
  userLastName?: string;
}

interface Message {
  id: number;
  sender: "me" | "them";
  content: string;
}

const Chat: React.FC = () => {
  const { data: chats, isLoading } = useUserConversations();
  const userId = localStorage.getItem("userId") || "";

  const [selectedChat, setSelectedChat] = useState<ChatPreview | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 768);
  const [chatPreviews, setChatPreviews] = useState<ChatPreview[]>([]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchChatUsers = async () => {
      if (!chats) return;

      const previews = await Promise.all(
        chats.map(async (conv: any) => {
          const partnerId = conv.members.find((id: string) => id !== userId);
          const productId = conv.productId;

          try {
            const [userRes, annRes] = await Promise.all([
              axios.get(`/users/${partnerId}`),
              productId
                ? axios.get(`/announcements/getSingleAnn/${productId}`)
                : Promise.resolve({ data: { announcement: null } }),
            ]);

            const user = userRes.data.user;
            const announcement = annRes.data.announcement;
            const fullName = `${user.firstName}`;
            const lastName = user.lastName;
            const announcementTitle = announcement?.title || "";
            const announcementImage =
              announcement?.images && announcement.images.length > 0
                ? announcement.images[0]
                : "";

            return {
              id: conv._id,
              name: fullName,
              userLastName: lastName,
              lastMessage: conv.lastMessage || "Brak wiadomości",
              announcementTitle,
              announcementImage,
            };
          } catch (error) {
            console.error("Błąd przy pobieraniu danych rozmowy:", error);
            return {
              id: conv._id,
              name: "Nieznany użytkownik",
              lastMessage: conv.lastMessage || "Brak wiadomości",
            };
          }
        })
      );

      setChatPreviews(previews);
    };

    fetchChatUsers();
  }, [chats, userId]);

  const sendMessage = () => {
    if (!newMessage.trim()) return;
    const newMsg: Message = {
      id: Date.now(),
      sender: "me",
      content: newMessage.trim(),
    };
    setMessages((prev) => [...prev, newMsg]);
    setNewMessage("");
  };

  const handleBack = () => {
    setSelectedChat(null);
    setMessages([]);
  };

  const handleSelectChat = (chat: ChatPreview) => {
    setSelectedChat(chat);

    // Tutaj możesz dodać pobieranie wiadomości z API
    setMessages([
      {
        id: 1,
        sender: "them",
        content: "Cześć, jestem zainteresowany ogłoszeniem.",
      },
      { id: 2, sender: "them", content: "Czy nadal jest dostępne?" },
      { id: 3, sender: "me", content: "Tak, ogłoszenie jest aktualne." },
    ]);
  };

  return (
    <div className="flex flex-col lg:flex-row max-w-7xl mx-auto px-4 gap-6 items-start">
      {/* Panel sterowania */}
      <div className="w-full lg:w-1/4">
        <UserPanelNav />
      </div>

      {/* Sidebar z czatami */}
      {(!isMobile || !selectedChat) && (
        <div className="w-full mt-6 max-w-[250px] overflow-y-auto">
          {isLoading ? (
            <p>Ładowanie...</p>
          ) : (
            <ChatSidebar chats={chatPreviews} onSelectChat={handleSelectChat} />
          )}
        </div>
      )}

      {/* Okno rozmowy */}
      {selectedChat && (
        <div className="w-full mt-6 md:w-3/4 max-w-[600px] border border-gray-300 rounded-2xl shadow-md p-4 bg-white h-[70vh] flex flex-col">
          <ChatHeader
            isMobile={isMobile}
            onBack={handleBack}
            userName={selectedChat.name}
            userLastName={selectedChat.userLastName}
            productTitle={selectedChat.announcementTitle}
            productImage={selectedChat.announcementImage}
          />

          <ChatMessages messages={messages} />

          <ChatInput
            newMessage={newMessage}
            onChange={setNewMessage}
            onSend={sendMessage}
          />
        </div>
      )}
    </div>
  );
};

export default Chat;
