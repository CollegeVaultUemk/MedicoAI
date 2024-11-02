import { Card } from "@/components/ui/card";

interface TeamMemCardProps {
  name: string;
  role: string;
}
const TeamMemCard = ({ name, role }: TeamMemCardProps) => {
  return (
    <div>
      <Card className="flex flex-col">
        <div>{name}</div>
        <div>{role}</div>
      </Card>
    </div>
  );
};

export default TeamMemCard;
