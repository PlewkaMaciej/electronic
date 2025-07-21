import React, { useState, useEffect } from "react";
import axios from "axios";
import UserPanelNav from "./Items/UserPanelNav";
import ChatSidebar from "./Items/ChatSideBar";
import { useUserConversations } from "../../hooks/useUserConversations";
import { useConversationMessages } from "../../hooks/useConversationMessages";
import ChatHeader from "../../component/ChatComponent/ChatHeader";
import ChatMessages from "../../component/ChatComponent/ChatMessages";
import ChatInput from "../../component/ChatComponent/ChatInput";

export interface ChatPreview {
  id: string;
  name: string;
  userLastName?: string;
  lastMessage: string;
  announcementTitle?: string;
  announcementImage?: string;
  partnerId?: string;
}

interface Message {
  _id: string;
  senderId: {
    _id: string;
    firstName: string;
    lastName: string;
  };
  text: string;
  createdAt: string;
}

const Chat: React.FC = () => {
  const { data: chats, isLoading } = useUserConversations();

  // Pobierz token i userId z localStorage zamiast z Reduxa
  const token = localStorage.getItem("accessToken") || "";
  const currentUserId = localStorage.getItem("userId") || "";

  const [selectedChat, setSelectedChat] = useState<ChatPreview | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 768);
  const [chatPreviews, setChatPreviews] = useState<ChatPreview[]>([]);
  const [currentConversationId, setCurrentConversationId] = useState<string | null>(null);

  const {
    data: fetchedMessages,
    refetch,
    isLoading: loadingMessages,
  } = useConversationMessages(currentConversationId || "");

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (fetchedMessages) {
      setMessages(fetchedMessages);
    }
  }, [fetchedMessages]);

  useEffect(() => {
    const fetchChatUsers = async () => {
      if (!chats) return;

      const previews = await Promise.all(
        chats.map(async (conv: any) => {
          // znajdź ID partnera - drugi użytkownik w konwersacji
          const partnerId = conv.members.find((id: string) => id !== currentUserId);
          const productId = conv.productId;

          try {
            const [userRes, annRes] = await Promise.all([
              axios.get(`/users/${partnerId}`, {
                headers: { Authorization: `Bearer ${token}` },
                withCredentials: true,
              }),
              productId
                ? axios.get(`/announcements/getSingleAnn/${productId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                    withCredentials: true,
                  })
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
              partnerId,
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
              partnerId: "",
              name: "Nieznany użytkownik",
              lastMessage: conv.lastMessage || "Brak wiadomości",
            };
          }
        })
      );

      setChatPreviews(previews);
    };

    fetchChatUsers();
  }, [chats, currentUserId, token]);

  const handleSelectChat = (chat: ChatPreview) => {
    setSelectedChat(chat);
    setCurrentConversationId(chat.id);
  };

  const handleBack = () => {
    setSelectedChat(null);
    setMessages([]);
    setCurrentConversationId(null);
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || !currentConversationId) return;

    try {
      const response = await axios.post(
        "/chat/send-message",
        {
          conversationId: currentConversationId,
          text: newMessage,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );

      const sentMessage = response.data.newMessage;
      setMessages((prev) => [...prev, sentMessage]);
      setNewMessage("");
    } catch (error) {
      console.error("Błąd przy wysyłaniu wiadomości:", error);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row max-w-7xl mx-auto px-4 gap-6 items-start">
      {/* Panel sterowania */}
      <div className="w-full lg:w-1/4">
        <UserPanelNav />
      </div>

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
            partnerId={selectedChat.partnerId}
          />

          {loadingMessages ? (
            <p className="text-gray-400">Ładowanie wiadomości...</p>
          ) : (
            <ChatMessages messages={messages} currentUserId={currentUserId} />
          )}

          <ChatInput newMessage={newMessage} onChange={setNewMessage} onSend={sendMessage} />
        </div>
      )}
    </div>
  );
};

export default Chat;
