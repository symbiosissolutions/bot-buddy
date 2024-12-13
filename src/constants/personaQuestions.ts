import { IPersonaQuestion } from '../types/PersonaTypes';

export const PERSONA_QUESTIONS: IPersonaQuestion[] = [
  {
    id: "name",
    question: "What's your persona's name?",
    type: "text",
    placeholder: "Enter a unique name..."
  },
  {
    id: "tagline",
    question: "Create a catchy tagline",
    type: "textarea",
    placeholder: "A short, memorable description, like 'The Bravest Knight in Rainbow Land!'"
  },
  {
    id: "greeting",
    question: "Write a signature greeting",
    type: "textarea",
    placeholder: "Something fun, like 'Howdy, Partner!' or 'Greetings earthlings!'"
  },
  {
    id: "backstory",
    question: "Write a brief backstory",
    type: "textarea",
    placeholder: "Were they a secret agent? Did they live in a magical land? What kind of adventures did they have?"
  },
  {
    id: "avatar",
    question: "Choose an avatar",
    type: "image",
    placeholder: "What does this character look like?"
  },
  {
    id: "personalityTraits",
    question: "Select personality traits",
    type: "traits",
    placeholder: "Pick traits that define your persona"
  }
];