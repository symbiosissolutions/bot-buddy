import { motion } from "framer-motion";

import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";

import { RiRobot3Line } from "react-icons/ri";
interface INavigationButtonsProps {
  step: number;
  totalSteps: number;
  onNext: () => void;
  onPrev: () => void;
  currentQuestionIndex: number;
  onCreateBuddy?: () => void;
  isCreatingBuddy?: boolean;
}

export const StepNavigationButtons = ({
  step,
  totalSteps,
  onNext,
  onPrev,
  currentQuestionIndex,
  onCreateBuddy,
  isCreatingBuddy,
}: INavigationButtonsProps) => {
  const isLastStep = currentQuestionIndex === totalSteps - 1;
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
      {!isLastStep && (
        <motion.button
          onClick={onNext}
          className="p-4 rounded-full bg-indigo-500 shadow-lg"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <MdNavigateNext size={24} fill="white" />
        </motion.button>
      )}

      {/* Create Buddy - only show if on last step */}
      {isLastStep && (
        <motion.button
          onClick={onCreateBuddy}
          disabled={isCreatingBuddy}
          className={`px-6 py-4 rounded-full shadow-lg flex items-center gap-2 text-white font-medium ${
            isCreatingBuddy
              ? "bg-indigo-300 cursor-not-allowed"
              : "bg-indigo-500"
          }`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <RiRobot3Line size={24} fill="white" />
          {isCreatingBuddy ? "Creating..." : "Create Buddy"}
        </motion.button>
      )}
    </div>
  );
};
