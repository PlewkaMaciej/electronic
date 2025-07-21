import { useSelector } from "react-redux";
import { RootState } from "../../src/store";
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
    currentUserId: string;  // dodaj to!

}

const ChatMessages: React.FC<ChatMessagesProps> = ({ messages }) => {
  const userId = useSelector((state: RootState) => state.auth.user?._id);

  return (
    <div className="flex-1 overflow-y-auto space-y-2 mb-4 pr-2">
      {messages.length > 0 ? (
        messages.map((msg) => {
          const isOwnMessage = msg.senderId._id === userId;

          return (
            <div
              key={msg._id}
              className={`flex ${isOwnMessage ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[70%] p-2 rounded-xl text-sm ${
                  isOwnMessage
                    ? "bg-blue-500 text-white rounded-br-none"
                    : "bg-gray-200 text-black rounded-bl-none"
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
