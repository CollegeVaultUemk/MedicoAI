import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/state/hooks";
import {
  ContinueAiChatAction,
  NewAiChatAction,
} from "@/state/reducers/aichatReducer";

interface UserInputProps {
  bardId?: string | undefined;
  setUserInput: (value: string) => void;
}

const UserInput = ({ setUserInput, bardId }: UserInputProps) => {
  const dispatch = useAppDispatch();
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUserInput(input);
    if (bardId) {
      dispatch(ContinueAiChatAction({ bardId, question: input }));
    } else {
      dispatch(NewAiChatAction(input));
    }
    setInput("");
  };

  return (
    <form
      className="xs:px-2 md:px-15 flex justify-center items-center gap-1"
      onSubmit={handleSubmit}
    >
      <Input
        className="shadow-md h-12 bg-slate-100 dark:bg-slate-600 border-gray-300 dark:border-gray-600 px-6 text-lg text-gray-900 dark:text-gray-100"
        placeholder="Start typing..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <Button
        variant="outline"
        type="submit"
        className="shadow-md bg-slate-100 dark:bg-slate-600 border-gray-300 dark:border-gray-600 h-full"
      >
        <svg
          className="fill-current"
          width="20"
          height="18"
          viewBox="0 0 20 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M17.218,2.268L2.477,8.388C2.13,8.535,2.164,9.05,2.542,9.134L9.33,10.67l1.535,6.787c0.083,0.377,0.602,0.415,0.745,0.065l6.123-14.74C17.866,2.46,17.539,2.134,17.218,2.268 M3.92,8.641l11.772-4.89L9.535,9.909L3.92,8.641z M11.358,16.078l-1.268-5.613l6.157-6.157L11.358,16.078z"
            fill=""
          />
        </svg>
      </Button>
    </form>
  );
};

export default UserInput;
