import ChatSection from "./ChatSection";
import UserInput from "./UserInput";

const NewAIChat = () => {
  return (
    <div className="flex flex-col justify-between h-[83vh]">
      <ChatSection />
      <UserInput />
    </div>
  );
};

export default NewAIChat;
