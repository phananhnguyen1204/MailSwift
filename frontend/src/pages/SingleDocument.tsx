import { useEffect, useState } from "react";
import EditorBlock from "../components/EditorBlock";
import { useParams } from "react-router-dom";
import { Document } from "../document";
import axios from "axios";

// interface SingleDocumentProps {
//   documentId: string;
// }

const SingleDocument: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [document, setDocument] = useState<Document | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/documents/${id}`)
      .then((response) => setDocument(response.data))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  });

  if (loading) return <h3>Loading...</h3>;

  if (!document) return <h3>Document not found</h3>;

  return (
    <div className="p-4">
      <EditorBlock document={document} />
    </div>
  );
};
export default SingleDocument;
