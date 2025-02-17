import { FormEvent } from "react";

import { IBuddyResponse, IPersonaInputs } from "./PersonaTypes";

import { ROLES } from "../constants/enums";

export interface IMessage {
  id: string;
  role: `${ROLES}`;
  content: string;
  format?: "markdown" | "text";
}

export interface IChatMessagesProps {
  messages: IMessage[];
  loadingAssistantResponse: boolean;
  buddyData: IPersonaInputs;
}

export interface IChatInputProps {
  userInput: string;
  onInputChange: (value: string) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  onClear: () => void;
  isLoading: boolean;
}

export interface IChatLayoutProps {
  children: React.ReactNode;
  buddyData: IBuddyResponse;
}
