/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Form, Upload } from "antd";
import { useState, useEffect } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { UploadOutlined } from "@ant-design/icons";
import { UploadFile } from "antd/es/upload/interface";
import { useAppSelector } from "../../Redux/hook";
import { RootState } from "../../Redux/store";

// defaultKey="product"
// setPriceQuantityImage={setPriceQuantityImage}

const ZImageInput = ({
  name,
  label,
  defaultKey,
  setPriceQuantityImage,
  refresh,
  maxCount,
}: {
  name: string;
  label: string;
  defaultKey?: "product";
  refresh?: boolean;
  maxCount?: number;
  setPriceQuantityImage?: React.Dispatch<React.SetStateAction<any>>;
}) => {
  const [imageList, setImageList] = useState<UploadFile[]>([]);
  const { control , resetField } = useFormContext();
  const { isAddModalOpen, isEditModalOpen } = useAppSelector(
    (state: RootState) => state.modal
  );

  useEffect(() => {
    if (!isAddModalOpen || !isEditModalOpen) {
      setImageList([]);
      resetField(name)

    }
  }, [isAddModalOpen, isEditModalOpen]);

  useEffect(() => {
    if (defaultKey == "product") {
      setImageList([]);
    }
  }, [refresh]);

  const handleChange = (info: any) => {
    const file = info.file;
    console.log(info);
    if (
      setPriceQuantityImage &&
      defaultKey === "product" &&
      info?.fileList?.length > 0
    ) {
      setPriceQuantityImage((prev: any) => ({
        ...prev,
        image: file,
      }));
    } else if (setPriceQuantityImage) {
      setPriceQuantityImage((prev: any) => ({
        ...prev,
        image: "",
      }));
    }
    // const newFileList: UploadFile[] = [
    //   {
    //     uid: file.uid,
    //     name: file.name,
    //     status: "done",
    //     url: URL.createObjectURL(file.originFileObj),
    //   },
    // ];
    // console.log("Uploaded file list:", newFileList);
    // setImageList(newFileList);
  };
  // console.log(imageList);
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange }, fieldState: { error } }) => (
        <Form.Item
          label={label}
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
            onChange={handleChange}
          >
            <Button icon={<UploadOutlined />}>Upload</Button>
          </Upload>
        </Form.Item>
      )}
    />
  );
};

export default ZImageInput;
