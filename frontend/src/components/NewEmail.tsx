import React, { useEffect } from "react";
import NewEmailCard from "./NewEmailCard";
import { useNavigate } from "react-router-dom";
import agent from "../../app/api/agent";
import { useAuth } from "@clerk/clerk-react";
import axios from "axios";
import { useToast } from "../ui/use-toast";
import { cn } from "../lib/utils";

const NewEmail: React.FC = () => {
  const navigate = useNavigate();
  const { userId } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (userId) {
      // Set Axios headers when the user is available
      axios.defaults.headers.common["X-User-Id"] = userId;
    }
  }, [userId]);

  const createNewEmail = async (
    title: string = "Blank Email",
    description: string = "This is a newly created email."
  ) => {
    const newDocumentData = {
      title: title,
      description: description,
    };

    try {
      const newDocument = await agent.DocumentContainer.createDoc(
        newDocumentData
      );
      toast({
        className: cn(
          "top-0 left-0 flex fixed md:max-w-[400px] md:top-4 md:right-4 bg-blue-500 text-white rounded-xl"
        ),
        title: "🚀 Document is Created",
      });
      navigate(`/documents/${newDocument.id}`);
    } catch (error) {
      console.error("Error creating a new document", error);
    }
  };

  return (
    <div className="flex flex-col items-start p-4 ml-3 ">
      <div className="flex justify-between w-full mb-3">
        <h3 className="text-lg font-medium text-blue-300">
          Start a New Document
        </h3>
        <h3 className="text-lg font-medium text-blue-300">Template Gallery</h3>
      </div>

      <div className="flex">
        <NewEmailCard title="Blank Email" onClick={() => createNewEmail()} />
        <NewEmailCard
          title="Thank You"
          onClick={() =>
            createNewEmail(
              "Thank You for Your Time",
              "Hi [name], \n\nI just wanted to thank you once again for [action]. This helped me a lot with [problem].\n\nI will keep you posted and, of course, let me know if there is anything you need help with.\n\nSincerely,\n\n[Your name]"
            )
          }
        />
        <NewEmailCard
          title="Application"
          onClick={() =>
            createNewEmail(
              "Application for [Job Position]",
              "Dear Hiring Manager,\n\nI am writing to express my interest in the [Job Position] at [Company Name] as advertised. With my background in [relevant experience or skills], I am confident that I can contribute effectively to your team.\n\nAttached are my resume and cover letter for your review. I would appreciate the opportunity to discuss how my skills and experiences align with the needs of your team.\n\nThank you for considering my application. I look forward to the possibility of working with [Company Name].\n\nSincerely,\n\n[Your Name]"
            )
          }
        />
        <NewEmailCard
          title="Request"
          onClick={() =>
            createNewEmail(
              "Request for [Specific Information/Assistance]",
              "Dear [Name],\n\nI hope you're doing well. I am reaching out to request your assistance with [specific task or information needed]. I am currently working on [brief description of project or context], and your input on [specific area or question] would be invaluable.\n\nIf you could provide [the specific information or assistance] by [desired deadline], it would greatly help us move forward with [project/task]. Please let me know if you need any additional details from my end.\n\nThank you in advance for your help. I appreciate your time and support.\n\nBest regards,\n\n[Your Name]\n[Your Contact Information]"
            )
          }
        />
        <NewEmailCard
          title="Follow-Up"
          onClick={() =>
            createNewEmail(
              "Follow-Up on Our Recent Meeting",
              "Dear [Name],\n\nI hope this email finds you well. I wanted to follow up on our meeting held on [date]. It was great discussing [topics discussed], and I appreciate the insights you shared.\n\nAs a next step, I would like to [propose next steps or actions]. Please let me know if you need any further information or if there's anything else I can assist with.\n\nThank you for your time, and I look forward to your response.\n\nBest regards,\n\n[Your Name]"
            )
          }
        />
      </div>
    </div>
  );
};

export default NewEmail;
