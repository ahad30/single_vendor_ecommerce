/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const ZCkEditor = ({
  setDescription,
}: {
  setDescription: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [editorData, setEditorData] = useState("");

  const handleEditorChange = (event: any, editor: { getData: () => any }) => {
    const data = editor.getData();
    setEditorData(data);
    setDescription(data);
    // console.log({ event, editor, data });
  };

  return (
    <div className="App">
      <CKEditor
        editor={ClassicEditor}
        data={editorData}
        onReady={(editor) => {
          //   console.log("Editor is ready to use!", editor);
        }}
        onChange={handleEditorChange}
        onBlur={(event, editor) => {
          //   console.log("Blur.", editor);
        }}
        onFocus={(event, editor) => {
          //   console.log("Focus.", editor);
        }}
      />
    </div>
  );
};

export default ZCkEditor;
