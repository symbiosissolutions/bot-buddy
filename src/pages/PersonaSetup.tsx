import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { motion, AnimatePresence } from "framer-motion";

import { slideVariants } from "../utils/animationVariants";
import { generateBuddyPrompt } from "../utils/promptGenerator";

import { IPersonaInputs, IPersonalityTrait } from "../types/PersonaTypes";

import { PERSONA_QUESTIONS } from "../constants/personaQuestions";
import { SECRET_KEY, BASE_URL } from "../constants/config";

import { AvatarUpload } from "../components/PersonaSetup/AvatarUpload";
import { PersonalityTraitsInput } from "../components/PersonaSetup/PersonaTraits";
import { StepNavigationButtons } from "../components/PersonaSetup/NavigationButtons";
import { FormError } from "../components/PersonaSetup/FormError";
import { TextInput } from "../components/PersonaSetup/TextInput";
import { TextAreaInput } from "../components/PersonaSetup/TextAreaInput";

import { PersonaFormData, personaSchema } from "../schemas/personaSchema";

import { MainLayout } from "../layouts/MainLayout";

export function PersonaSetup() {
  // State management for current step, animation direction and user's persona inputs
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(0);
  const [touchedFields, setTouchedFields] = useState<Set<number>>(new Set());
  const [isCreatingBuddy, setIsCreatingBuddy] = useState(false);
  const navigate = useNavigate();

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
      purpose: "",
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
    if (isCreatingBuddy) return;

    setIsCreatingBuddy(true);

    setTouchedFields((prev) => new Set(prev).add(step));
    const isValid = await trigger(PERSONA_QUESTIONS[step].id);

    if (!isValid) {
      setIsCreatingBuddy(false);
      return;
    }

    const formValues = watch();

    // Create FormData object
    const formData = new FormData();
    formData.append("name", formValues.name);
    formData.append("tagline", formValues.tagline);
    formData.append("greeting", formValues.greeting);
    formData.append("purpose", formValues.purpose);
    formData.append("backstory", formValues.backstory);

    formData.append(
      "personality_traits",
      formValues.personalityTraits.map((trait) => trait).join(","),
    );

    if (formValues.avatar) {
      formData.append("avatar", formValues.avatar);
    }

    try {
      const response = await fetch(`${BASE_URL}/api/v1/buddies/create`, {
        method: "POST",
        headers: {
          "secret-key": SECRET_KEY,
        },
        body: formData,
      });

      if (response.ok) {
        const buddyData = await response.json();
        const buddyPrompt = generateBuddyPrompt(formValues as IPersonaInputs);
        navigate("/chat", {
          state: {
            buddyPrompt,
            buddyData: buddyData,
          },
        });
      } else {
        console.error("Server error:", await response.text());
      }
    } catch (error) {
      console.error("Error creating buddy:", error);
    } finally {
      setIsCreatingBuddy(false);
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
    <MainLayout showLogo={true}>
      {/* Progress Bar */}
      <motion.div
        className="h-1 bg-indigo-400 rounded-full fixed left-0 right-0 top-0"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: (step + 1) / PERSONA_QUESTIONS.length }}
        transition={{ duration: 0.5 }}
      />
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
            <h2 className="text-4xl font-bold mb-8 text-indigo-900">
              {PERSONA_QUESTIONS[step].question}
            </h2>

            {/* Dynamic input rendering */}
            <div>{renderInputComponent()}</div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Arrows */}
      <StepNavigationButtons
        step={step}
        totalSteps={PERSONA_QUESTIONS.length}
        onNext={handleNext}
        onPrev={handlePrev}
        currentQuestionIndex={step}
        onCreateBuddy={handleCreateBuddy}
        isCreatingBuddy={isCreatingBuddy}
      />
    </MainLayout>
  );
}
