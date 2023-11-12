import React from "react";

interface MessageProps {
  children: React.ReactNode;
  messageType: string;
}

type MessageType = {
  user: {
    flexProp: string;
    boxColor: string;
  };
  ai: {
    flexProp: string;
    boxColor: string;
  };
};

const MessageTypeStyle: MessageType = {
  user: { flexProp: "justify-end", boxColor: "bg-slate-300 dark:bg-slate-600" },
  ai: { flexProp: "justify-start", boxColor: "bg-slate-400 dark:bg-slate-700" },
};

const MessageBox = ({ children, messageType }: MessageProps) => {
  return (
    <div
      className={`flex ${
        messageType === "user"
          ? MessageTypeStyle.user.flexProp
          : MessageTypeStyle.ai.flexProp
      } items-center`}
    >
      <div
        className={`border ${
          messageType === "user"
            ? MessageTypeStyle.user.boxColor
            : MessageTypeStyle.ai.boxColor
        } border-gray-300 dark:border-gray-600 rounded-md py-3 px-3 max-w-[75%]`}
      >
        <p>{children}</p>
      </div>
    </div>
  );
};

export default MessageBox;
