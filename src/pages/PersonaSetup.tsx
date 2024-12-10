import { motion, AnimatePresence } from "framer-motion";

import { useState } from "react";

import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";

import { slideVariants } from "../utils/animationVariants";

import { IPersonaInputs, IPersonalityTrait } from "../types/PersonaTypes";

import { PERSONA_QUESTIONS } from "../constants/personaQuestions";

import { AvatarUpload } from "../components/PersonaSetup/AvatarUpload";
import { PersonalityTraitsInput } from "../components/PersonaSetup/PersonaTraits";

export function PersonaSetup() {
  // State management for current step, animation direction and user's persona inputs
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(0);

  const [inputs, setInputs] = useState<IPersonaInputs>({
    name: "",
    tagline: "",
    greeting: "",
    backstory: "",
    avatar: null,
    personalityTraits: [],
  });

  // Navigation handlers (move to next/prev step)
  const handleNext = () => {
    if (step < PERSONA_QUESTIONS.length - 1) {
      setDirection(1);
      setStep(step + 1);
    }
  };

  const handlePrev = () => {
    if (step > 0) {
      setDirection(-1);
      setStep(step - 1);
    }
  };

  // Handle key press events
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && step < PERSONA_QUESTIONS.length - 1) {
      handleNext();
    }
  };

  // Generic handler for text and textarea inputs
  const handleTextInputChange = (value: string) => {
    const currentQuestion = PERSONA_QUESTIONS[step];
    setInputs((prev) => ({
      ...prev,
      [currentQuestion.id]: value,
    }));
  };

  // Handler for avatar upload
  const handleAvatarChange = (file: File | null) => {
    setInputs((prev) => ({
      ...prev,
      avatar: file,
    }));
  };

  // Handler for personality traits selection
  const handleTraitToggle = (trait: IPersonalityTrait) => {
    setInputs((prev) => {
      const currentTraits = prev.personalityTraits;
      const newTraits = currentTraits.includes(trait)
        ? currentTraits.filter((t) => t !== trait)
        : [...currentTraits, trait];
      return { ...prev, personalityTraits: newTraits };
    });
  };

  // Render different input components based on question type
  const renderInputComponent = () => {
    const currentQuestion = PERSONA_QUESTIONS[step];

    switch (currentQuestion.type) {
      case "text":
        return (
          <input
            type="text"
            className="w-full text-5xl bg-transparent border-none outline-none focus:ring-0 text-indigo-600 dark:text-indigo-300 placeholder-indigo-300 dark:placeholder-indigo-600"
            placeholder={currentQuestion.placeholder}
            value={inputs[currentQuestion.id] as string}
            onChange={(e) => handleTextInputChange(e.target.value)}
            onKeyPress={handleKeyPress}
            autoFocus
          />
        );

      case "textarea":
        return (
          <textarea
            className="w-full p-4 text-2xl bg-white/10 backdrop-blur-md 
                       rounded-xl border-2 border-indigo-200 dark:border-indigo-700 
                       focus:border-indigo-500 outline-none min-h-[200px] 
                       resize-none text-indigo-600 dark:text-indigo-300"
            placeholder={currentQuestion.placeholder}
            value={inputs[currentQuestion.id] as string}
            onChange={(e) => handleTextInputChange(e.target.value)}
            autoFocus
          />
        );

      case "image":
        return (
          <AvatarUpload
            onAvatarChange={handleAvatarChange}
            currentAvatar={
              typeof inputs.avatar === "string" ? inputs.avatar : undefined
            }
          />
        );

      case "traits":
        return (
          <PersonalityTraitsInput
            selectedTraits={inputs.personalityTraits}
            onTraitToggle={handleTraitToggle}
          />
        );

      default:
        return null;
    }
  };

  return (
    <main className="h-screen flex flex-col bg-gradient-to-br from-indigo-50 to-pink-50 dark:from-indigo-900 dark:to-pink-900 overflow-hidden">
      {/* Progress Bar */}
      <motion.div
        className="h-1 bg-indigo-400 dark:bg-indigo-700 rounded-full"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: (step + 1) / PERSONA_QUESTIONS.length }}
        transition={{ duration: 0.5 }}
      />

      <div className="w-full max-w-6xl mx-auto px-4 py-8 flex-1 flex">
        <div className="w-2/3 pr-8 flex items-center">
          <div className="w-full relative">
            {/* AnimatePresence handles component mounting/unmounting animations */}
            <AnimatePresence initial={false} mode="wait" custom={direction}>
              <motion.div
                key={step}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="w-full"
              >
                {/* Dynamic question display */}
                <h2 className="text-4xl font-bold mb-8 text-indigo-900 dark:text-indigo-100">
                  {PERSONA_QUESTIONS[step].question}
                </h2>

                {/* Dynamic input rendering */}
                <div className="flex justify-center">
                  {renderInputComponent()}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Gif Container */}
        <div className="w-1/3 flex items-center justify-center">
          <iframe
            className="w-full h-96 max-w-md"
            src="https://lottie.host/embed/9fb0ec9e-d9a7-4bb3-98d1-996497f2ae5e/IeKDVPiKUJ.lottie"
          ></iframe>
        </div>
      </div>

      {/* Navigation Arrows */}
      <div className="fixed bottom-8 right-8 flex gap-4">
        {step > 0 && (
          <motion.button
            onClick={handlePrev}
            className="p-4 rounded-full bg-indigo-500 shadow-lg"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <MdNavigateBefore size={24} fill="white" />
          </motion.button>
        )}
        {step < PERSONA_QUESTIONS.length - 1 && (
          <motion.button
            onClick={handleNext}
            className="p-4 rounded-full bg-indigo-500 shadow-lg"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <MdNavigateNext size={24} fill="white" />
          </motion.button>
        )}
      </div>
    </main>
  );
}
