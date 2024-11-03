import { Card } from "@/components/ui/card";

interface TeamMemCardProps {
  name: string;
  role: string;
  linkedin?: string;
}
const TeamMemCard = ({ name, role, linkedin }: TeamMemCardProps) => {
  return (
    <Card className="flex flex-col font-instrument items-start p-5 pl-10 gap-2 w-1/3 bg-gradient-to-r from-[#EDF9FC] to-transparent [bg-gradient-stops:'var(--tw-gradient-from)_0%,var(--tw-gradient-from)_80%,var(--tw-gradient-to)_100%']">
      <a
        href={`${linkedin}`}
        className="text-2xl font-medium hover:scale-125 duration-150"
      >
        {name}
      </a>
      <div className="font-normal">{role}</div>
    </Card>
  );
};

export default TeamMemCard;
