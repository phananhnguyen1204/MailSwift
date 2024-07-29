import React from "react";
import { Plus } from "lucide-react";
import { Card, CardContent, CardFooter } from "../ui/card";

interface NewEmailCardProps {
  title: string;
  onClick: () => void;
}

const NewEmailCard: React.FC<NewEmailCardProps> = ({ title, onClick }) => {
  return (
    <div className="flex flex-col items-center p-2">
      <Card>
        <button
          className="w-32 h-40 bg-white border border-gray-300 rounded-md shadow-sm flex flex-col items-center justify-center"
          onClick={onClick}
        >
          <CardContent className="items-center justify-center flex flex-col">
            <Plus className="w-12 h-12 text-black hover:text-blue-500" />
          </CardContent>
        </button>
      </Card>
      <CardFooter className="text-center mt-2 text-sm">{title}</CardFooter>
    </div>
  );
};

export default NewEmailCard;
