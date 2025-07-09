import React, { useState } from "react";

interface ChatPreview {
  id: string;  
  name: string;
  lastMessage: string;
}


interface ChatSidebarProps {
  chats: ChatPreview[];
  onSelectChat: (chat: ChatPreview) => void;
}

const ChatSidebar: React.FC<ChatSidebarProps> = ({ chats, onSelectChat }) => {
  const [search, setSearch] = useState("");

  const filteredChats = chats.filter((chat) =>
    chat.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-full border border-gray-300 p-4 bg-white rounded-2xl shadow-md">
      <p className="text-lg font-semibold text-gray-800 mb-3">Szukaj kontaktu:</p>
      <input
        type="text"
        placeholder="Wpisz nazwę..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full mb-4 p-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300"
      />

      <div className="space-y-3 max-h-[400px] overflow-y-auto">
        {filteredChats.length > 0 ? (
          filteredChats.map((chat) => (
            <div
              key={chat.id}
              onClick={() => onSelectChat(chat)}
              className="p-3 rounded-xl hover:bg-gray-100 cursor-pointer transition"
            >
              <p className="font-medium text-gray-800">{chat.name}</p>
              <p className="text-sm text-gray-500 truncate">{chat.lastMessage}</p>
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-400">Brak wyników</p>
        )}
      </div>
    </div>
  );
};

export default ChatSidebar;
