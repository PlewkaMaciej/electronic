import React, { useState, useEffect } from "react";
import UserPanelNav from "./Items/UserPanelNav";
import ChatSidebar from "./Items/ChatSideBar";

interface ChatPreview {
  id: number;
  name: string;
  lastMessage: string;
}

interface Message {
  id: number;
  sender: "me" | "them";
  content: string;
}

const Chat: React.FC = () => {
  const chats: ChatPreview[] = [
    { id: 1, name: "Jan Kowalski", lastMessage: "Dzięki, odezwę się jutro." },
    {
      id: 2,
      name: "Maria Nowak",
      lastMessage: "Czy oferta jest dalej aktualna?",
    },
    { id: 3, name: "Adam Zieliński", lastMessage: "Wysyłam dane do przelewu." },
  ];

  const [selectedChat, setSelectedChat] = useState<ChatPreview | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
    
      {(!isMobile || !selectedChat) && (
        <div className="w-full  mt-6 max-w-[250px] overflow-y-auto">
          <ChatSidebar chats={chats} onSelectChat={handleSelectChat} />
        </div>
      )}

      {/* Okno rozmowy */}
      {selectedChat && (
        <div className="w-full   mt-6 md:w-3/4 max-w-[600px] border border-gray-300 rounded-2xl shadow-md p-4 bg-white h-[70vh] flex flex-col">
          {/* Pasek górny */}
          <div className="border-b pb-2 mb-4 flex items-center justify-between">
            {isMobile && (
              <button
                onClick={handleBack}
                className="text-blue-500 font-semibold text-sm"
              >
                ← Wróć
              </button>
            )}
            <p className="text-lg font-semibold text-gray-800 mx-auto md:mx-0">
              {selectedChat.name}
            </p>
          </div>

          {/* Historia wiadomości */}
          <div className="flex-1 overflow-y-auto space-y-2 mb-4 pr-2">
            {messages.length > 0 ? (
              messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`max-w-[70%] p-2 rounded-xl text-sm ${
                    msg.sender === "me"
                      ? "bg-blue-100 text-right ml-auto"
                      : "bg-gray-100"
                  }`}
                >
                  {msg.content}
                </div>
              ))
            ) : (
              <p className="text-gray-400">Brak wiadomości</p>
            )}
          </div>

          {/* Pole do pisania */}
          <div className="flex items-center border-t pt-3">
            <input
              type="text"
              placeholder="Napisz wiadomość..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              className="flex-1 p-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <button
              onClick={sendMessage}
              className="ml-3 px-3 py-1 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition text-sm"
            >
              Wyślij
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chat;
