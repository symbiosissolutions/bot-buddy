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
  purpose: string;
  backstory: string;
  avatar: File | string | null;
  personalityTraits: IPersonalityTrait[];
}

// Backend response interface
export interface IBuddyResponse {
  name: string;
  tagline: string;
  greeting: string;
  purpose: string;
  backstory: string;
  avatar?: string;
  personality_traits: string[];
  buddy_tag: string;
}

// Define the question structure
export interface IPersonaQuestion {
  id: keyof IPersonaInputs;
  question: string;
  type: "text" | "textarea" | "image" | "traits";
  placeholder?: string;
}
