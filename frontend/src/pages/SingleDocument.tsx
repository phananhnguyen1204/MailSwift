import { useEffect, useState } from "react";
import EditorBlock from "../components/EditorBlock";
import { useParams } from "react-router-dom";
import { Document } from "../document";
import agent from "../../app/api/agent";
import NotFound from "../../app/errors/NotFound";

const SingleDocument: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [document, setDocument] = useState<Document | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    id &&
      agent.Document.details(parseInt(id))
        .then((response) => setDocument(response))
        .catch((error) => console.log(error))
        .finally(() => setLoading(false));
  });

  if (loading) return <h3>Loading...</h3>;

  if (!document) return <NotFound />;

  return (
    <div className="p-4">
      <EditorBlock document={document} />
    </div>
  );
};
export default SingleDocument;
