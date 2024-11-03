import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "@/state/hooks";
import { selectAiChat } from "@/state/reducers/aichatReducer";
import MessageBox from "./MessageBox";

interface ChatContentProps {
  userInput: string;
}

// interface ChatType {
//   question: string;
//   answer: string;
// }

const ChatContent = ({ userInput }: ChatContentProps) => {
  const navigate = useNavigate();
  const aiChats = useAppSelector(selectAiChat);
  const { aiChat, loading } = aiChats;

  useEffect(() => {
    if (!loading && aiChat?.data) {
      navigate(`/dashboard/${aiChat.data._id}`);
    }
  }, [aiChat, loading, navigate]);

  return (
    <div className="xs:px-2 md:px-15 flex flex-col gap-10 overflow-y-scroll">
      <MessageBox messageType="user">{userInput}</MessageBox>
      <p>Thinking...</p>
    </div>
  );
};

export default ChatContent;
