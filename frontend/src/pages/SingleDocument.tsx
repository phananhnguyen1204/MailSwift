import EditorBlock from "../components/EditorBlock";

// interface SingleDocumentProps {
//   documentId: string;
// }

const SingleDocument: React.FC = () => {
  return (
    <div className="p-4">
      {/*hard code for now, will use id prop later to display each doc*/}
      <EditorBlock
        document={{
          title: "Untitled Document",
          description: "Hello, this is a hard-coded description",
        }}
      />
    </div>
  );
};
export default SingleDocument;
