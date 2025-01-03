import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { motion } from "framer-motion";

import Logo from "../assets/botbuddy-logo.png";

import { BsSearch } from "react-icons/bs";
import { HiMiniUserPlus } from "react-icons/hi2";

import { BASE_URL, SECRET_KEY } from "../constants/config";

interface IModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSearch: (tag: string) => Promise<void>;
  isSearching: boolean;
  searchError: string;
}

const SearchModal = ({
  isOpen,
  onClose,
  onSearch,
  isSearching,
  searchError,
}: IModalProps) => {
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

const buddyService = {
  async searchByTag(tag: string) {
    const response = await fetch(`${BASE_URL}/api/v1/buddies/${tag}`, {
      headers: {
        "Content-Type": "application/json",
        "secret-key": SECRET_KEY,
      },
    });

    if (!response.ok) {
      throw new Error("Buddy not found");
    }

    return response.json();
  },
};

const Home = () => {
  const [showTagModal, setShowTagModal] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState("");
  const navigate = useNavigate();

  const handleCreatePersona = () => {
    navigate("/create");
  };

  const handleCloseModal = () => {
    setShowTagModal(false);
    setSearchError("");
  };

  const handleBuddySearch = async (buddyTag: string) => {
    const trimmedTag = buddyTag.trim();

    if (!trimmedTag) {
      setSearchError("Please enter a valid buddy tag");
      return;
    }

    setIsSearching(true);
    setSearchError("");

    try {
      const buddyData = await buddyService.searchByTag(buddyTag);
      handleCloseModal();
      navigate("/chat", { state: { buddyData } });
    } catch (error) {
      setSearchError("Could not find buddy with this tag");
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <main className="h-screen flex flex-col bg-gradient-to-br from-indigo-50 to-pink-50">
      <div className="w-full max-w-6xl mx-auto px-4 pt-8">
        <img src={Logo} alt="Bot Buddy Logo" className="w-40" />
      </div>

      <div className="w-full max-w-6xl mx-auto px-4 py-8 flex-1 flex">
        <div className="w-2/3 pr-8 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <h1 className="text-6xl font-bold text-indigo-900 leading-tight">
              Create Your Perfect
              <span className="block bg-gradient-to-r from-indigo-600 to-pink-500 text-transparent bg-clip-text">
                AI Companion
              </span>
            </h1>

            <p className="text-xl text-gray-800 max-w-xl">
              Design and chat with your personalized AI buddy. Choose their
              personality, backstory, purpose and watch them come to life.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-8 space-x-4"
          >
            <button
              onClick={handleCreatePersona}
              title="Create New Buddy"
              className="bg-indigo-500 text-white px-8 py-3 rounded-lg hover:bg-indigo-600 transition-colors"
            >
              <HiMiniUserPlus className="inline-block mr-2 fill-white" />
              Create New Buddy
            </button>

            <button
              onClick={() => setShowTagModal(true)}
              title="Search for your Buddy"
              className="bg-[#ca72c0] hover:bg-[#c164b6] text-white px-8 py-3 rounded-lg transition-colors"
            >
              <BsSearch className="inline-block mr-2 fill-white" />
              Find Your Buddy
            </button>
          </motion.div>
        </div>

        <div className="w-1/3 flex items-center justify-center">
          <iframe
            className="w-full h-96 max-w-md filter drop-shadow-2xl rounded-2xl"
            src="https://lottie.host/embed/9fb0ec9e-d9a7-4bb3-98d1-996497f2ae5e/IeKDVPiKUJ.lottie"
          ></iframe>
        </div>
      </div>

      <SearchModal
        isOpen={showTagModal}
        onClose={handleCloseModal}
        onSearch={handleBuddySearch}
        isSearching={isSearching}
        searchError={searchError}
      />
    </main>
  );
};

export default Home;
