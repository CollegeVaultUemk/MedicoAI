import ChatHeader from "./ChatHeader";
import ChatContent from "./ChatContent";

const ChatSection = () => {
  return (
    <>
      <div className="py-14 overflow-y-scroll">
        <ChatHeader />
        <ChatContent />
      </div>
    </>
  );
};

export default ChatSection;
