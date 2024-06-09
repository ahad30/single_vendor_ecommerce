/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from "react";
import { Form, Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { Controller, useFormContext } from "react-hook-form";
import { RootState } from "../../Redux/store";
import { useAppSelector } from "../../Redux/hook";

const ZMultipleImage = ({
  name,
  label,
  value,
  reset,
}: {
  name: string;
  label: string;
  value?: any[];
  reset?: boolean;
}) => {
  const { control, setValue, resetField } = useFormContext();
  const { isEditModalOpen } = useAppSelector((state: RootState) => state.modal);

  useEffect(() => {
    if (value) {
      setValue(name, value);
    }
  }, [value, setValue]);

  useEffect(() => {
    if (reset === true) {
      if (!isEditModalOpen) {
        resetField(name);
      }
    }
  }, [reset, isEditModalOpen]);

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };
  const onChange = (fileList: any) => {
    const images = fileList.map((item: any) => item.originFileObj);
    console.log(images);
  };
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Form.Item
          label={label}
          validateStatus={error ? "error" : ""}
          help={error?.message}
        >
          <Upload
            {...field}
            listType="picture"
            multiple
            beforeUpload={() => false} // Prevent auto-upload
            onChange={({ fileList }) => {
              field.onChange(fileList);
              onChange(fileList);
            }}
            fileList={field.value}
            maxCount={4}
          >
            <Button icon={<UploadOutlined />}>Upload Images</Button>
          </Upload>
        </Form.Item>
      )}
    />
  );
};

export default ZMultipleImage;
