import React from "react";
import NewEmailCard from "./NewEmailCard";
import { useNavigate } from "react-router-dom";

const NewEmail: React.FC = () => {
  const navigate = useNavigate();

  //post axios here
  const createNewEmail = async () => {
    navigate("/singleDoc");
  };

  return (
    <div className="flex flex-col items-start p-4 ml-3">
      <h3 className="text-lg font-semibold mb-3 text-blue-300">
        Start a New Document
      </h3>
      <div className="flex space-x-4">
        <NewEmailCard title="Blank Document" onClick={createNewEmail} />
      </div>
    </div>
  );
};

export default NewEmail;
