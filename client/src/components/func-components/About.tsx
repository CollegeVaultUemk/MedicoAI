import { Card } from "../ui/card";
import LoveyDovey from "./smaller-components/loveydovey";
import { Info } from "lucide-react";
import { aboutData } from "../data/appFeatures";

export default function About() {
  return (
    <Card className="py-14 mx-5 mt-2 bg-[#F6FDFF]">
      <div className="flex flex-col gap-20 items-center">
        <div className="flex flex-row gap-2 border-2 rounded-2xl py-1 px-6 bg-gradient-to-tl from-transparent to-[#F6FDFF] shadow-lg shadow-black/10">
          <span>
            <Info />
          </span>
          about
        </div>
        <div className="flex lg:flex-row gap-10 flex-col justify-between items-start px-10">
          {aboutData.map((data, index) => (
            <LoveyDovey
              key={index}
              heading={data.heading}
              description={data.description}
            />
          ))}
        </div>
      </div>

      {/* team cards */}
      <div></div>
    </Card>
  );
}
