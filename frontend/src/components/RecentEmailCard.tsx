import React from "react";
import { Mail } from "lucide-react";
import { CardFooter } from "../ui/card";
import { useNavigate } from "react-router-dom";

interface RecentEmailCardProps {
  id: number;
  title: string;
  description: string;
}

const RecentEmailCard: React.FC<RecentEmailCardProps> = ({ id, title }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/documents/${id}`); //when the user clicks on the card, navigate to the document with the matching id
  };

  return (
    <div className="flex flex-col items-center p-2">
      <button
        className="w-32 h-40 bg-white border border-gray-300 rounded-md shadow-sm flex flex-col items-center justify-center"
        onClick={handleClick}
      >
        <Mail className="w-12 h-12 text-black hover:text-blue-500" />
      </button>
      <CardFooter className="text-center mt-2 text-sm">{title}</CardFooter>
    </div>
  );
};

export default RecentEmailCard;
