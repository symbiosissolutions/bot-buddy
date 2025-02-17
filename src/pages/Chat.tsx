import { FormEvent, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { IoArrowBack } from "react-icons/io5";
import { FaUserEdit } from "react-icons/fa";

import { v4 as uuidv4 } from "uuid";

import appBackground from "../assets/bot-buddy-bg-main.jpg";

import "../Chat.css";

import { ChatInput } from "../components/Chat/ChatInput";
import { ChatMessages } from "../components/Chat/ChatMessages";
import { ChatLayout } from "../components/Chat/ChatLayout";

import { IMessage } from "../types/ChatTypes";

import { chatService } from "../services";

const Chat = () => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [appInitializing, setAppInitializing] = useState(true);
  const [loadingAssistantResponse, setLoadingAssistantResponse] =
    useState(false);
  const [userInput, setUserInput] = useState("");
  const chatboxRef = useRef<HTMLDivElement>(null);

  const { state } = useLocation();
  // Destructure state with default values
  const { buddyData = {} } = state || {};
  const navigate = useNavigate();

  // Redirect if no state exists
  useEffect(() => {
    if (!state) {
      navigate("/");
      return;
    }
  }, [state, navigate]);

  const init = async () => {
    setAppInitializing(true);

    // Add initial greeting using buddy data
    if (buddyData.greeting) {
      setMessages([
        {
          id: uuidv4(),
          role: "assistant",
          content: buddyData.greeting,
        },
      ]);
    }
    setAppInitializing(false);
  };
  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    if (chatboxRef.current) {
      chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessageAndGetResponse = async (
    message: string,
    currentMessages: IMessage[],
  ) => {
    const completion = await chatService.sendMessage(
      message,
      buddyData,
      currentMessages,
    );
    return completion.response;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Create new message
    const newUserMessage: IMessage = {
      id: uuidv4(),
      content: userInput,
      role: "user",
    };

    // Update messages state and get updated array
    const updatedMessages: IMessage[] = [...messages, newUserMessage];
    setMessages(updatedMessages);
    setUserInput("");
    setLoadingAssistantResponse(true);

    // Use updated messages array for API call
    const assistantResponse = await sendMessageAndGetResponse(
      userInput,
      updatedMessages,
    );

    setMessages((currentMessages) => [
      ...currentMessages,
      {
        id: uuidv4(),
        content: assistantResponse as string,
        role: "assistant",
        format: "markdown",
      },
    ]);
    setLoadingAssistantResponse(false);
  };
  const handleClearChat = async () => {
    setMessages([]);
    await init();
  };

  return (
    <>
      {appInitializing ? <div className="loader"></div> : null}
      <div
        className={`screen ${appInitializing ? "loading" : ""}`}
        style={{ backgroundImage: `url(${appBackground})` }}
      >
        <div className="w-full p-4 flex gap-2">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-1 px-4 py-2 bg-white rounded-lg shadow-md hover:bg-gray-50 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0.5"
          >
            <IoArrowBack size={20} />
            <span>Back</span>
          </button>
          <button
            onClick={() => navigate("/edit", { state: { buddyData } })}
            className="flex items-center gap-1 px-4 py-2 bg-white rounded-lg shadow-md hover:bg-gray-50 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0.5"
          >
            <FaUserEdit size={20} />
            <span>Edit Buddy</span>
          </button>
        </div>

        <ChatLayout buddyData={buddyData}>
          <div className="chatbox curved custom-scroll" ref={chatboxRef}>
            <ChatMessages
              messages={messages}
              loadingAssistantResponse={loadingAssistantResponse}
              buddyData={buddyData}
            />
          </div>
          <ChatInput
            userInput={userInput}
            onInputChange={setUserInput}
            onSubmit={handleSubmit}
            onClear={handleClearChat}
            isLoading={loadingAssistantResponse}
          />
        </ChatLayout>
      </div>
    </>
  );
};
export default Chat;
