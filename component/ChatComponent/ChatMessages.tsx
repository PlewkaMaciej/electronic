import React from "react";

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

interface ChatMessagesProps {
  messages: Message[];
  currentUserId: string;
}

const ChatMessages: React.FC<ChatMessagesProps> = ({ messages, currentUserId }) => {
  return (
    <div className="flex-1 overflow-y-auto space-y-2 mb-4 pr-2">
      {messages.length > 0 ? (
        messages.map((msg) => {
          const isOwn = msg.senderId._id.toString() === currentUserId.toString();
          
          console.log(currentUserId)
          return (
            <div
              key={msg._id}
              className={`flex ${isOwn ? "justify-start" : "justify-end"}`}
            >
              <div
                className={`max-w-[70%] p-2 rounded-xl text-sm ${
                  isOwn
                    ? "bg-blue-500 text-white rounded-bl-none"
                    : "bg-gray-200 text-black rounded-br-none"
                }`}
              >
                {msg.text}
              </div>
            </div>
          );
        })
      ) : (
        <p className="text-gray-400">Brak wiadomości</p>
      )}
    </div>
  );
};

export default ChatMessages;
