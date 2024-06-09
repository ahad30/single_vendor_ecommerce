/* eslint-disable @typescript-eslint/no-explicit-any */

import { Form, Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { Controller, useFormContext } from "react-hook-form";
import { useEffect } from "react";

const ZMultipleImage = ({
  name,
  label,
  singleSetPriceQuantityImage,
}: {
  name: string;
  label: string;
  value?: any[];
  reset?: boolean;
  singleSetPriceQuantityImage?: React.Dispatch<React.SetStateAction<any>>;
}) => {
  const { control, resetField, watch } = useFormContext();

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const onChange = (fileList: any) => {
    const images = fileList.map((item: any) => item.originFileObj);
    if (singleSetPriceQuantityImage) {
      singleSetPriceQuantityImage((prev: any) => ({
        ...prev,
        images: images,
      }));
    }
  };

  const fileList = watch(name) || [];

  useEffect(() => {
    if (resetField) {
      resetField(name, { defaultValue: [] });
    }
  }, [resetField, name]);

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={[]} // Ensuring the default value is an empty array
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
            fileList={field.value || []} // Ensure the fileList is an empty array by default
            maxCount={4}
          >
            <Button icon={<UploadOutlined />}>Upload (Max: 4)</Button>
          </Upload>
        </Form.Item>
      )}
    />
  );
};

export default ZMultipleImage;
