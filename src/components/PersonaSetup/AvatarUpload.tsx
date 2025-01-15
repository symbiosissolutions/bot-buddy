import { useRef, useState } from "react";

import { motion } from "framer-motion";

import { BiX } from "react-icons/bi";
import { FcOldTimeCamera } from "react-icons/fc";

interface IAvatarUploadProps {
  onAvatarChange: (file: File | null) => void;
  currentAvatar?: string | null;
}

export const AvatarUpload = ({
  onAvatarChange,
  currentAvatar,
}: IAvatarUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    currentAvatar || null,
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
        onAvatarChange(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveAvatar = () => {
    setPreviewUrl(null);
    onAvatarChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />

      <motion.div
        className={`
          w-64 h-64 rounded-full border-4 border-dashed flex items-center 
          justify-center relative
          ${
            previewUrl
              ? "border-indigo-500"
              : "border-indigo-200 hover:border-indigo-400"
          }
        `}
        whileHover={!previewUrl ? { scale: 1.05 } : {}}
        onClick={() => !previewUrl && fileInputRef.current?.click()}
      >
        {previewUrl ? (
          <>
            <div className="w-full h-full rounded-full overflow-hidden">
              <img
                src={previewUrl}
                alt="Avatar preview"
                className="w-full h-full object-cover"
              />
            </div>

            <motion.button
              className="absolute top-2 right-2 flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 text-white rounded-full w-12 h-12 shadow-xl"
              onClick={handleRemoveAvatar}
              aria-label="Remove avatar"
              title="Remove avatar"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <BiX size={24} fill="white" />
            </motion.button>
          </>
        ) : (
          <div className="flex flex-col items-center text-indigo-400 hover:cursor-pointer">
            <FcOldTimeCamera size={48} />
            <span className="mt-2">Upload Avatar</span>
          </div>
        )}
      </motion.div>
    </div>
  );
};
