import React from "react";
import { Mail } from "lucide-react";
import { CardFooter } from "../ui/card";

interface RecentEmailCardProps {
  title: string;
  onClick?: () => void;
}

const RecentEmailCard: React.FC<RecentEmailCardProps> = ({
  title,
  onClick,
}) => {
  return (
    <div className="flex flex-col items-center p-2">
      <button
        className="w-32 h-40 bg-white border border-gray-300 rounded-md shadow-sm flex flex-col items-center justify-center"
        onClick={onClick}
      >
        <Mail className="w-12 h-12 text-black hover:text-blue-500" />
      </button>
      <CardFooter className="text-center mt-2 text-sm">{title}</CardFooter>
    </div>
  );
};

export default RecentEmailCard;
