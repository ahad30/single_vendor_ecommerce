/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useAppSelector } from "../../Redux/hook";
import { RootState } from "../../Redux/store";

const ZCkEditor = ({
  setDescription,
}: {
  setDescription: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [editorData, setEditorData] = useState("");

  const handleEditorChange = (_event: any, editor: { getData: () => any }) => {
    const data = editor.getData();
    setEditorData(data);
    setDescription(editorData);
    // console.log({ event, editor, data });
  };

  const { isAddModalOpen, isEditModalOpen } = useAppSelector(
    (state: RootState) => state.modal
  );

  useEffect(() => {
    if (!isAddModalOpen || !isEditModalOpen) {
      setEditorData("");
      setDescription("");
    }
  }, [isAddModalOpen, isEditModalOpen]);

  return (
    <div className="App my-5">
      <CKEditor
        editor={ClassicEditor}
        data={editorData}
        onReady={(_editor) => {
          //   console.log("Editor is ready to use!", editor);
        }}
        onChange={handleEditorChange}
        onBlur={(_event, _editor) => {
          //   console.log("Blur.", editor);
        }}
        onFocus={(_event, _editor) => {
          //   console.log("Focus.", editor);
        }}
      />
    </div>
  );
};

export default ZCkEditor;
