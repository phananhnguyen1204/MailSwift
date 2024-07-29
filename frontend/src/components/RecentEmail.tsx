import React, { useState, useEffect } from "react";
import axios from "axios";
import RecentEmailCard from "./RecentEmailCard";
import { Document } from "../document";

const RecentEmail: React.FC = () => {
  const [documents, setDocuments] = useState<Document[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/documents")
      .then((response) => setDocuments(response.data))
      .catch((error) => {
        console.error("There was an error fetching the documents!", error);
      });
  }, []);

  return (
    <div className="flex flex-col items-start p-4 ml-3">
      <h3 className="text-lg font-semibold mb-4 text-blue-300">
        Recent Documents
      </h3>
      <div className="flex space-x-4">
        {documents.map((doc, index) => (
          <RecentEmailCard
            key={index}
            id={doc.id}
            title={doc.title}
            description={doc.description}
          />
        ))}
      </div>
    </div>
  );
};

export default RecentEmail;
