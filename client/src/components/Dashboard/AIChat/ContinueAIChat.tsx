import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/state/hooks";
import {
  selectAiChat,
  GetSingleAiChatAction,
} from "@/state/reducers/aichatReducer";
import ReactMarkdown from "react-markdown";
import MessageBox from "./MessageBox";
import UserInput from "./UserInput";

interface ChatType {
  question: string;
  answer: string;
}

const ContinueAIChat = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const aiChats = useAppSelector(selectAiChat);
  const { loading, aiChat } = aiChats;
  const [userInput, setUserInput] = useState("");
  const [chatArray, setChatArray] = useState<ChatType[]>([]);

  const chatRef = useRef<HTMLDivElement>(null);
  const loadingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    dispatch(GetSingleAiChatAction(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (loadingRef.current) {
      loadingRef.current.scrollIntoView({ behavior: "smooth" });
    }
    if (!loading && aiChat?.data) {
      setChatArray(aiChat.data.chat);
      setUserInput("");
    }
  }, [loading, aiChat]);

  useEffect(() => {
    if (chatArray.length > 0 && chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [chatArray.length]);

  return (
    <div className="flex flex-col justify-between h-[83vh]">
      <div
        ref={chatRef}
        className="px-15 py-15 flex flex-col gap-10 overflow-y-scroll"
      >
        {chatArray.length > 0 &&
          chatArray.map((chat, index) => (
            <div key={index} className="flex flex-col gap-10">
              <MessageBox messageType="user">{chat.question}</MessageBox>
              <MessageBox messageType="ai">
                <ReactMarkdown>{chat.answer}</ReactMarkdown>
              </MessageBox>
            </div>
          ))}
        {userInput !== "" && (
          <div ref={loadingRef} className="flex flex-col gap-10">
            <MessageBox messageType="user">{userInput}</MessageBox>
            <p>Thinking...</p>
          </div>
        )}
      </div>
      <UserInput setUserInput={setUserInput} bardId={id} />
    </div>
  );
};

export default ContinueAIChat;
