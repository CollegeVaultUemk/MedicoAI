import { Users } from "lucide-react";
import { aboutData } from "../data/appFeatures";
import { Card } from "../ui/card";
import LoveyDovey from "./smaller-components/loveydovey";
import TeamMemCard from "./smaller-components/teamCard";
import AboutIcon from "./smaller-components/aboutIcon";
import { team } from "../data/team";

export default function About() {
  return (
    <Card className="py-14 mx-5 mt-2 bg-[#F6FDFF] rounded-3xl">
      <div className="flex flex-col gap-20 items-center">
        <div
          className="flex flex-row gap-2 border-2 items-start rounded-2xl py-2 px-6 bg-gradient-to-tl from-transparent to-[#F6FDFF] shadow-lg shadow-black/10
        relative before:absolute before:top-[-5px] before:left-0 before:w-full before:h-[10px] before:bg-gradient-to-b before:from-white before:to-transparent before:rounded-t-full"
        >
          <span>
            <AboutIcon />
          </span>
          <span className="font-instrument font-normal text-xl -mt-1">
            About
          </span>
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
      <div id="team" className="mt-20 pt-20 flex flex-col gap-20 items-center">
        <div
          className="flex flex-row gap-2 border-2 rounded-2xl py-2 px-6 bg-gradient-to-tl from-transparent to-[#F6FDFF] shadow-lg shadow-black/10
        
        relative before:absolute before:top-[-5px] before:left-0 before:w-full before:h-[10px] before:bg-gradient-to-b before:from-white before:to-transparent before:rounded-t-full"
        >
          <span>
            <Users />
          </span>
          <span className="font-instrument font-normal text-xl ">
            Meet The Team
          </span>
        </div>
        <div className="flex lg:flex-row flex-col gap-30 w-full xs:px-2 md:px-30 justify-between">
          {team.map((member, index) => (
            <TeamMemCard
              key={index}
              name={member.name}
              role={member.title}
              linkedin={member.linkedin}
            />
          ))}
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
