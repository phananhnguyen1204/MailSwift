"use client";
import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";
import Editor from "./Editor";
import { cn } from "../lib/utils";
import DrawerAI from "./DrawerAI";
import { Document } from "../document";
import agent from "../../app/api/agent";
import { Link, useNavigate } from "react-router-dom";

const FormSchema = z.object({
  title: z.string().min(2).max(50),
  description: z.string().min(2),
});

interface EditorBlockProps {
  document?: Document | null;
}

const EditorBlock: React.FC<EditorBlockProps> = ({ document }) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  if (!document) {
    console.error("No document provided, redirecting...");
  }

  const EditorForm = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: document?.title || "",
      description: document?.description || "",
    },
  });

  //UPDATE DOCUMENT
  async function onUpdateChange(values: z.infer<typeof FormSchema>) {
    if (!document) {
      console.error("No document provided for update.");
      return;
    }

    try {
      await agent.DocumentContainer.updateDoc(document.id, values);
      toast({
        className: cn(
          "top-0 left-0 flex fixed md:max-w-[400px] md:top-4 md:right-4 bg-blue-500 text-white rounded-xl"
        ),
        title: "🚀 Document is Updated",
        description:
          "You just made changes to your document, and no worries, it was saved 🎉!",
      });
    } catch (error) {
      console.error("Error updating document:", error);
      toast({
        className: cn(
          "top-0 left-0 flex fixed md:max-w-[400px] md:top-4 md:right-4 bg-red-500 text-white rounded-xl"
        ),
        title: "Error",
        description:
          "There was a problem updating your document. Please try again.",
      });
    }
  }

  //DELETE DOCUMENT
  async function onDocumentDelete() {
    if (!document) {
      console.error("No document provided for deletion.");
      return;
    }

    try {
      await agent.DocumentContainer.removeDoc(document.id);
      toast({
        className: cn(
          "top-0 left-0 flex fixed md:max-w-[400px] md:top-4 md:right-4 bg-blue-500 text-white rounded-xl"
        ),
        title: "🚀 Document is Deleted",
        description: "You just deleted a document!",
      });

      navigate("/dashboard");
    } catch (error) {
      console.error("Error deleting document:", error);
      toast({
        className: cn(
          "top-0 left-0 flex fixed md:max-w-[400px] md:top-4 md:right-4 bg-red-500 text-white rounded-xl"
        ),
        title: "Error",
        description:
          "There was a problem deleting your document. Please try again.",
      });
    }
  }

  return (
    <div className="container mx-auto p-2">
      <div className="flex justify-end mb-3">
        <DrawerAI />
        <form onSubmit={EditorForm.handleSubmit(onDocumentDelete)}>
          <Button
            className="rounded-xl bg-red-600 text-white hover:bg-red-500 text-sm"
            type="submit"
            variant="destructive"
          >
            Delete
          </Button>
        </form>
      </div>
      <FormProvider {...EditorForm}>
        <form
          className="flex flex-col gap-5"
          onSubmit={EditorForm.handleSubmit(onUpdateChange)}
        >
          <div className="flex flex-col">
            <FormField
              control={EditorForm.control}
              name="title"
              render={({ field }) => (
                <FormItem className="mb-4">
                  <FormControl>
                    <Input placeholder="Enter Title Here" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={EditorForm.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Editor {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex justify-center mt-4 mb-4 p-4 gap-4">
            <Button
              className="px-4 py-2 rounded-xl bg-blue-500 text-white hover:bg-blue-600 shadow-md"
              type="submit"
            >
              Save Changes
            </Button>
            <Link
              to={"/dashboard"}
              className="px-4 py-2.5 rounded-xl bg-blue-500 text-white hover:bg-blue-600 shadow-md hover:text-white text-sm "
            >
              Back to Dashboard
            </Link>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default EditorBlock;
