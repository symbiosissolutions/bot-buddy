import { useEffect, useRef } from "react";

import { BiSolidSend, BiSolidTrashAlt } from "react-icons/bi";

import { IChatInputProps } from "../../types/ChatTypes";

export const ChatInput = ({
  userInput,
  onInputChange,
  onSubmit,
  onClear,
  isLoading,
}: IChatInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [isLoading]);

  const handleClear = () => {
    onClear();
    inputRef.current?.focus();
  };

  return (
    <form
      onSubmit={onSubmit}
      className="flex gap-3 p-4 bg-white/90 rounded-xl shadow-lg"
    >
      <input
        ref={inputRef}
        type="text"
        value={userInput}
        onChange={(e) => onInputChange(e.target.value)}
        disabled={isLoading}
        placeholder="Ask your buddy..."
        className="flex-1 px-4 py-2 rounded-lg border-1 border-indigo-200 focus:border-indigo-500 outline-none transition-colors disabled:bg-gray-100"
      />
      <button
        type="submit"
        disabled={isLoading || !userInput.trim()}
        title="Send Message"
        className="px-6 py-2 bg-[#729bfc] hover:bg-[#5788fa] text-white rounded-lg transition-colors disabled:bg-[#729bfc] disabled:cursor-not-allowed flex items-center gap-2"
      >
        Send
        <BiSolidSend className="text-lg fill-white" />
      </button>
      <button
        type="button"
        onClick={handleClear}
        title="Clear Chat"
        className="px-4 py-2 bg-[#da87d1] hover:bg-[#ca72c0] text-white rounded-lg transition-colors flex items-center gap-2"
      >
        Clear
        <BiSolidTrashAlt className="text-lg fill-white" />
      </button>
    </form>
  );
};
