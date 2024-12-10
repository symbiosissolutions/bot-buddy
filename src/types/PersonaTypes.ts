// Define personality traits
export type IPersonalityTrait =
  | "Funny"
  | "Sarcastic"
  | "Serious"
  | "Curious"
  | "Empathetic"
  | "Adventurous"
  | "Analytical"
  | "Creative";

// Define the structure of user inputs for persona creation
export interface IPersonaInputs {
  name: string;
  tagline: string;
  greeting: string;
  backstory: string;
  avatar: File | string | null;
  personalityTraits: IPersonalityTrait[];
}

// Define the question structure
export interface IPersonaQuestion {
  id: keyof IPersonaInputs;
  question: string;
  type: "text" | "textarea" | "image" | "traits";
  placeholder?: string;
}

// Props interface for navigation buttons
export interface INavigationButtonsProps {
  step: number;
  totalSteps: number;
  onNext: () => void;
  onPrev: () => void;
}
