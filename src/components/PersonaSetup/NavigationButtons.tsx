import { motion } from "framer-motion";

import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";

import { INavigationButtonsProps } from "../../types/PersonaTypes";

export const StepNavigationButtons: React.FC<INavigationButtonsProps> = ({
  step,
  totalSteps,
  onNext,
  onPrev,
}) => {
  return (
    <div className="fixed bottom-8 right-8 flex gap-4">
      {/* Previous button - only show if not on first step */}
      {step > 0 && (
        <motion.button
          onClick={onPrev}
          className="p-4 rounded-full bg-indigo-500 shadow-lg"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <MdNavigateBefore size={24} fill="white" />
        </motion.button>
      )}

      {/* Next button - only show if not on last step */}
      {step < totalSteps - 1 && (
        <motion.button
          onClick={onNext}
          className="p-4 rounded-full bg-indigo-500 shadow-lg"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <MdNavigateNext size={24} fill="white" />
        </motion.button>
      )}
    </div>
  );
};
