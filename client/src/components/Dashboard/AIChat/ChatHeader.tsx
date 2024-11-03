type ExampleTypes = {
  heading: string;
  prompt: string;
}[];

const Examples: ExampleTypes = [
  {
    heading: "Identify Your Emotional Triggers",
    prompt: "What could be causing my recent stress?",
  },
  {
    heading: "Ask Serenity",
    prompt: "How can I cope with anxiety in social situations?",
  },
  {
    heading: "Serenity Recommends",
    prompt: "What are some techniques to improve my mood?",
  },
  {
    heading: "Serenity Is Here to Support",
    prompt: "How can I manage feelings of overwhelm effectively?",
  },
];

const ChatHeader = () => {
  return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-8">
      <div className="max-w-xl mx-auto text-center">
        <h3
          className={`text-3xl font-semibold sm:text-4xl text-gray-800 dark:text-gray-100`}
        >
          Chat with our AI
        </h3>
        <p className={`mt-3 text-gray-600 dark:text-gray-300`}>
          Get comprehensive consultations from our AI chat bot SERENITY 🚀 !.
        </p>
        <div className="mt-12 flex justify-center">
          <ul className="inline-grid grid-cols-2 gap-x-10 gap-y-6 md:gap-x-16 pb-18">
            {Examples.map((example, idx) => (
              <li
                key={idx}
                className="border text-[14px] border-gray-300 rounded-lg shadow-lg flex flex-col justify-start items-center p-4"
              >
                <h4 className="mt-1 font-bold">{example.heading}</h4>
                <p>{example.prompt}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
