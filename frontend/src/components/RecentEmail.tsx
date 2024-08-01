import React, { useState, useEffect } from "react";
import RecentEmailCard from "./RecentEmailCard";
import { Document } from "../document";
import agent from "../../app/api/agent";

const RecentEmail: React.FC = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const documents = await agent.DocumentContainer.get();
        setDocuments(documents);
      } catch (error) {
        console.error("Error fetching documents:", error);
        setError("Failed to load documents. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();
  }, []);

  if (loading) return <p>Loading documents...</p>;
  if (error) return <p>{error}</p>;

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
