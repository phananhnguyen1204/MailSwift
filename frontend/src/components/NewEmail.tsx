import React, { useEffect } from "react";
import NewEmailCard from "./NewEmailCard";
import { useNavigate } from "react-router-dom";
import agent from "../../app/api/agent";
import { useAuth } from "@clerk/clerk-react";
import axios from "axios";

const NewEmail: React.FC = () => {
  const navigate = useNavigate();
  const { userId } = useAuth();

  useEffect(() => {
    if (userId) {
      // Set Axios headers when the user is available
      axios.defaults.headers.common["X-User-Id"] = userId;
    }
  }, [userId]);

  const createNewEmail = async () => {
    const newDocumentData = {
      title: "New Document",
      description: "This is a newly created document.",
    };

    try {
      const newDocument = await agent.DocumentContainer.createDoc(
        newDocumentData
      );
      console.log("Document created:", newDocument);

      // Use the correct property for the document ID
      navigate(`/documents/${newDocument.id}`);
    } catch (error) {
      console.error("Error creating a new document", error);
    }
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
