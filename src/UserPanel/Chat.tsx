import React, { useState } from "react";
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

const Chat = () => {
  const userLinks = [
    { label: "Moje ogłoszenia", href: "/my-ads" },
    { label: "Moje zamówienia", href: "/my-orders" },
    { label: "Czat", href: "/chat" },
    { label: "Obserwowane", href: "/favorites" },
    { label: "Portfel", href: "/wallet" },
    { label: "Powiadomienia", href: "/notifications" },
    { label: "Pomoc", href: "/help" },
  ];

  const chats: ChatPreview[] = [
    { id: 1, name: "Jan Kowalski", lastMessage: "Dzięki, odezwę się jutro." },
    { id: 2, name: "Maria Nowak", lastMessage: "Czy oferta jest dalej aktualna?" },
    { id: 3, name: "Adam Zieliński", lastMessage: "Wysyłam dane do przelewu." },
  ];

  const [selectedChat, setSelectedChat] = useState<ChatPreview | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");

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

  return (
    <>
      <UserPanelNav items={userLinks}  matchBy="path"/>

      <div className="max-w-6xl mx-auto mt-6 flex flex-col md:flex-row gap-6 px-2">
        {/* Lewa kolumna: lista kontaktów */}
        <div className="md:w-1/3 w-full">
          <ChatSidebar
            chats={chats}
            onSelectChat={(chat) => {
              setSelectedChat(chat);
              setMessages([]);
            }}
          />
        </div>

        {/* Prawa kolumna: okno czatu */}
        <div className="md:w-2/3 w-full border border-gray-300 rounded-2xl shadow-md p-4 bg-white h-[600px] flex flex-col">
          {selectedChat ? (
            <>
              {/* Nagłówek */}
              <div className="border-b pb-2 mb-4">
                <p className="text-lg font-semibold text-gray-800">{selectedChat.name}</p>
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
                  onKeyDown={(e) => {
                    if (e.key === "Enter") sendMessage();
                  }}
                  className="flex-1 p-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
                <button
                  onClick={sendMessage}
                  className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition"
                >
                  Wyślij
                </button>
              </div>
            </>
          ) : (
            <p className="text-gray-500 text-center mt-48">Wybierz rozmowę, aby rozpocząć czat</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Chat;
