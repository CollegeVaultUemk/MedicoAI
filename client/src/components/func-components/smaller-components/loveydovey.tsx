import { cn } from "@/lib/utils";
import loveydovey from "../../../assets/loveydovey.png";

interface LoveyDoveyProps {
  heading: string;
  description: string;
}
const LoveyDovey = ({ heading, description }: LoveyDoveyProps) => {
  return (
    <div
      className={cn(
        "flex xs:w-full lg:w-1/3 flex-col gap-10 items-center font-instrument w-1/3"
      )}
    >
      {/* lovey dovey image */}
      <div className="border-4 rounded-3xl h-auto w-auto p-2">
        <img src={loveydovey} className="w-32 h-32 bg-cover" alt="hearts" />
      </div>
      {/* write ups */}
      <div className="flex flex-col gap-5 items-center w-[80%]">
        <h1 className="font-medium text-2xl scale-110">{heading}</h1>
        <p className="font-light text-lg text-slate-500">{description}</p>
      </div>
    </div>
  );
};

export default LoveyDovey;
