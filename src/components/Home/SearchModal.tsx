import { useState } from "react";
import { motion } from "framer-motion";

interface ISearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSearch: (tag: string) => Promise<void>;
  isSearching: boolean;
  searchError: string;
}

export const SearchModal = ({
  isOpen,
  onClose,
  onSearch,
  isSearching,
  searchError,
}: ISearchModalProps) => {
  const [buddyTag, setBuddyTag] = useState("");

  const handleSearch = () => {
    if (buddyTag.trim()) {
      onSearch(buddyTag);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && buddyTag.trim()) {
      handleSearch();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white p-8 rounded-lg shadow-xl"
      >
        <h2 className="text-2xl font-bold mb-4">Enter Buddy Tag</h2>
        <input
          type="text"
          value={buddyTag}
          onChange={(e) => setBuddyTag(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full p-2 border rounded mb-2"
          placeholder="Enter buddy tag..."
          autoFocus
        />
        {searchError && (
          <p className="text-red-500 text-sm mb-4">{searchError}</p>
        )}
        <div className="flex justify-end space-x-2">
          <button
            onClick={() => {
              setBuddyTag("");
              onClose();
            }}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Cancel
          </button>
          <button
            onClick={handleSearch}
            disabled={isSearching || !buddyTag}
            className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600 disabled:cursor-not-allowed"
          >
            {isSearching ? "Finding..." : "Chat"}
          </button>
        </div>
      </motion.div>
    </div>
  );
};
