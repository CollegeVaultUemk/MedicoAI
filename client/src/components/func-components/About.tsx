import { Card } from "../ui/card";
import LoveyDovey from "./smaller-components/loveydovey";
import { Info, Users } from "lucide-react";
import { aboutData } from "../data/appFeatures";
import TeamMemCard from "./smaller-components/teamCard";

export default function About() {
  return (
    <Card className="py-14 mx-5 mt-2 bg-[#F6FDFF] rounded-3xl">
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
      <div className="mt-20 pt-20 flex flex-col gap-20 items-center">
        <div className="flex flex-row gap-2 border-2 rounded-2xl py-1 px-6 bg-gradient-to-tl from-transparent to-[#F6FDFF] shadow-lg shadow-black/10">
          <span>
            <Users />
          </span>
          team
        </div>
        <div className="flex lg:flex-row flex-col gap-30 w-full px-10 justify-between">
          <TeamMemCard
            name="John Doe"
            role="CEO"
            linkedin="https://www.linkedin.com/in/shaikh-parwez-hasim-23681a10a/"
          />
          <TeamMemCard
            name="John Doe"
            role="CEO"
            linkedin="https://www.linkedin.com/in/shaikh-parwez-hasim-23681a10a/"
          />
          <TeamMemCard
            name="John Doe"
            role="CEO"
            linkedin="https://www.linkedin.com/in/shaikh-parwez-hasim-23681a10a/"
          />
        </div>
      </div>

      {/* footer */}

      <div className="flex flex-col gap-5 items-center mt-20">
        <div className="text-center text-sm text-gray-500">
          <p>© All Rights Reserved 2024</p>
          <p>Made with ❤️ and 🍵 in India.</p>
        </div>
      </div>
    </Card>
  );
}
