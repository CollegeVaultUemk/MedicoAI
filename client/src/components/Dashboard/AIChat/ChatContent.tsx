import MessageBox from "./MessageBox";

const ChatContent = () => {
  return (
    <div className="px-15 flex flex-col gap-10">
      <MessageBox messageType="user">
        This is a test message. So tell me how much niggas cost now?
      </MessageBox>
      <MessageBox messageType="ai">
        This is a test answer. Unfortunately em niggas are free nowadays.
        Absolute state. Lorem ipsum dolor, sit amet consectetur adipisicing
        elit. Recusandae distinctio labore, nemo ab voluptate eaque! Repellat
        doloribus eveniet cupiditate molestiae autem unde provident consequuntur
        corporis. Optio nostrum velit debitis repudiandae!
      </MessageBox>
    </div>
  );
};

export default ChatContent;
