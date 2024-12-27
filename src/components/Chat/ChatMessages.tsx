import { IChatMessagesProps } from "../../types/ChatTypes";

import { getRoleLabel, ROLES } from "../../constants/enums";

import { TypingIndicator } from "../TypingIndicator";

import buddyImage from "../../assets/botbuddy-logo-main.png";
import userImage from "../../assets/user.png";

import { useMemo } from "react";
import Markdown from "react-markdown";

export const ChatMessages = ({
  messages,
  loadingAssistantResponse,
  buddyData,
}: IChatMessagesProps) => {
  // Use useMemo to memoize the buddyAvatarUrl value
  const buddyAvatarUrl = useMemo(() => {
    if (buddyData?.avatar instanceof File) {
      return URL.createObjectURL(buddyData.avatar);
    }
    return buddyImage;
  }, [buddyData?.avatar]);

  // Get the avatar style based on the role
  const getAvatarStyle = (role: string) => {
    if (role === "assistant") {
      return { backgroundImage: `url(${buddyAvatarUrl})` };
    }
    return { backgroundImage: `url(${userImage})` };
  };

  return (
    <div className="flex flex-col w-full px-2 py-4 bg-[#fefffe] rounded-[17px] mb-4">
      <div className="flex-1 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`px-6 py-3 rounded-[20px] max-w-[70%] shadow-sm transition-all duration-200  ${
              message.role === "assistant"
                ? "bg-gradient-to-br from-indigo-100 to-purple-100 self-start"
                : "bg-gradient-to-br from-sky-100 to-indigo-200 self-end ml-auto"
            }`}
          >
            <div className="flex items-center">
              <div
                className={`w-[35px] h-[35px] rounded-full mr-2 bg-no-repeat bg-cover hover:scale-110 transition-transform`}
                style={getAvatarStyle(message.role)}
              />
              <h4 className="font-medium">
                {
                  getRoleLabel(message.role as ROLES, buddyData.name)[
                    message.role
                  ]
                }
              </h4>
            </div>
            <div className="mt-2 text-sm leading-relaxed">
              {message.format === "markdown" ? (
                <Markdown>{message.content}</Markdown>
              ) : (
                message.content
              )}
            </div>
          </div>
        ))}
        {loadingAssistantResponse && (
          <div className="px-6 py-3 rounded-[20px] bg-gradient-to-br from-indigo-100 to-purple-100 self-start max-w-[70%] shadow-sm">
            <TypingIndicator />
          </div>
        )}
      </div>
    </div>
  );
};
