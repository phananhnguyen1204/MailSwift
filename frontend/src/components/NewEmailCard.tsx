import React from "react";
import { Plus } from "lucide-react";
import { Card, CardContent, CardFooter } from "../ui/card";

interface NewEmailCardProps {
  title: string;
  onClick: () => void;
}

const NewEmailCard: React.FC<NewEmailCardProps> = ({ title, onClick }) => {
  return (
    <div className="flex flex-col p-4 text-center">
      <Card className="w-36 h-44 text-center">
        <button
          className="w-36 h-44 bg-white border border-gray-300 rounded-md shadow-sm flex flex-col items-center justify-center"
          onClick={onClick}
        >
          <CardContent className="items-center justify-center flex flex-col">
            <Plus className="w-16 h-16 text-black hover:text-blue-500" />
          </CardContent>
        </button>
        <CardFooter className="text-center mt-2 text-md font-medium">
          {title}
        </CardFooter>
      </Card>
    </div>
  );
};

export default NewEmailCard;
