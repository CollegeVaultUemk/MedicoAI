import MessageBox from "./MessageBox";
import { useAppSelector } from "@/state/hooks";
import { selectAiChat } from "@/state/reducers/aichatReducer";
import { useEffect, useState } from "react";

interface ChatContentProps {
  userInput: string;
}

interface ChatType {
  question: string;
  answer: string;
}

const ChatContent = ({ userInput }: ChatContentProps) => {
  const aiChats = useAppSelector(selectAiChat);
  const { loading, aiChat, serverErr, appErr } = aiChats;
  const [chatArray, setChatArray] = useState<ChatType[]>([
    { question: userInput, answer: "pending..." },
  ]);

  useEffect(() => {
    if (aiChat) {
      setChatArray(aiChat.data.chat);
    }
  }, [aiChat]);

  console.log(aiChat, serverErr, appErr);
  return (
    <div className="px-15 flex flex-col gap-10 overflow-y-scroll">
      {chatArray.map((chat) => (
        <>
          <MessageBox messageType="user">{chat.question}</MessageBox>
          {loading ? (
            <p>Loading response....</p>
          ) : (
            <MessageBox messageType="ai">{chat.answer}</MessageBox>
          )}
        </>
      ))}
    </div>
  );
};

export default ChatContent;
