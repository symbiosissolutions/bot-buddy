import { BASE_URL, SECRET_KEY } from "../constants/config";

import { IMessage } from "../types/ChatTypes";
import { IBuddyResponse } from "../types/PersonaTypes";

class ChatError extends Error {
  constructor(
    message: string,
    public status?: number,
  ) {
    super(message);
    this.name = "ChatError";
  }
}

export const chatService = {
  async sendMessage(
    _message: string,
    buddyData: IBuddyResponse,
    messages: IMessage[],
  ) {
    try {
      const payload = {
        buddy: {
          buddy_tag: buddyData.buddy_tag,
          name: buddyData.name,
          tagline: buddyData.tagline,
          greeting: buddyData.greeting,
          purpose: buddyData.purpose,
          backstory: buddyData.backstory,
          personality_traits: buddyData.personality_traits,
        },
        messages: messages.map((msg) => ({
          role: msg.role,
          content: msg.content,
        })),
      };

      const response = await fetch(`${BASE_URL}/api/v1/chat_completion`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "secret-key": SECRET_KEY,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new ChatError("Failed to send message", response.status);
      }

      return response.json();
    } catch (error) {
      if (error instanceof ChatError) {
        throw error;
      }
      throw new ChatError("Network error occurred");
    }
  },
};
