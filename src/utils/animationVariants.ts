import { Variants } from "framer-motion";

// Create animation variants for sliding questions
export const slideVariants: Variants = {
  enter: (direction: number) => ({
    // Slide in from right or left based on direction
    x: direction > 0 ? 1000 : -1000,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      type: "spring",
      stiffness: 300,
      damping: 30,
    },
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 1000 : -1000,
    opacity: 0,
  }),
};
