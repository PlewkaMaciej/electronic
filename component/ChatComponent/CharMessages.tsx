import React from "react";

interface Message {
  id: number;
  sender: "me" | "them";
  content: string;
}

interface ChatMessagesProps {
  messages: Message[];
}

const ChatMessages: React.FC<ChatMessagesProps> = ({ messages }) => {
  return (
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
  );
};

export default ChatMessages;
