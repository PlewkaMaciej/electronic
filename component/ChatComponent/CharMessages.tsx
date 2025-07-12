interface Message {
  _id: string;
  senderId: string;
  text: string;
  createdAt: string;
}

interface ChatMessagesProps {
  messages: Message[];
}

const ChatMessages: React.FC<ChatMessagesProps> = ({ messages }) => {
  const userId = localStorage.getItem("userId");

  return (
    <div className="flex-1 overflow-y-auto space-y-2 mb-4 pr-2">
      {messages.length > 0 ? (
        messages.map((msg) => (
          <div
            key={msg._id}
            className={`max-w-[70%] p-2 rounded-xl text-sm ${
              msg.senderId === userId
                ? "bg-blue-100 text-right ml-auto"
                : "bg-gray-100"
            }`}
          >
            {msg.text}
          </div>
        ))
      ) : (
        <p className="text-gray-400">Brak wiadomości</p>
      )}
    </div>
  );
};

export default ChatMessages;
