import { motion } from "framer-motion";

import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";

import { INavigationButtonsProps } from "../../types/PersonaTypes";

import { RiRobot3Line } from "react-icons/ri";

export const StepNavigationButtons = ({
  step,
  totalSteps,
  onNext,
  onPrev,
  currentQuestionIndex,
  onCreateBuddy,
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
          className="px-6 py-4 rounded-full bg-indigo-500 shadow-lg flex items-center gap-2 text-white font-medium"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <RiRobot3Line size={24} fill="white" />
          Create Buddy
        </motion.button>
      )}
    </div>
  );
};
