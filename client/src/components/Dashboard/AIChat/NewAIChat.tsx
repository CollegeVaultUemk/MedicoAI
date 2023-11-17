import { useState } from "react";
import ChatSection from "./ChatSection";
import UserInput from "./UserInput";

const NewAIChat = () => {
  const [userInput, setUserInput] = useState("");
  return (
    <div className="flex flex-col justify-between h-[83vh]">
      <ChatSection userInput={userInput} />
      <UserInput setUserInput={setUserInput} />
    </div>
  );
};

export default NewAIChat;
