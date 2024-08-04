import React, { useState } from "react";
import RecentEmailCard from "./RecentEmailCard";
// import { useAuth } from "@clerk/clerk-react";
// import { useEffect } from "react";

const RecentEmail: React.FC = () => {
  const [documents, setDocuments] = useState([
    { title: "Untitled Doc 1", description: "This is description1" },
    { title: "Untitled Doc 2", description: "This is description2" },
  ]);

  //matching with the userId
  //and then map it out

  // const { userId } = useAuth();
  // const userDocuments = useEffect(() => {});

  return (
    <div className="flex flex-col items-start p-4 ml-3">
      <h3 className="text-lg font-semibold mb-4 text-blue-300">
        Recent Documents
      </h3>
      <div className="flex space-x-4">
        <RecentEmailCard title="Untitled Document" />
        <RecentEmailCard title="Untitled Document" />
      </div>
    </div>
  );
};

export default RecentEmail;
