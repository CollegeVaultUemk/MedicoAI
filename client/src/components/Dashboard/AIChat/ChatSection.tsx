import ChatHeader from "./ChatHeader";
import ChatContent from "./ChatContent";

interface ChatSectionProps {
  userInput: string;
}

const ChatSection = ({ userInput }: ChatSectionProps) => {
  return (
    <>
      <div className="py-14">
        {userInput ? <ChatContent userInput={userInput} /> : <ChatHeader />}
      </div>
    </>
  );
};

export default ChatSection;
