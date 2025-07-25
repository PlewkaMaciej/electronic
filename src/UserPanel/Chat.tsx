import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import UserPanelNav from "./Items/UserPanelNav";
import ChatSidebar from "./Items/ChatSideBar";
import { useUserConversations } from "../../hooks/useUserConversations";
import { useConversationMessages } from "../../hooks/useConversationMessages";
import ChatHeader from "../../component/ChatComponent/ChatHeader";
import ChatMessages from "../../component/ChatComponent/ChatMessages";
import ChatInput from "../../component/ChatComponent/ChatInput";
import { RootState } from "../store";


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
  const { user } = useSelector((state: RootState) => state.auth); // <- pobieramy usera z authSlice
  const currentUserId = user?._id || "";

  const { data: chats, isLoading } = useUserConversations();
  const token = localStorage.getItem("accessToken") || "";

  const [selectedChat, setSelectedChat] = useState<ChatPreview | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 768);
  const [chatPreviews, setChatPreviews] = useState<ChatPreview[]>([]);
  const [currentConversationId, setCurrentConversationId] = useState<string | null>(null);

  const {
    data: fetchedMessages,
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
            return {
              id: conv._id,
              partnerId,
              name: user.firstName,
              userLastName: user.lastName,
              lastMessage: conv.lastMessage || "Brak wiadomości",
              announcementTitle: announcement?.title || "",
              announcementImage:
                announcement?.images && announcement.images.length > 0
                  ? announcement.images[0]
                  : "",
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

    const tempMessage: Message = {
      _id: `temp-${Date.now()}`,
      senderId: {
        _id: currentUserId,
        firstName: user?.firstName || "Ty",
        lastName: user?.lastName || "",
      },
      text: newMessage,
      createdAt: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, tempMessage]);
    setNewMessage("");

    try {
      const response = await axios.post(
        "/chat/send-message",
        { conversationId: currentConversationId, text: newMessage },
        { headers: { Authorization: `Bearer ${token}` }, withCredentials: true }
      );

      const sentMessage = response.data.newMessage;
      setMessages((prev) =>
        prev.map((msg) => (msg._id === tempMessage._id ? sentMessage : msg))
      );
    } catch (error) {
      console.error("Błąd przy wysyłaniu wiadomości:", error);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row max-w-7xl mx-auto px-4 gap-6 items-start">
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
