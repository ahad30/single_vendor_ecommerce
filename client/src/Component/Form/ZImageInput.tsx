import { Button, Form, Upload } from "antd";
import { useState, useEffect } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { UploadOutlined } from "@ant-design/icons";
import { UploadFile } from "antd/es/upload/interface";
import { useAppSelector } from "../../Redux/hook";
import { RootState } from "../../Redux/store";

const ZImageInput = () => {
  const [imageList, setImageList] = useState<UploadFile[]>([]);
  const { control } = useFormContext();
  const { isAddModalOpen, isEditModalOpen } = useAppSelector(
    (state: RootState) => state.modal
  );

  // Reset image list when the modal is closed
  useEffect(() => {
    if (!isAddModalOpen || !isEditModalOpen) {
      setImageList([]);
    }
  }, [isAddModalOpen]);

  return (
    <Controller
      name="image"
      control={control}
      render={({ field: { onChange }, fieldState: { error } }) => (
        <Form.Item
          label="Picture"
          validateStatus={error ? "error" : ""}
          help={error?.message}
        >
          <Upload
            name="image"
            listType="picture"
            fileList={imageList}
            onPreview={(file) => {
              const url = URL.createObjectURL(file.originFileObj as Blob);
              window.open(url, "_blank");
            }}
            beforeUpload={(file) => {
              const newFileList: UploadFile[] = [
                {
                  uid: file.uid,
                  name: file.name,
                  status: "done",
                  url: URL.createObjectURL(file),
                },
              ];
              setImageList(newFileList);
              onChange(file);
              return false; // Prevent automatic upload
            }}
            onRemove={() => {
              setImageList([]);
              onChange(null);
            }}
            maxCount={1}
          >
            <Button icon={<UploadOutlined />}>Upload</Button>
          </Upload>
        </Form.Item>
      )}
    />
  );
};

export default ZImageInput;
