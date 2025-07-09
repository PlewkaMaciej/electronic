import React from "react";

interface ChatInputProps {
  newMessage: string;
  onChange: (val: string) => void;
  onSend: () => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ newMessage, onChange, onSend }) => {
  return (
    <div className="flex items-center border-t pt-3">
      <input
        type="text"
        placeholder="Napisz wiadomość..."
        value={newMessage}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && onSend()}
        className="flex-1 p-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300"
      />
      <button
        onClick={onSend}
        className="ml-3 px-3 py-1 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition text-sm"
      >
        Wyślij
      </button>
    </div>
  );
};

export default ChatInput;
