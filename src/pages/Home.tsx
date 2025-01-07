import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { BsSearch } from "react-icons/bs";
import { HiMiniUserPlus } from "react-icons/hi2";

import { motion } from "framer-motion";

import { BASE_URL, SECRET_KEY } from "../constants/config";

import { MainLayout } from "../layouts/MainLayout";

import { SearchModal } from "../components/Home/SearchModal";

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
    <MainLayout showLogo={true}>
      <div className="flex flex-col justify-center h-full">
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

      <SearchModal
        isOpen={showTagModal}
        onClose={handleCloseModal}
        onSearch={handleBuddySearch}
        isSearching={isSearching}
        searchError={searchError}
      />
    </MainLayout>
  );
};

export default Home;
