type ExampleTypes = {
  heading: string;
  prompt: string;
}[];

const Examples: ExampleTypes = [
  {
    heading: "Come up with concepts?",
    prompt: "for something",
  },
  {
    heading: "heading 2",
    prompt: "The best medicine for fever is paracetamol.",
  },
  {
    heading: "heading 3",
    prompt: "The best medicine for fever is nigga.",
  },
  {
    heading: "heading 4",
    prompt: "The best medicine for fever is a kid.",
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
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
          dignissim nibh nisl, vel egestas magna rhoncus at. Nunc elementum
          efficitur tortor in laoreet.
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
