import { IPersonaInputs } from "../types/PersonaTypes";
import { BUDDY_PROMPT_TEMPLATE } from "../prompts/promptTemplate";

export function generateBuddyPrompt(personaData: IPersonaInputs): string {
  // Takes the base template and replaces placeholder tokens with user input values

  return BUDDY_PROMPT_TEMPLATE.replace("{{CHARACTER_NAME}}", personaData.name)
    .replace("{{CHARACTER_TAGLINE}}", personaData.tagline)
    .replace("{{CHARACTER_GREETING}}", personaData.greeting)
    .replace("{{CHARACTER_PURPOSE}}", personaData.purpose)
    .replace("{{CHARACTER_BACKSTORY}}", personaData.backstory)
    .replace(
      "{{CHARACTER_PERSONALITY}}",
      personaData.personalityTraits.join(", "),
    );
}
