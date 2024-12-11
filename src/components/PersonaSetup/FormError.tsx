import { motion } from "framer-motion";

import { BiSolidError } from "react-icons/bi";

interface IFormErrorProps {
  message: string;
}

export const FormError = ({ message }: IFormErrorProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-8 px-4 py-3 rounded-lg shadow-sm border border-indigo-400 ring-1 ring-indigo-400 bg-indigo-100"
    >
      <p className="text-lg font-bold text-indigo-950 flex items-center gap-2">
        <BiSolidError size={28} fill="#DD4E5E" />
        {message}
      </p>
    </motion.div>
  );
};
