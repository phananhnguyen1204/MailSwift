import React from "react";
import { Mail } from "lucide-react";
import { CardFooter, Card, CardContent } from "../ui/card";
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
    <div className="flex flex-col items-center px-1">
      <Card className="w-40 h-56">
        <button
          className="w-40 h-56 bg-white border border-gray-300 rounded-md shadow-sm flex flex-col items-center justify-center"
          onClick={handleClick}
        >
          <CardContent className="items-center justify-center flex flex-col">
            <Mail className="w-16 h-16 text-black hover:text-blue-500" />
          </CardContent>
        </button>
        <CardFooter className="text-center mt-2 text-md text-white font-md">
          {title}
        </CardFooter>
      </Card>
    </div>
  );
};

export default RecentEmailCard;
