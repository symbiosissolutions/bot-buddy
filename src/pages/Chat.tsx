import { FormEvent, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { claudeClient } from "../claude/threads";

import { v4 as uuidv4 } from "uuid";

import { API_KEY } from "../constants/config";

import appBackground from "../assets/bot-buddy-bg-main.jpg";

import "../Chat.css";

import { ChatInput } from "../components/Chat/ChatInput";
import { ChatMessages } from "../components/Chat/ChatMessages";
import { ChatLayout } from "../components/Chat/ChatLayout";
import { IMessage } from "../types/ChatTypes";
import { IoArrowBack } from "react-icons/io5";

const assistant = claudeClient(API_KEY);

const Chat = () => {
  const [threadId, setThreadId] = useState<string | undefined>();
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [appInitializing, setAppInitializing] = useState(true);
  const [loadingAssistantResponse, setLoadingAssistantResponse] =
    useState(false);
  const [userInput, setUserInput] = useState("");
  const chatboxRef = useRef<HTMLDivElement>(null);

  const { state } = useLocation();
  // Destructure state with default values
  const { buddyPrompt = "", buddyData = {} } = state || {};
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
    const thread = await assistant.createThread();

    if (buddyPrompt) {
      await assistant.createMessageInThread(thread.id, buddyPrompt);
    }

    setThreadId(thread.id);
    setAppInitializing(false);

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
  };
  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    if (chatboxRef.current) {
      chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessageAndGetResponse = async (message: string) => {
    if (threadId !== undefined) {
      await sendAndProcess();
      const response = await getResponse();
      return response;
      // return await getResponse();
    }

    async function sendAndProcess() {
      if (threadId !== undefined) {
        await assistant.createMessageInThread(threadId, message);
        await assistant.createRun(threadId);
      }
    }

    async function getResponse() {
      if (threadId !== undefined) {
        const allMessagesInThread = await assistant.listMessages(threadId);

        // Ensure data exists and has the expected structure
        const lastMessage = allMessagesInThread?.data?.slice(-1)[0];
        if (!lastMessage || !lastMessage.content?.[0]?.text) {
          console.error("Error: Response structure is unexpected or missing.");
          return "I'm sorry, I could not process your message.";
        }

        return lastMessage.content[0].text;
      }
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessages((currentMessages) => [
      ...currentMessages,
      {
        id: uuidv4(),
        content: userInput,
        role: "user",
      },
    ]);
    setUserInput("");
    setLoadingAssistantResponse(true);
    const assistantResponse = await sendMessageAndGetResponse(userInput);
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
        <div className="w-full p-4">
          <button
            onClick={() => navigate("/edit", { state: { buddyData } })}
            className="flex items-center gap-1 px-4 py-2 bg-white rounded-lg shadow-md hover:bg-gray-50 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0.5"
          >
            <IoArrowBack size={20} />
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
