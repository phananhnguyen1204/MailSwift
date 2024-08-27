import { useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
import agent from "../../app/api/agent";

interface DrawerAIProps {
  description: string;
}

const DrawerAI: React.FC<DrawerAIProps> = ({ description }) => {
  const [open, setOpen] = useState(false);
  const [emailContent, setEmailContent] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const generateEmail = async (description: string) => {
    try {
      const data = await agent.OpenAI.generateEmail(description);
      console.log(data);
      if (data) {
        return data.email;
      } else {
        throw new Error("Unexpected response structure");
      }
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const handleGenerateEmail = async () => {
    setLoading(true);
    setError(null);
    try {
      const email = await generateEmail(description);
      setEmailContent(email);
    } catch (err) {
      setError("Failed to generate email. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger
          className="flex float-right p-2 mr-2 bg-white border border-gray-300 hover:text-blue-500 text-black text-sm shadow-sm hover:bg-gray-100 w-[20vh] items-center justify-center"
          onClick={handleGenerateEmail}
        >
          MailSwift AI 🎩
        </DrawerTrigger>
        <DrawerContent className="bg-blue-300 text-black">
          <DrawerHeader>
            <DrawerTitle className="text-2xl">
              Hmmm What Do We Have Here? 📝
            </DrawerTitle>
            <DrawerDescription className="text-md mt-5">
              {loading && "Generating email suggestions..."}
              {error && <span className="text-red-500">{error}</span>}
              {emailContent && !loading && !error && (
                <pre className="whitespace-pre-wrap">{emailContent}</pre>
              )}
            </DrawerDescription>
          </DrawerHeader>
          <DrawerFooter></DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default DrawerAI;
