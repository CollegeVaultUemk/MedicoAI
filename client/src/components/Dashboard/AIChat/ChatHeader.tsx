type ExampleTypes = {
  heading: string;
  prompt: string;
}[];

const Examples: ExampleTypes = [
  {
    heading: "Catch your symptoms ?",
    prompt: "for something",
  },
  {
    heading: "Ask medico",
    prompt: "The best medicine for fever ?",
  },
  {
    heading: "medico recommends",
    prompt: "Best medicine for headaches ?",
  },
  {
    heading: "medico is here to help",
    prompt: "The best medicine for diarrhea ?",
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
          Get comprehensive consultations from our AI chat bot MEDICO 🚀 !.
        </p>
        <div className="mt-12 flex justify-center">
          <ul className="inline-grid grid-cols-2 gap-x-10 gap-y-6 md:gap-x-16 pb-18">
            {Examples.map((example, idx) => (
              <li
                key={idx}
                className="border border-gray-400 rounded-md flex flex-col justify-start items-center"
              >
                <h4 className="mt-1">{example.heading}</h4>
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
