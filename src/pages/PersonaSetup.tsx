import { motion, AnimatePresence } from "framer-motion";

import { useState } from "react";

import { slideVariants } from "../utils/animationVariants";

import { IPersonalityTrait } from "../types/PersonaTypes";

import { PERSONA_QUESTIONS } from "../constants/personaQuestions";

import { AvatarUpload } from "../components/PersonaSetup/AvatarUpload";
import { PersonalityTraitsInput } from "../components/PersonaSetup/PersonaTraits";
import { StepNavigationButtons } from "../components/PersonaSetup/NavigationButtons";
import { FormError } from "../components/PersonaSetup/FormError";
import { TextInput } from "../components/PersonaSetup/TextInput";
import { TextAreaInput } from "../components/PersonaSetup/TextAreaInput";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { PersonaFormData, personaSchema } from "../schemas/personaSchema";


export function PersonaSetup() {
  // State management for current step, animation direction and user's persona inputs
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(0);
  const [touchedFields, setTouchedFields] = useState<Set<number>>(new Set());

  const {
    register,
    setValue,
    watch,
    trigger,
    formState: { errors },
  } = useForm<PersonaFormData>({
    resolver: zodResolver(personaSchema),
    defaultValues: {
      name: "",
      tagline: "",
      greeting: "",
      backstory: "",
      avatar: null,
      personalityTraits: [],
    },
  });

  // Navigation handlers (move to next/prev step)
  const handleNext = async () => {
    setTouchedFields((prev) => new Set(prev).add(step));
    const currentField = PERSONA_QUESTIONS[step].id;
    const isValid = await trigger(currentField);
    if (isValid && step < PERSONA_QUESTIONS.length - 1) {
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
  const handleKeyPress = async (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && step < PERSONA_QUESTIONS.length - 1) {
      e.preventDefault();
      await handleNext();
    }
  };

  // Generic handler for text and textarea inputs
  const handleTextInputChange = (
    value: string,
    fieldName: keyof PersonaFormData,
  ) => {
    setValue(fieldName, value, {
      shouldValidate: true,
    });
  };

  // Handler for avatar upload
  const handleAvatarChange = (file: File | null) => {
    setValue("avatar", file, {
      shouldValidate: true,
    });
  };

  // Handler for personality traits selection
  const handleTraitToggle = (trait: IPersonalityTrait) => {
    const currentTraits = watch("personalityTraits");
    const newTraits = currentTraits.includes(trait)
      ? currentTraits.filter((t) => t !== trait)
      : [...currentTraits, trait];
    setValue("personalityTraits", newTraits, {
      shouldValidate: true,
    });
  };

  const handleCreateBuddy = async () => {
    setTouchedFields((prev) => new Set(prev).add(step));
    const isValid = await trigger(PERSONA_QUESTIONS[step].id);
    if (isValid) {
      const formData = watch();
      console.log("Creating Buddy with data:", formData);
    }
  };

  // Render different input components based on question type
  const renderInputComponent = () => {
    const currentQuestion = PERSONA_QUESTIONS[step];

    switch (currentQuestion.type) {
      case "text":
        return (
          <TextInput
            id={currentQuestion.id as keyof PersonaFormData}
            register={register}
            placeholder={currentQuestion.placeholder || ""}
            handleTextInputChange={handleTextInputChange}
            handleKeyPress={handleKeyPress}
            error={errors[
              currentQuestion.id as keyof PersonaFormData
            ]?.message?.toString()}
            showError={touchedFields.has(step)}
          />
        );

      case "textarea":
        return (
          <TextAreaInput
            id={currentQuestion.id as keyof PersonaFormData}
            register={register}
            placeholder={currentQuestion.placeholder || ""}
            handleTextInputChange={handleTextInputChange}
            error={errors[
              currentQuestion.id as keyof PersonaFormData
            ]?.message?.toString()}
            showError={touchedFields.has(step)}
          />
        );

      case "image":
        return (
          <AvatarUpload
            onAvatarChange={handleAvatarChange}
            // Generate a preview URL for the uploaded avatar file
            currentAvatar={
              watch("avatar") instanceof File
                ? URL.createObjectURL(watch("avatar"))
                : null
            }
          />
        );

      case "traits":
        return (
          <>
            <PersonalityTraitsInput
              selectedTraits={watch("personalityTraits") as IPersonalityTrait[]}
              onTraitToggle={handleTraitToggle}
            />
            {errors.personalityTraits && touchedFields.has(step) && (
              <FormError message={errors.personalityTraits.message || ""} />
            )}
          </>
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
                <div>{renderInputComponent()}</div>
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
      <StepNavigationButtons
        step={step}
        totalSteps={PERSONA_QUESTIONS.length}
        onNext={handleNext}
        onPrev={handlePrev}
        currentQuestionIndex={step}
        onCreateBuddy={handleCreateBuddy}
      />
    </main>
  );
}
