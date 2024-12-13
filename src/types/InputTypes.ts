import { PersonaFormData } from "../schemas/personaSchema";

export interface ITextInputProps {
  id: keyof PersonaFormData;
  register: any;
  placeholder: string;
  handleTextInputChange: (
    value: string,
    fieldName: keyof PersonaFormData,
  ) => void;
  handleKeyPress: (e: React.KeyboardEvent) => void;
  error?: string;
  showError: boolean;
}

export interface ITextAreaInputProps {
  id: keyof PersonaFormData;
  register: any;
  placeholder: string;
  handleTextInputChange: (
    value: string,
    fieldName: keyof PersonaFormData,
  ) => void;
  error?: string;
  showError: boolean;
}
